import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

import CepInput from '../../components/CepInput';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import SectionTitle from '../../components/SectionTitle';
import {global} from '../../style';
import {getAddressPerCep} from '../../services';
import CallToast from '../../components/Toast';
import CustomIcon from '../../components/CustomIcon';
import useTheme from '../../hooks/useTheme';
import {COLORS} from '../../theme/theme';

const CepStepScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [isValid, setIsValid] = useState(false);
  const {showToast} = CallToast();
  const onSubmit: SubmitHandler<FieldValues> = async data => {
    const validateCpf = data.cep.replace('-', '');

    const response = await getAddressPerCep(validateCpf);

    if (response?.erro) {
      return showToast('CEP não encontrado', 'error');
      // return toast.error('CEP não encontrado');
    }

    navigation.navigate('SaveAddress', {response});

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

  const goToGeoAddress = () => {
    navigation.navigate('GeoAddress');
  };

  const {currentTheme} = useTheme();

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
    setIsValid(value.length === 9);
    setValue('cep', value);
  };

  const comeBack = () => {
    navigation.pop();
  };
  return (
    <View style={{flex: 1}}>
      <SectionTitle comeBack={comeBack} />
      <ScrollView
        style={[
          global.mainContainer,
          {
            backgroundColor:
              currentTheme === 'light'
                ? COLORS.backgroundColorLight
                : COLORS.backgroundColorDark,
          },
        ]}>
        <View style={{width: '100%'}}>
          <CepInput
            handleOnChange={handleOnChange}
            register={register}
            control={control}
          />
        </View>
        <View style={{gap: 10, marginTop: 10}}>
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={[
              global.notRoundedButton,
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
            <Text style={global.notRoundedButtonText}>Buscar CEP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={global.notRoundedButton}
            onPress={goToGeoAddress}>
            <CustomIcon
              name="question"
              size={20}
              pack="SimpleLineIcons"
              color="black"
            />

            <Text style={[global.notRoundedButtonText, {fontSize: 14}]}>
              Não sei meu cep
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 20,
  },

  buttonDisabled: {
    opacity: 0.6,
  },
});

export default CepStepScreen;
