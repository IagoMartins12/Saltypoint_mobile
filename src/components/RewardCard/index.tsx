import {global} from '../../style';
import {COLORS} from '../../theme/theme';
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
      style={[styles.container]}
      onPress={() => {
        if (onClick) {
          onClick(reward);
        }
      }}>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={{uri: reward.image}}
          style={styles.image}
          borderTopLeftRadius={20}
          borderTopRightRadius={20}
        />
      </View>

      <View style={styles.textContainer}>
        <View style={styles.rewardNameContainer}>
          <Text style={styles.rewardName}>{reward.name}</Text>
        </View>

        <View style={styles.rewardCodeContainer}>
          <Text style={styles.rewardCode}>{reward.quantity_points} pontos</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: Dimensions.get('screen').width / 2,
    height: Dimensions.get('screen').height / 3.75,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    height: '60%',
    width: '100%',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor: 'transparent',
  },
  image: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
  },
  rewardNameContainer: {
    height: '20%',
    justifyContent: 'center',
  },

  textContainer: {
    height: '40%',
    width: '100%',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eeeded',

    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
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
