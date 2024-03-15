import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomIcon from '../CustomIcon';
import {COLORS} from '../../theme/theme';
import React from 'react';
import MyText from '../Text';
import SelectButton from '../SelectButton';
import {updatedMe} from '../../services';
import CallToast from '../Toast';
import usePrivateStore from '../../hooks/store/usePrivateStore';
import {User} from '../../types/ModelsType';

interface AddressProps {
  address: any;
  selectedAddress: string;
  setSelectedAddress: (id: string) => void;
}
const AddressCardSelected: React.FC<AddressProps> = ({
  address,
  selectedAddress,
  setSelectedAddress,
}) => {
  const {user, setUser} = usePrivateStore();
  const {showToast} = CallToast();

  const setUserWithCallback = (callback: (user: User) => User) => {
    if (!user) return;

    const updatedUser = callback(user);

    setUser(updatedUser);
  };

  const onSubmit = async (id: string) => {
    setSelectedAddress(id);
    try {
      await updatedMe({
        user_Adress_id: id,
      });

      setUserWithCallback(oldUser => ({
        ...oldUser,
        user_Adress_id: id,
      }));
    } catch (error) {
      // Handle errors here
      console.error(error);
      showToast('Erro ao atualizar o perfil.', 'error');
    }
  };

  return (
    <View
      style={[
        styles.addressItem,
        {
          borderColor:
            selectedAddress === address.id ? COLORS.secondaryRed : 'gray',
        },
      ]}>
      <View style={styles.iconContainer}>
        {address.type_adress === 0 ? (
          <CustomIcon name="home" size={30} pack="Feather" />
        ) : (
          <CustomIcon name="briefcase" size={30} pack="Feather" />
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

      <SelectButton
        address={address}
        selectedDelivery={selectedAddress}
        setSelectedDelivery={onSubmit}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    height: Dimensions.get('screen').height / 6.5,
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
  },
  addressText: {
    fontSize: 14,
    fontWeight: '400',
  },
  deleteIconContainer: {
    width: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },

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
export default AddressCardSelected;
