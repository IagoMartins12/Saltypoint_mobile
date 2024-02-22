import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {BORDERRADIUS, COLORS, FONTSIZE} from '../../theme/theme';
import MyText from '../Text';
import {Type_Pagament} from '../../types/ModelsType';

interface PaymentCardProps {
  typePagament: Type_Pagament;
  active?: string;
  setActive?: (id: string) => void;
  icon: JSX.Element;
}

const PaymentCard: React.FC<PaymentCardProps> = ({
  active,
  setActive,
  typePagament,
  icon,
}) => {
  const isActive = active === typePagament.id;
  const borderStyle = isActive
    ? {borderColor: COLORS.secondaryRed, borderWidth: 0.75}
    : {borderColor: 'black', borderWidth: 0.5};

  const onPressHandler = () => {
    if (setActive) setActive(typePagament.id);
  };

  return (
    <TouchableOpacity
      style={[styles.mainContainer, borderStyle]}
      onPress={onPressHandler}
      disabled={!setActive}>
      <View style={styles.icon}>{icon}</View>
      <View style={styles.textView}>
        <MyText style={styles.textStyle}>
          {typePagament.type_pagament_name}
        </MyText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: BORDERRADIUS.radius_10,
    gap: 5,
  },
  icon: {
    width: '20%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textView: {
    width: '80%',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: FONTSIZE.size_16,
    fontWeight: '600',
  },
});

export default PaymentCard;
