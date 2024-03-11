import {useState} from 'react';
import {Control, Controller, FieldValues} from 'react-hook-form';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {BORDERRADIUS, COLORS, FONTSIZE} from '../../theme/theme';
import CustomIcon, {PackNames} from '../CustomIcon';
import useTheme from '../../hooks/useTheme';

interface InputProps {
  name: string;
  control: Control<FieldValues, any>;
  icon: string;
  text?: string;
  isPassword?: boolean;
  placeholder?: string;
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
  const [typeState, setTypeState] = useState(isPassword);
  const [isFocused, setIsFocused] = useState(false);
  const {currentTheme} = useTheme();
  return (
    <View
      style={{
        position: 'relative',
      }}>
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
              secureTextEntry={typeState}
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
      {isPassword ? (
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
      ) : null}
    </View>
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

  iconContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
});
