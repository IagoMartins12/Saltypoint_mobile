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
import {InputComponent, StyledInputComponent} from '../components/Input';
import CustomIcon from '../components/CustomIcon';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import PizzaAnimation from '../components/Lottie/PizzaAnimation';

const RegisterScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const {control, handleSubmit} = useForm();
  const onSubmit = (data: any) => console.log(data);

  const buttonPressHandler = () => {
    navigation.push('Login');
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
            nativeEvent.translationX > 50
          ) {
            onSwipeRight();
          }
        }}>
        <View style={styles.loginMainView} collapsable>
          <View style={styles.imageContainer}>
            <PizzaAnimation />
            <View style={styles.brandwView}>
              <Text style={styles.brandwViewText}>Bem-vindo!</Text>
              <Text style={styles.brandwViewSubText}>
                Se cadastre para realizar os seus pedidos
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
                  text="Email "
                  placeholder="Email: "
                />

                <StyledInputComponent
                  control={control}
                  name="Senha"
                  text="Senha "
                  placeholder="Senha: "
                  isPassword
                />

                <StyledInputComponent
                  control={control}
                  name="confirmPassword"
                  text="Confirme a senha "
                  placeholder="Confirme a senha: "
                  isPassword
                />

                <View style={styles.buttonDiv}>
                  <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    style={styles.buttonStyle}>
                    <Text style={{color: '#FFFFFF'}}>Registrar</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.registerText}>
                  <Text>
                    Já possui conta?{' '}
                    <Text
                      style={{
                        color: '#031475',
                        textDecorationLine: 'underline',
                      }}
                      onPress={buttonPressHandler}>
                      Faça o login
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
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
