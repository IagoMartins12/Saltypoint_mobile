import React, {useState} from 'react';
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
import {Reward} from '../../../types/ModelsType';
import MyText from '../../Text';
import RewardAnimation from '../../Lottie/RewardAnimation';

export interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
  hideModal: () => void;
  translateY: Animated.SharedValue<number>;
  selectedReward: Reward | null;
}

const CatchRewardModal: React.FC<ModalProps> = ({
  modalOpen,
  setModalOpen,
  hideModal,
  translateY,
  selectedReward,
}) => {
  const [hasPlayed, setHasPlayed] = useState(false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });
  const handleOverlayPress = (e: GestureResponderEvent) => {
    hideModal();
    setTimeout(() => setModalOpen(!modalOpen), 300);
    setTimeout(() => setHasPlayed(false), 600);
  };

  let body = (
    <>
      <View style={styles.container}>
        {selectedReward ? (
          <View style={styles.warningContainer}>
            <View style={styles.warningIconBox}>
              <CustomIcon
                name="warning-outline"
                size={45}
                color="#000000"
                pack="Ionicons"
              />
            </View>
            <MyText style={styles.warningText}>
              Resgatar {selectedReward?.name}
            </MyText>
            <View style={styles.rewardDetailsContainer}>
              <MyText style={styles.rewardDetailText}>
                Você está resgatando uma recompensa de{' '}
                {selectedReward.quantity_points} pontos
              </MyText>

              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 15,
                  alignItems: 'center',
                  gap: 25,
                }}>
                <View style={styles.column}>
                  <MyText style={styles.text}>Saldo atual: </MyText>
                  <View style={styles.row}>
                    <CustomIcon
                      name="crown-outline"
                      size={25}
                      pack="MaterialCommunityIcons"
                    />
                    <MyText style={styles.boldText}>
                      {/* {user?.points} */}
                      200
                    </MyText>
                  </View>
                </View>

                <CustomIcon
                  name="chevron-double-right"
                  size={30}
                  pack="MaterialCommunityIcons"
                />

                <View style={styles.column}>
                  <MyText style={styles.text}>Saldo após: </MyText>
                  <View style={styles.row}>
                    <View style={styles.arrowContainer}>
                      <CustomIcon
                        name="arrow-down"
                        size={25}
                        pack="Feather"
                        color="red"
                      />
                      <CustomIcon
                        name="crown-outline"
                        size={25}
                        pack="MaterialCommunityIcons"
                      />
                    </View>
                    <MyText style={styles.boldText}>
                      {/* {user?.points - warningModal.currentItem.quantity_points} */}
                      125
                    </MyText>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ) : null}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleOverlayPress}>
            <MyText style={styles.buttonText}>Cancelar</MyText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rewardButton}
            onPress={() => {
              setHasPlayed(true);
            }}>
            <MyText style={styles.buttonText}>Resgatar recompensa</MyText>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );

  if (hasPlayed) {
    body = (
      <View style={styles.container}>
        <RewardAnimation />
      </View>
    );
  }

  return (
    <View style={styles.centeredView}>
      <Modal animationType="none" transparent={true} visible={modalOpen}>
        <View style={styles.overlay}>
          <Animated.View style={[styles.modalContainer, animatedStyle]}>
            <Pressable
              onPress={handleOverlayPress}
              style={{
                width: '100%',
                height: '5%',
                position: 'relative',
              }}>
              <TouchableOpacity
                style={styles.iconStyle}
                onPress={handleOverlayPress}>
                <CustomIcon name="x" size={20} pack="Feather" />
              </TouchableOpacity>
            </Pressable>

            {body}
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
    height: Dimensions.get('window').height * 0.7,
    backgroundColor: '#ffffff',
    borderRadius: 20,
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
  container: {
    width: '93%',
    marginHorizontal: 'auto',
    height: '100%',
    flex: 1,
  },
  warningContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    gap: 15,
  },
  warningText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rewardDetailsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  rewardDetailText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  pointBalanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  afterBalanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 10,
  },
  cancelButton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: '#ccc',
    borderRadius: 20,
    alignItems: 'center',
  },
  rewardButton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: 'red',
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },

  warningIconBox: {
    width: 96,
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10000,
    backgroundColor: '#FDE047',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  text: {
    fontFamily: 'your-font',
    fontSize: 14,
    fontWeight: 'normal',
  },
  boldText: {
    fontFamily: 'your-font',
    fontSize: 16,
    fontWeight: 'bold',
  },
  arrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CatchRewardModal;
