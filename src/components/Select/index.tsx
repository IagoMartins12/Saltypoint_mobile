import {StyleSheet, View, ViewStyle} from 'react-native';
import RNPickerSelect, {PickerStyle} from 'react-native-picker-select';
import {BORDERRADIUS, COLORS, FONTSIZE} from '../../theme/theme';
import CustomIcon from '../CustomIcon';
import {useState} from 'react';
import useTheme from '../../hooks/useTheme';

interface CustomPickerStyle extends PickerStyle {
  // Adicione quaisquer propriedades personalizadas que você precise
}

const SelectComponent = () => {
  const [isFocused, setIsFocused] = useState(false);

  const {currentTheme} = useTheme();
  const CustomSelectIcon = () => {
    return (
      <CustomIcon
        name={'settings'}
        size={25}
        pack="Feather"
        color={
          currentTheme === 'light'
            ? COLORS.iconColorLight
            : COLORS.iconColorDark
        }
      />
    );
  };

  const Placeholder = {label: 'Selecione um endereço', value: null};

  const viewStyle: ViewStyle = {
    height: 50,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 1,
    position: 'relative',
    borderColor: isFocused
      ? COLORS.primaryRedHex
      : currentTheme === 'light'
      ? COLORS.borderColorLight
      : COLORS.borderColorDark,
  };

  return (
    <View>
      <RNPickerSelect
        style={{
          inputAndroidContainer: {
            backgroundColor: '#693b3b',
          },
          viewContainer: viewStyle,
          iconContainer: {
            width: '10%',
            height: '100%',
            left: 10,
            borderRightColor: isFocused
              ? COLORS.primaryRedHex
              : currentTheme === 'light'
              ? COLORS.borderColorLight
              : COLORS.borderColorDark,
            borderRightWidth: 0.5,
            justifyContent: 'center',
          },
          placeholder: {
            marginLeft: 40,
          },
          inputAndroid: {
            marginLeft: 40,
          },
          modalViewTop: {
            backgroundColor: '#FFFFFF', // Defina a cor do background do modal aqui
          },
        }}
        //@ts-ignore
        Icon={CustomSelectIcon}
        onValueChange={value => console.log(value)}
        placeholder={Placeholder}
        itemStyle={{
          backgroundColor: '#FFFFFF',
        }}
        items={[
          {
            label: 'Football',
            value: 'football',
          },
          {
            label: 'Baseball',
            value: 'baseball',
          },
          {
            label: 'Hockey',
            value: 'hockey',
          },
        ]}
      />
    </View>
  );
};

export default SelectComponent;

const styles = StyleSheet.create<CustomPickerStyle>({
  inputAndroid: {
    // backgroundColor: '#000000',
    height: 50,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 1,
    position: 'relative',
  },
});
