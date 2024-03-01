import {Pressable} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import MyText from '../Text';
import {COLORS} from '../../theme/theme';
import useTheme from '../../hooks/useTheme';

type OptionsType = {
  name: string;
};
interface OptionsProps {
  options: OptionsType[];
  selectedOption: number;
  setSelectedOption: (value: React.SetStateAction<number>) => void;
}
const OptionsTittle: React.FC<OptionsProps> = ({
  options,
  selectedOption,
  setSelectedOption,
}) => {
  const {currentTheme} = useTheme();
  return (
    <View style={{width: '100%', flexDirection: 'row', gap: 5}}>
      {options.map((op, i) => (
        <Pressable
          onPress={() => setSelectedOption(i)}
          key={i}
          style={{
            width: '50%',
            paddingBottom: 10,
            borderBottomWidth: selectedOption === i ? 1 : 0,
            borderColor: selectedOption === i ? COLORS.secondaryRed : null,
          }}>
          <MyText
            style={{
              textAlign: 'center',
              color:
                selectedOption === i
                  ? COLORS.secondaryRed
                  : currentTheme === 'dark'
                  ? COLORS.textColorDark
                  : COLORS.textColorLight,
              fontSize: 16,
            }}>
            {op.name}
          </MyText>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({});

export default OptionsTittle;
