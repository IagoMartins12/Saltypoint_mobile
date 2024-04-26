import {ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import CartTotalFixed from '../../../components/CartScreen/CartTotalFixed';
import SectionTitle from '../../../components/SectionTitle';
import CustomIcon from '../../../components/CustomIcon';
import useGlobalStore from '../../../hooks/store/useGlobalStore';
import {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import CartTittleSection from '../../../components/CartTittleSection';
import CartInfo from '../../../components/CartInfo';
import {global} from '../../../style';
import CartAddressCard, {
  userOptions,
} from '../../../components/CartAddressCard';
import {
  Cart_product,
  Discount_cupom,
  Product,
  Type_Pagament,
  User_Rewards,
} from '../../../types/ModelsType';
import {getIcon, pizzariaDelivery} from '../AddressCartScreen';
import PaymentCard from '../../../components/PaymentCard';
import CartCellphoneCard from '../../../components/CartCellphoneCard';
import {
  getCartTotal,
  getDiscount,
  getTaxa,
  getTotal,
  iconSize,
} from '../../../utils';
import OrderAnimation from '../../../components/Lottie/OrderAnimation';
import CallToast from '../../../components/Toast';
import useTheme from '../../../hooks/useTheme';
import {COLORS} from '../../../theme/theme';
import usePrivateStore from '../../../hooks/store/usePrivateStore';
import useCurrrentCode from '../../../hooks/reward';
import {
  addCartProduct,
  createOrder,
  getEstimativeDate,
} from '../../../services';

export enum STEPS {
  CART = 0,
  ADDRESS = 1,
}

type responseType = {
  selectedDelivery: '0' | '1';
  selectedPayment: string;
  currentUserAddress?: userOptions;
};

export const cellPhoneIcon = (
  <CustomIcon size={iconSize} name="phone" pack="MaterialCommunityIcons" />
);

const ResumeCartScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [hasPlayed, setHasPlayed] = useState(false);
  const [estimativeDate, setEstimativeData] = useState<null | string>(null);

  const {showToast} = CallToast();
  const route = useRoute();

  //@ts-ignore
  const response: responseType = route.params;

  const {currentTheme} = useTheme();
  const {typePagament, generalData, products} = useGlobalStore();
  const {
    cart_product,
    user,
    setCart_product,
    orders,
    setOrders,
    setCoupons,
    setUserReward,
    coupons,
    userReward,
  } = usePrivateStore();
  const {currentCode, setCurrentCode} = useCurrrentCode();

  const isCoupon = !(currentCode as User_Rewards)?.rewardPoints;
  const isReward = !!(currentCode as User_Rewards)?.rewardPoints;
  const total = getCartTotal(cart_product);

  const addItemToCart = async (product: Product, isOrdered = false) => {
    const checkSize = (currentCode as User_Rewards)?.rewardName
      .toUpperCase()
      .includes('BROTINHO');
    const newCart = {
      product_id: product.id,
      quantity: 1,
      observation: 'Recompensa',
      value: '0',
      size: checkSize ? 1 : 0,
    } as Cart_product;

    if (isOrdered) {
      const response = await addCartProduct({
        product_id: product.id,
        observation: 'Recompensa',
        quantity: 1,
        value: '0',
        size: 0,
      });
      return response;
    }

    const updatedCartProduct = [...cart_product, newCart];
    setCart_product(updatedCartProduct);
  };

  const finishOrder = async () => {
    if (currentCode && (currentCode as User_Rewards).rewardType === 1) {
      const newItem = products.find(
        (product: Product) =>
          product.id === (currentCode as User_Rewards).rewardProductId,
      );

      if (newItem) {
        addItemToCart(newItem, true);
      }
    }

    const request = await createOrder({
      total_amount: getTotal(
        cart_product,
        currentCode,
        isCoupon,
        isReward,
        response.selectedDelivery !== '1'
          ? getTaxa(response.currentUserAddress?.district)
            ? generalData?.deliveryFeeOutside
            : generalData?.deliveryFeeInside
          : null,
      ),
      type_pagament_id: response.selectedPayment,
      user_adress_id:
        response.selectedDelivery !== '1' ? response.selectedDelivery : null,
      type_delivery: response.selectedDelivery === '1' ? 1 : 0,
      discount_coupon_id: currentCode && isCoupon ? currentCode.id : null,
      state_id: '6526e4b833e69bf2bb97bc9e', //Em análise,
      discount_value:
        currentCode && isCoupon
          ? getDiscount(
              (currentCode as Discount_cupom).discount,
              getCartTotal(cart_product),
            )
          : isReward && (currentCode as User_Rewards).rewardType === 0
          ? getDiscount(
              (currentCode as User_Rewards).rewardDiscount,
              getCartTotal(cart_product),
            )
          : 0,
      contact_phone: user.phone,
      reward_id: currentCode && isReward ? currentCode.id : null,
    });

    if (request) {
      const newOrder = {...request, orderItems: cart_product};
      const updatedOrders = [...orders, newOrder];
      setHasPlayed(true);

      if (currentCode && isCoupon) {
        const filteredCoupons = coupons.filter(
          (c: Discount_cupom) => c.id !== currentCode?.id,
        );
        setCoupons(filteredCoupons);
        setCurrentCode(null);
      }

      if (currentCode && isReward) {
        const filteredRewards = userReward.filter(
          (c: User_Rewards) => c.id !== currentCode?.id,
        );
        setUserReward(filteredRewards);
        setCurrentCode(null);
      }

      setCart_product([]);
      setOrders(updatedOrders);
      return;
    } else {
      showToast('Erro ao fazer pedido', 'error');
    }
  };

  const getBack = () => {
    showToast('Pedido feito', 'success');
    navigation.navigate('Order');
    setHasPlayed(false);
  };

  const comeBack = () => {
    navigation.pop();
  };

  const getTypePagament = (id: string) => {
    const typePagamentOptions = typePagament.find(
      (type: Type_Pagament) => type.id === id,
    );

    const icon = getIcon(typePagamentOptions);

    return <PaymentCard icon={icon} typePagament={typePagamentOptions} />;
  };

  const fetchEstimateData = async () => {
    try {
      const estimateNumber = await getEstimativeDate();
      const currentTime = new Date();

      // Adiciona o estimateNumber à hora atual
      const estimatedTimeStart = new Date(
        currentTime.getTime() + estimateNumber * 60000,
      );

      // Adiciona 20 minutos ao tempo estimado para obter o horário final
      const estimatedTimeEnd = new Date(
        estimatedTimeStart.getTime() + 20 * 60000,
      );

      // Se for delivery
      if (response.selectedDelivery !== '1') {
        const formattedStartTime = `${String(
          estimatedTimeStart.getHours(),
        ).padStart(2, '0')}:${String(estimatedTimeStart.getMinutes()).padStart(
          2,
          '0',
        )}`;
        const formattedEndTime = `${String(
          estimatedTimeEnd.getHours(),
        ).padStart(2, '0')}:${String(estimatedTimeEnd.getMinutes()).padStart(
          2,
          '0',
        )}`;

        // Combina os horários formatados em um intervalo
        const finalEstimatedTime = `${formattedStartTime} - ${formattedEndTime}`;

        setEstimativeData(finalEstimatedTime);
      } else {
        const formattedStartTime = `${String(
          estimatedTimeStart.getHours(),
        ).padStart(2, '0')}:${String(
          estimatedTimeStart.getMinutes() - 10,
        ).padStart(2, '0')}`;
        const formattedEndTime = `${String(
          estimatedTimeEnd.getHours(),
        ).padStart(2, '0')}:${String(
          estimatedTimeEnd.getMinutes() - 10,
        ).padStart(2, '0')}`;

        // Combina os horários formatados em um intervalo
        const finalEstimatedTime = `${formattedStartTime} - ${formattedEndTime}`;

        setEstimativeData(finalEstimatedTime);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEstimateData();
  }, []);

  if (hasPlayed) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor:
            currentTheme === 'dark'
              ? COLORS.backgroundColorDark
              : COLORS.backgroundColorLight,
        }}>
        <OrderAnimation onFinished={getBack} />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <SectionTitle comeBack={comeBack} />

      <ScrollView
        style={[
          styles.mainContainer,
          {
            backgroundColor:
              currentTheme === 'dark'
                ? COLORS.backgroundColorDark
                : COLORS.backgroundColorLight,
          },
        ]}>
        {/* Resume  */}
        <View
          style={[
            styles.paddingView,
            global.shadow,
            {
              backgroundColor:
                currentTheme === 'dark'
                  ? COLORS.cardColorDark
                  : COLORS.cardColorLight,
            },
          ]}>
          <View style={styles.wFull}>
            <CartTittleSection title="Resumo de valores" />
            <View style={{gap: 10}}>
              <CartInfo label="Subtotal" text={`R$ ${total.toFixed(2)}`} />
              {response.selectedDelivery !== '1' &&
              response.currentUserAddress ? (
                <CartInfo
                  label="Taxa de entrega"
                  text={`R$ ${
                    getTaxa(response.currentUserAddress?.district)
                      ? generalData?.deliveryFeeOutside.toFixed(2)
                      : generalData?.deliveryFeeInside.toFixed(2)
                  }`}
                />
              ) : null}

              {estimativeDate ? (
                <CartInfo
                  label="Tempo estimado de entrega"
                  text={estimativeDate}
                />
              ) : null}

              {currentCode && isCoupon ? (
                <CartInfo
                  label="Cupom"
                  text={`- R$ ${getDiscount(
                    (currentCode as Discount_cupom).discount,
                    total,
                  ).toFixed(2)}`}
                  color="green"
                />
              ) : null}

              {currentCode &&
              isReward &&
              (currentCode as User_Rewards).rewardType === 0 ? (
                <CartInfo
                  label="Recompensa"
                  text={`- R$ ${getDiscount(
                    (currentCode as User_Rewards).rewardDiscount,
                    total,
                  ).toFixed(2)}`}
                  color="green"
                />
              ) : null}

              {currentCode &&
              isReward &&
              (currentCode as User_Rewards).rewardType === 1 ? (
                <CartInfo
                  label="Recompensa"
                  text={`${(currentCode as User_Rewards).rewardName}`}
                  color="green"
                />
              ) : null}

              <View style={global.hrStyle} />
            </View>

            <CartInfo
              label="Total"
              text={`R$ ${getTotal(
                cart_product,
                currentCode,
                isCoupon,
                isReward,
                response.selectedDelivery !== '1'
                  ? getTaxa(response.currentUserAddress?.district)
                    ? generalData?.deliveryFeeOutside
                    : generalData?.deliveryFeeInside
                  : null,
              ).toFixed(2)}`}
              boldText
            />
          </View>
        </View>

        {/* Address  */}
        <View
          style={[
            styles.paddingView,
            global.shadow,
            {
              backgroundColor:
                currentTheme === 'dark'
                  ? COLORS.cardColorDark
                  : COLORS.cardColorLight,
              marginTop: 20,
            },
          ]}>
          <View style={styles.wFull}>
            <CartTittleSection title="Entrega em" />
            {response.selectedDelivery !== '1' &&
            response.currentUserAddress ? (
              <CartAddressCard
                name="Entregar no endereço"
                icon={
                  <CustomIcon
                    name="delivery-dining"
                    size={iconSize}
                    pack="MaterialIcons"
                  />
                }
                address={response.currentUserAddress}
              />
            ) : (
              <CartAddressCard
                address={pizzariaDelivery}
                withBorder
                name="Retirar na loja"
                icon={pizzariaDelivery.icon}
              />
            )}
          </View>
        </View>

        {/* Cellphone  */}
        <View
          style={[
            styles.paddingView,
            global.shadow,
            {
              backgroundColor:
                currentTheme === 'dark'
                  ? COLORS.cardColorDark
                  : COLORS.cardColorLight,
              marginTop: 20,
            },
          ]}>
          <View style={styles.wFull}>
            <CartTittleSection title="Contato" />
            <CartCellphoneCard
              icon={cellPhoneIcon}
              cellphone="(11) 98859-8530"
            />
          </View>
        </View>

        {/* Type pagament */}
        <View
          style={[
            styles.paddingView,
            global.shadow,
            {
              backgroundColor:
                currentTheme === 'dark'
                  ? COLORS.cardColorDark
                  : COLORS.cardColorLight,
              marginTop: 20,
            },
          ]}>
          <View style={styles.wFull}>
            <CartTittleSection title="Forma de pagamento" />
            {getTypePagament(response.selectedPayment)}
          </View>
        </View>
      </ScrollView>

      <CartTotalFixed
        title="Total"
        lastStep
        onPress={finishOrder}
        deliveryFee={
          response.selectedDelivery !== '1'
            ? getTaxa(response.currentUserAddress?.district)
              ? generalData?.deliveryFeeOutside
              : generalData?.deliveryFeeInside
            : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },

  paddingView: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  couponView: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },

  wFull: {
    width: '100%',
    gap: 20,
  },

  couponTitle: {
    fontSize: 15,
    fontWeight: '500',
  },

  typePagamentView: {
    gap: 10,
  },
});

export default ResumeCartScreen;
