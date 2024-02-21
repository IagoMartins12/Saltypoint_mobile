import React from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
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

const ChangeCellphoneModal: React.FC<ModalProps> = ({
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
  const onSubmit = (data: any) => {
    console.log('data', data);
  };
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
              style={{
                width: '100%',
                height: '15%',
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
            <View style={styles.contentDiv}>
              <View style={{gap: 20}}>
                <StyledInputComponent
                  control={control}
                  name="cellphone"
                  placeholder="Telefone "
                  icon="phone"
                  pack="MaterialIcons"
                />
                <LargeButton
                  handleSubmit={handleSubmit}
                  onSubmit={onSubmit}
                  text="Atualizar"
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
    height: Dimensions.get('window').height * 0.3,
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

  contentDiv: {
    paddingTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: '60%',
  },
});

export default ChangeCellphoneModal;
