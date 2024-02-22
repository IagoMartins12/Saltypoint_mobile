import {Reward} from '../../types/ModelsType';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';

export interface RewardCardProps {
  reward: Reward;
  onClick?: (reward: Reward) => void;
}

const RewardCard: React.FC<RewardCardProps> = ({reward, onClick}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        if (onClick) {
          onClick(reward);
        }
      }}>
      <View style={styles.imageContainer}>
        <ImageBackground source={{uri: reward.image}} style={styles.image} />
      </View>

      <View style={styles.rewardNameContainer}>
        <Text style={styles.rewardName}>{reward.name}</Text>
      </View>

      <View style={styles.rewardCodeContainer}>
        <Text style={styles.rewardCode}>{reward.quantity_points} pontos</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '45%',
    height: Dimensions.get('screen').height / 3,
    backgroundColor: 'lightgray',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    height: '60%',
    width: '100%',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  rewardNameContainer: {
    height: '20%',
    justifyContent: 'center',
  },
  rewardName: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  rewardCodeContainer: {
    height: '20%',
    justifyContent: 'center',
  },
  rewardCode: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    color: 'red',
  },
});

export default RewardCard;
