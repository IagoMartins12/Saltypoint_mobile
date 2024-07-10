import React from 'react';
import {Dimensions, Modal, StyleSheet, View} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import useTheme from '../../../hooks/useTheme';
import {COLORS} from '../../../theme/theme';
import {ModalProps} from '../ForgetPasswordModal';
import ModalIcon from '../ModalIcon';
import MyText from '../../Text';
import useGlobalStore from '../../../hooks/store/useGlobalStore';
import ClosedAnimation from '../../Lottie/ClosedAnimation';

const NotOpenModal: React.FC<ModalProps> = ({
  modalOpen,
  setModalOpen,
  hideModal,
  translateY,
}) => {
  const {currentTheme} = useTheme();
  const {generalData} = useGlobalStore();
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  const handleOverlayPress = () => {
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
            <View>
              <View
                style={{
                  height: '50%',
                }}>
                <ClosedAnimation />
              </View>

              <View
                style={{
                  height: '50%',
                  width: '90%',
                  marginVertical: 'auto',
                  gap: 5,
                }}>
                <MyText style={styles.title}>Oops!</MyText>

                <MyText style={styles.subtitle}>
                  Nesse momento, não estamos atendendo.
                </MyText>

                <View style={{bottom: 10}}>
                  {generalData?.isOpening === true ? (
                    <>
                      <MyText style={styles.subtitle}>
                        Nosso horario de atendimento é das{' '}
                      </MyText>
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 15,
                        }}>
                        <MyText style={styles.subtitle2}>
                          {' '}
                          {generalData?.openingHours}
                        </MyText>

                        <MyText style={styles.subtitle2}>as </MyText>
                        <MyText style={styles.subtitle2}>
                          {' '}
                          {generalData?.closingHours.replace('24', '00')}
                        </MyText>
                      </View>
                    </>
                  ) : (
                    <MyText style={styles.subtitle}>
                      Estamos passando por manutenção, pedimos que aguarde ou
                      entre em contato com algum dos nossos numeros
                    </MyText>
                  )}
                </View>
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
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  modalContainer: {
    width: '95%',
    alignSelf: 'center',
    height: Dimensions.get('window').height * 0.58,
    borderRadius: 20,
    alignItems: 'center',
    gap: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  textBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  subtitle: {
    width: '100%',
    fontWeight: '300',
    fontSize: 18,
    textAlign: 'center',
  },

  subtitle2: {
    fontWeight: '500',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default NotOpenModal;
