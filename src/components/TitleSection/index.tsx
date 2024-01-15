import {StyleSheet, Text, View} from 'react-native';
import {FONTSIZE} from '../../theme/theme';

const TitleSection = ({title}: {title: string}) => {
  return (
    <View>
      <Text style={styles.textStyle}> {title} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: FONTSIZE.size_28,
    fontWeight: '700',
    textAlign: 'center',
    color: '#000000',
  },
});

export default TitleSection;
