import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {ModalProps} from '../ForgetPasswordModal';
import {COLORS} from '../../../theme/theme';
import MyText from '../../Text';
import EmptyAnimation from '../../Lottie/EmptyAnimation';
import RewardCardHorizontal from '../../RewardCardHorizontal';
import OptionsTittle from '../../OptionsTittle';
import useTheme from '../../../hooks/useTheme';
import ModalIcon from '../ModalIcon';
import usePrivateStore from '../../../hooks/store/usePrivateStore';
import {
  Cart_product,
  Discount_cupom,
  User_Rewards,
} from '../../../types/ModelsType';
import useCurrrentCode from '../../../hooks/reward';
import CouponCardSelected from '../../CouponCardSelected';
import useShowToast from '../../../hooks/customHooks/useShowToast';
import ToastComponent from '../../Message';
import useToast from '../../../hooks/useToast';

const options = [
  {
    name: 'Cupons',
  },
  {
    name: 'Recompensas',
  },
];

const CouponsModal: React.FC<ModalProps> = ({
  modalOpen,
  setModalOpen,
  hideModal,
  translateY,
}) => {
  const [filteredCoupons, setFilteredCoupons] = useState<Discount_cupom[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedOption, setSelectedOption] = useState(0);

  const {isOpen, onClose} = useToast();

  const {currentCode, setCurrentCode} = useCurrrentCode();
  const {currentTheme} = useTheme();
  const {coupons, userReward, cart_product, setCart_product} =
    usePrivateStore();

  const {showToast} = useShowToast();

  const getHiddenCoupons = () => {
    const hiddenCoupon = coupons.find(
      (c: Discount_cupom) => c.cupom_name === searchText,
    );

    if (hiddenCoupon) {
      const alreadyExists = filteredCoupons.find(
        (c: Discount_cupom) => c.id === hiddenCoupon.id,
      );

      if (alreadyExists) return;

      const newArr = [...filteredCoupons, hiddenCoupon];
      setFilteredCoupons(newArr);
      showToast('Cupom Resgatado', 'success');
      return;
    }

    showToast('Cupom não encontrado', 'error');
    return;
  };
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  const handleOverlayPress = () => {
    hideModal();
    setTimeout(() => setModalOpen(!modalOpen), 300);
    setSearchText('');
  };

  const renderNullCard = (
    <TouchableOpacity
      onPress={() => {
        setCurrentCode(null);
        if (selectedOption === 1) {
          const filteredCart = cart_product.filter(
            (p: Cart_product) => p.observation !== 'Recompensa',
          );
          setCart_product(filteredCart);
        }
      }}
      style={[
        styles.container,
        {
          borderColor: !currentCode
            ? COLORS.secondaryRed
            : currentTheme === 'dark'
            ? COLORS.borderColorDark
            : COLORS.borderColorLight,
        },
      ]}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../assets/coupon.png')}
          style={styles.image}
        />
      </View>

      <View
        style={{
          alignItems: 'flex-start',
          justifyContent: 'center',
          width: '60%',
          gap: 10,
        }}>
        <View style={styles.rewardNameContainer}>
          {selectedOption === 0 ? (
            <MyText style={styles.rewardName}>Sem cupom </MyText>
          ) : (
            <MyText style={styles.rewardName}>Sem recompensa </MyText>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    const filteredCoup = coupons.filter(
      (coupon: Discount_cupom) => coupon.type_coupon === 0,
    );

    setFilteredCoupons(filteredCoup);
  }, []);
  return (
    <View style={styles.centeredView}>
      <Modal animationType="none" transparent={true} visible={modalOpen}>
        <View style={styles.overlay}>
          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: 'center',
            }}
            style={[
              styles.modalContainer,
              animatedStyle,
              {
                backgroundColor:
                  currentTheme === 'light'
                    ? COLORS.backgroundColorLight
                    : COLORS.backgroundColorDark,
              },
            ]}>
            <ToastComponent isOpen={isOpen} onClose={onClose} />
            <ModalIcon handleOverlayPress={handleOverlayPress} height="5%" />
            <View
              style={{
                width: '100%',
                marginTop: 30,
              }}>
              <OptionsTittle
                options={options}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
              <View
                style={{
                  height: Dimensions.get('screen').height * 0.9,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TextInput
                    placeholder={
                      selectedOption === 0
                        ? 'Código do cupom'
                        : 'Código da recompensa'
                    }
                    style={[
                      styles.inputStyle,
                      {
                        color:
                          currentTheme === 'dark'
                            ? COLORS.textColorDark
                            : COLORS.textColorLight,
                        borderColor:
                          currentTheme === 'dark'
                            ? COLORS.borderColorDark
                            : COLORS.borderColorLight,
                      },
                    ]}
                    value={searchText}
                    onChangeText={ev => setSearchText(ev)}
                    placeholderTextColor={
                      currentTheme === 'dark'
                        ? COLORS.textColorDark
                        : COLORS.textColorLight
                    }
                  />
                  <MyText
                    onPress={getHiddenCoupons}
                    style={{
                      color: searchText
                        ? COLORS.secondaryRed
                        : currentTheme === 'light'
                        ? COLORS.textColorLight
                        : COLORS.textColorDark,
                    }}>
                    Adicionar
                  </MyText>
                </View>
                <View style={styles.cardView}>
                  {selectedOption === 0 ? (
                    <>
                      {filteredCoupons.length > 0 ? (
                        <View style={{gap: 15, flex: 1}}>
                          {renderNullCard}
                          {filteredCoupons.map((c, i) => (
                            <CouponCardSelected key={i} coupon={c} />
                          ))}
                        </View>
                      ) : (
                        <EmptyAnimation text="Você não possui nenhum cupom disponivel" />
                      )}
                    </>
                  ) : (
                    <>
                      {userReward.length > 0 ? (
                        <View style={{gap: 15, flex: 1}}>
                          {renderNullCard}
                          {userReward.map((r: User_Rewards, i) => (
                            <RewardCardHorizontal key={i} reward={r} />
                          ))}
                        </View>
                      ) : (
                        <EmptyAnimation text="Você não possui nenhuma recompensa disponivel" />
                      )}
                    </>
                  )}
                </View>
              </View>
            </View>
          </Animated.ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    paddingBottom: 80,
  },
  iconStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 35,
    backgroundColor: '#f0efef',
    borderRadius: 100,
    top: 15,
    left: 20,
    position: 'absolute',
  },
  cardView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginHorizontal: 20,
    marginTop: 20,
    justifyContent: 'center',
  },
  inputStyle: {
    padding: 10,
    borderWidth: 0.5,
    width: '65%',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  container: {
    height: Dimensions.get('screen').height / 8,
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
  },
  imageContainer: {
    width: '35%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: '90%',
    height: '90%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  rewardNameContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rewardName: {
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default CouponsModal;
