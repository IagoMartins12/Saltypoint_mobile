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

const ContactModal: React.FC<ModalProps> = ({
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
                height: '10%',
                position: 'relative',
              }}>
              <TouchableOpacity style={styles.iconStyle}>
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
                width: '100%',
              }}>
              <View style={{gap: 20}}>
                <View style={{gap: 10}}>
                  <Text style={styles.textTitle}>Whatsapp</Text>

                  <View style={[styles.boxInfo]}>
                    <View style={styles.iconContainer}>
                      <View style={styles.iconBox}>
                        <CustomIcon
                          name="whatsapp"
                          size={18}
                          pack="MaterialCommunityIcons"
                          color={COLORS.primaryBlackHex}
                        />
                      </View>

                      <Text style={styles.textNumber}>(11) 98859-8530 </Text>
                    </View>

                    <Text style={styles.textAction}>Iniciar chat</Text>
                  </View>
                </View>

                <View style={{gap: 10}}>
                  <Text style={styles.textTitle}>Telefone</Text>

                  <View style={{gap: 5}}>
                    <View style={[styles.boxInfo]}>
                      <View style={styles.iconContainer}>
                        <View style={styles.iconBox}>
                          <CustomIcon
                            name="phone"
                            size={18}
                            pack="SimpleLineIcons"
                            color={COLORS.primaryBlackHex}
                          />
                        </View>

                        <Text style={styles.textNumber}> (11) 3943-3038 </Text>
                      </View>

                      <Text style={styles.textAction}>Ligar agora</Text>
                    </View>

                    <View style={[styles.boxInfo]}>
                      <View style={styles.iconContainer}>
                        <View style={styles.iconBox}>
                          <CustomIcon
                            name="phone"
                            size={18}
                            pack="SimpleLineIcons"
                            color={COLORS.primaryBlackHex}
                          />
                        </View>

                        <Text style={styles.textNumber}> (11) 3943-3038 </Text>
                      </View>

                      <Text style={styles.textAction}>Ligar agora</Text>
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
    backgroundColor: '#fffbfb',
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
    backgroundColor: '#f0efef',
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
    backgroundColor: '#ffffff',
  },

  textTitle: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryBlackHex,
    fontWeight: '600',
    paddingHorizontal: 20,
  },
  textAction: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlackHex,
    textDecorationLine: 'underline',
    fontWeight: '500',
  },

  textNumber: {
    color: COLORS.primaryBlackHex,
  },
});

export default ContactModal;
