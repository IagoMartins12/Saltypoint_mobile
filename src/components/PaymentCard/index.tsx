import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BORDERRADIUS, COLORS, FONTSIZE} from '../../theme/theme';
import MyText from '../Text';
import {Type_Pagament} from '../../types/ModelsType';

interface PaymentCardProps {
  typePagament: Type_Pagament;
  active: string;
  setActive: (id: string) => void;
  icon: JSX.Element;
}
const PaymentCard: React.FC<PaymentCardProps> = ({
  active,
  setActive,
  typePagament,
  icon,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.mainContainer,
        {
          borderColor:
            active === typePagament.id ? COLORS.secondaryRed : 'black',
          borderWidth: active === typePagament.id ? 1 : 0.75,
        },
      ]}
      onPress={() => {
        setActive(typePagament.id);
      }}>
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
    borderWidth: 1.25,
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
