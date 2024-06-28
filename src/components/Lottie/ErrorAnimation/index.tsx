import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {COLORS, FONTFAMILY, FONTSIZE} from '../../../theme/theme';
import MyText from '../../Text';
import useTheme from '../../../hooks/useTheme';

interface ErrorAnimationProps {
  text?: string;
}

const ErrorAnimation: React.FC<ErrorAnimationProps> = ({text}) => {
  const {currentTheme} = useTheme();
  return (
    <View
      style={[
        styles.EmptyCartContainer,
        {
          backgroundColor:
            currentTheme === 'light'
              ? COLORS.backgroundColorLight
              : COLORS.backgroundColorDark,
        },
      ]}>
      <LottieView
        style={styles.LottieStyle}
        source={require('../../../lottie/error.json')}
        autoPlay
        duration={4000}
        loop
      />

      <MyText style={{textAlign: 'center', fontSize: 22}}> {text}</MyText>
    </View>
  );
};

const styles = StyleSheet.create({
  EmptyCartContainer: {
    justifyContent: 'flex-end',
    flex: 1,
    backgroundColor: 'white',
  },
  LottieStyle: {
    height: Dimensions.get('screen').height * 0.35,
  },
  LottieText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryOrangeHex,
    textAlign: 'center',
  },
});

export default ErrorAnimation;
