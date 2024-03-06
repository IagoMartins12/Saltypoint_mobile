import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
import useKeyboardOpen from '../hooks/useKeyboardOpen';
import {global} from '../style';
import useTheme from '../hooks/useTheme';
import MyText from '../components/Text';

const RegisterScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const {control, handleSubmit} = useForm();
  const {currentTheme} = useTheme();
  const onSubmit = (data: any) => console.log(data);
  const isKeyboardVisible = useKeyboardOpen();

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

                <StyledInputComponent
                  control={control}
                  name="confirmPassword"
                  placeholder="Confirme a senha: "
                  icon="asterisk"
                  isPassword
                />

                <View style={styles.buttonDiv}>
                  <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    style={global.buttonStyle}>
                    <Text style={{color: '#FFFFFF'}}>Registrar</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.registerText}>
                  <MyText textSize="mediumText2">
                    Já possui conta?{' '}
                    <MyText
                      style={{
                        color: COLORS.primaryBlue,
                        textDecorationLine: 'underline',
                        fontSize: 16,
                      }}
                      textSize="mediumText2"
                      onPress={buttonPressHandler}>
                      {' '}
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
