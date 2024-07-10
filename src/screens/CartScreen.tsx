import {Dimensions, FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useGlobalStore from '../hooks/store/useGlobalStore';
import EmptyAnimation from '../components/Lottie/EmptyAnimation';
import {useEffect, useRef, useState} from 'react';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import CouponsModal from '../components/Modals/CouponsModal';
import CartTotalFixed from '../components/CartScreen/CartTotalFixed';
import MyText from '../components/Text';
import CustomIcon from '../components/CustomIcon';
import ProductRecomendCard from '../components/ProductRecomendCard';
import ProductCartCard from '../components/ProductCartCard';
import CartInfo from '../components/CartInfo';
import {COLORS} from '../theme/theme';
import useTheme from '../hooks/useTheme';
import usePrivateStore from '../hooks/store/usePrivateStore';
import {
  Cart_product,
  Category,
  Discount_cupom,
  Product,
  User_Rewards,
} from '../types/ModelsType';
import useCurrrentCode from '../hooks/reward';
import {addCartProduct} from '../services';
import {categoriesToExclude, getCartTotal, getDiscount} from '../utils';
import NoAuth from '../components/NoAuth';
import {useGeneralDataInfo} from '../hooks/generalData';
import useShowToast from '../hooks/customHooks/useShowToast';

const CartScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const {currentTheme} = useTheme();
  const {products, categorys, generalData} = useGlobalStore();
  const {systemOpening} = useGeneralDataInfo();
  const {cart_product, user, setCart_product} = usePrivateStore();
  const {currentCode} = useCurrrentCode();
  const {showToast} = useShowToast();

  const ListRef = useRef<FlatList>();
  const translateY = useSharedValue(Dimensions.get('window').height);
  const cartProductTotal = getCartTotal(cart_product);

  const isCoupon = !(currentCode as User_Rewards)?.rewardPoints;
  const isReward = !!(currentCode as User_Rewards)?.rewardPoints;

  const showModal = () => {
    translateY.value = withTiming(0, {duration: 500});
    setModalOpen(true);
  };

  const hideModal = () => {
    translateY.value = withTiming(Dimensions.get('window').height, {
      duration: 500,
    });
  };

  const accressStep = () => {
    if (!systemOpening) {
      if (!generalData.isOpening) {
        showToast(
          'Erro no sistema. Entre em contato com nosso número',
          'error',
        );
      } else {
        showToast('Não estamos em horario de atendimento', 'error');
      }

      return;
    }
    navigation.push('AddressCart');
  };

  const goToLogin = () => {
    return navigation.push('Login');
  };

  const onPress = (id: string) => {
    navigation.navigate('Product', {id});
  };
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

  const cartGuardian = () => {
    const promo1 = products.find(
      (p: Product) => p.name.toLowerCase() === 'combo 1',
    );
    const dollyPromo = products.find(
      (p: Product) => p.name.toLowerCase() === 'dolly promoção',
    );

    if (promo1 && dollyPromo) {
      const hasPromo1 = cart_product.some(
        (cartProduct: Cart_product) => cartProduct.product_id === promo1.id,
      );
      const hasDollyPromo = cart_product.some(
        (cartProduct: Cart_product) => cartProduct.product_id === dollyPromo.id,
      );

      if (hasPromo1 && !hasDollyPromo) {
        const newCart = {
          product_id: dollyPromo.id,
          quantity: 1,
          observation: null,
          value: '0',
          size: 0,
        };

        const updatedCartProduct = [...cart_product, newCart];
        //@ts-ignore
        setCart_product(updatedCartProduct);
      } else if (!hasPromo1 && hasDollyPromo) {
        const updatedCartProduct = cart_product.filter(
          (cartProduct: Cart_product) =>
            cartProduct.product_id !== dollyPromo.id,
        );
        setCart_product(updatedCartProduct);
      }
    }
  };

  const rewardGuardian = () => {
    const existsReward = cart_product?.find(
      (cartProduct: Cart_product) => cartProduct.observation === 'Recompensa',
    );

    if (existsReward && !currentCode) {
      const newArr = cart_product.filter(
        (c: Cart_product) => c.id !== existsReward.id,
      );
      setCart_product(newArr);
    }
  };

  // Lógica para buscar produtos recomendados aleatórios
  const getRecommendedProducts = () => {
    const excludedCategoryIds = categorys
      .filter((cat: Category) =>
        categoriesToExclude.includes(cat.category_name),
      )
      .map(cat => cat.id);

    // Filtra produtos por categorias excluídas
    const filteredProducts = products.filter(
      (product: Product) => !excludedCategoryIds.includes(product.category_id),
    );

    // Seleciona aleatoriamente 12 produtos
    const randomProducts = [];
    while (randomProducts.length < 12 && filteredProducts.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredProducts.length);
      const randomProduct = filteredProducts.splice(randomIndex, 1)[0];
      randomProducts.push(randomProduct);
    }

    setRecommendations(randomProducts);
  };

  useEffect(() => {
    rewardGuardian();
    cartGuardian();
  }, [cart_product]);

  useEffect(() => {
    if (
      currentCode &&
      isReward &&
      (currentCode as User_Rewards).rewardType === 1
    ) {
      const newItem = products.find(
        (product: Product) =>
          product.id === (currentCode as User_Rewards).rewardProductId,
      );

      if (newItem) {
        addItemToCart(newItem);
      }
    }
  }, [currentCode]);

  useEffect(() => {
    getRecommendedProducts();
  }, []);

  if (user) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor:
            currentTheme === 'light'
              ? COLORS.backgroundColorLight
              : COLORS.backgroundColorDark,
        }}>
        <View style={styles.mainContainer}>
          {cart_product.length > 0 ? (
            <View style={{flex: 1}}>
              <ScrollView>
                {/* Cart Products  */}
                <View style={[styles.productView, styles.paddingView]}>
                  {cart_product.map((p: Cart_product, i) => {
                    return (
                      <View key={i}>
                        <ProductCartCard cartProduct={p} onPress={onPress} />

                        {i !== cart_product.length - 1 ? (
                          <View
                            style={[
                              styles.hrStyle,
                              {
                                borderColor:
                                  currentTheme === 'dark'
                                    ? COLORS.borderColorDark
                                    : COLORS.borderColorLight,
                              },
                            ]}
                          />
                        ) : null}
                      </View>
                    );
                  })}
                </View>

                <MyText style={styles.textFlatList}> Peça também</MyText>

                {/* Cart Recomendations  */}
                <FlatList
                  ref={ListRef}
                  data={recommendations}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={[
                    styles.paddingView,
                    styles.flatListView,
                  ]}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => {
                    return (
                      <ProductRecomendCard
                        product={item}
                        key={item.id}
                        onPress={onPress}
                      />
                    );
                  }}
                />

                {/* Cart coupons  */}
                <View style={[styles.paddingView, styles.couponView]}>
                  <View style={styles.couponContainer}>
                    <View style={styles.couponBox}>
                      {!currentCode ? (
                        <>
                          <View style={styles.couponIcon}>
                            <CustomIcon
                              name="hash"
                              pack="Feather"
                              size={20}
                              color="#000000"
                            />
                          </View>

                          <View>
                            <MyText style={styles.couponTitle}>
                              Cupom / Recompensa
                            </MyText>
                            <MyText style={styles.couponSubTitle}>
                              Selecione o código
                            </MyText>
                          </View>
                        </>
                      ) : isCoupon ? (
                        <>
                          <View style={styles.couponIcon}>
                            <CustomIcon
                              name="ticket-outline"
                              pack="Ionicons"
                              size={20}
                              color="#000000"
                            />
                          </View>
                          <View>
                            <MyText style={styles.couponTitle}>
                              {(currentCode as Discount_cupom).cupom_name}
                            </MyText>
                            <MyText style={styles.couponSubTitle}>
                              {(currentCode as Discount_cupom).discount} % de
                              desconto{' '}
                            </MyText>
                          </View>
                        </>
                      ) : (
                        <>
                          <View style={styles.couponIcon}>
                            <CustomIcon
                              name="crown-outline"
                              pack="MaterialCommunityIcons"
                              size={22}
                              color="#000000"
                            />
                          </View>
                          <View>
                            <MyText style={styles.couponTitle}>
                              Recompensa:
                            </MyText>
                            <MyText style={styles.couponSubTitle}>
                              {(currentCode as User_Rewards).rewardName}
                            </MyText>
                          </View>
                        </>
                      )}
                    </View>

                    {currentCode ? (
                      <MyText style={styles.addText} onPress={showModal}>
                        Remover
                      </MyText>
                    ) : (
                      <MyText style={styles.addText} onPress={showModal}>
                        Adicionar
                      </MyText>
                    )}
                  </View>
                </View>

                {/* Cart infos  */}
                <View style={[styles.paddingView, styles.couponView]}>
                  <CartInfo
                    label="Subtotal"
                    text={`R$ ${cartProductTotal.toFixed(2)}`}
                  />

                  {currentCode && isCoupon && (
                    <CartInfo
                      label="Cupom"
                      color="green"
                      text={`- R$ ${getDiscount(
                        (currentCode as Discount_cupom).discount,
                        getCartTotal(cart_product),
                      ).toFixed(2)}`}
                    />
                  )}

                  {currentCode &&
                    isReward &&
                    (currentCode as User_Rewards).rewardType === 0 && (
                      <CartInfo
                        label="Cupom"
                        color="green"
                        text={`- R$ ${getDiscount(
                          (currentCode as User_Rewards).rewardDiscount,
                          getCartTotal(cart_product),
                        ).toFixed(2)}`}
                      />
                    )}
                </View>
              </ScrollView>

              <CartTotalFixed
                onPress={accressStep}
                title="Total"
                disabled={systemOpening ? false : true}
              />
              <CouponsModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                hideModal={hideModal}
                translateY={translateY}
              />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <EmptyAnimation text="Sem produtos no carrinho" />
            </View>
          )}
        </View>
      </View>
    );
  }

  return <NoAuth goToLogin={goToLogin} />;
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingBottom: 50,
  },
  productView: {
    gap: 10,
  },

  textFlatList: {
    paddingHorizontal: 20,
    fontSize: 18,
    fontWeight: '600',
    paddingTop: 20,
  },

  paddingView: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  flatListView: {
    gap: 10,
  },

  couponView: {
    flexDirection: 'column',
    gap: 10,
  },

  couponIcon: {
    height: 35,
    width: 35,
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cfcfcfFF',
  },

  couponContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  couponTitle: {
    fontSize: 15,
    fontWeight: '500',
  },

  couponSubTitle: {
    fontSize: 14,
    fontWeight: '300',
  },

  addText: {
    fontSize: 15,
    color: COLORS.secondaryRed,
    fontWeight: '700',
  },

  totalView: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  subTitleTotal: {
    fontSize: 14,
    fontWeight: '400',
  },

  titleTotal: {
    fontSize: 16,
    fontWeight: '700',
  },
  hrStyle: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingVertical: 8,
    marginHorizontal: 5,
  },

  couponBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});

export default CartScreen;
