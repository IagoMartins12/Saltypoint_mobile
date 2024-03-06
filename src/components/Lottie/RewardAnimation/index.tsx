import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {COLORS, FONTFAMILY, FONTSIZE} from '../../../theme/theme';
import CallToast from '../../Toast';
import useTheme from '../../../hooks/useTheme';

const RewardAnimation = () => {
  const {showToast} = CallToast();
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
        loop={false}
        onAnimationFinish={() => {
          showToast('Recompensa resgatada', 'success');
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
