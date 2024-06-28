import {Pressable, StyleSheet, View} from 'react-native';
import useToast from '../../hooks/useToast';
import MyText from '../Text';
import {COLORS} from '../../theme/theme';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import CustomIcon from '../CustomIcon';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useEffect} from 'react';

interface MessageProps {
  isOpen: boolean;
  onClose: () => void;
}
const ToastComponent: React.FC<MessageProps> = ({isOpen, onClose}) => {
  const {title, type} = useToast();

  const opacity = useSharedValue(0); // Variável animada para controlar a opacidade

  useEffect(() => {
    if (isOpen) {
      opacity.value = withTiming(1); // Animação de entrada
      const timeout = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timeout);
    } else {
      opacity.value = withTiming(0); // Animação de saída
    }
  }, [isOpen]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{translateY: -50 * (1 - opacity.value)}],
    };
  });

  return (
    <Animated.View
      style={[
        animatedStyle,
        styles.container,
        {
          position: 'absolute',
          zIndex: 9999,
          backgroundColor:
            type === 'success' ? COLORS.primaryGreenHex : COLORS.secondaryRed,
        },
      ]}>
      <GestureHandlerRootView style={{flex: 1}}>
        <PanGestureHandler
          onHandlerStateChange={({nativeEvent}) => {
            if (
              nativeEvent.state === State.END &&
              nativeEvent.translationX > 100
            ) {
              onClose();
            }
          }}>
          <Animated.View style={styles.insideContainer}>
            <View style={styles.textContainer}>
              <CustomIcon
                name={type === 'success' ? 'check-circle' : 'alert-triangle'}
                pack="Feather"
                size={25}
                color="#000"
              />
              <MyText style={styles.title}> {title}</MyText>
            </View>

            <Pressable onPress={onClose}>
              <CustomIcon name="x" pack="Feather" size={25} color="#000" />
            </Pressable>
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    borderRadius: 15,
    height: 55,
    top: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  insideContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 15,
    alignSelf: 'center',
    width: '100%',
  },

  textContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1d1b1b',
    textAlign: 'center',
  },
});
export default ToastComponent;
