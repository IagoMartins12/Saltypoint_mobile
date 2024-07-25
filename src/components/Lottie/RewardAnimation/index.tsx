import {StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {COLORS, FONTFAMILY, FONTSIZE} from '../../../theme/theme';
import useTheme from '../../../hooks/useTheme';

const RewardAnimation = ({onFinish}: {onFinish: () => void}) => {
  const {currentTheme} = useTheme();
  const lottieSource =
    currentTheme === 'light'
      ? require('../../../lottie/crown.json')
      : require('../../../lottie/crownDark.json');

  return (
    <View style={styles.EmptyCartContainer}>
      <LottieView
        style={styles.LottieStyle}
        source={lottieSource}
        autoPlay
        duration={1500}
        loop={false}
        onAnimationFinish={() => {
          onFinish();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  EmptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  LottieStyle: {
    flex: 1,
  },
  LottieText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryOrangeHex,
    textAlign: 'center',
  },
});

export default RewardAnimation;
