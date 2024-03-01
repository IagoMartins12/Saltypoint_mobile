import {useState} from 'react';
import {Control, Controller, FieldValues} from 'react-hook-form';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {BORDERRADIUS, COLORS, FONTSIZE} from '../../theme/theme';
import CustomIcon, {PackNames} from '../CustomIcon';
import useTheme from '../../hooks/useTheme';

interface InputProps {
  name: string;
  placeholder?: string;
  text?: string;
  control: Control<FieldValues, any>;
  isPassword?: boolean;
  icon: string;
  pack?: PackNames;
}

const StyledInputComponent: React.FC<InputProps> = ({
  control,
  name,
  placeholder,
  isPassword,
  icon,
  pack = 'MaterialCommunityIcons',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const {currentTheme} = useTheme();
  return (
    <>
      <Controller
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <View
            style={[
              styles.InputContainerComponent,
              {
                borderColor: isFocused
                  ? COLORS.primaryRedHex
                  : currentTheme === 'light'
                  ? COLORS.borderColorLight
                  : COLORS.borderColorDark,
              },
            ]}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
                borderRightWidth: 0.5,
                borderRightColor: isFocused
                  ? COLORS.primaryRedHex
                  : currentTheme === 'light'
                  ? COLORS.borderColorLight
                  : COLORS.borderColorDark,
              }}>
              <CustomIcon
                name={icon}
                size={25}
                pack={pack}
                color={
                  currentTheme === 'light'
                    ? COLORS.iconColorLight
                    : COLORS.iconColorDark
                }
              />
            </View>
            <TextInput
              placeholder={isFocused ? '' : placeholder}
              onBlur={() => {
                onBlur();
                setIsFocused(false);
              }}
              onFocus={() => setIsFocused(true)}
              onChangeText={onChange}
              placeholderTextColor={
                currentTheme === 'light'
                  ? COLORS.textColorLight
                  : COLORS.textColorDark
              }
              value={value}
              style={[
                styles.input,
                {
                  color:
                    currentTheme === 'light'
                      ? COLORS.textColorLight
                      : COLORS.textColorDark,
                },
              ]}
              secureTextEntry={isPassword}
            />
            {isFocused || value ? (
              <Text
                style={[
                  styles.placeholder,
                  {
                    color: isFocused
                      ? COLORS.primaryRedHex
                      : currentTheme === 'light'
                      ? COLORS.textColorLight
                      : COLORS.textColorDark,
                  },
                ]}>
                {placeholder}
              </Text>
            ) : null}
          </View>
        )}
        name={name}
      />
    </>
  );
};

export default StyledInputComponent;

const styles = StyleSheet.create({
  InputContainerComponent: {
    flexDirection: 'row',
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 1,
    position: 'relative',
    height: 50,
  },
  input: {
    flex: 1,
    paddingVertical: 7,
    paddingLeft: 10,
  },
  placeholder: {
    position: 'absolute',
    left: 50,
    top: -10,
    paddingHorizontal: 4,
    fontSize: FONTSIZE.size_14,
  },
});
