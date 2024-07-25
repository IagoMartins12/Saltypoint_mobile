import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useCallback, useState} from 'react';
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
import useTheme from '../hooks/useTheme';
import MyText from '../components/Text';
import {LoginUserDto} from '../types/Dtos';
import {loginUser} from '../services';
import useAuth from '../hooks/auth/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useShowToast from '../hooks/customHooks/useShowToast';
import LoadingIndicator from '../components/Loading';

const LoginScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [loading, setLoading] = useState(false);
  const {control, handleSubmit, reset} = useForm();
  const auth = useAuth();
  const {showToast} = useShowToast();
  const {currentTheme} = useTheme();

  const setUserLocalStorage = async (acessToken: string) => {
    auth.setToken(acessToken);
    await AsyncStorage.setItem('secret', JSON.stringify(acessToken));
    auth.setIsLogged();
  };

  const onSubmit = async (data: any) => {
    const loginUserDto = data as LoginUserDto;
    setLoading(true);
    const response = await loginUser(loginUserDto);
    setLoading(false);
    if (response.status === 400 || response.status === 401) {
      return showToast(response.data.message, 'error');
    } else if (response.status === 200 || response.status) {
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
            <View>
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
                    style={{textDecorationLine: 'underline', fontSize: 16}}>
                    Esqueci minha senha
                  </MyText>
                </Pressable>

                <View style={styles.buttonDiv}>
                  <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    style={global.buttonStyle}>
                    {loading ? (
                      <LoadingIndicator />
                    ) : (
                      <Text style={{color: '#FFFFFF'}}>Continuar</Text>
                    )}
                  </TouchableOpacity>
                  <View style={styles.registerText}>
                    <MyText style={{fontSize: 16}}>
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
