import {Cart_product, Reward, User_Rewards} from '../../types/ModelsType';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import MyText from '../Text';
import useTheme from '../../hooks/useTheme';
import {COLORS} from '../../theme/theme';
import useCurrrentCode from '../../hooks/reward';
import usePrivateStore from '../../hooks/store/usePrivateStore';

export interface RewardCardHorizontalProps {
  reward: User_Rewards;
}

const RewardCardHorizontal: React.FC<RewardCardHorizontalProps> = ({
  reward,
}) => {
  const {currentTheme} = useTheme();
  const {currentCode, setCurrentCode} = useCurrrentCode();
  const {cart_product, setCart_product} = usePrivateStore();

  const removeItemCart = () => {
    const filteredCart = cart_product.filter(
      (item: Cart_product) => item.observation !== 'Recompensa',
    );
    setCart_product(filteredCart);
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderColor:
            currentCode === reward
              ? COLORS.secondaryRed
              : currentTheme === 'dark'
              ? COLORS.borderColorDark
              : COLORS.borderColorLight,
        },
      ]}
      onPress={() => {
        removeItemCart();
        setCurrentCode(reward);
      }}>
      <View style={styles.imageContainer}>
        <Image source={{uri: reward.rewardImage}} style={styles.image} />
      </View>

      <View
        style={{
          alignItems: 'flex-start',
          justifyContent: 'center',
          width: '60%',
          gap: 10,
        }}>
        <View style={styles.rewardNameContainer}>
          <MyText style={styles.rewardName}>{reward.rewardName} </MyText>
        </View>

        <View style={styles.rewardCodeContainer}>
          <MyText style={styles.rewardCode}> #{reward.reward_code} </MyText>
        </View>
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
