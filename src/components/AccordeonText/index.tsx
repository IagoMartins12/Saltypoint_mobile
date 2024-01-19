import React, {useState} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {COLORS, FONTSIZE} from '../../theme/theme';
import CustomIcon from '../CustomIcon';

interface AccordeonTextProps {
  label: string;
  text: string;
}

const AccordeonText: React.FC<AccordeonTextProps> = ({label, text}) => {
  const isOpen = useSharedValue(false);

  const toggleAccordion = () => {
    isOpen.value = !isOpen.value;
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      maxHeight: withTiming(isOpen.value ? 1000 : 0, {
        duration: 300,
        easing: Easing.ease,
      }),
      opacity: withTiming(isOpen.value ? 1 : 0, {
        duration: 300,
        easing: Easing.ease,
      }),
    };
  });

  return (
    <View style={{paddingHorizontal: 5}}>
      <Pressable onPress={toggleAccordion} style={styles.accordeonBox}>
        <Text style={styles.accordeonTitle}>{label}</Text>
        <CustomIcon
          name={isOpen.value ? 'chevron-down' : 'chevron-right'}
          size={20}
          pack="Feather"
        />
      </Pressable>
      <Animated.View style={[{overflow: 'hidden'}, animatedStyles]}>
        <Text>{text}</Text>
        <View style={styles.hrStyle} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  accordeonBox: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  accordeonTitle: {
    width: '85%',
    fontSize: FONTSIZE.size_18,
    fontWeight: 'bold',
    color: COLORS.primaryBlackHex,
  },
  hrStyle: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth * 0.5,
    paddingTop: 15,
    marginHorizontal: 10,
  },
});

export default AccordeonText;
