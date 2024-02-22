import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import CustomIcon from '../../CustomIcon';
import {ModalProps} from '../ForgetPasswordModal';
import MyText from '../../Text';
import useKeyboardOpen from '../../../hooks/useKeyboardOpen';
import EmptyAnimation from '../../Lottie/EmptyAnimation';
import {userOptions} from '../../CartScreen/AddressStep';
import AddressCardSelected from '../../AddressCardSelected';

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

  const isOpen = useKeyboardOpen();

  // Altura compartilhada animada
  const modalHeight = useSharedValue(
    isOpen
      ? Dimensions.get('screen').height * 0.6
      : Dimensions.get('screen').height * 0.9,
  );

  // Atualizar a altura compartilhada animada quando o teclado for aberto/fechado
  useEffect(() => {
    modalHeight.value = withTiming(
      isOpen
        ? Dimensions.get('screen').height * 0.6
        : Dimensions.get('screen').height * 0.9,
      {duration: 150}, // Duração da animação de 150 milissegundos
    );
  }, [isOpen]);
  // Estilo animado para o modal
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
      height: modalHeight.value,
    };
  });

  const handleOverlayPress = (e: GestureResponderEvent) => {
    hideModal();
    setTimeout(() => setModalOpen(!modalOpen), 300);
  };

  const notEmpty = true;

  return (
    <View style={styles.centeredView}>
      <Modal animationType="none" transparent={true} visible={modalOpen}>
        <View style={styles.overlay}>
          <Animated.View style={[styles.modalContainer, animatedStyle]}>
            <View style={{width: '100%'}}>
              <Pressable
                style={{
                  width: '100%',
                  height: '3%',
                  position: 'relative',
                }}>
                <TouchableOpacity
                  style={styles.iconStyle}
                  onPress={handleOverlayPress}>
                  <CustomIcon
                    name="arrow-down"
                    size={20}
                    pack="SimpleLineIcons"
                  />
                </TouchableOpacity>
              </Pressable>
            </View>
            <View style={{width: '100%', marginTop: 30}}>
              {notEmpty ? (
                <ScrollView>
                  <View
                    style={{flexDirection: 'row', alignItems: 'center'}}></View>
                  <View style={{gap: 15, marginHorizontal: 20, marginTop: 10}}>
                    {/* <EmptyAnimation text="Sem cupons disponiveis" /> */}
                    {userOptions.map(op => (
                      <AddressCardSelected
                        address={op}
                        selectedAddress={selectedAddress}
                        setSelectedAddress={setSelectedAddress}
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
