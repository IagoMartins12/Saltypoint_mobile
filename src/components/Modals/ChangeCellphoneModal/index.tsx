import React, {useEffect} from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {useForm} from 'react-hook-form';
import useTheme from '../../../hooks/useTheme';
import {BORDERRADIUS, COLORS} from '../../../theme/theme';
import ModalIcon from '../ModalIcon';
import MyText from '../../Text';
import usePrivateStore from '../../../hooks/store/usePrivateStore';
import PhoneInput from '../../PhoneInput';
import {User} from '../../../types/ModelsType';
import {updatedMe} from '../../../services';
import useShowToast from '../../../hooks/customHooks/useShowToast';

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
  const {currentTheme} = useTheme();
  const {user, setUser} = usePrivateStore();
  const {control, handleSubmit, setValue} = useForm();
  const {showToast} = useShowToast();
  const setUserWithCallback = (callback: (user: User) => User) => {
    if (!user) return;

    const updatedUser = callback(user);

    setUser(updatedUser);
  };

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
    if (data.phone.length !== 15 && data.phone)
      return showToast('Insira um numero valido', 'error');

    try {
      await updatedMe({
        phone: data.phone,
      });

      setUserWithCallback(oldUser => ({
        ...oldUser,
        phone: data.phone,
      }));

      showToast('Perfil atualizado com sucesso!', 'success');
      handleOverlayPress();
    } catch (error) {
      // Handle errors here
      console.error(error);
      showToast('Erro ao atualizar o perfil.', 'error');
    }
  };

  useEffect(() => {
    setValue('phone', user.phone);
  }, [user]);

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
                <PhoneInput
                  control={control}
                  name="phone"
                  placeholder="Telefone: "
                />
                <TouchableOpacity
                  onPress={handleSubmit(onSubmit)}
                  style={styles.buttonStyle}>
                  <MyText style={{color: '#FFFFFF', paddingRight: 10}}>
                    Atualizar
                  </MyText>
                </TouchableOpacity>
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

  buttonStyle: {
    width: Dimensions.get('screen').width / 1.25,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryRedHex,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChangeCellphoneModal;
