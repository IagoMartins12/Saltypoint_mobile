import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../theme/theme';
import React from 'react';
import MyText from '../Text';
import SelectButton from '../SelectButton';

export type userOptions = {
  id: string;
  name: string;
  address: string;
  number: string;
  district: string;
  city: string;
  uf: string;
  icon: JSX.Element;
  reference?: string;
};
interface AddressProps {
  address: userOptions;
  selectedDelivery: string;
  setSelectedDelivery: (id: string) => void;
}
const CartAddressCard: React.FC<AddressProps> = ({
  address,
  selectedDelivery,
  setSelectedDelivery,
}) => {
  return (
    <View style={styles.addressItem}>
      <View style={styles.iconContainer}>{address.icon}</View>

      <View style={styles.textContainer}>
        <MyText style={styles.addressType}>{address.name}</MyText>
        <MyText style={styles.addressText}>
          {address.address}, {address.number}
        </MyText>
        <MyText style={styles.addressText}>{address.district}</MyText>
        <MyText style={styles.addressText}>
          {address.city} / {address.uf}
        </MyText>

        {address.reference && (
          <MyText style={styles.addressText}>{address.reference}</MyText>
        )}
      </View>

      <SelectButton
        address={address}
        selectedDelivery={selectedDelivery}
        setSelectedDelivery={setSelectedDelivery}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  iconContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    width: '70%',
    flexDirection: 'column',
  },
  addressType: {
    fontWeight: '600',
    fontSize: 16,
    color: COLORS.primaryBlackHex,
  },
  addressText: {
    fontSize: 14,
    color: COLORS.primaryBlackHex,
    fontWeight: '400',
  },
});
export default CartAddressCard;
