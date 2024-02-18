import React, {useState} from 'react';
import {Control, Controller, FieldValues} from 'react-hook-form';
import {View, Text, TextInput, StyleSheet} from 'react-native';

export interface CepInputProps {
  name: string;
  id: string;
  control: Control<FieldValues, any>;
  required?: boolean;
  disabled?: boolean;
  onChangeFunction: (value: string, id: string) => void;
}

const StyledInputComponent2: React.FC<CepInputProps> = ({
  name,
  id,
  control,
  onChangeFunction,
  required = true,
  disabled = false,
}) => {
  const [focus, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  return (
    <Controller
      name={id}
      control={control}
      rules={{required: required}}
      render={({field: {onChange, onBlur, value}}) => (
        <View style={styles.container}>
          <Text style={[styles.label, focus && styles.labelFocus]}>{name}</Text>
          <TextInput
            style={[styles.input, focus && styles.inputError]}
            placeholder={name}
            onChangeText={text => {
              onChangeFunction(text, id);
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={value}
            editable={!disabled} // Definindo a propriedade editable com base em disabled
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  label: {
    fontFamily: 'Arial',
    fontSize: 16,
    fontWeight: '300',
    color: '#000',
  },
  labelFocus: {
    color: '#FF0000',
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    fontSize: 18,
    color: '#000000',
  },
  inputError: {
    borderBottomColor: '#FF0000',
  },
  errorText: {
    color: '#FF0000',
  },
});

export default StyledInputComponent2;
