import {Reward} from '../../types/ModelsType';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import MyText from '../Text';

export interface RewardCardHorizontalProps {
  reward: Reward;
  onClick?: (reward: Reward) => void;
}

const RewardCardHorizontal: React.FC<RewardCardHorizontalProps> = ({
  reward,
  onClick,
}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{uri: reward.image}} style={styles.image} />
      </View>

      <View
        style={{
          alignItems: 'flex-start',
          justifyContent: 'center',
          width: '60%',
          gap: 10,
        }}>
        <View style={styles.rewardNameContainer}>
          <MyText style={styles.rewardName}>{reward.name} </MyText>
        </View>

        <View style={styles.rewardCodeContainer}>
          <MyText style={styles.rewardCode}> #F3S564 </MyText>
        </View>

        {/* <View style={styles.rewardCodeContainer}>
          <MyText style={styles.rewardPoints}>
            {reward.quantity_points} pontos
          </MyText>
        </View> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('screen').height / 6.5,
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: 'dashed',
  },
  imageContainer: {
    width: '35%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  image: {
    width: '90%',
    height: '90%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  rewardNameContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rewardName: {
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center',
  },
  rewardCodeContainer: {
    width: '100%',
    justifyContent: 'center',
  },
  rewardCode: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: 'red',
  },
  rewardPoints: {},
});

export default RewardCardHorizontal;
