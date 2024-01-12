import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE} from '../theme/theme';
import {useForm} from 'react-hook-form';
import {InputComponent} from '../components/Input';
import LoginAnimation from '../components/Lottie/LoginAnimation';
import CustomIcon from '../components/CustomIcon';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';

const LoginScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const {control, handleSubmit} = useForm();
  const onSubmit = (data: any) => console.log(data);

  const buttonPressHandler = () => {
    navigation.push('Register');
  };

  const onSwipeRight = () => {
    // Navegar para a página desejada
    navigation.navigate('MainScreen');
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <PanGestureHandler
        onHandlerStateChange={({nativeEvent}) => {
          if (
            nativeEvent.state === State.END &&
            nativeEvent.translationX < 50
          ) {
            onSwipeRight();
          }
        }}>
        <View style={styles.loginMainView} collapsable>
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

                <View style={styles.buttonDiv}>
                  <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    style={styles.buttonStyle}>
                    <Text style={{color: '#FFFFFF'}}>Continuar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    style={styles.googleButton}>
                    <Text style={{color: '#000000'}}>Continuar com Google</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.registerText}>
                  <Text>
                    Não possui conta?{' '}
                    <Text
                      style={{
                        color: '#031475',
                        textDecorationLine: 'underline',
                      }}
                      onPress={buttonPressHandler}>
                      Se cadastre
                    </Text>
                  </Text>
                </View>

                <CustomIcon name="left" />
              </View>
            </View>
          </View>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
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
    bottom: 25,
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

  mainContainer: {
    marginHorizontal: 40,
    justifyContent: 'center',
    gap: 15,
    paddingVertical: 25,
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

  optinsText: {
    fontSize: FONTSIZE.size_18,
    textAlign: 'center',
  },

  forgetPasswordDiv: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  registerText: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonDiv: {
    gap: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },

  buttonStyle: {
    width: Dimensions.get('screen').width / 1.25,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryRedHex,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },

  googleButton: {
    width: Dimensions.get('screen').width / 1.25,
    borderRadius: BORDERRADIUS.radius_20,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#130241',
    borderWidth: 1.25,
  },
});
