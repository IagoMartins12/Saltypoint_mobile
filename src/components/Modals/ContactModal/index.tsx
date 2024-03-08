import React from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomIcon from '../../CustomIcon';
import {ModalProps} from '../ForgetPasswordModal';
import {COLORS, FONTSIZE} from '../../../theme/theme';
import useTheme from '../../../hooks/useTheme';
import MyText from '../../Text';
import ModalIcon from '../ModalIcon';

const ContactModal: React.FC<ModalProps> = ({
  modalOpen,
  setModalOpen,
  hideModal,
  translateY,
}) => {
  const {currentTheme} = useTheme();
  //@ts-ignore
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

            <View
              style={{
                paddingTop: 15,
                width: '100%',
              }}>
              <View style={{gap: 20}}>
                <View style={{gap: 10}}>
                  <MyText style={styles.textTitle}>Whatsapp</MyText>

                  <View style={[styles.boxInfo]}>
                    <View style={styles.iconContainer}>
                      <View
                        style={[
                          styles.iconBox,
                          {
                            backgroundColor:
                              currentTheme === 'light'
                                ? COLORS.iconBgLight
                                : COLORS.iconBgDark,
                          },
                        ]}>
                        <CustomIcon
                          name="whatsapp"
                          size={18}
                          pack="MaterialCommunityIcons"
                        />
                      </View>

                      <MyText style={styles.textNumber}>
                        (11) 98859-8530{' '}
                      </MyText>
                    </View>

                    <MyText style={styles.textAction}>Iniciar chat</MyText>
                  </View>
                </View>

                <View style={{gap: 10}}>
                  <MyText style={styles.textTitle}>Telefone</MyText>

                  <View style={{gap: 5}}>
                    <View style={[styles.boxInfo]}>
                      <View style={styles.iconContainer}>
                        <View
                          style={[
                            styles.iconBox,
                            {
                              backgroundColor:
                                currentTheme === 'light'
                                  ? COLORS.iconBgLight
                                  : COLORS.iconBgDark,
                            },
                          ]}>
                          <CustomIcon
                            name="phone"
                            size={18}
                            pack="SimpleLineIcons"
                          />
                        </View>

                        <MyText style={styles.textNumber}>
                          {' '}
                          (11) 3943-3038{' '}
                        </MyText>
                      </View>

                      <MyText style={styles.textAction}>Ligar agora</MyText>
                    </View>

                    <View style={[styles.boxInfo]}>
                      <View style={styles.iconContainer}>
                        <View
                          style={[
                            styles.iconBox,
                            {
                              backgroundColor:
                                currentTheme === 'light'
                                  ? COLORS.iconBgLight
                                  : COLORS.iconBgDark,
                            },
                          ]}>
                          <CustomIcon
                            name="phone"
                            size={18}
                            pack="SimpleLineIcons"
                          />
                        </View>

                        <MyText style={styles.textNumber}>
                          {' '}
                          (11) 3943-3038{' '}
                        </MyText>
                      </View>

                      <MyText style={styles.textAction}>Ligar agora</MyText>
                    </View>
                  </View>
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
    justifyContent: 'flex-end',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    width: '100%',
    height: Dimensions.get('window').height * 0.5,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    alignItems: 'center',
    gap: 20,
  },
  iconStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 35,
    borderRadius: 100,
    top: 15,
    left: 20,
    position: 'absolute',
  },

  iconContainer: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  iconBox: {
    width: 33,
    height: 33,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1000,
    backgroundColor: '#f5f5f5',
  },
  boxInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  textTitle: {
    fontSize: FONTSIZE.size_16,
    fontWeight: '600',
    paddingHorizontal: 20,
  },
  textAction: {
    fontSize: FONTSIZE.size_14,
    textDecorationLine: 'underline',
    fontWeight: '500',
  },

  textNumber: {},
});

export default ContactModal;
