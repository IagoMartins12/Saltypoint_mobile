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
  FadeInDown,
  FadeInLeft,
  FadeInUp,
  RollInLeft,
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

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  }, [isOpen]);
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
          position: isOpen ? 'absolute' : null,
          display: isOpen ? 'flex' : 'none',
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
              console.log('teste');
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
    width: '90%',
    borderRadius: 15,
    marginHorizontal: 'auto',
    height: 65,
    top: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  insideContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 10,
  },

  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
  },
});
export default ToastComponent;
