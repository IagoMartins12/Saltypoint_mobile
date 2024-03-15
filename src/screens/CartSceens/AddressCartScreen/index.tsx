import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import CartTotalFixed from '../../../components/CartScreen/CartTotalFixed';
import SectionTitle from '../../../components/SectionTitle';
import CustomIcon from '../../../components/CustomIcon';
import {Type_Pagament, User_Adress} from '../../../types/ModelsType';
import useGlobalStore from '../../../hooks/store/useGlobalStore';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import {useEffect, useState} from 'react';
import AddressModal from '../../../components/Modals/AddressModal';
import ChangeCellphoneModal from '../../../components/Modals/ChangeCellphoneModal';
import PaymentCard from '../../../components/PaymentCard';
import CartCellphoneCard from '../../../components/CartCellphoneCard';
import CartAddressCard, {
  userOptions,
} from '../../../components/CartAddressCard';
import CartTittleSection from '../../../components/CartTittleSection';
import CallToast from '../../../components/Toast';
import {global} from '../../../style';
import {iconColor, iconSize} from '../../../utils';
import {cellPhoneIcon} from '../ResumeScreen';
import useTheme from '../../../hooks/useTheme';
import {COLORS} from '../../../theme/theme';
import PixModal from '../../../components/Modals/PixModal';
import usePrivateStore from '../../../hooks/store/usePrivateStore';

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

export const pizzariaDelivery = {
  id: '1',
  address: 'Estrada de ligação',
  number: 22,
  district: 'Sol nascente',
  city: 'São paulo',
  uf: 'SP',
  icon: <CustomIcon name="home" size={iconSize} pack="MaterialIcons" />,
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
  const [modalPixOpen, setModalPixOpen] = useState(false);
  const [title, setTittle] = useState('Total');

  const [currentUserAddress, setCurrentUserAddress] =
    useState<null | userOptions>(null);

  const translateY = useSharedValue(Dimensions.get('window').height);

  console.log('translateY', translateY);
  const {user, address} = usePrivateStore();
  const showModal = (currentTarget: 'Address' | 'Cellphone' | 'Pix') => {
    translateY.value = withTiming(0, {duration: 500});
    if (currentTarget === 'Cellphone') {
      return setModalOpen(true);
    }

    if (currentTarget === 'Pix') {
      return setModalPixOpen(true);
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
    console.log('delivery option', id);
    if (id === '1') {
      setTittle('Total');
    } else {
      setTittle('Total com entrega');
    }
  };

  const {currentTheme} = useTheme();

  const getUserAddress = () => {
    if (user.user_Adress_id) {
      const userAddress = address.find(
        (a: User_Adress) => a.id === user.user_Adress_id,
      );

      return {
        id: userAddress.id,
        address: userAddress.address,
        number: userAddress.number,
        district: userAddress.district,
        city: userAddress.city,
        uf: userAddress.uf,
        reference: userAddress.reference,
      };
    }
  };

  useEffect(() => {
    const myaddress = getUserAddress();
    //@ts-ignore
    setCurrentUserAddress(myaddress);
  }, [user.user_Adress_id]);

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
                {currentUserAddress ? (
                  <CartAddressCard
                    address={currentUserAddress}
                    selectedDelivery={selectedDelivery}
                    setSelectedDelivery={setTitle}
                    withBorder
                    name="Entregar no endereço"
                    icon={
                      <CustomIcon
                        name="delivery-dining"
                        size={iconSize}
                        pack="MaterialIcons"
                      />
                    }
                  />
                ) : (
                  <View></View>
                )}

                {/* @ts-ignore */}
                <CartAddressCard
                  address={pizzariaDelivery}
                  selectedDelivery={selectedDelivery}
                  setSelectedDelivery={setTitle}
                  withBorder
                  name="Retirar na loja"
                  icon={pizzariaDelivery.icon}
                />
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
                cellphone={user.phone}
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
                      showModal={showModal}
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

        <PixModal
          modalOpen={modalPixOpen}
          translateY={translateY}
          setModalOpen={setModalPixOpen}
          hideModal={hideModal}
        />
      </ScrollView>
      <CartTotalFixed
        onPress={goToResumeScreen}
        title={title}
        deliveryFee={selectedDelivery === '1' || !selectedDelivery ? null : 3}
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
