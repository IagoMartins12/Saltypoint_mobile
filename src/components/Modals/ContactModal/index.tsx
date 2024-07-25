import React from 'react';
import {
  Dimensions,
  Linking,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import CustomIcon from '../../CustomIcon';
import {ModalProps} from '../ForgetPasswordModal';
import {COLORS, FONTSIZE} from '../../../theme/theme';
import useTheme from '../../../hooks/useTheme';
import MyText from '../../Text';
import ModalIcon from '../ModalIcon';
import useGlobalStore from '../../../hooks/store/useGlobalStore';

const ContactModal: React.FC<ModalProps> = ({
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

  const openWhatsAppChat = () => {
    Linking.openURL(`whatsapp://send?phone=${generalData.cellphone}`);
  };

  const openPhoneCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
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
              },
            ]}
            onStartShouldSetResponder={() => true}
            onResponderStart={e => e.stopPropagation()}>
            <ModalIcon handleOverlayPress={handleOverlayPress} height="10%" />

            <View style={{paddingTop: 15, width: '100%'}}>
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
                        {generalData.cellphone}
                      </MyText>
                    </View>

                    <MyText
                      style={styles.textAction}
                      onPress={openWhatsAppChat}>
                      Iniciar chat
                    </MyText>
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
                          {generalData.telephone}
                        </MyText>
                      </View>

                      <MyText
                        style={styles.textAction}
                        onPress={() => openPhoneCall(generalData.telephone)}>
                        Ligar agora
                      </MyText>
                    </View>

                    {generalData.telephone2 ? (
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
                            {generalData.telephone2}
                          </MyText>
                        </View>

                        <MyText
                          style={styles.textAction}
                          onPress={() => openPhoneCall(generalData.telephone2)}>
                          Ligar agora
                        </MyText>
                      </View>
                    ) : null}
                  </View>
                </View>
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
