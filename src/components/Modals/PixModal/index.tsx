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
import useTheme from '../../../hooks/useTheme';
import {COLORS} from '../../../theme/theme';
import {ModalProps} from '../ForgetPasswordModal';
import ModalIcon from '../ModalIcon';
import MyText from '../../Text';
import useGlobalStore from '../../../hooks/store/useGlobalStore';

const PixModal: React.FC<ModalProps> = ({
  modalOpen,
  setModalOpen,
  hideModal,
  translateY,
}) => {
  const {currentTheme} = useTheme();
  const {generalData} = useGlobalStore();
  // const {  } = useGlobalStore()
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  const handleOverlayPress = () => {
    // Clique fora do modal, executa o hideModal
    hideModal();
    setTimeout(() => setModalOpen(!modalOpen), 300);
  };

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
            <ModalIcon handleOverlayPress={handleOverlayPress} height="10%" />

            <View style={{width: '90%', marginHorizontal: 'auto', gap: 20}}>
              <MyText style={styles.title}>
                Para compras com pix, necessitamos que o cliente envie o
                comprovante da transação em nosso whatsapp:
              </MyText>

              <View style={styles.textBox}>
                <MyText style={styles.subtitle}>Chave pix:</MyText>
                <MyText style={styles.subtitle2}>{generalData?.pixKey}</MyText>
              </View>

              <View style={styles.textBox}>
                <MyText style={styles.subtitle}>Nome da chave:</MyText>
                <MyText style={styles.subtitle2}>{generalData?.pixName}</MyText>
              </View>

              <View style={styles.textBox}>
                <MyText style={styles.subtitle}>Whatsapp:</MyText>
                <MyText style={styles.subtitle2}>
                  {generalData?.cellphone}
                </MyText>
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
    height: Dimensions.get('window').height * 0.45,
    backgroundColor: '#ffffff',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    alignItems: 'center',
    gap: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  textBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  subtitle: {
    width: '50%',
    fontWeight: '300',
    fontSize: 18,
  },

  subtitle2: {
    width: '50%',
    fontWeight: '500',
    fontSize: 18,
  },
});

export default PixModal;
