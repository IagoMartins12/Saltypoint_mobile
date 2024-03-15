import React from 'react';
import {Dimensions, Modal, StyleSheet, View, ViewStyle} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {useForm} from 'react-hook-form';
import StyledInputComponent from '../../Input';
import LargeButton from '../../Button';
import useTheme from '../../../hooks/useTheme';
import {COLORS} from '../../../theme/theme';
import ModalIcon from '../ModalIcon';

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
  const {currentTheme} = useTheme();
  const {control, handleSubmit} = useForm();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    } as Animated.AnimateStyle<ViewStyle>;
  });

  const handleOverlayPress = () => {
    hideModal();
    setTimeout(() => setModalOpen(!modalOpen), 300);
  };

  const onSubmit = (data: any) => console.log(data);

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
            <ModalIcon handleOverlayPress={handleOverlayPress} height="15%" />

            <View style={styles.contentDiv}>
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

export default ForgetPasswordModal;
