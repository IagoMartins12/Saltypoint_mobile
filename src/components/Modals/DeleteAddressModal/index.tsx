import React from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import CustomIcon from '../../CustomIcon';
import LargeButton from '../../Button';
import {BORDERRADIUS, COLORS} from '../../../theme/theme';
import {global} from '../../../style';
import useTheme from '../../../hooks/useTheme';
import MyText from '../../Text';
import ModalIcon from '../ModalIcon';

export interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
  hideModal: () => void;
  translateY: Animated.SharedValue<number>;
}

const DeleteAddressModal: React.FC<ModalProps> = ({
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
            <ModalIcon handleOverlayPress={handleOverlayPress} height="15%" />

            <View style={styles.contentDiv}>
              <View style={styles.iconStyle2}>
                <CustomIcon
                  name="trash"
                  size={40}
                  pack="SimpleLineIcons"
                  color="red"
                />
              </View>
              <View
                style={{
                  gap: 10,
                }}>
                <MyText style={styles.textStyle}>
                  Deseja deletar esse endereço?
                </MyText>

                <TouchableOpacity
                  onPress={handleOverlayPress}
                  style={styles.buttonStyle}>
                  <Text style={{color: '#FFFFFF', paddingRight: 10}}>
                    Deletar
                  </Text>
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
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  modalContainer: {
    width: '90%',
    alignSelf: 'center',
    height: Dimensions.get('window').height * 0.4,

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
    height: 100,
    width: 100,
    backgroundColor: '#ffe8e8',
    borderRadius: 100,
  },

  contentDiv: {
    alignItems: 'center',
    width: '90%',
    flex: 1,
    marginHorizontal: 'auto',
    gap: 30,
  },
  buttonStyle: {
    width: Dimensions.get('screen').width / 1.25,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.secondaryRed,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DeleteAddressModal;
