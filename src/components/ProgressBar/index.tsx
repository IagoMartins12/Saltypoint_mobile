import {View, StyleSheet} from 'react-native';
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

  const getNumber = () => {
    if (points < 50) {
      return 50;
    } else if (points > 50 && points <= 99) {
      return 65;
    } else if (points > 100 && points <= 149) {
      return 75;
    } else if (points > 150 && points <= 199) {
      return 82;
    } else {
      return 85;
    }
  };

  const currentStep = Math.floor(points / step);
  const percentage = (points % step) / step;
  const barWidth = ((currentStep + percentage) / numBalls) * getNumber();

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <View style={[styles.bar, {width: `${barWidth}%`, maxWidth: '100%'}]} />
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
