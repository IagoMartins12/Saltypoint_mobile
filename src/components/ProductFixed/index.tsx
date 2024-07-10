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
import SlidingCounter from '../SlidingCounter';
import LoadingIndicator from '../Loading';

interface CartTotalProps {
  onPress?: () => void;
  quantity?: number;
  value?: number;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  disabled: boolean;
  loading?: boolean;
}

const ProductFixed: React.FC<CartTotalProps> = ({
  onPress,
  decreaseQuantity,
  increaseQuantity,
  quantity,
  value,
  disabled,
  loading,
}) => {
  const renderContinueButton = () => (
    <TouchableOpacity
      style={[
        styles.buttonView,
        {
          backgroundColor: disabled ? '#cccccc' : COLORS.secondaryRed,
          width: '65%',
        },
      ]}
      onPress={onPress}
      disabled={disabled}>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <CustomIcon name="plus" size={20} pack="Feather" />
          <MyText style={styles.buttonText}>Adicionar</MyText>
          <MyText style={styles.buttonText}> • </MyText>
          <MyText style={styles.buttonText}> R$ {value.toFixed(2)}</MyText>
        </>
      )}
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
        <Pressable
          style={[
            styles.quantityBox,
            {
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            },
          ]}
          onPress={decreaseQuantity}>
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

        <Pressable
          style={[
            styles.quantityBox,
            {
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
            },
          ]}
          onPress={increaseQuantity}>
          <CustomIcon name="plus" size={17} color="#000" pack="Feather" />
        </Pressable>
      </View>

      {/* <SlidingCounter /> */}
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
    borderRadius: 10,
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
