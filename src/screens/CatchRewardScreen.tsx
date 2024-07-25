import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import SectionTitle from '../components/SectionTitle';
import {global} from '../style';
import {useState} from 'react';
import OptionsTittle from '../components/OptionsTittle';
import useGlobalStore from '../hooks/store/useGlobalStore';
import RewardCard from '../components/RewardCard';
import EmptyAnimation from '../components/Lottie/EmptyAnimation';
import FilterReward from '../components/FilterReward';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import CatchRewardModal from '../components/Modals/CatchRewardModal';
import {Reward, User_Rewards} from '../types/ModelsType';
import useTheme from '../hooks/useTheme';
import {COLORS} from '../theme/theme';
import usePrivateStore from '../hooks/store/usePrivateStore';
import useShowToast from '../hooks/customHooks/useShowToast';

const CatchRewardScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [selectedReward, setSelectedReward] = useState<null | Reward>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);
  const [isActive, setIsActive] = useState<number | null>(null);
  const [selectedPointsRange, setSelectedPointsRange] = useState<
    [number, number] | null
  >(null);

  const {user, userReward} = usePrivateStore();
  const {showToast} = useShowToast();
  const translateY = useSharedValue(Dimensions.get('window').height);

  const showModal = (reward: Reward) => {
    if (reward.quantity_points > user.points) {
      return showToast('Quantidade de pontos insuficientes', 'error');
    }
    setSelectedReward(reward);
    setModalOpen(!modalOpen);
    translateY.value = withTiming(0, {duration: 500});
  };

  const hideModal = () => {
    translateY.value = withTiming(Dimensions.get('window').height, {
      duration: 500,
    });
  };

  const options = [
    {
      name: 'Resgatar recompensas',
    },
    {
      name: 'Minhas recompensas',
    },
  ];
  const comeBack = () => {
    navigation.pop();
  };

  const {reward} = useGlobalStore();
  const {currentTheme} = useTheme();

  const userRewards = reward.map(r => {
    return {
      ...r,
      code: '#444566s',
    };
  });
  const filterRewardsByPointsRange = () => {
    if (selectedPointsRange) {
      const [minPoints, maxPoints] = selectedPointsRange;
      return reward.filter(
        reward =>
          reward.quantity_points >= minPoints &&
          reward.quantity_points <= maxPoints,
      );
    }
    return reward;
  };

  return (
    <>
      <View style={{flex: 1}}>
        <SectionTitle comeBack={comeBack} />
        <View
          style={[
            global.mainContainer,
            {
              backgroundColor:
                currentTheme === 'light'
                  ? COLORS.backgroundColorLight
                  : COLORS.backgroundColorDark,
            },
          ]}>
          <OptionsTittle
            options={options}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />

          <ScrollView showsVerticalScrollIndicator={false}>
            {selectedOption === 0 ? (
              <FilterReward
                isActive={isActive}
                rewards={reward}
                selectedPointsRange={selectedPointsRange}
                setIsActive={setIsActive}
                setSelectedPointsRange={setSelectedPointsRange}
              />
            ) : null}

            {selectedOption === 0 ? (
              <View style={styles.rewardBox}>
                {filterRewardsByPointsRange().map(r => (
                  <RewardCard reward={r} key={r.id} onClick={showModal} />
                ))}
              </View>
            ) : (
              <>
                {userRewards.length > 0 ? (
                  <View style={styles.rewardBox}>
                    {userReward.map((r: User_Rewards) => (
                      <RewardCard
                        reward={r}
                        key={r.id}
                        showCode={r.reward_code}
                      />
                    ))}
                  </View>
                ) : (
                  <EmptyAnimation text="Sem recompensas disponiveis" />
                )}
              </>
            )}
          </ScrollView>
          <CatchRewardModal
            hideModal={hideModal}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            translateY={translateY}
            selectedReward={selectedReward}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  rewardBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    paddingVertical: 10,
  },
});

export default CatchRewardScreen;
