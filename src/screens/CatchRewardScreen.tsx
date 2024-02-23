import {Dimensions, FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import SectionTitle from '../components/SectionTitle';
import {global} from '../style';
import {useState} from 'react';
import OptionsTittle from '../components/OptionsTittle';
import useGlobalStore from '../hooks/store/useGlobalStore';
import RewardCard from '../components/RewardCard';
import EmptyAnimation from '../components/Lottie/EmptyAnimation';

const CatchRewardScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [selectedOption, setSelectedOption] = useState(0);
  const [numColumns, setNumColumns] = useState(2); // Defina o número inicial de colunas

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

          <FlatList
            key={flatListKey} // Defina uma chave única para o FlatList
            data={selectedOption === 1 ? userRewards : reward}
            ListEmptyComponent={() => {
              return <EmptyAnimation text="Sem recompensas disponiveis" />;
            }}
            contentContainerStyle={{
              gap: 15,
              paddingVertical: 10,
              alignItems: 'center',
            }}
            renderItem={({item, index}) => (
              <RewardCard
                reward={item}
                margin={index % 2 === 1}
                showCode={selectedOption === 0 ? null : item.code}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={numColumns}
            showsVerticalScrollIndicator={false}
          />

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

const styles = StyleSheet.create({});

export default CatchRewardScreen;
