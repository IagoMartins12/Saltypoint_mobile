import React, {useState} from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {formatCep} from '../../utils';

export interface CepInputProps {
  register: UseFormRegister<FieldValues>;
  handleOnChange: (value: string) => void;
  required?: boolean;
  control: Control<FieldValues, any>;
}

const CepInput: React.FC<CepInputProps> = ({
  register,
  control,
  handleOnChange,
  required = true,
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
      name="cep"
      control={control}
      rules={{required: true}}
      render={({field: {onChange, onBlur, value}}) => (
        <View style={styles.container}>
          <Text style={[styles.label, focus && styles.labelFocus]}>CEP</Text>
          <TextInput
            style={[styles.input, focus && styles.inputError]}
            placeholder="Exemplo: 05280-000"
            onChangeText={text => {
              const formattedCep = formatCep(text);
              handleOnChange(formattedCep);
              onChange(formattedCep);
              1;
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={value}
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
    marginBottom: 10,
    flex: 1,
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
  },
  inputError: {
    borderBottomColor: '#FF0000',
  },
  errorText: {
    color: '#FF0000',
  },
});

export default CepInput;
