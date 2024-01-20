import LottieView from 'lottie-react-native';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE} from '../../../theme/theme';

interface AnimationCommponentProps {
  setHasPlayed: React.Dispatch<React.SetStateAction<boolean>>;
  //   repeat?: boolean;
  // text?: string;
}
const CartAnimation: React.FC<AnimationCommponentProps> = ({setHasPlayed}) => {
  const endAnimation = () => {
    console.log('encerrando');
    setHasPlayed(false);
  };
  return (
    <View style={styles.EmptyCartContainer}>
      <LottieView
        style={styles.LottieStyle}
        source={require('../../../lottie/cartAnimation.json')}
        autoPlay
        loop={false}
        onAnimationFinish={endAnimation}
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
    height: 28,
  },
  LottieText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryOrangeHex,
    textAlign: 'center',
  },
});

export default CartAnimation;
