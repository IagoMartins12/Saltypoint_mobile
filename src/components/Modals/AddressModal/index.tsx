import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import CustomIcon from '../../CustomIcon';
import {ModalProps} from '../ForgetPasswordModal';
import MyText from '../../Text';
import EmptyAnimation from '../../Lottie/EmptyAnimation';
import AddressCardSelected from '../../AddressCardSelected';
import useTheme from '../../../hooks/useTheme';
import {COLORS} from '../../../theme/theme';
import ModalIcon from '../ModalIcon';
import usePrivateStore from '../../../hooks/store/usePrivateStore';
import {User_Adress} from '../../../types/ModelsType';

interface AddressModalProps extends ModalProps {
  addAddress: () => void;
}
const AddressModal: React.FC<AddressModalProps> = ({
  modalOpen,
  setModalOpen,
  hideModal,
  translateY,
  addAddress,
}) => {
  const [selectedAddress, setSelectedAddress] = useState<null | string>(null);
  const {address, user} = usePrivateStore();
  const {currentTheme} = useTheme();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    } as Animated.AnimateStyle<ViewStyle>;
  });

  const handleOverlayPress = () => {
    hideModal();
    setTimeout(() => setModalOpen(!modalOpen), 300);
  };

  const filtedAddress = address.filter(
    (address: User_Adress) => address.isActive === 0,
  );

  useEffect(() => {
    setSelectedAddress(user.user_Adress_id);
  }, [user.user_Adress_id]);
  // Estilo animado para o modal

  return (
    <View style={styles.centeredView}>
      <Modal animationType="none" transparent={true} visible={modalOpen}>
        <View style={styles.overlay}>
          <Animated.View
            style={[
              styles.modalContainer,
              animatedStyle,
              {
                backgroundColor:
                  currentTheme === 'light'
                    ? COLORS.backgroundColorLight
                    : COLORS.backgroundColorDark,
              },
            ]}>
            <ModalIcon handleOverlayPress={handleOverlayPress} height="5%" />
            <View style={{width: '100%', marginTop: 30}}>
              {filtedAddress.length > 0 ? (
                <ScrollView>
                  <View
                    style={{flexDirection: 'row', alignItems: 'center'}}></View>
                  <View style={{gap: 15, marginHorizontal: 20, marginTop: 10}}>
                    {filtedAddress.map((op, i) => (
                      <AddressCardSelected
                        address={op}
                        selectedAddress={selectedAddress}
                        setSelectedAddress={setSelectedAddress}
                        key={i}
                      />
                    ))}
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={addAddress}>
                      <CustomIcon
                        name="plus"
                        size={25}
                        color="red"
                        pack="Feather"
                      />
                      <MyText style={styles.addButtonText}>
                        Adicionar endereço
                      </MyText>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              ) : (
                <ScrollView>
                  <EmptyAnimation text="Sem endereço cadastrado" />
                </ScrollView>
              )}
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    width: '100%',
    height: Dimensions.get('screen').height * 0.9,
    backgroundColor: '#fffbfb',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    alignItems: 'center',
  },
  iconStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 35,
    backgroundColor: '#f0efef',
    borderRadius: 100,
    top: 15,
    left: 20,
    position: 'absolute',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 25,
    cursor: 'pointer',
  },
  addButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'red',
    marginLeft: 5,
  },
});

export default AddressModal;
