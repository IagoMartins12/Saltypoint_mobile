import React, {useState} from 'react';
import {Control, Controller, FieldValues} from 'react-hook-form';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import useTheme from '../../hooks/useTheme';
import MyText from '../Text';
import {COLORS} from '../../theme/theme';

export interface CepInputProps {
  name: string;
  id: string;
  control: Control<FieldValues, any>;
  disabled?: boolean;
  onChangeFunction: (value: string, id: string) => void;
}

const StyledInputComponent2: React.FC<CepInputProps> = ({
  name,
  id,
  control,
  onChangeFunction,
  disabled = false,
}) => {
  const [focus, setFocus] = useState(false);
  const {currentTheme} = useTheme();
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
      render={({field: {onChange, onBlur, value}}) => (
        <View style={styles.container}>
          <MyText style={[styles.label, focus && styles.labelFocus]}>
            {name}
          </MyText>
          <TextInput
            style={[
              styles.input,
              {
                color:
                  currentTheme === 'dark'
                    ? COLORS.textColorDark
                    : COLORS.textColorLight,
                borderColor: focus
                  ? '#FF0000'
                  : currentTheme === 'dark'
                  ? COLORS.borderColorDark
                  : COLORS.borderColorLight,
              },
              focus && styles.inputError,
            ]}
            placeholderTextColor={
              currentTheme === 'dark'
                ? COLORS.textColorDark
                : COLORS.textColorLight
            }
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
  },
  labelFocus: {
    color: '#FF0000',
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    fontSize: 18,
  },
  inputError: {
    borderBottomColor: '#FF0000',
  },
  errorText: {
    color: '#FF0000',
  },
});

export default StyledInputComponent2;
