import {useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import SectionTitle from '../../components/SectionTitle';
import {COLORS} from '../../theme/theme';
import {global} from '../../style';
import StyledInputComponent2 from '../../components/Input2';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import {useEffect} from 'react';
import CustomIcon from '../../components/CustomIcon';

const SaveAddressScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const teste = useRoute();

  //@ts-ignore
  const teste2 = teste.params?.response;

  const comeBack = () => {
    navigation.pop();
  };

  const {register, handleSubmit, setValue, control} = useForm<FieldValues>();
  const onSubmit: SubmitHandler<FieldValues> = async data => {
    console.log('data', data);
  };

  useEffect(() => {
    setValue('cep', teste2.cep);
    setValue('address', teste2.logradouro);
    setValue('district', teste2.bairro);
    setValue('city', 'São Paulo');
    setValue('state', 'SP');
  }, []);

  const handleOnChange = (value: string, id: string) => {
    setValue(id, value);
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.09, backgroundColor: COLORS.primaryBlackHex}}>
        <SectionTitle comeBack={comeBack} />
      </View>

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
