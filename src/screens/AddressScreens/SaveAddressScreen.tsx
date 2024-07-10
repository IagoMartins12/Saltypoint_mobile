import {useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import SectionTitle from '../../components/SectionTitle';
import {global} from '../../style';
import StyledInputComponent2 from '../../components/Input2';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import {useEffect, useState} from 'react';
import {Result} from '../../types/GeolocationType';
import useTheme from '../../hooks/useTheme';
import {COLORS} from '../../theme/theme';
import {checkIfAddressIsValid} from '../../utils';
import {User, User_Adress} from '../../types/ModelsType';
import CustomIcon from '../../components/CustomIcon';
import MyText from '../../components/Text';
import {sendAddressUser, updatedMe} from '../../services';
import {UpdateUserDto} from '../../types/Dtos';
import usePrivateStore from '../../hooks/store/usePrivateStore';
import CepInput from '../../components/CepInput';
import SelectComponent2 from '../../components/Select2';
import LoadingIndicator from '../../components/Loading';
import useShowToast from '../../hooks/customHooks/useShowToast';

export const onlyDistrict = ['sublocality', 'postal_code'];

const addressArr = [
  {
    label: 'Sol nascente',
    value: 'Sol nascente',
  },
  {
    label: 'Décima área',
    value: 'Décima área',
  },
  {
    label: 'Vila sulina',
    value: 'Vila sulina',
  },
];
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
  const [loading, setLoading] = useState(false);
  const [typeAddress, setTypeAddress] = useState(null);
  const [onChangeDropdown, setOnChangeDropdown] = useState<null | string>(null);

  const {currentTheme} = useTheme();
  const teste = useRoute();

  const iconsArr = [
    {
      icon: 'home',
      name: 'Casa',
    },
    {
      icon: 'briefcase',
      name: 'Trabalho',
    },
  ];
  //@ts-ignore
  const response = teste.params?.response;
  //@ts-ignore
  const geometryResponse = teste.params?.result;

  const {showToast} = useShowToast();
  const {setAddress, address, user, setUser} = usePrivateStore();

  const {handleSubmit, setValue, control, reset} = useForm<FieldValues>({
    defaultValues: {
      reference: '',
      cep: '',
    },
  });

  const comeBack = () => {
    navigation.pop();
  };

  const setUserWithCallback = (callback: (user: User) => User) => {
    if (!user) return;

    const updatedUser = callback(user);

    setUser(updatedUser);
  };

  const checkEmptyCamps = (data: any) => {
    let requiredFields = ['address', 'number', 'city', 'uf'];

    if (response) {
      requiredFields.push('district');
    }
    const missingFields = requiredFields.filter(field => !data[field]);
    // Se houver campos obrigatórios em falta, exibir um toast informando o usuário
    if (missingFields.length > 0) {
      const missingFieldsNames = missingFields.map(field => {
        switch (field) {
          case 'address':
            return 'Endereço';
          case 'number':
            return 'Número';
          case 'district':
            return 'Bairro';
          case 'city':
            return 'Cidade';
          case 'uf':
            return 'Estado';
          default:
            return '';
        }
      });
      const message = `Preencha os campos: ${missingFieldsNames.join(', ')}.`;
      return message;
    }
  };
  const onSubmit: SubmitHandler<FieldValues> = async data => {
    if (typeAddress === null) {
      return showToast('Selecione o tipo de endereço.', 'error');
    }

    if (!response && onChangeDropdown === null) {
      return showToast('Selecione o bairro.', 'error');
    }
    const message = checkEmptyCamps(data);

    if (message) {
      return showToast(message, 'error');
    }
    const checkAddress = checkIfAddressIsValid(
      response ? data.district : onChangeDropdown,
    );
    if (!checkAddress)
      return showToast(
        'Esse bairro não está na nossa área de entrega.',
        'error',
      );

    setLoading(true);
    const object = {
      address: data.address,
      cep: data.cep !== '' || !data.cep !== undefined ? data.cep : null,
      number: data.number,
      reference: data.reference !== '' ? data.reference : '',
      district: response ? data.district : onChangeDropdown,
      city: data.city,
      uf: data.uf,
      type_adress: typeAddress,
    } as User_Adress;

    const myResponse = await sendAddressUser(object);

    if (myResponse.status === 201) {
      setAddress([...address, myResponse.data]);

      const object = {
        user_Adress_id: myResponse.data.id,
      } as UpdateUserDto;

      await updatedMe(object);

      setUserWithCallback(oldUser => ({
        ...oldUser,
        user_Adress_id: myResponse.data.id,
      }));

      navigation.push('Address');
      setLoading(false);
      reset();
      return showToast('Endereço criado!', 'success');
    } else {
      setLoading(false);
      return showToast('Erro ao cadastrar endereço', 'error');
    }
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
    }

    if (geometryResponse) {
      setValuesGeometry(geometryResponse);
    }

    setValue('city', 'São Paulo');
    setValue('uf', 'SP');
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
            backgroundColor:
              currentTheme === 'light'
                ? COLORS.backgroundColorLight
                : COLORS.backgroundColorDark,
          },
        ]}>
        <View
          style={{
            flex: 1,
            gap: 20,
          }}>
          {response || geometryResponse ? (
            <CepInput
              handleOnChange={handleOnChange}
              control={control}
              required={false}
            />
          ) : null}

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

          {response ? (
            <StyledInputComponent2
              name="Bairro"
              id="district"
              control={control}
              onChangeFunction={handleOnChange}
            />
          ) : (
            <SelectComponent2
              setOnChangeDropdown={setOnChangeDropdown}
              value={onChangeDropdown}
              arr={addressArr}
            />
          )}
          <StyledInputComponent2
            name="Referência"
            id="reference"
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
            id="uf"
            control={control}
            onChangeFunction={handleOnChange}
            disabled
          />
        </View>

        <View style={styles.iconContainer}>
          {iconsArr.map((icon, i) => (
            <View key={i} style={styles.iconBox}>
              <CustomIcon name={icon.icon} size={25} pack="Feather" />
              <MyText style={{fontSize: 18}}> {icon.name}</MyText>
              <TouchableOpacity
                style={[
                  styles.roundedButton,
                  {
                    backgroundColor:
                      typeAddress === i
                        ? COLORS.secondaryRed
                        : COLORS.primaryGray,
                  },
                ]}
                onPress={() => {
                  setTypeAddress(i);
                }}>
                <View
                  style={[
                    styles.insideRoundedButton,
                    {
                      backgroundColor:
                        typeAddress === i ? '#ffffff' : COLORS.primaryGray,
                    },
                  ]}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={[
            global.notRoundedButton,
            {
              marginBottom: 50,
            },
          ]}>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <MyText style={global.notRoundedButtonText}>Salvar endereço</MyText>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SaveAddressScreen;

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    gap: 25,
    justifyContent: 'center',
    marginVertical: 30,
  },

  iconBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  roundedButton: {
    marginLeft: 5,
    width: 20,
    height: 20,
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondaryRed,
  },

  insideRoundedButton: {
    width: 8,
    height: 8,
    borderRadius: 1000,
  },
});
