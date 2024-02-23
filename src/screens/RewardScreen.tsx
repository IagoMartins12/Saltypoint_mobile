import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BORDERRADIUS, COLORS, FONTSIZE} from '../theme/theme';
import ProgressBar from '../components/ProgressBar';
import {global} from '../style';
import MyText from '../components/Text';
import CustomIcon from '../components/CustomIcon';
import useGlobalStore from '../hooks/store/useGlobalStore';
import {FlatList} from 'react-native';
import RewardCard from '../components/RewardCard';
import FidelityAccordeonSection from '../components/FidelityAccordeonSection';

const RewardScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const {reward} = useGlobalStore();

  const goToInfo = () => {
    return navigation.navigate('Fidelity');
  };

  const goToCatchReward = () => {
    return navigation.navigate('CatchReward');
  };
  return (
    <View>
      <ScrollView
        contentContainerStyle={{
          gap: 10,
          paddingBottom: 40,
        }}>
        <View
          style={[
            styles.headerContainer,
            global.shadow,
            {gap: 25, backgroundColor: '#FFFFFF'},
          ]}>
          <View>
            <MyText style={styles.firstTittle}>Você possui </MyText>
            <View
              style={{flexDirection: 'row', alignItems: 'flex-end', gap: 5}}>
              <MyText style={styles.numberOfPoints}>25</MyText>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <MyText style={styles.pointsText}>pontos</MyText>

                <Pressable onPress={goToInfo}>
                  <CustomIcon
                    name="info"
                    pack="Feather"
                    size={15}
                    color="#000000"
                  />
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

          <ProgressBar points={150} />

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

        <View style={[styles.couponBox, global.shadow]}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.flatListView]}
            data={reward}
            renderItem={item => (
              <RewardCard reward={item.item} key={item.index} />
            )}
          />
        </View>

        <View style={[global.shadow]}>
          <FidelityAccordeonSection />
        </View>
      </ScrollView>
    </View>
  );
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
    marginBottom: 5,
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
