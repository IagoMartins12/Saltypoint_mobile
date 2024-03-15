import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MyText from '../../Text';
import {BORDERRADIUS, COLORS} from '../../../theme/theme';
import {global} from '../../../style';
import useTheme from '../../../hooks/useTheme';
import usePrivateStore from '../../../hooks/store/usePrivateStore';
import {Cart_product} from '../../../types/ModelsType';

interface CartTotalProps {
  onPress?: () => void;
  title?: string;
  lastStep?: boolean;
  deliveryFee?: number;
}

const CartTotalFixed: React.FC<CartTotalProps> = ({
  onPress,
  title,
  lastStep,
  deliveryFee,
}) => {
  const {currentTheme} = useTheme();
  const {cart_product} = usePrivateStore();

  const getTotal = () => {
    let cartProductTotal = (cart_product as Cart_product[]).reduce(
      (total, item) => total + Number(item.value),
      0,
    );

    if (deliveryFee) {
      return cartProductTotal + deliveryFee;
    }

    return cartProductTotal;
  };

  const cartProductLength = (cart_product as Cart_product[]).reduce(
    (total, item) => total + Number(item.quantity),
    0,
  );

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
          <MyText style={styles.buttonText}>
            Finalizar pedido • R$ {getTotal().toFixed(2)}
          </MyText>
        </TouchableOpacity>
      ) : (
        renderContinueButton()
      )}
      {!lastStep && (
        <View>
          <MyText style={styles.subTitleTotal}>{title}</MyText>
          <MyText style={styles.titleTotal}>
            R$ {getTotal().toFixed(2)}
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
