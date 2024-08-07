import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE} from '../theme/theme';
import {useForm} from 'react-hook-form';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  ScrollView,
  State,
} from 'react-native-gesture-handler';
import PizzaAnimation from '../components/Lottie/PizzaAnimation';
import StyledInputComponent from '../components/Input';
import {global} from '../style';
import useTheme from '../hooks/useTheme';
import MyText from '../components/Text';
import {createUser} from '../services';
import {CreateUserDto} from '../types/Dtos';
import useShowToast from '../hooks/customHooks/useShowToast';
import {useState} from 'react';
import LoadingIndicator from '../components/Loading';

const RegisterScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [loading, setLoading] = useState(false);
  const {control, handleSubmit, reset} = useForm();
  const {currentTheme} = useTheme();
  const {showToast} = useShowToast();
  const onSubmit = async data => {
    const createUserDto = data as CreateUserDto;
    setLoading(true);
    const response = await createUser(createUserDto);

    if (response.status === 400) {
      setLoading(false);
      return showToast(response.data.message, 'success');
    } else if (response.status === 201) {
      setLoading(false);
      showToast('Conta criada com sucesso!', 'success');
      navigation.navigate('Login');
      reset();
    } else {
      setLoading(false);
      showToast('Erro ao realizar cadastro!', 'error');
    }
  };

  const buttonPressHandler = () => {
    navigation.push('Login');
  };

  const onSwipeRight = () => {
    // Navegar para a página desejada
    navigation.navigate('Main');
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <PanGestureHandler
        onHandlerStateChange={({nativeEvent}) => {
          if (
            nativeEvent.state === State.END &&
            nativeEvent.translationX > 50
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
            <PizzaAnimation />
          </View>
          <View style={styles.subContainer}>
            <View style={styles.brandwView}>
              <MyText style={styles.brandwViewText}>Bem-vindo!</MyText>
              <MyText style={styles.brandwViewSubText}>
                Se cadastre para realizar os seus pedidos
              </MyText>
            </View>
            <View style={styles.bottomView}>
              {/* Form  */}
              <View style={styles.mainContainer}>
                <StyledInputComponent
                  control={control}
                  name="name"
                  placeholder="Nome: "
                  icon="user"
                  pack="Feather"
                />

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

                <View style={styles.buttonDiv}>
                  <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    style={global.buttonStyle}>
                    {loading ? (
                      <LoadingIndicator />
                    ) : (
                      <MyText style={{color: '#FFFFFF'}}>Registrar</MyText>
                    )}
                  </TouchableOpacity>
                </View>

                <View style={styles.registerText}>
                  <MyText style={{fontSize: 16}} numberLines={1}>
                    Já possui conta?{' '}
                    <MyText
                      style={{
                        color: COLORS.primaryBlue,
                        textDecorationLine: 'underline',
                        fontSize: 16,
                      }}
                      onPress={buttonPressHandler}>
                      Faça o login
                    </MyText>
                  </MyText>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  loginMainView: {
    flex: 1,
  },

  scrollViewContentContainer: {
    flexGrow: 1,
  },

  imageContainer: {
    height: Dimensions.get('screen').height * 0.3,
    maxHeight: Dimensions.get('screen').height * 0.3,
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
