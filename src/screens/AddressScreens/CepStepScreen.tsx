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
import LoadingIndicator from '../../components/Loading';

const CepStepScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const {showToast} = CallToast();

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    setLoading(true);
    const validateCpf = data.cep.replace('-', '');

    const response = await getAddressPerCep(validateCpf);

    if (response?.erro) {
      setLoading(false);
      return showToast('CEP não encontrado', 'error');
      // return toast.error('CEP não encontrado');
    }
    setLoading(false);
    navigation.navigate('SaveAddress', {response});
  };

  const goToGeoAddress = () => {
    navigation.navigate('GeoAddress');
  };

  const {currentTheme} = useTheme();

  const {handleSubmit, setValue, control} = useForm();

  const handleOnChange = (value: string) => {
    setIsValid(value.length === 9);
    setValue('cep', value);
  };

  const comeBack = () => {
    navigation.navigate('Settings');
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
        <CepInput handleOnChange={handleOnChange} control={control} />
        <View style={{gap: 10, marginTop: 10}}>
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={[
              global.notRoundedButton,
              {opacity: isValid ? 1 : 0.6},
              !isValid && styles.buttonDisabled,
            ]}
            disabled={!isValid}>
            {loading ? (
              <LoadingIndicator />
            ) : (
              <>
                <CustomIcon
                  name="magnifier"
                  size={20}
                  pack="SimpleLineIcons"
                  color="black"
                />
                <Text style={global.notRoundedButtonText}>Buscar CEP</Text>
              </>
            )}
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
