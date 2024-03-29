import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import CustomIcon from '../CustomIcon';
import {COLORS} from '../../theme/theme';

const ICON_SIZE = 17;

const clamp = (value: number, min: number, max: number) => {
  'worklet';
  return Math.min(Math.max(value, min), max);
};

const BUTTON_WIDTH = 170;

const SlidingCounter = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const [count, setCount] = useState(0);

  const MAX_SLIDE_OFFSET = BUTTON_WIDTH * 0.1;

  // wrapper function
  const incrementCount = useCallback(() => {
    // external library function
    setCount(currentCount => currentCount + 1);
  }, []);

  const decrementCount = useCallback(() => {
    setCount(currentCount => currentCount - 1);
  }, []);

  const resetCount = useCallback(() => {
    setCount(0);
  }, []);

  const onPanGestureEvent =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onActive: event => {
        translateX.value = clamp(
          event.translationX,
          -MAX_SLIDE_OFFSET,
          MAX_SLIDE_OFFSET,
        );

        translateY.value = clamp(event.translationY, 0, MAX_SLIDE_OFFSET);
      },
      onEnd: () => {
        if (translateX.value === MAX_SLIDE_OFFSET) {
          // Increment
          runOnJS(incrementCount)();
        } else if (translateX.value === -MAX_SLIDE_OFFSET) {
          // Decrement
          runOnJS(decrementCount)();
        } else if (translateY.value === MAX_SLIDE_OFFSET) {
          runOnJS(resetCount)();
        }

        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      },
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  }, []);

  const rPlusMinusIconStyle = useAnimatedStyle(() => {
    const opacityX = interpolate(
      translateX.value,
      [-MAX_SLIDE_OFFSET, 0, MAX_SLIDE_OFFSET],
      [0.4, 0.8, 0.4],
    );

    const opacityY = interpolate(
      translateY.value,
      [0, MAX_SLIDE_OFFSET],
      [1, 0],
    );

    return {
      opacity: opacityX * opacityY,
    };
  }, []);

  const rCloseIconStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, MAX_SLIDE_OFFSET],
      [0, 0.8],
    );

    return {
      opacity,
    };
  }, []);

  const rButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value * 0.1,
        },
        {translateY: translateY.value * 0.1},
      ],
    };
  }, []);

  return (
    <Animated.View style={[styles.button, rButtonStyle]}>
      <Animated.View
        style={[
          rPlusMinusIconStyle,
          styles.quantityBox,
          {
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          },
        ]}>
        <CustomIcon
          name="minus"
          pack="Feather"
          color={'white'}
          size={ICON_SIZE}
        />
      </Animated.View>
      <Animated.View style={[rCloseIconStyle, styles.quantityBox]}>
        <CustomIcon
          name="close"
          pack="Feather"
          color={'white'}
          size={ICON_SIZE}
        />
      </Animated.View>
      <Animated.View
        style={[
          rPlusMinusIconStyle,
          styles.quantityBox,
          {
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
          },
        ]}>
        <CustomIcon
          name="plus"
          pack="Feather"
          color={'white'}
          size={ICON_SIZE}
        />
      </Animated.View>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <PanGestureHandler onGestureEvent={onPanGestureEvent}>
          <Animated.View style={[styles.quantityBox, rStyle]}>
            <Text style={styles.countText}>{count}</Text>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </Animated.View>
  );
};

export default SlidingCounter;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    height: 40,
  },
  countText: {
    fontSize: 18,
    color: '#000000',
  },

  quantityBox: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryGray,
  },
});
