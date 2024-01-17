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
import CustomIcon from '../CustomIcon';

interface InputProps {
  name: string;
  placeholder?: string;
  text?: string;
  control: Control<FieldValues, any>;
  isPassword?: boolean;
}

const StyledInputComponent: React.FC<InputProps> = ({
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
              },
            ]}>
            {/* <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
                borderRightWidth: 0.25,
              }}>
              <CustomIcon name="settings" size={25} pack="Feather" />
            </View> */}
            <TextInput
              placeholder={isFocused ? '' : placeholder}
              onBlur={() => {
                onBlur();
                setIsFocused(false);
              }}
              onFocus={() => setIsFocused(true)}
              onChangeText={onChange}
              value={value}
              style={styles.input}
              secureTextEntry={isPassword}
            />
            {isFocused || value ? (
              <Text
                style={[
                  styles.placeholder,
                  {
                    color: isFocused ? 'blue' : '#000000',
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
    borderWidth: 0.5,
    position: 'relative',
  },
  input: {
    flex: 1,
    paddingVertical: 7,
    paddingLeft: 10,
  },
  placeholder: {
    position: 'absolute',
    left: 10,
    top: -10,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    fontSize: FONTSIZE.size_14,
  },
});
