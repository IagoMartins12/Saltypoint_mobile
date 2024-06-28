import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BORDERRADIUS, COLORS} from '../theme/theme';
import ProgressBar from '../components/ProgressBar';
import {global} from '../style';
import MyText from '../components/Text';
import CustomIcon from '../components/CustomIcon';
import useGlobalStore from '../hooks/store/useGlobalStore';
import {FlatList} from 'react-native';
import RewardCard from '../components/RewardCard';
import FidelityAccordeonSection from '../components/FidelityAccordeonSection';
import useTheme from '../hooks/useTheme';
import usePrivateStore from '../hooks/store/usePrivateStore';
import NoAuth from '../components/NoAuth';
import {useEffect, useState} from 'react';
import {Reward} from '../types/ModelsType';

const RewardScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [randomRewards, setRandomRewards] = useState<Reward[]>([]);
  const {reward} = useGlobalStore();
  const {currentTheme} = useTheme();
  const {user} = usePrivateStore();

  const goToLogin = () => {
    return navigation.navigate('Login');
  };
  const goToInfo = () => {
    return navigation.navigate('Fidelity');
  };

  const goToCatchReward = () => {
    return navigation.navigate('CatchReward');
  };

  const getRandomRewards = (rewards: typeof reward, count: number) => {
    const shuffled = [...rewards].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    if (user) {
      const randomR = getRandomRewards(reward, 10);
      setRandomRewards(randomR);
    }
  }, []);

  if (user) {
    return (
      <View>
        <ScrollView
          contentContainerStyle={{
            gap: 10,
            paddingBottom: 40,
            backgroundColor:
              currentTheme === 'light'
                ? COLORS.secondBackgroundLight
                : COLORS.secondBackgroundDark,
          }}>
          <View
            style={[
              styles.headerContainer,
              global.shadow,
              {
                gap: 25,
                backgroundColor:
                  currentTheme === 'light'
                    ? COLORS.backgroundColorLight
                    : COLORS.backgroundColorDark,
              },
            ]}>
            <View>
              <MyText style={styles.firstTittle}>Você possui </MyText>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  gap: 2,
                }}>
                <MyText style={styles.numberOfPoints}>{user.points}</MyText>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                  }}>
                  <MyText style={styles.pointsText}>pontos</MyText>

                  <Pressable onPress={goToInfo} style={{marginBottom: 5}}>
                    <CustomIcon name="info" pack="Feather" size={18} />
                  </Pressable>
                </View>
              </View>
            </View>

            <View style={styles.infoBox}>
              <View style={styles.iconBox}>
                <CustomIcon
                  name="warning"
                  pack="Ionicons"
                  size={30}
                  color="#000000"
                />
              </View>

              <View style={styles.infoTextBox}>
                <MyText style={styles.infoText}>
                  Seus pontos só serão atualizados quando o pedido for concluido
                </MyText>
              </View>
            </View>

            <ProgressBar points={user.points} />

            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={goToCatchReward}>
              <Text style={styles.rewardText}>Ver recompensas</Text>
            </TouchableOpacity>
          </View>

          <View
            style={[
              global.shadow,
              {
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <View style={styles.featuredBox}>
              <MyText style={styles.featuredText}>Destaque</MyText>
            </View>
            <View style={styles.arrowDown} />
          </View>

          <View
            style={[
              styles.couponBox,
              global.shadow,
              {
                backgroundColor:
                  currentTheme === 'light'
                    ? COLORS.backgroundColorLight
                    : COLORS.backgroundColorDark,
              },
            ]}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[styles.flatListView]}
              data={randomRewards}
              renderItem={item => (
                <RewardCard
                  reward={item.item}
                  key={item.index}
                  onClick={goToCatchReward}
                />
              )}
            />
          </View>

          <View style={[global.shadow]}>
            <FidelityAccordeonSection />
          </View>
        </ScrollView>
      </View>
    );
  }

  return <NoAuth goToLogin={goToLogin} />;
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 25,
    paddingTop: 40,
    paddingBottom: 20,
  },
  firstTittle: {
    fontSize: 20,
    fontWeight: '500',
  },

  numberOfPoints: {
    fontSize: 45,
    fontWeight: '600',
    alignItems: 'center',
    justifyContent: 'center',
  },

  pointsText: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
  },

  infoBox: {
    alignSelf: 'center',
    width: '90%',
    margin: 'auto',
    height: 60,
    backgroundColor: COLORS.primaryGray,
    borderRadius: 10,
    flexDirection: 'row',
  },

  iconBox: {
    width: '15%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  infoTextBox: {
    width: '80%',
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: '#000000',
  },
  rewardText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonStyle: {
    width: '80%',
    alignSelf: 'center',
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.secondaryRed,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  paddingView: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  flatListView: {
    gap: 20,
    paddingVertical: 10,
  },

  featuredBox: {
    alignSelf: 'center',
    paddingHorizontal: 50,
    paddingVertical: 12,
    backgroundColor: COLORS.primaryGreyHex,
    borderRadius: BORDERRADIUS.radius_15,
    zIndex: 50,
    bottom: 20,
  },

  featuredText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  arrowDown: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderTopWidth: 12,
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: COLORS.primaryGreyHex,
    zIndex: 50,
    bottom: 22,
  },

  couponBox: {
    gap: 15,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 20,
    bottom: 30,
  },
});

export default RewardScreen;
