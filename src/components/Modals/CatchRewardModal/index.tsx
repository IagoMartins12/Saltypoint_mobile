import React, {useState} from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import CustomIcon from '../../CustomIcon';
import {Reward} from '../../../types/ModelsType';
import MyText from '../../Text';
import RewardAnimation from '../../Lottie/RewardAnimation';
import useTheme from '../../../hooks/useTheme';
import {COLORS} from '../../../theme/theme';
import ModalIcon from '../ModalIcon';
import usePrivateStore from '../../../hooks/store/usePrivateStore';
import {CreateRewardDto} from '../../../types/Dtos';
import {postReward} from '../../../services';
import useShowToast from '../../../hooks/customHooks/useShowToast';
import LoadingIndicator from '../../Loading';

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
  const [loading, setLoading] = useState(null);
  const {user, userReward, setUser, setUserReward} = usePrivateStore();
  const {currentTheme} = useTheme();
  const {showToast} = useShowToast();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  const catchReward = async () => {
    if (user?.points) {
      setLoading(true);
      const object = {
        rewardId: selectedReward.id,
      } as CreateRewardDto;
      const response = await postReward(object);
      setLoading(false);

      if (response) {
        setHasPlayed(true);
        const updatedRewards = [...userReward, response];
        setUserReward(updatedRewards);
        const updatedPoints = user?.points - selectedReward.quantity_points;
        const updatedUser = {...user, points: updatedPoints}; //
        setUser(updatedUser);
      }
    }
  };

  const handleOverlayPress = () => {
    hideModal();
    setTimeout(() => setModalOpen(!modalOpen), 300);
    setTimeout(() => setHasPlayed(false), 600);
  };

  const onFinish = () => {
    handleOverlayPress();
    showToast('Recompensa resgatada', 'success');
  };

  let body = (
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
                  <MyText style={styles.boldText}>{user?.points}</MyText>
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
                    {user?.points - selectedReward.quantity_points}
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
        <TouchableOpacity style={styles.rewardButton} onPress={catchReward}>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <MyText style={styles.buttonText}>Resgatar recompensa</MyText>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  if (hasPlayed) {
    body = (
      <View style={styles.container}>
        <RewardAnimation onFinish={onFinish} />
      </View>
    );
  }

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
                  currentTheme === 'dark'
                    ? COLORS.cardColorDark
                    : COLORS.backgroundColorLight,
              },
            ]}
            onStartShouldSetResponder={() => true}
            onResponderStart={e => e.stopPropagation()}>
            <ModalIcon handleOverlayPress={handleOverlayPress} height="5%" />

            {body}
          </Animated.View>
        </Pressable>
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
    height: Dimensions.get('window').height * 0.65,
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
    paddingVertical: 16,
    backgroundColor: '#ccc',
    borderRadius: 20,
    alignItems: 'center',
  },
  rewardButton: {
    paddingHorizontal: 30,
    paddingVertical: 16,
    backgroundColor: 'red',
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000000',
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
