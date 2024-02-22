import {StyleSheet, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {COLORS, FONTSIZE} from '../theme/theme';

const RewardScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  return <View style={styles.mainContainer}></View>;
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 10,
  },
  mainText: {
    fontSize: FONTSIZE.size_24,
    fontWeight: '700',
    color: COLORS.primaryBlackHex,
  },
  textDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchIcon: {
    flexDirection: 'row',
    gap: 10,
  },
  pointsText: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlackHex,
    textDecorationLine: 'underline',
  },
  productsDiv: {
    paddingHorizontal: 25,
    marginVertical: 15,
    gap: 20,
    paddingBottom: 70,
  },
  categoryContainer: {
    gap: 15,
    paddingVertical: 10,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.primaryBlackHex,
  },
  flatListView: {
    gap: 15,
  },
});

export default RewardScreen;
