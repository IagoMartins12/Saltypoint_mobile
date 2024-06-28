import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MyText from '../../Text';
import {BORDERRADIUS, COLORS} from '../../../theme/theme';
import {global} from '../../../style';
import useTheme from '../../../hooks/useTheme';
import usePrivateStore from '../../../hooks/store/usePrivateStore';
import {User_Rewards} from '../../../types/ModelsType';
import {
  getAddressInfo,
  getCartTotalLenght,
  getTaxa,
  getTotal,
} from '../../../utils';
import useCurrrentCode from '../../../hooks/reward';
import useGlobalStore from '../../../hooks/store/useGlobalStore';
import LoadingIndicator from '../../Loading';

interface CartTotalProps {
  onPress?: () => void;
  title?: string;
  lastStep?: boolean;
  deliveryFee?: number;
  loading?: boolean;
}

const CartTotalFixed: React.FC<CartTotalProps> = ({
  onPress,
  title,
  lastStep,
  deliveryFee,
  loading,
}) => {
  const {currentTheme} = useTheme();
  const {generalData} = useGlobalStore();
  const {cart_product, address, user} = usePrivateStore();
  const cartProductLength = getCartTotalLenght(cart_product);
  const {currentCode} = useCurrrentCode();

  const taxa = deliveryFee
    ? getTaxa(getAddressInfo(address, user)?.district)
      ? generalData?.deliveryFeeOutside
      : generalData?.deliveryFeeInside
    : null;

  const isCoupon = !(currentCode as User_Rewards)?.rewardPoints;
  const isReward = !!(currentCode as User_Rewards)?.rewardPoints;

  const renderContinueButton = () => (
    <TouchableOpacity style={styles.buttonView} onPress={onPress}>
      <Text style={styles.buttonText}>Continuar</Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        styles.totalView,
        global.shadow,
        {
          backgroundColor:
            currentTheme === 'dark'
              ? COLORS.cardColorDark
              : COLORS.cardColorLight,
        },
      ]}>
      {lastStep ? (
        <TouchableOpacity
          style={[styles.lastButton]}
          onPress={() => {
            onPress();
          }}>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <>
              <MyText style={styles.buttonText}>
                Finalizar pedido • R${' '}
                {getTotal(
                  cart_product,
                  currentCode,
                  isCoupon,
                  isReward,
                  deliveryFee,
                ).toFixed(2)}
              </MyText>
            </>
          )}
        </TouchableOpacity>
      ) : (
        renderContinueButton()
      )}
      {!lastStep && (
        <View>
          <MyText style={styles.subTitleTotal}>{title}</MyText>
          <MyText style={styles.titleTotal}>
            R${' '}
            {getTotal(
              cart_product,
              currentCode,
              isCoupon,
              isReward,
              taxa,
            ).toFixed(2)}
            <MyText style={styles.subTitleTotal}>
              {' '}
              / {cartProductLength} itens
            </MyText>
          </MyText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  totalView: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row-reverse',
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
  buttonView: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.secondaryRed,
  },
  lastButton: {
    width: '100%',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.secondaryRed,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default CartTotalFixed;
