import {StyleSheet, Text, TextInput, View} from 'react-native';
import MyText from '../Text';
import useTheme from '../../hooks/useTheme';
import {COLORS} from '../../theme/theme';

interface teste {
  label?: string;
}
const TextAreaComponent: React.FC<teste> = ({label}) => {
  const {currentTheme} = useTheme();
  return (
    <View
      style={{
        flex: 1,
        gap: 15,
      }}>
      <MyText>{label}</MyText>
      <TextInput
        style={[
          styles.input,
          {
            borderColor:
              currentTheme === 'dark'
                ? COLORS.borderColorDark
                : COLORS.borderColorLight,
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
