import {View, ViewStyle} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {COLORS} from '../../theme/theme';
import useTheme from '../../hooks/useTheme';
import MyText from '../Text';

interface CustomPickerStyle {
  value: string | null;
  setOnChangeDropdown: React.Dispatch<React.SetStateAction<string>>;
  arr: {
    label: string;
    value: string;
  }[];
}

const SelectComponent2: React.FC<CustomPickerStyle> = ({
  value,
  setOnChangeDropdown,
  arr,
}) => {
  const {currentTheme} = useTheme();

  const Placeholder = {label: 'Selecione um endereço', value: value};

  const viewStyle = {
    borderBottomWidth: 1,
    borderColor:
      currentTheme === 'light'
        ? COLORS.borderColorLight
        : COLORS.borderColorDark,
  };

  return (
    <View>
      <MyText style={{fontSize: 16, fontWeight: '300'}}>Bairro</MyText>
      <RNPickerSelect
        style={{
          viewContainer: viewStyle,
          placeholder: {
            fontWeight: '800',
            color:
              currentTheme === 'light'
                ? COLORS.textColorLight
                : COLORS.textColorDark,
          },
        }}
        value={value}
        onValueChange={value => setOnChangeDropdown(value)}
        placeholder={Placeholder}
        items={arr}
      />
    </View>
  );
};

export default SelectComponent2;
