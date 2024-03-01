import React, {useState} from 'react';
import {
  Control,
  Controller,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {formatCep} from '../../utils';
import MyText from '../Text';
import useTheme from '../../hooks/useTheme';
import {COLORS} from '../../theme/theme';

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

  const {currentTheme} = useTheme();

  return (
    <Controller
      name="cep"
      control={control}
      rules={{required: required}}
      render={({field: {onChange, onBlur, value}}) => (
        <View style={styles.container}>
          <MyText style={[styles.label, focus && styles.labelFocus]}>
            CEP
          </MyText>
          <TextInput
            style={[
              styles.input,
              {
                borderBottomColor:
                  currentTheme === 'dark'
                    ? COLORS.borderColorDark
                    : COLORS.borderColorLight,
                color:
                  currentTheme === 'dark'
                    ? COLORS.textColorDark
                    : COLORS.textColorLight,
              },
              focus && styles.inputError,
            ]}
            placeholder="Exemplo: 05280-000"
            onChangeText={text => {
              const formattedCep = formatCep(text);
              handleOnChange(formattedCep);
              onChange(formattedCep);
              1;
            }}
            placeholderTextColor={
              currentTheme === 'dark'
                ? COLORS.textColorDark
                : COLORS.textColorLight
            }
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
  },
  labelFocus: {
    color: '#FF0000',
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 2,
  },
  inputError: {
    borderBottomColor: '#FF0000',
  },
  errorText: {
    color: '#FF0000',
  },
});

export default CepInput;
