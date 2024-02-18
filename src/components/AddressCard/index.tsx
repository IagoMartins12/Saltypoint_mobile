import {StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomIcon from '../CustomIcon';
import {COLORS} from '../../theme/theme';
import React from 'react';
import MyText from '../Text';

interface AddressProps {
  address: any;
  handleOpenDeleteModal: (id: string) => void;
}
const AddressCard: React.FC<AddressProps> = ({
  address,
  handleOpenDeleteModal,
}) => {
  return (
    <View style={styles.addressItem}>
      <View style={styles.iconContainer}>
        {address.type_adress === 0 ? (
          <CustomIcon name="home" size={30} color="#000000" pack="Feather" />
        ) : (
          <CustomIcon
            name="briefcase"
            size={30}
            color="#000000"
            pack="Feather"
          />
        )}
      </View>

      <View style={styles.textContainer}>
        <MyText style={styles.addressType}>
          {address.type_adress === 0 ? 'Casa' : 'Trabalho'}
        </MyText>
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

      <TouchableOpacity
        style={styles.deleteIconContainer}
        onPress={() => handleOpenDeleteModal(address.id)}>
        <CustomIcon name="trash-2" size={25} color="red" pack="Feather" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 2,
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
    fontWeight: 'bold',
    fontSize: 18,
    color: COLORS.primaryBlackHex,
  },
  addressText: {
    fontSize: 14,
    color: COLORS.primaryBlackHex,
    fontWeight: '400',
  },
  deleteIconContainer: {
    alignSelf: 'flex-end',
    width: '10%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    height: '100%',
  },
});
export default AddressCard;
