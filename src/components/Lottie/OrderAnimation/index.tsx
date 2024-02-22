import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {COLORS, FONTFAMILY, FONTSIZE} from '../../../theme/theme';
import MyText from '../../Text';

interface OrderAnimationProps {
  text?: string;
}

const OrderAnimation: React.FC<OrderAnimationProps> = ({text}) => {
  return (
    <View style={styles.EmptyCartContainer}>
      <LottieView
        style={styles.LottieStyle}
        source={require('../../../lottie/empty.json')}
        autoPlay
        loop
      />

      <MyText style={{textAlign: 'center', fontSize: 22}}> {text}</MyText>
    </View>
  );
};

const styles = StyleSheet.create({
  EmptyCartContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  LottieStyle: {
    height: 400,
  },
  LottieText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryOrangeHex,
    textAlign: 'center',
  },
});

export default OrderAnimation;
