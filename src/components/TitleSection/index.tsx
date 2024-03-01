import {StyleSheet, Text, View} from 'react-native';
import {FONTSIZE} from '../../theme/theme';
import MyText from '../Text';

const TitleSection = ({title}: {title: string}) => {
  return (
    <View>
      <MyText style={styles.textStyle}> {title} </MyText>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: FONTSIZE.size_20,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default TitleSection;
