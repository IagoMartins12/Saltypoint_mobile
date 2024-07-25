import React, {useState} from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {useForm} from 'react-hook-form';
import StyledInputComponent from '../../Input';
import useTheme from '../../../hooks/useTheme';
import {BORDERRADIUS, COLORS} from '../../../theme/theme';
import ModalIcon from '../ModalIcon';
import MyText from '../../Text';
import {updatedPassword} from '../../../services';
import LoadingIndicator from '../../Loading';
import useShowToast from '../../../hooks/customHooks/useShowToast';

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
  const [loading, setLoading] = useState(false);

  const {currentTheme} = useTheme();
  const {control, handleSubmit} = useForm();
  const {showToast} = useShowToast();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  const handleOverlayPress = () => {
    hideModal();
    setTimeout(() => setModalOpen(!modalOpen), 300);
  };

  const onSubmit = async (data: any) => {
    if (data.newPassword !== data.confirmNewPassword)
      return showToast('As senhas não coincidem', 'error');
    setLoading(true);
    const object = {
      newPassword: data.newPassword,
    };

    const response = await updatedPassword(object);
    if (response.status === 200) {
      showToast('Senha alterada com sucesso', 'success');
      setLoading(false);
      return handleOverlayPress();
    } else {
      setLoading(false);
      return showToast(response.data.message, 'error');
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="none" transparent={true} visible={modalOpen}>
        <Pressable style={styles.overlay} onPress={handleOverlayPress}>
          <Animated.View
            style={[
              styles.modalContainer,
              animatedStyle,
              {
                backgroundColor:
                  currentTheme === 'light'
                    ? COLORS.backgroundColorLight
                    : COLORS.backgroundColorDark,
                zIndex: 9999,
              },
            ]}
            onStartShouldSetResponder={() => true}
            onResponderStart={e => e.stopPropagation()}>
            <ModalIcon handleOverlayPress={handleOverlayPress} height="15%" />

            <View style={styles.contentDiv}>
              <View style={{gap: 20}}>
                <StyledInputComponent
                  control={control}
                  name="newPassword"
                  placeholder="Nova senha: "
                  icon="asterisk"
                  isPassword
                />
                <StyledInputComponent
                  control={control}
                  name="confirmNewPassword"
                  placeholder="Confirme a nova senha: "
                  icon="asterisk"
                  isPassword
                />
                <TouchableOpacity
                  onPress={handleSubmit(onSubmit)}
                  style={styles.buttonStyle}>
                  {loading ? (
                    <LoadingIndicator />
                  ) : (
                    <MyText
                      style={{
                        color: '#FFFFFF',
                        paddingRight: 10,
                        fontSize: 16,
                      }}>
                      Redefinir senha
                    </MyText>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </Pressable>
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
  buttonStyle: {
    width: Dimensions.get('screen').width / 1.25,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryRedHex,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ForgetPasswordModal;
