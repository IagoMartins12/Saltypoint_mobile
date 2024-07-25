import {StyleSheet, Text, TextInput, View} from 'react-native';
import MyText from '../Text';
import useTheme from '../../hooks/useTheme';
import {COLORS} from '../../theme/theme';

interface teste {
  label?: string;
  setObservation: React.Dispatch<React.SetStateAction<string>>;
}
const TextAreaComponent: React.FC<teste> = ({label, setObservation}) => {
  const {currentTheme} = useTheme();
  return (
    <View
      style={{
        flex: 1,
        gap: 15,
      }}>
      <MyText>{label}</MyText>
      <TextInput
        onChangeText={text => {
          setObservation(text);
        }}
        style={[
          styles.input,
          {
            borderColor:
              currentTheme === 'dark'
                ? COLORS.borderColorDark
                : COLORS.borderColorLight,
            color:
              currentTheme === 'light'
                ? COLORS.textColorLight
                : COLORS.textColorDark,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
});

export default TextAreaComponent;
