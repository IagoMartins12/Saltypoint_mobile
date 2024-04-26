import React from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {BORDERRADIUS, COLORS} from '../../../theme/theme';
import useTheme from '../../../hooks/useTheme';
import MyText from '../../Text';
import ModalIcon from '../ModalIcon';
import usePrivateStore from '../../../hooks/store/usePrivateStore';

import {ModalProps} from '../ForgetPasswordModal';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const OptionsImageModal: React.FC<ModalProps> = ({
  modalOpen,
  setModalOpen,
  hideModal,
  translateY,
}) => {
  const {currentTheme} = useTheme();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  const handleOverlayPress = () => {
    hideModal();
    setTimeout(() => setModalOpen(!modalOpen), 300);
  };
  const myOPt = {
    title: 'Select Avatar',
    customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const getCamera = async () => {
    // const result = await launchCamera({
    //   mediaType: 'photo',
    // });
  };

  const getLibrary = async () => {
    // const result = await launchImageLibrary(
    //   {
    //     assetRepresentationMode: 'auto',
    //     mediaType: 'photo',
    //   },
    //   response => {
    //     console.log(response);
    //   },
    // );
  };
  const options = [
    {
      name: 'Câmera',
      color: currentTheme === 'light' ? '#0000FF' : '#1E90FF',
      onClick: () => getCamera,
    },
    {
      name: 'Galeria',
      color: currentTheme === 'light' ? '#0000FF' : '#1E90FF',
      onClick: getLibrary,
    },
    {
      name: 'Cancelar',
      color: '#E34234',
      onClick: handleOverlayPress,
    },
  ];

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
                  currentTheme === 'dark'
                    ? COLORS.backgroundColorDark
                    : COLORS.backgroundColorLight,
              },
            ]}>
            <ModalIcon handleOverlayPress={handleOverlayPress} height="10%" />

            <View style={styles.contentDiv}>
              <View style={styles.iconStyle2}>
                <MyText
                  style={{
                    fontWeight: 'bold',
                  }}>
                  Selecione
                </MyText>
                <MyText
                  style={{
                    fontWeight: '500',
                    textAlign: 'center',
                  }}>
                  Informe de onde você quer pegar a foto
                </MyText>
              </View>
              <View
                style={{
                  gap: 10,
                  width: '100%',
                }}>
                {options.map((op, i) => (
                  <TouchableOpacity
                    onPress={op.onClick}
                    key={i}
                    style={[
                      styles.opView,
                      {
                        borderTopWidth:
                          i !== options.length - options.length ? 0 : 0.65,
                        borderBottomWidth: i === options.length - 1 ? 0 : 0.65,
                        borderColor:
                          currentTheme === 'dark'
                            ? COLORS.borderColorDark
                            : COLORS.borderColorLight,
                      },
                    ]}>
                    <MyText
                      style={[
                        {
                          color: op.color,
                        },
                        styles.textOp,
                      ]}>
                      {op.name}
                    </MyText>
                  </TouchableOpacity>
                ))}
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
    width: '75%',
    alignSelf: 'center',
    height: Dimensions.get('window').height * 0.42,
    borderRadius: 20,
    alignItems: 'center',
    gap: 20,
  },

  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
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

  iconStyle2: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  contentDiv: {
    alignItems: 'center',
    width: '90%',
    flex: 1,
    marginHorizontal: 'auto',
    gap: 30,
  },

  opView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    width: '100%',
  },

  textOp: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default OptionsImageModal;
