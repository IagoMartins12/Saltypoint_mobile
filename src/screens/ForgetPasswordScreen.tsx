import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useCallback, useState} from 'react';
import {COLORS, FONTFAMILY, FONTSIZE} from '../theme/theme';
import {useForm} from 'react-hook-form';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import StyledInputComponent from '../components/Input';
import LargeButton from '../components/Button';
import useTheme from '../hooks/useTheme';
import MyText from '../components/Text';
import ForgetAnimation from '../components/Lottie/ForgetAnimation';
import {global} from '../style';
import {recoverPassword} from '../services';
import LoadingIndicator from '../components/Loading';
import useShowToast from '../hooks/customHooks/useShowToast';
import CustomIcon from '../components/CustomIcon';

enum STEPS {
  EMAIL = 0,
  FORGET_PASSWORD = 1,
}
const ForgetPasswordScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [step, setStep] = useState(STEPS.EMAIL);
  const [loading, setLoading] = useState(false);

  const {showToast} = useShowToast();

  const {control, handleSubmit, reset} = useForm();

  const onSubmit = async (data: any) => {
    if (!data.email.includes('@'))
      return showToast('Favor inserir email', 'error');
    try {
      setLoading(true);
      const object = {
        to: data.email,
      };

      const response = await recoverPassword(object);
      setLoading(false);
      if (response.status === 400) {
        console.log('response error', response);
        return showToast(response.data.message, 'error');
      }
      if (response.status === 201) {
        reset();
        return setStep(STEPS.FORGET_PASSWORD);
      } else {
        showToast('Erro ao enviar o email!', 'error');
      }
    } catch (error) {
      showToast('Erro ao buscar o email', 'error');
    }
  };

  const onSwipeRight = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  const comeBack = () => {
    navigation.pop();
  };

  const changePage = () => {
    setStep(STEPS.EMAIL);
    navigation.navigate('Login');
  };

  const {currentTheme} = useTheme();

  let body = (
    <View style={[styles.subContainer]}>
      <View style={styles.brandwView}>
        <MyText style={styles.brandwViewText}>Recupere a sua senha! </MyText>
        <MyText style={styles.brandwViewSubText}>
          Insira o email para podermos enviar sua redefinição de senha
        </MyText>
      </View>
      {/* Form  */}

      <View style={styles.mainContainer}>
        <StyledInputComponent
          control={control}
          name="email"
          placeholder="Email: "
          icon="email-outline"
        />

        <View style={styles.buttonDiv}>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={global.buttonStyle}>
              <Text style={{color: '#FFFFFF', paddingRight: 10}}>Enviar</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={comeBack}
            style={[
              {
                backgroundColor: 'transparent',
              },
            ]}>
            <MyText style={{paddingRight: 10, fontWeight: '600'}}>
              Voltar
            </MyText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (step === STEPS.FORGET_PASSWORD) {
    body = (
      <View style={[styles.subContainer]}>
        <View style={styles.brandwView}>
          <MyText style={styles.brandwViewText}>Email enviado! </MyText>
          <MyText style={styles.brandwViewSubText}>
            Fique atento, ja enviamos o email para redefinição de senha.
          </MyText>
        </View>

        <View style={styles.buttonDiv}>
          <LargeButton onSubmit={changePage} text="Voltar para tela inicial" />
        </View>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <PanGestureHandler
        onHandlerStateChange={({nativeEvent}) => {
          if (
            nativeEvent.state === State.END &&
            nativeEvent.translationX > 75
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
              position: 'relative',
            },
          ]}>
          <Pressable
            style={{position: 'absolute', top: 15, left: 15, zIndex: 555}}
            onPress={comeBack}>
            <CustomIcon name="close" size={35} pack="Ionicons" />
          </Pressable>
          <View style={{flex: 0.85}}>
            <ForgetAnimation />
          </View>
          {body}
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  loginMainView: {
    flex: 1,
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

  buttonDiv: {
    gap: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
});
