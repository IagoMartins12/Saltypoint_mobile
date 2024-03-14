import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FaCrown} from 'react-icons/fa';
import CustomIcon from '../CustomIcon';
import MyText from '../Text';

const ProgressBar = ({points}) => {
  const maxPoints = 250;
  const step = 50;
  const numBalls = Math.ceil(maxPoints / step);

  const balls = Array.from({length: numBalls}, (_, index) => {
    return (
      <View
        key={index}
        style={[
          styles.ballContainer,
          {
            opacity: points >= (index + 1) * step && points >= step ? 1 : 0.3,
          },
        ]}>
        <View style={styles.ball}>
          <CustomIcon
            name="crown-outline"
            pack="MaterialCommunityIcons"
            size={25}
          />
        </View>
        <MyText style={styles.text}>{(index + 1) * step}</MyText>
      </View>
    );
  });

  let currentStep = 0;
  for (let i = 0; i < numBalls; i++) {
    const nextStep = (i + 1) * step;
    if (points <= nextStep) {
      currentStep = i;
      break;
    }
  }

  const percentage = (points - currentStep * step) / step;
  const barWidth = (currentStep + percentage) * (91 / numBalls);

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <View style={[styles.bar, {width: `${barWidth}%`}]} />
      </View>
      <View style={styles.ballsContainer}>{balls}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  barContainer: {
    position: 'absolute',
    width: '100%',
    height: 5,
  },
  bar: {
    height: '100%',
    width: '90%',
    backgroundColor: 'red',
  },
  ballsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
    justifyContent: 'space-evenly',
    gap: 2,
  },
  ballContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 1,
  },
  ball: {
    width: 40,
    height: 40,
    backgroundColor: 'red',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default ProgressBar;
