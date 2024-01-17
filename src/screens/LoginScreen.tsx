import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE} from '../theme/theme';
import {useForm} from 'react-hook-form';
import LoginAnimation from '../components/Lottie/LoginAnimation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import StyledInputComponent from '../components/Input';

const LoginScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [isKeyboadVisible, setIsKeyboadVisible] = useState(false);
  const {control, handleSubmit} = useForm();
  const onSubmit = (data: any) => console.log(data);

  const buttonPressHandler = useCallback(() => {
    navigation.push('Register');
  }, [navigation]);

  const onSwipeRight = useCallback(() => {
    navigation.navigate('MainScreen');
  }, [navigation]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboadVisible(true);
        console.log('Keyboard is visible');
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboadVisible(false);
        console.log('Keyboard is hidden');
      },
    );

    // Clean up listeners on component unmount
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  console.log('keyboard', isKeyboadVisible);

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
        <View style={styles.loginMainView}>
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
                <StyledInputComponent
                  control={control}
                  name="Email"
                  placeholder="Email: "
                />

                <StyledInputComponent
                  control={control}
                  name="Senha"
                  placeholder="Senha: "
                  isPassword
                />

                <View style={styles.forgetPasswordDiv}>
                  <Text style={{textDecorationLine: 'underline'}}>
                    Esqueci minha senha
                  </Text>
                </View>

                <View>
                  <View style={styles.buttonDiv}>
                    <TouchableOpacity
                      onPress={handleSubmit(onSubmit)}
                      style={styles.buttonStyle}>
                      <Text style={{color: '#FFFFFF'}}>Continuar</Text>
                    </TouchableOpacity>

                    {!isKeyboadVisible ? (
                      <>
                        <TouchableOpacity
                          onPress={handleSubmit(onSubmit)}
                          style={styles.googleButton}>
                          <Text style={{color: '#000000'}}>
                            Continuar com Google
                          </Text>
                        </TouchableOpacity>
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
                      </>
                    ) : null}
                  </View>
                </View>
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
