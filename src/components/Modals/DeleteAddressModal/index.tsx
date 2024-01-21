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
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });
  const handleOverlayPress = (e: GestureResponderEvent) => {
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
                height: '15%',
                position: 'relative',
              }}>
              <TouchableOpacity
                style={styles.iconStyle}
                onPress={handleOverlayPress}>
                <CustomIcon name="x" size={20} pack="Feather" />
              </TouchableOpacity>
            </Pressable>
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
                <Text style={styles.textStyle}>
                  Deseja deletar esse endereço?
                </Text>

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
    // justifyContent: 'flex-end',
    justifyContent: 'center',
  },
  modalContainer: {
    // width: '100%',
    width: '90%',
    alignSelf: 'center',
    height: Dimensions.get('window').height * 0.4,
    backgroundColor: '#ffffff',
    // borderTopEndRadius: 20,
    // borderTopStartRadius: 20,
    borderRadius: 20,
    alignItems: 'center',
    gap: 20,
  },

  textStyle: {
    color: COLORS.primaryBlackHex,
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
