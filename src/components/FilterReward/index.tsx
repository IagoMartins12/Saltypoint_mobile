import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Reward} from '../../types/ModelsType';

interface FilterRewardProps {
  rewards: Reward[];
  selectedPointsRange: [number, number] | null;
  setSelectedPointsRange: React.Dispatch<
    React.SetStateAction<[number, number] | null>
  >;
  isActive: number | null;
  setIsActive: React.Dispatch<React.SetStateAction<number | null>>;
}

const FilterReward: React.FC<FilterRewardProps> = ({
  rewards,
  selectedPointsRange,
  setSelectedPointsRange,
  isActive,
  setIsActive,
}) => {
  const rewardOptions = [
    {
      mainText: 'Até 100',
      subText: 'Pontos',
      pointsRange: [0, 100] as [number, number],
    },
    {
      mainText: '101 a 150',
      subText: 'Pontos',
      pointsRange: [101, 150] as [number, number],
    },
    {
      mainText: '151 a 200',
      subText: 'Pontos',
      pointsRange: [151, 200] as [number, number],
    },
    {
      mainText: '201 a 250',
      subText: 'Pontos',
      pointsRange: [201, 250] as [number, number],
    },
    {
      mainText: '251 a 300',
      subText: 'Pontos',
      pointsRange: [251, 300] as [number, number],
    },
  ];

  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}>
      {rewardOptions.map((op, i) => (
        <TouchableOpacity
          style={[styles.option, isActive === i && styles.activeOption]}
          key={i}
          onPress={() => {
            if (isActive === i) {
              setIsActive(null);
              setSelectedPointsRange(null);
            } else {
              setIsActive(i);
              setSelectedPointsRange(op.pointsRange);
            }
          }}>
          <Text
            style={[
              styles.optionText,
              isActive === i && styles.activeOptionText,
            ]}>
            {op.mainText} {'\n'}
            {op.subText}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 3,
    paddingVertical: 12,
    height: Dimensions.get('screen').height / 9,
  },
  option: {
    borderWidth: 1,
    borderColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 8,
    marginHorizontal: 3,
  },
  activeOption: {
    backgroundColor: 'red',
  },
  optionText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
  },
  activeOptionText: {
    color: 'white',
  },
});

export default FilterReward;
