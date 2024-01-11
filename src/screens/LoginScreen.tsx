import {
  Alert,
  Button,
  Dimensions,
  ImageBackground,
  ScrollView,
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
import LoginAnimation from '../components/Lottie/LoginAnimation';

const LoginScreen = ({navigation}: any) => {
  const {control, handleSubmit} = useForm();
  const onSubmit = (data: any) => console.log(data);

  const buttonPressHandler = () => {
    navigation.push('Register');
  };

  return (
    <View style={styles.loginMainView}>
      {/* <ImageBackground
        style={styles.bgStyle}
        source={require('../assets/pizzaBg.jpg')}>
        <View style={styles.brandwView}>
          <Text style={styles.brandwViewText}> Salty Point</Text>
        </View>
      </ImageBackground> */}

      <View style={styles.imageContainer}>
        <LoginAnimation />
        <View style={styles.brandwView}>
          <Text style={styles.brandwViewText}>Bem-vindo de volta! </Text>
          <Text style={styles.brandwViewSubText}>
            Faça o login para se autenticar e realizar o seu pedido
          </Text>
        </View>
      </View>
      <View style={styles.subContainer}>
        <View style={styles.bottomView}>
          {/* <View style={{padding: 40, gap: 4}}>
            <Text style={styles.WelcomeText}> Bem-vindo de volta! </Text>
            <Text style={{textAlign: 'center'}}>
              Não possui uma conta?{' '}
              <Text style={styles.WelcomeSubText} onPress={buttonPressHandler}>
                Se cadastre
              </Text>
            </Text>
          </View> */}

          {/* Form  */}
          <View style={styles.mainContainer}>
            <InputComponent
              control={control}
              name="Email"
              style={styles.InputContainerComponent}
              text="Email "
              placeholder="Email: "
            />

            <InputComponent
              control={control}
              name="Senha"
              style={styles.InputContainerComponent}
              text="Senha "
              placeholder="Senha: "
              isPassword
            />

            <View style={styles.forgetPasswordDiv}>
              <Text style={{textDecorationLine: 'underline'}}>
                Esqueci minha senha
              </Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                style={styles.buttonStyle}>
                <Text style={{color: '#FFFFFF'}}>Continuar</Text>
              </TouchableOpacity>
            </View>

            {/* <Text style={styles.optinsText}> Ou entre com: </Text> */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  loginMainView: {
    flex: 1,
  },

  imageContainer: {
    flex: 1,

    backgroundColor: '#FFFFFF',
  },
  brandwView: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  brandwViewText: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontWeight: '700',
    color: COLORS.primaryBlackHex,
  },

  brandwViewSubText: {
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_medium,
    textAlign: 'center',
    paddingHorizontal: 60,
    color: COLORS.primaryLightGreyHex,
  },

  bottomView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  MainDiv: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    flex: 1.5,
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

  optinsText: {
    fontSize: FONTSIZE.size_18,
    textAlign: 'center',
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
