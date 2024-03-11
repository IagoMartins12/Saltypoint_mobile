import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useCallback} from 'react';
import {COLORS, FONTFAMILY, FONTSIZE} from '../theme/theme';
import {useForm} from 'react-hook-form';
import LoginAnimation from '../components/Lottie/LoginAnimation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  ScrollView,
  State,
} from 'react-native-gesture-handler';
import StyledInputComponent from '../components/Input';
import {global} from '../style';
import LargeButton from '../components/Button';
import useTheme from '../hooks/useTheme';
import MyText from '../components/Text';
import {LoginUserDto} from '../types/Dtos';
import {loginUser} from '../services';
import useAuth from '../hooks/auth/useAuth';
import CallToast from '../components/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const {control, handleSubmit, reset} = useForm();
  const auth = useAuth();
  const {showToast} = CallToast();
  const {currentTheme} = useTheme();

  const setUserLocalStorage = async (acessToken: string) => {
    auth.setToken(acessToken);
    await AsyncStorage.setItem('secret', JSON.stringify(acessToken));
    auth.setIsLogged();
  };

  const onSubmit = async (data: any) => {
    const loginUserDto = data as LoginUserDto;
    const response = await loginUser(loginUserDto);
    console.log('response', response);
    if (response.status === 400 || response.status === 401) {
      return showToast(response.data.message, 'error');
    } else if (response.status === 200) {
      showToast('Login feito com sucesso!', 'success');
      setUserLocalStorage(response.data.access_token);
      navigation.push('Tab');
      reset();
    } else {
      showToast('Erro ao realizar login!', 'error');
    }
  };

  const buttonPressHandler = useCallback(() => {
    navigation.push('Register');
  }, [navigation]);

  const navigateForgetPassword = () => {
    navigation.push('ForgetPassword');
  };

  const onSwipeRight = useCallback(() => {
    navigation.navigate('Main');
  }, [navigation]);

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
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[
            styles.loginMainView,
            {
              backgroundColor:
                currentTheme === 'light'
                  ? COLORS.backgroundColorLight
                  : COLORS.backgroundColorDark,
            },
          ]}>
          <View style={[styles.imageContainer]}>
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
              <View style={styles.mainContainer}>
                <StyledInputComponent
                  control={control}
                  name="email"
                  placeholder="Email: "
                  icon="email-outline"
                />

                <StyledInputComponent
                  control={control}
                  name="password"
                  placeholder="Senha: "
                  icon="asterisk"
                  isPassword
                />

                <Pressable
                  style={styles.forgetPasswordDiv}
                  onPress={navigateForgetPassword}>
                  <MyText
                    style={{textDecorationLine: 'underline'}}
                    textSize="mediumText2">
                    Esqueci minha senha
                  </MyText>
                </Pressable>

                <View style={styles.buttonDiv}>
                  <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    style={global.buttonStyle}>
                    <Text style={{color: '#FFFFFF'}}>Continuar</Text>
                  </TouchableOpacity>
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

                    <MyText textSize="mediumText2">Continuar com Google</MyText>
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
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
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
    height: Dimensions.get('screen').height * 0.3,
    maxHeight: Dimensions.get('screen').height * 0.3,
  },
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

  bottomView: {},

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
