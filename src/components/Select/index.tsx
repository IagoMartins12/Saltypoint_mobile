import {View, ViewStyle} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {BORDERRADIUS, COLORS} from '../../theme/theme';
import CustomIcon from '../CustomIcon';
import useTheme from '../../hooks/useTheme';
import usePrivateStore from '../../hooks/store/usePrivateStore';

interface CustomPickerStyle {
  value: string | null;
  setOnChangeDropdown: React.Dispatch<React.SetStateAction<string>>;
}

const SelectComponent: React.FC<CustomPickerStyle> = ({
  value,
  setOnChangeDropdown,
}) => {
  const {currentTheme} = useTheme();
  const {address, user} = usePrivateStore();

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

  const Placeholder = {label: 'Selecione um endereço', value: value};

  const addressArr = address.map((address, i) => {
    return {
      label: `${address.address}, ${address.number} / ${address.district}`,
      value: address.id,
    };
  });

  const viewStyle: ViewStyle = {
    height: 50,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 1,
    position: 'relative',
    borderColor:
      currentTheme === 'light'
        ? COLORS.borderColorLight
        : COLORS.borderColorDark,
  };

  return (
    <View>
      <RNPickerSelect
        style={{
          viewContainer: viewStyle,
          iconContainer: {
            width: '10%',
            height: '100%',
            left: 10,
            borderRightColor:
              currentTheme === 'light'
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
        }}
        //@ts-ignore
        Icon={CustomSelectIcon}
        onValueChange={value => setOnChangeDropdown(value)}
        placeholder={Placeholder}
        itemStyle={{
          backgroundColor: '#FFFFFF',
        }}
        items={addressArr}
      />
    </View>
  );
};

export default SelectComponent;
