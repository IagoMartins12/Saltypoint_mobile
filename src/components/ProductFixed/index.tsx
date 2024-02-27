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
      <CustomIcon name="plus" size={20} color="#FFFFFF" pack="Feather" />
      <MyText style={styles.buttonText}>Adicionar</MyText>
      <MyText style={styles.buttonText}> • </MyText>
      <MyText style={styles.buttonText}> R$ {value.toFixed(2)}</MyText>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.totalView, global.shadow]}>
      {renderContinueButton()}
      <View style={styles.quantityView}>
        <Pressable style={styles.quantityBox} onPress={decreaseQuantity}>
          <CustomIcon name="minus" size={17} color="#000" pack="Feather" />
        </Pressable>

        <View style={styles.quantityBox}>
          <MyText>{quantity}</MyText>
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
    backgroundColor: '#FFFFFF',
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

  quantityView: {
    flexDirection: 'row',
    color: COLORS.primaryGreyHex,
    borderRadius: 10,
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
