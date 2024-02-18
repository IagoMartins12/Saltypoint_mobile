import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import CepInput from '../../components/CepInput';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import SectionTitle from '../../components/SectionTitle';
import {COLORS} from '../../theme/theme';
import {global} from '../../style';
import {getAddressPerCep} from '../../services';
import Toast from 'react-native-toast-message';
import CallToast from '../../components/Toast';
import useKeyboardOpen from '../../hooks/useKeyboardOpen';
import CustomIcon from '../../components/CustomIcon';

const CepStepScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [isValid, setIsValid] = useState(false);
  const {showToast} = CallToast();
  const isOpen = useKeyboardOpen();
  const onSubmit: SubmitHandler<FieldValues> = async data => {
    const validateCpf = data.cep.replace('-', '');

    console.log('data', data);
    const response = await getAddressPerCep(validateCpf);

    console.log('response', response);
    if (response?.erro) {
      return showToast('CEP não encontrado', 'error');
      // return toast.error('CEP não encontrado');
    }

    return showToast('CEP encontrado', 'success');

    //   if (response) {
    //     setStep(STEPS.ADDRESS_INFO);
    //     // Mapeia os campos do formulário com as propriedades de CEPInfoDto
    //     const fieldMappings: Record<string, keyof CEPInfoDto> = {
    //       district: 'bairro',
    //       city: 'localidade',
    //       address: 'logradouro',
    //       uf: 'uf',
    //     };
    //     // Define os valores nos campos do formulário após a busca
    //     Object.keys(fieldMappings).forEach(fieldName => {
    //       const field = fieldMappings[fieldName];
    //       if (response[field]) {
    //         setValue(fieldName, response[field]);
    //       }
    //     });
    //   }
  };

  const {register, handleSubmit, setValue, control} = useForm<FieldValues>({
    defaultValues: {
      cep: '',
      district: '',
      number: '',
      complement: '',
      address: '',
      city: '',
      uf: '',
    },
  });

  const handleOnChange = (value: string) => {
    console.log('value', value);
    setValue('cep', value);
    setIsValid(value.length === 9);
  };

  const comeBack = () => {
    navigation.pop();
  };
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.09, backgroundColor: COLORS.primaryBlackHex}}>
        <SectionTitle comeBack={comeBack} />
      </View>
      <View
        style={[
          global.mainContainer,
          {
            gap: 15,
          },
        ]}>
        <View style={{width: '100%', height: isOpen ? '20%' : '12%'}}>
          <CepInput
            handleOnChange={handleOnChange}
            register={register}
            control={control}
          />
        </View>
        <View style={{gap: 10}}>
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={[
              styles.button,
              {opacity: isValid ? 1 : 0.6},
              !isValid && styles.buttonDisabled,
            ]}
            disabled={!isValid}>
            <CustomIcon
              name="magnifier"
              size={20}
              pack="SimpleLineIcons"
              color="black"
            />
            <Text style={styles.buttonText}>Buscar CEP</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <CustomIcon
              name="question"
              size={20}
              pack="SimpleLineIcons"
              color="black"
            />

            <Text style={[styles.buttonText, {fontSize: 14}]}>
              Não sei meu cep
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 20,
  },
  button: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#FF6347',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 5,
    color: '#fff',
  },
});

export default CepStepScreen;
