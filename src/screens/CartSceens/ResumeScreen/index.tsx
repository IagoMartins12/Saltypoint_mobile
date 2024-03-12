import {ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import CartTotalFixed from '../../../components/CartScreen/CartTotalFixed';
import SectionTitle from '../../../components/SectionTitle';
import CustomIcon from '../../../components/CustomIcon';
import useGlobalStore from '../../../hooks/store/useGlobalStore';
import {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import CartTittleSection from '../../../components/CartTittleSection';
import CartInfo from '../../../components/CartInfo';
import {global} from '../../../style';
import CartAddressCard from '../../../components/CartAddressCard';
import {Type_Pagament} from '../../../types/ModelsType';
import {getIcon} from '../AddressCartScreen';
import PaymentCard from '../../../components/PaymentCard';
import CartCellphoneCard from '../../../components/CartCellphoneCard';
import {iconColor, iconSize} from '../../../utils';
import OrderAnimation from '../../../components/Lottie/OrderAnimation';
import CallToast from '../../../components/Toast';
import useTheme from '../../../hooks/useTheme';
import {COLORS} from '../../../theme/theme';

export const userOptions = [
  {
    id: '0',
    name: 'Delivery',
    address: 'Luiza maria rosa',
    number: '222',
    district: 'Décima area',
    city: 'São paulo',
    uf: 'SP',
    reference: 'Esquina',
    icon: (
      <CustomIcon name="delivery-dining" size={iconSize} pack="MaterialIcons" />
    ),
  },
  {
    id: '1',
    name: 'Retirar na loja',
    address: 'Estrada de ligação',
    number: '22',
    district: 'Sol nascente',
    city: 'São paulo',
    uf: 'SP',
    icon: <CustomIcon name="home" size={iconSize} pack="MaterialIcons" />,
  },
];

export enum STEPS {
  CART = 0,
  ADDRESS = 1,
}

type responseType = {
  selectedDelivery: '0' | '1';
  selectedPayment: string;
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
  const {showToast} = CallToast();
  const route = useRoute();

  //@ts-ignore
  const response: responseType = route.params;
  const {currentTheme} = useTheme();

  const finishOrder = () => {
    setHasPlayed(true);
  };

  const getBack = () => {
    showToast('Pedido feito', 'success');
    navigation.navigate('Order');
    setHasPlayed(false);
  };
  const {typePagament} = useGlobalStore();

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
              <CartInfo label="Subtotal" text="R$ 57,80" />
              {response?.selectedDelivery === '0' ? (
                <CartInfo label="Taxa de entrega" text="R$ 9,00" />
              ) : null}

              <CartInfo label="Cupom" text="- R$ 12,80" color="green" />

              <View style={global.hrStyle} />
            </View>

            <CartInfo label="Total" text="R$ 52,80" boldText />
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
            {response.selectedDelivery === '0' ? (
              <CartAddressCard address={userOptions[0]} />
            ) : (
              <CartAddressCard address={userOptions[1]} />
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
        quantity={2}
        value={57}
        title="Total"
        lastStep
        onPress={finishOrder}
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
