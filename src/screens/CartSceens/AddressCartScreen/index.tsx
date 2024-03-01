import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import CartTotalFixed from '../../../components/CartScreen/CartTotalFixed';
import SectionTitle from '../../../components/SectionTitle';
import CustomIcon from '../../../components/CustomIcon';
import {Type_Pagament} from '../../../types/ModelsType';
import useGlobalStore from '../../../hooks/store/useGlobalStore';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import {useState} from 'react';
import AddressModal from '../../../components/Modals/AddressModal';
import ChangeCellphoneModal from '../../../components/Modals/ChangeCellphoneModal';
import PaymentCard from '../../../components/PaymentCard';
import CartCellphoneCard from '../../../components/CartCellphoneCard';
import CartAddressCard from '../../../components/CartAddressCard';
import CartTittleSection from '../../../components/CartTittleSection';
import CallToast from '../../../components/Toast';
import {global} from '../../../style';
import {iconColor, iconSize} from '../../../utils';
import {cellPhoneIcon, userOptions} from '../ResumeScreen';
import useTheme from '../../../hooks/useTheme';
import {COLORS} from '../../../theme/theme';

export enum STEPS {
  CART = 0,
  ADDRESS = 1,
}

export const getIcon = (options: Type_Pagament) => {
  if (options.type_pagament_name.toUpperCase().includes('CREDITO')) {
    return (
      <CustomIcon name="credit-card" size={iconSize} pack="MaterialIcons" />
    );
  }

  if (options.type_pagament_name.toUpperCase().includes('DEBITO')) {
    return <CustomIcon name="credit-card" size={iconSize} pack="Feather" />;
  }
  if (options.type_pagament_name.toUpperCase().includes('DINHEIRO')) {
    return <CustomIcon name="money" size={iconSize} pack="MaterialIcons" />;
  }
  if (options.type_pagament_name.toUpperCase().includes('PIX')) {
    return <CustomIcon name="pix" size={iconSize} pack="MaterialIcons" />;
  }

  return (
    <CustomIcon
      name="credit-card"
      size={iconSize}
      color={iconColor}
      pack="Feather"
    />
  );
};

const AddressCartScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [selectedPayment, setSeletedPayment] = useState<null | string>(null);
  const [selectedDelivery, setSelectedDelivery] = useState<null | string>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAddressOpen, setModalAddressOpen] = useState(false);
  const [title, setTittle] = useState('Total');
  const translateY = useSharedValue(Dimensions.get('window').height);

  const showModal = (currentTarget: 'Address' | 'Cellphone') => {
    translateY.value = withTiming(0, {duration: 500});
    if (currentTarget === 'Cellphone') {
      return setModalOpen(true);
    }

    return setModalAddressOpen(true);
  };

  const hideModal = () => {
    translateY.value = withTiming(Dimensions.get('window').height, {
      duration: 500,
    });
  };
  const {typePagament} = useGlobalStore();

  const {showToast} = CallToast();

  const comeBack = () => {
    navigation.pop();
  };

  const addAddress = () => {
    navigation.navigate('Cep');
  };

  const goToResumeScreen = () => {
    if (!selectedDelivery)
      return showToast('Selecione uma forma de entrega', 'error');

    if (!selectedPayment)
      return showToast('Selecione uma forma de pagamento', 'error');

    navigation.navigate('ResumeCart', {
      selectedPayment,
      selectedDelivery,
    });
  };

  const setTitle = (id: string) => {
    setSelectedDelivery(id);
    if (id === '0') {
      setTittle('Total com entrega');
    } else {
      setTittle('Total');
    }
  };

  const {currentTheme} = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor:
          currentTheme === 'light'
            ? COLORS.backgroundColorLight
            : COLORS.backgroundColorDark,
      }}>
      <SectionTitle comeBack={comeBack} />

      <ScrollView style={styles.mainContainer}>
        <View>
          <View
            style={[
              styles.paddingView,
              styles.couponView,
              global.shadow,
              {
                backgroundColor:
                  currentTheme === 'dark'
                    ? COLORS.cardColorDark
                    : COLORS.cardColorLight,
              },
            ]}>
            {/* Delivery Options  */}
            <View style={[styles.wFull]}>
              <CartTittleSection
                showModal={showModal}
                title="Entregar em"
                currentTarget="Address"
                secondTitle="Trocar"
              />

              <View>
                {userOptions.map((op, i) => (
                  <CartAddressCard
                    address={op}
                    selectedDelivery={selectedDelivery}
                    setSelectedDelivery={setTitle}
                    withBorder={i === userOptions.length - 1 ? false : true}
                    key={i}
                  />
                ))}
              </View>
            </View>
          </View>

          {/* Cellphone  */}
          <View
            style={[
              styles.paddingView,
              styles.couponView,
              global.shadow,
              {
                marginTop: 20,
                backgroundColor:
                  currentTheme === 'dark'
                    ? COLORS.cardColorDark
                    : COLORS.cardColorLight,
              },
            ]}>
            <View style={[styles.wFull]}>
              <CartTittleSection title="Contato" />

              <CartCellphoneCard
                cellphone="(11) 98859-8530"
                showModal={showModal}
                icon={cellPhoneIcon}
              />
            </View>
          </View>

          {/* typePagament  */}
          <View
            style={[
              styles.paddingView,
              styles.couponView,
              global.shadow,
              {
                marginTop: 20,
                backgroundColor:
                  currentTheme === 'dark'
                    ? COLORS.cardColorDark
                    : COLORS.cardColorLight,
              },
            ]}>
            <View style={[styles.wFull]}>
              <CartTittleSection title="Forma de pagamento" />

              <View style={styles.typePagamentView}>
                {typePagament.map(typePagament => {
                  const icon = getIcon(typePagament);
                  return (
                    <PaymentCard
                      key={typePagament.id}
                      typePagament={typePagament}
                      active={selectedPayment}
                      setActive={setSeletedPayment}
                      icon={icon}
                    />
                  );
                })}
              </View>
            </View>
          </View>
        </View>
        <ChangeCellphoneModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          hideModal={hideModal}
          translateY={translateY}
        />
        <AddressModal
          modalOpen={modalAddressOpen}
          translateY={translateY}
          setModalOpen={setModalAddressOpen}
          hideModal={hideModal}
          addAddress={addAddress}
        />
      </ScrollView>
      <CartTotalFixed
        onPress={goToResumeScreen}
        quantity={2}
        value={57}
        title={title}
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
    width: '100%',
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

export default AddressCartScreen;
