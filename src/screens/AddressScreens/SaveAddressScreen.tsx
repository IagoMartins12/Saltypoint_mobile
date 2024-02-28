import {useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import SectionTitle from '../../components/SectionTitle';
import {global} from '../../style';
import StyledInputComponent2 from '../../components/Input2';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import {useEffect} from 'react';
import {Result} from '../../types/GeolocationType';

export const onlyDistrict = ['sublocality', 'postal_code'];

export const addressTypes = [
  'street_address',
  'route',
  'postal_code',
  'establishment',
  'point_of_interest',
];

const SaveAddressScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const teste = useRoute();

  //@ts-ignore
  const response = teste.params?.response;
  //@ts-ignore
  const geometryResponse = teste.params?.result;
  const comeBack = () => {
    navigation.pop();
  };

  const {register, handleSubmit, setValue, control} = useForm<FieldValues>();
  const onSubmit: SubmitHandler<FieldValues> = async data => {
    console.log('data', data);
  };

  const setValuesGeometry = (result: Result) => {
    if (result.types.some(type => type === 'route')) {
      setValue('address', result.address_components[1]?.long_name);
      setValue('cep', result.address_components[6]?.long_name);
      setValue('district', result.address_components[2]?.long_name);
      return;
    }

    if (result.types.some(type => type === 'premise')) {
      setValue('address', result.address_components[1]?.long_name);
      setValue('cep', result.address_components[6]?.long_name);
      // setValue('district', result.address_components[2].long_name);
      setValue('district', result.address_components[2]?.long_name);

      return;
    }

    if (result.types.some(type => addressTypes.includes(type))) {
      setValue('address', result.address_components[1]?.long_name);
      setValue('cep', result.address_components[0]?.long_name);
      // setValue('district', result.address_components[2]?.long_name);
    }

    if (result.types.some(type => onlyDistrict.includes(type))) {
      setValue('district', result.address_components[1]?.long_name);
    }

    setValue('city', 'São Paulo');
    setValue('state', 'SP');
  };

  useEffect(() => {
    if (response) {
      setValue('cep', response.cep);
      setValue('address', response.logradouro);
      setValue('district', response.bairro);
      setValue('city', 'São Paulo');
      setValue('state', 'SP');
    }

    if (geometryResponse) {
      setValuesGeometry(geometryResponse);
    }
  }, []);

  const handleOnChange = (value: string, id: string) => {
    setValue(id, value);
  };

  return (
    <View style={{flex: 1}}>
      <SectionTitle comeBack={comeBack} />

      <ScrollView
        style={[
          global.mainContainer,
          {
            gap: 50,
          },
        ]}>
        <View
          style={{
            flex: 1,
            gap: 20,
          }}>
          <StyledInputComponent2
            name="CEP"
            control={control}
            id="cep"
            onChangeFunction={handleOnChange}
          />

          <StyledInputComponent2
            name="Endereço"
            control={control}
            id="address"
            onChangeFunction={handleOnChange}
          />

          <StyledInputComponent2
            name="Número"
            id="number"
            control={control}
            onChangeFunction={handleOnChange}
          />

          <StyledInputComponent2
            name="Bairro"
            id="district"
            control={control}
            onChangeFunction={handleOnChange}
          />

          <StyledInputComponent2
            name="Cidade"
            id="city"
            control={control}
            onChangeFunction={handleOnChange}
            disabled
          />

          <StyledInputComponent2
            name="Estado"
            id="state"
            control={control}
            onChangeFunction={handleOnChange}
            disabled
          />
        </View>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={[
            global.notRoundedButton,
            {
              marginVertical: 20,
            },
          ]}>
          <Text style={global.notRoundedButtonText}>Salvar endereço</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SaveAddressScreen;
