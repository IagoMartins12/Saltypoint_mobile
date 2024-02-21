import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomIcon from '../CustomIcon';
import {COLORS} from '../../theme/theme';
import React from 'react';
import MyText from '../Text';

interface AddressProps {
  icon: JSX.Element;
  cellphone?: string;
  showModal: (currentTarget: 'Address' | 'Cellphone') => void;
}
const CartCellphoneCard: React.FC<AddressProps> = ({
  icon,
  cellphone,
  showModal,
}) => {
  return (
    <View style={styles.addressItem}>
      <View style={styles.iconContainer}>{icon}</View>

      <View style={styles.textContainer}>
        <MyText style={styles.addressType}>Telefone para contato</MyText>
        {cellphone ? (
          <MyText style={styles.addressText}>{cellphone}</MyText>
        ) : (
          <MyText
            style={[
              styles.addressText,
              {
                textDecorationLine: 'underline',
              },
            ]}>
            Cadastre um telefone
          </MyText>
        )}
      </View>

      <Pressable
        onPress={() => {
          showModal('Cellphone');
        }}>
        <CustomIcon
          name="pencil-outline"
          color="#000000"
          pack="MaterialCommunityIcons"
          size={20}
        />
      </Pressable>
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
  },
  addressText: {
    fontSize: 14,
    color: COLORS.primaryBlackHex,
    fontWeight: '400',
  },
});
export default CartCellphoneCard;
