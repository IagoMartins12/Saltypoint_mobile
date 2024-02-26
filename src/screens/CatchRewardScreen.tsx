import {Dimensions, FlatList, ScrollView, StyleSheet, View} from 'react-native';
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
import {Reward} from '../types/ModelsType';

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

  const translateY = useSharedValue(Dimensions.get('window').height);

  const showModal = (reward: Reward) => {
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
  const userReward = false;

  const userRewards = reward.map(r => {
    return {
      ...r,
      code: '#444566s',
    };
  });
  const flatListKey = `flatList-${2}`;

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
        <View style={global.mainContainer}>
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
                {userReward ? (
                  <View style={styles.rewardBox}>
                    {userRewards.map(r => (
                      <RewardCard reward={r} key={r.id} showCode={r.code} />
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
          {/* <FilterReward
            isActive={isActive}
            rewards={reward}
            selectedPointsRange={selectedPointsRange}
            setIsActive={setIsActive}
            setSelectedPointsRange={setSelectedPointsRange}
          />
          <FlatList
            key={flatListKey} // Defina uma chave única para o FlatList
            data={
              selectedOption === 1 ? userRewards : filterRewardsByPointsRange()
            }
            ListEmptyComponent={() => {
              return <EmptyAnimation text="Sem recompensas disponiveis" />;
            }}
            contentContainerStyle={{
              gap: 15,
              paddingVertical: 10,
              alignItems: 'center',
            }}
            renderItem={({item, index}) => (
              <>
                <RewardCard
                  reward={item}
                  margin={index % 2 === 1}
                  //@ts-ignore
                  showCode={selectedOption === 0 ? null : item.code}
                />
              </>
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
          /> */}

          {/* <ScrollView>
            {reward.map(r => (
              <RewardCard reward={r} />
            ))}
          </ScrollView> */}
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
