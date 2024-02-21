import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../theme/theme';
import {userOptions} from '../CartAddressCard';

interface SelectButtonProps {
  address: userOptions;
  selectedDelivery: string;
  setSelectedDelivery: (id: string) => void;
}
const SelectButton: React.FC<SelectButtonProps> = ({
  address,
  selectedDelivery,
  setSelectedDelivery,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.roundedButton,
        {
          backgroundColor:
            selectedDelivery === address.id
              ? COLORS.secondaryRed
              : COLORS.primaryGray,
        },
      ]}
      onPress={() => {
        setSelectedDelivery(address.id);
      }}>
      <View
        style={[
          styles.insideRoundedButton,
          {
            backgroundColor:
              selectedDelivery === address.id ? '#ffffff' : COLORS.primaryGray,
          },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  roundedButton: {
    width: 25,
    height: 25,
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondaryRed,
  },

  insideRoundedButton: {
    width: 10,
    height: 10,
    borderRadius: 1000,
  },
});

export default SelectButton;
