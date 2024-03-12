import React, {useState} from 'react';
import {Control, Controller, FieldValues} from 'react-hook-form';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {BORDERRADIUS, COLORS, FONTSIZE} from '../../theme/theme';
import CustomIcon, {PackNames} from '../CustomIcon';
import useTheme from '../../hooks/useTheme';
import MyText from '../Text';

interface InputProps {
  name: string;
  control: Control<FieldValues, any>;
  icon: string;
  isPassword?: boolean;
  placeholder?: string;
  pack?: PackNames;
  disabled?: boolean;
}

const StyledInputComponent: React.FC<InputProps> = ({
  control,
  name,
  placeholder,
  isPassword,
  icon,
  disabled,
  pack = 'MaterialCommunityIcons',
}) => {
  const [typeState, setTypeState] = useState(isPassword);
  const [isFocused, setIsFocused] = useState(false);
  const {currentTheme} = useTheme();

  const inputStyle = [
    styles.input,
    {
      color:
        currentTheme === 'light' ? COLORS.textColorLight : COLORS.textColorDark,
    },
  ];

  return (
    <View style={{position: 'relative'}}>
      <Controller
        disabled={disabled}
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
              style={inputStyle}
              secureTextEntry={typeState}
              editable={!disabled} // <-- Desativa o campo se disabled for verdadeiro
            />
            {(isFocused || value) && (
              <MyText
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
              </MyText>
            )}
          </View>
        )}
        name={name}
      />
      {isPassword && (
        <Pressable
          style={styles.iconContainer}
          onPress={() => {
            setTypeState(!typeState);
          }}>
          <CustomIcon
            name={typeState ? 'eye' : 'eye-with-line'}
            pack="Entypo"
            size={20}
          />
        </Pressable>
      )}
    </View>
  );
};

export default StyledInputComponent;

const styles = StyleSheet.create({
  InputContainerComponent: {
    flexDirection: 'row',
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 0.75,
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
    fontWeight: 'bold',
    zIndex: 50,
    paddingHorizontal: 4,
    fontSize: FONTSIZE.size_14,
  },

  iconContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
});
