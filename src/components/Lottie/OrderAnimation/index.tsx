import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {COLORS, FONTFAMILY, FONTSIZE} from '../../../theme/theme';
import MyText from '../../Text';

interface OrderAnimationProps {
  text?: string;
  onFinished: () => void;
}

const OrderAnimation: React.FC<OrderAnimationProps> = ({text, onFinished}) => {
  const [animation, setAnimation] = useState(
    require('../../../lottie/orderAnimation.json'),
  );
  return (
    <View style={styles.EmptyCartContainer}>
      <LottieView
        style={styles.LottieStyle}
        source={animation}
        autoPlay
        onAnimationFinish={() => {
          setAnimation(require('../../../lottie/onSucess.json'));
          setTimeout(onFinished, 1200);
        }}
        loop={false}
      />
      <MyText style={styles.LottieText}>{text}</MyText>
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
