import {Control, Controller, FieldValues} from 'react-hook-form';
import {StyleProp, Text, TextInput, View, ViewStyle} from 'react-native';

interface InputProps {
  name: string;
  placeholder?: string;
  text: string;
  control: Control<FieldValues, any>;
  style: StyleProp<ViewStyle>;
  isPassword?: boolean;
}
export const InputComponent: React.FC<InputProps> = ({
  control,
  name,
  text,
  placeholder,
  style,
  isPassword = false,
}) => {
  return (
    <View>
      <Text>{text} </Text>
      <Controller
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <View style={style}>
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
