import {
  Dimensions,
  Image,
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
import useKeyboardOpen from '../hooks/useKeyboardOpen';
import {global} from '../style';
import LargeButton from '../components/Button';
import useTheme from '../hooks/useTheme';
import MyText from '../components/Text';

const LoginScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const {control, handleSubmit} = useForm();
  const onSubmit = (data: any) => console.log(data);

  const buttonPressHandler = useCallback(() => {
    navigation.push('Register');
  }, [navigation]);

  const isKeyboardVisible = useKeyboardOpen();

  const onSwipeRight = useCallback(() => {
    navigation.navigate('Main');
  }, [navigation]);

  const {currentTheme} = useTheme();
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
        <View
          style={[
            styles.loginMainView,
            {
              backgroundColor:
                currentTheme === 'light'
                  ? COLORS.backgroundColorLight
                  : COLORS.backgroundColorDark,
            },
          ]}>
          <View
            style={[
              styles.imageContainer,
              {flex: isKeyboardVisible ? 0.75 : 0.5},
            ]}>
            <LoginAnimation />
          </View>
          <View style={[styles.subContainer]}>
            <View style={styles.brandwView}>
              <MyText style={styles.brandwViewText}>
                Bem-vindo de volta!{' '}
              </MyText>
              <MyText style={styles.brandwViewSubText}>
                Faça o login para se autenticar e realizar o seu pedido
              </MyText>
            </View>
            <View style={styles.bottomView}>
              {/* Form  */}

              <View style={styles.mainContainer}>
                <StyledInputComponent
                  control={control}
                  name="Email"
                  placeholder="Email: "
                  icon="email-outline"
                />

                <StyledInputComponent
                  control={control}
                  name="Senha"
                  placeholder="Senha: "
                  icon="asterisk"
                  isPassword
                />

                <View style={styles.forgetPasswordDiv}>
                  <MyText
                    style={{textDecorationLine: 'underline'}}
                    textSize="mediumText2">
                    Esqueci minha senha
                  </MyText>
                </View>

                <View>
                  <View style={styles.buttonDiv}>
                    <LargeButton
                      handleSubmit={handleSubmit}
                      onSubmit={onSubmit}
                      text="Continuar"
                    />

                    {!isKeyboardVisible ? (
                      <>
                        <TouchableOpacity
                          onPress={handleSubmit(onSubmit)}
                          style={global.buttonStyleWhite}>
                          <View
                            style={{
                              height: 25,
                              width: 25,
                              marginRight: 10,
                            }}>
                            <Image
                              source={require('../assets/googleIcon.png')}
                              style={{
                                height: '100%',
                                width: '100%',
                              }}
                            />
                          </View>

                          <MyText
                            style={{
                              color:
                                currentTheme === 'dark'
                                  ? COLORS.textColorDark
                                  : COLORS.textColorLight,
                            }}
                            textSize="mediumText2">
                            Continuar com Google
                          </MyText>
                        </TouchableOpacity>
                        <View style={styles.registerText}>
                          <MyText textSize="mediumText2">
                            Não possui conta?{' '}
                            <MyText
                              style={{
                                color: COLORS.primaryBlue,
                                textDecorationLine: 'underline',
                                fontSize: 16,
                              }}
                              onPress={buttonPressHandler}>
                              Se cadastre
                            </MyText>
                          </MyText>
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

  imageContainer: {},
  brandwView: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  brandwViewText: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontWeight: '700',
  },

  brandwViewSubText: {
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_medium,
    textAlign: 'center',
    paddingHorizontal: 60,
  },

  bottomView: {
    flex: 1,
  },

  mainContainer: {
    marginHorizontal: 40,
    justifyContent: 'center',
    gap: 15,
    paddingVertical: 25,
  },

  subContainer: {
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
});
