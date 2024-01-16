import {useState} from 'react';
import {Control, Controller, FieldValues} from 'react-hook-form';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import {BORDERRADIUS, COLORS, FONTSIZE} from '../../theme/theme';

interface InputProps {
  name: string;
  placeholder?: string;
  text?: string;
  control: Control<FieldValues, any>;
  isPassword?: boolean;
}
export const InputComponent: React.FC<InputProps> = ({
  control,
  name,
  text,
  placeholder,
  isPassword = false,
}) => {
  return (
    <View>
      <Text>{text} </Text>
      <Controller
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <View style={styles.InputContainerComponent}>
            <TextInput
              placeholder={placeholder}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={{flex: 1, paddingTop: 5, paddingBottom: 2}}
              secureTextEntry={isPassword}
            />
          </View>
        )}
        name={name}
      />
    </View>
  );
};

export const StyledInputComponent: React.FC<InputProps> = ({
  control,
  name,
  placeholder,
  isPassword,
}) => {
  const [isFocused, setIsFocused] = useState(false);

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
                borderColor: isFocused ? 'blue' : 'black',
                borderWidth: 0.5,
                position: 'relative',
              },
            ]}>
            <TextInput
              placeholder={isFocused ? '' : placeholder}
              onBlur={() => {
                onBlur();
                setIsFocused(false);
              }}
              onFocus={() => setIsFocused(true)}
              onChangeText={onChange}
              value={value}
              style={{flex: 1, paddingVertical: 7, paddingLeft: 10}}
              secureTextEntry={isPassword}
            />
            {isFocused || value ? (
              <Text
                style={{
                  position: 'absolute',
                  left: 6,
                  top: -10,
                  backgroundColor: 'white',
                  paddingHorizontal: 4,
                  fontSize: FONTSIZE.size_14,
                  color: isFocused ? 'blue' : '#000000',
                }}>
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

const styles = StyleSheet.create({
  InputContainerComponent: {
    flexDirection: 'row',
    borderRadius: BORDERRADIUS.radius_10,
  },
});
