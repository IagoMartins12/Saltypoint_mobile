import React from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomIcon from '../../CustomIcon';
import {useForm} from 'react-hook-form';
import StyledInputComponent from '../../Input';
import LargeButton from '../../Button';

export interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
  hideModal: () => void;
  translateY: Animated.SharedValue<number>;
}

const ForgetPasswordModal: React.FC<ModalProps> = ({
  modalOpen,
  setModalOpen,
  hideModal,
  translateY,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });
  const {control, handleSubmit} = useForm();
  const onSubmit = (data: any) => console.log(data);
  const handleOverlayPress = (e: GestureResponderEvent) => {
    // Clique fora do modal, executa o hideModal
    hideModal();
    setTimeout(() => setModalOpen(!modalOpen), 300);
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="none" transparent={true} visible={modalOpen}>
        <View style={styles.overlay}>
          <Animated.View style={[styles.modalContainer, animatedStyle]}>
            <Pressable
              onPress={handleOverlayPress}
              style={{
                width: '100%',
                height: '15%',
                position: 'relative',
              }}>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 35,
                  width: 35,
                  backgroundColor: '#f0efef',
                  borderRadius: 100,
                  top: 15,
                  left: 20,
                  position: 'absolute',
                }}>
                <CustomIcon
                  name="arrow-down"
                  size={20}
                  pack="SimpleLineIcons"
                />
              </TouchableOpacity>
            </Pressable>
            <View
              style={{
                paddingTop: 15,
                justifyContent: 'center',
                alignItems: 'center',
                width: '90%',
                height: '60%',
              }}>
              <View style={{gap: 20}}>
                <StyledInputComponent
                  control={control}
                  name="password"
                  placeholder="Senha: "
                  icon="asterisk"
                  isPassword
                />
                <StyledInputComponent
                  control={control}
                  name="newPassword"
                  placeholder="Nova senha: "
                  icon="asterisk"
                  isPassword
                />
                <LargeButton
                  handleSubmit={handleSubmit}
                  onSubmit={onSubmit}
                  text="Redefinir senha"
                />
              </View>
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
    height: Dimensions.get('window').height * 0.4,
    backgroundColor: '#ffffff',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    alignItems: 'center',
    gap: 20,
  },
  modalView: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    padding: 35,
    zIndex: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ForgetPasswordModal;
