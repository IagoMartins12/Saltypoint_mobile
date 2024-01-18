import {StyleSheet, View} from 'react-native';
import RNPickerSelect, {PickerStyle} from 'react-native-picker-select';
import {BORDERRADIUS, COLORS, FONTSIZE} from '../../theme/theme';
import CustomIcon from '../CustomIcon';
import {useState} from 'react';

interface CustomPickerStyle extends PickerStyle {
  // Adicione quaisquer propriedades personalizadas que você precise
}

const SelectComponent = () => {
  const [isFocused, setIsFocused] = useState(false);

  const CustomSelectIcon = () => {
    return (
      <View>
        <CustomIcon name={'settings'} size={25} pack="Feather" />
      </View>
    );
  };

  const Placeholder = {label: 'Selecione um endereço', value: null};

  return (
    <View>
      <RNPickerSelect
        style={{
          //   inputAndroid: styles.inputAndroid,

          viewContainer: styles.inputAndroid,
          iconContainer: {
            width: '10%',
            height: '100%',
            left: 10,
            borderRightColor: isFocused
              ? COLORS.primaryRedHex
              : COLORS.primaryBlackHex,
            borderRightWidth: 0.5,
            justifyContent: 'center',
          },
          placeholder: {
            marginLeft: 40,
          },
          inputAndroid: {
            marginLeft: 40,
          },
        }}
        //@ts-ignore
        Icon={CustomSelectIcon}
        onValueChange={value => console.log(value)}
        placeholder={Placeholder}
        items={[
          {label: 'Football', value: 'football'},
          {label: 'Baseball', value: 'baseball'},
          {label: 'Hockey', value: 'hockey'},
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
    borderWidth: 0.5,
    position: 'relative',
  },
});
