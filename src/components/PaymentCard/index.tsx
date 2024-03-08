import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {BORDERRADIUS, COLORS, FONTSIZE} from '../../theme/theme';
import MyText from '../Text';
import {Type_Pagament} from '../../types/ModelsType';
import useTheme from '../../hooks/useTheme';

interface PaymentCardProps {
  typePagament: Type_Pagament;
  icon: JSX.Element;
  active?: string;
  setActive?: (id: string) => void;
  showModal?: (currentTarget: 'Address' | 'Cellphone' | 'Pix') => void;
}

const PaymentCard: React.FC<PaymentCardProps> = ({
  typePagament,
  icon,
  active,
  setActive,
  showModal,
}) => {
  const {currentTheme} = useTheme();
  const isActive = active === typePagament.id;
  const borderStyle = isActive
    ? {borderColor: COLORS.secondaryRed, borderWidth: 1.25}
    : {
        borderColor:
          currentTheme === 'dark'
            ? COLORS.borderColorDark
            : COLORS.borderColorLight,
        borderWidth: 1,
      };

  const onPressHandler = () => {
    if (setActive) setActive(typePagament.id);
  };

  return (
    <TouchableOpacity
      style={[styles.mainContainer, borderStyle]}
      onPress={() => {
        onPressHandler();
        if (typePagament.type_pagament_name.toUpperCase() === 'PIX') {
          showModal('Pix');
        }
      }}
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
