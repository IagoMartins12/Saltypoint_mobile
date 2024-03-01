import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MyText from '../Text';
import {BORDERRADIUS, COLORS} from '../../theme/theme';
import CustomIcon from '../CustomIcon';
import {global} from '../../style';
import useTheme from '../../hooks/useTheme';

interface CartTotalProps {
  onPress?: () => void;
  quantity?: number;
  value?: number;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
}

const ProductFixed: React.FC<CartTotalProps> = ({
  onPress,
  quantity,
  value,
  decreaseQuantity,
  increaseQuantity,
}) => {
  const renderContinueButton = () => (
    <TouchableOpacity style={styles.buttonView} onPress={onPress}>
      <CustomIcon name="plus" size={20} pack="Feather" />
      <MyText style={styles.buttonText}>Adicionar</MyText>
      <MyText style={styles.buttonText}> • </MyText>
      <MyText style={styles.buttonText}> R$ {value.toFixed(2)}</MyText>
    </TouchableOpacity>
  );

  const {currentTheme} = useTheme();

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
      {renderContinueButton()}
      <View style={styles.quantityView}>
        <Pressable style={styles.quantityBox} onPress={decreaseQuantity}>
          <CustomIcon name="minus" size={17} color="#000" pack="Feather" />
        </Pressable>

        <View style={styles.quantityBox}>
          <MyText
            style={{
              color: '#000000',
            }}>
            {quantity}
          </MyText>
        </View>

        <Pressable style={[styles.quantityBox]} onPress={increaseQuantity}>
          <CustomIcon name="plus" size={17} color="#000" pack="Feather" />
        </Pressable>
      </View>
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

  buttonView: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.secondaryRed,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  lastButton: {
    width: '100%',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 15,
    backgroundColor: COLORS.secondaryRed,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
  },

  quantityView: {
    flexDirection: 'row',
    color: COLORS.primaryGreyHex,
    borderRadius: 15,
  },

  quantityBox: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryGray,
  },
});

export default ProductFixed;
