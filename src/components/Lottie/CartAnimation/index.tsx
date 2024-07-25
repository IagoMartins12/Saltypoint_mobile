import LottieView from 'lottie-react-native';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE} from '../../../theme/theme';

interface AnimationCommponentProps {
  setHasPlayed: React.Dispatch<React.SetStateAction<boolean>>;
  product?: boolean;
  goBack?: () => void;
}
const CartAnimation: React.FC<AnimationCommponentProps> = ({
  setHasPlayed,
  product,
  goBack,
}) => {
  const endAnimation = () => {
    setHasPlayed(false);

    if (goBack) {
      goBack();
    }
  };
  return (
    <View style={styles.EmptyCartContainer}>
      <LottieView
        style={[
          styles.LottieStyle,
          {
            height: product ? 40 : 28,
          },
        ]}
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
    height: 32,
  },
  LottieText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryOrangeHex,
    textAlign: 'center',
  },
});

export default CartAnimation;
