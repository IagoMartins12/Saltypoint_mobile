import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import {Controller, useForm} from 'react-hook-form';
import {InputComponent} from '../components/Input';

const RegisterScreen = ({navigation}: any) => {
  const {control, handleSubmit} = useForm();
  const onSubmit = (data: any) => console.log(data);

  const buttonPressHandler = () => {
    navigation.push('Login');
  };

  return (
    <View style={styles.loginMainView}>
      <ImageBackground
        style={styles.bgStyle}
        source={require('../assets/pizzaBg.jpg')}>
        <View style={styles.brandwView}>
          <Text style={styles.brandwViewText}> Salty Point</Text>
        </View>
      </ImageBackground>

      <View style={styles.subContainer}>
        <View style={styles.bottomView}>
          <View style={{padding: 40, gap: 4}}>
            <Text style={styles.WelcomeText}> Bem-vindo! </Text>
            <Text style={{textAlign: 'center'}}>
              Já possui conta?{' '}
              <Text style={styles.WelcomeSubText} onPress={buttonPressHandler}>
                Faça o login
              </Text>
            </Text>
          </View>

          {/* Form  */}
          <View style={styles.mainContainer}>
            <InputComponent
              control={control}
              name="email"
              style={styles.InputContainerComponent}
              text="Email "
              placeholder="Email: "
            />

            <InputComponent
              control={control}
              name="password"
              style={styles.InputContainerComponent}
              text="Senha "
              placeholder="Senha: "
              isPassword
            />

            <InputComponent
              control={control}
              name="confirmPassword"
              style={styles.InputContainerComponent}
              text="Confirmar senha "
              placeholder="Confirmar senha: "
              isPassword
            />

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 5,
              }}>
              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                style={styles.buttonStyle}>
                <Text style={{color: '#FFFFFF'}}>Registrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  loginMainView: {
    flex: 1,
  },

  bgStyle: {
    height: Dimensions.get('window').height / 2.5,
  },

  brandwView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  brandwViewText: {
    color: '#FFFFFF',
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
  },

  bottomView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
  },

  MainDiv: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  optinsText: {
    fontSize: FONTSIZE.size_18,
    textAlign: 'center',
  },

  WelcomeText: {
    fontSize: FONTSIZE.size_28,
    color: COLORS.primaryBlackHex,
    textAlign: 'center',
  },

  WelcomeSubText: {
    fontStyle: 'italic',
    color: 'red',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },

  mainContainer: {
    marginHorizontal: 40,
    justifyContent: 'center',
    gap: 15,
  },

  subContainer: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  InputContainerComponent: {
    flexDirection: 'row',
    borderRadius: BORDERRADIUS.radius_10,
    borderBottomColor: COLORS.primaryOrangeHex,
    borderBottomWidth: 2,
  },

  buttonStyle: {
    width: Dimensions.get('screen').width / 1.5,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryRedHex,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  forgetPasswordDiv: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  socialMainDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  socialDiv: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: 'blue',
  },
});
