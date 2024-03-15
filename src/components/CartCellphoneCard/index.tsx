import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomIcon from '../CustomIcon';
import React from 'react';
import MyText from '../Text';

interface AddressProps {
  icon: JSX.Element;
  cellphone?: string | null;
  showModal?: (currentTarget: 'Address' | 'Cellphone') => void;
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
            onPress={() => {
              showModal('Cellphone');
            }}
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

      {showModal ? (
        <Pressable
          onPress={() => {
            showModal('Cellphone');
          }}>
          <CustomIcon
            name="pencil-outline"
            pack="MaterialCommunityIcons"
            size={20}
          />
        </Pressable>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
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
    fontWeight: '400',
  },
});
export default CartCellphoneCard;
