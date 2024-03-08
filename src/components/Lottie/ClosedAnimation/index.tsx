import {StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {COLORS, FONTFAMILY, FONTSIZE} from '../../../theme/theme';

const ClosedAnimation = () => {
  return (
    <View style={styles.EmptyCartContainer}>
      <LottieView
        style={styles.LottieStyle}
        source={require('../../../lottie/closed.json')}
        autoPlay
        loop
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
    height: 500,
  },
  LottieText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryOrangeHex,
    textAlign: 'center',
  },
});

export default ClosedAnimation;
