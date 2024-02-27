import {StyleSheet, Text, TextInput, View} from 'react-native';
import MyText from '../Text';

interface teste {
  label?: string;
}
const TextAreaComponent: React.FC<teste> = ({label}) => {
  return (
    <View
      style={{
        flex: 1,
        gap: 15,
      }}>
      <MyText>{label}</MyText>
      <TextInput style={styles.input} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#000000',
  },
});

export default TextAreaComponent;
