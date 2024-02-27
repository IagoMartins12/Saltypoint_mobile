import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MyText from '../../Text';
import {BORDERRADIUS, COLORS} from '../../../theme/theme';
import {global} from '../../../style';

interface CartTotalProps {
  onPress?: () => void;
  title?: string;
  quantity?: number;
  value?: number;
  lastStep?: boolean;
}

const CartTotalFixed: React.FC<CartTotalProps> = ({
  onPress,
  quantity,
  title,
  value,
  lastStep,
}) => {
  const renderLastStep = () => (
    <TouchableOpacity style={styles.lastButton} onPress={onPress}>
      <MyText style={styles.buttonText}>Finalizar pedido </MyText>
      <MyText style={styles.buttonText}> • </MyText>

      <MyText style={styles.buttonText}> R$ {value.toFixed(2)}</MyText>
    </TouchableOpacity>
  );

  const renderContinueButton = () => (
    <TouchableOpacity style={styles.buttonView} onPress={onPress}>
      <Text style={styles.buttonText}>Continuar</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.totalView, global.shadow]}>
      {lastStep ? renderLastStep() : renderContinueButton()}
      {!lastStep && (
        <View>
          <MyText style={styles.subTitleTotal}>{title}</MyText>
          <MyText style={styles.titleTotal}>
            R$ {value.toFixed(2)}
            <MyText style={styles.subTitleTotal}> / {quantity} itens</MyText>
          </MyText>
        </View>
      )}
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
