import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {BORDERRADIUS, COLORS, FONTSIZE} from '../theme/theme';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import MyText from '../components/Text';
import useTheme from '../hooks/useTheme';

const MainScreen = ({navigation}: any) => {
  const buttonRegister = () => {
    navigation.push('Register');
  };

  const onSwipeRight = () => {
    navigation.navigate('Register');
  };

  const onSwipeLeft = () => {
    navigation.navigate('Login');
  };

  const buttonLogin = () => {
    navigation.push('Login');
  };

  const buttonHome = () => {
    navigation.push('Tab');
  };

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

          if (
            nativeEvent.state === State.END &&
            nativeEvent.translationX > 50
          ) {
            onSwipeLeft();
          }
        }}>
        <View style={[styles.loginMainView]}>
          <ImageBackground
            style={styles.bgStyle}
            source={require('../assets/pizzaWallpapper.jpg')}
          />

          <View
            style={[
              styles.subContainer,
              {
                backgroundColor:
                  currentTheme === 'light'
                    ? COLORS.backgroundColorLight
                    : COLORS.backgroundColorDark,
              },
            ]}>
            <View
              style={[
                styles.bottomView,
                {
                  backgroundColor:
                    currentTheme === 'light'
                      ? COLORS.backgroundColorLight
                      : COLORS.backgroundColorDark,
                },
              ]}>
              <View style={{padding: 40, gap: 20}}>
                <View>
                  <MyText style={styles.WelcomeText}>Seja bem vindo a </MyText>
                  <MyText style={styles.WelcomeSubText}>Salty Point</MyText>
                </View>

                <View>
                  <MyText textSize="mediumText2">
                    Bateu aquela fome? Nós resolvemos o seu problema!
                  </MyText>
                  <MyText textSize="mediumText2">
                    Peça a melhor pizza da região pelo nosso aplicativo
                  </MyText>
                </View>
              </View>

              <View>
                <View style={styles.buttonsDiv}>
                  <TouchableOpacity
                    style={[
                      styles.firstButton,
                      {
                        backgroundColor:
                          currentTheme === 'dark'
                            ? COLORS.cardColorLight
                            : COLORS.cardColorDark,
                        borderColor:
                          currentTheme === 'dark'
                            ? COLORS.borderColorLight
                            : COLORS.borderColorDark,
                      },
                    ]}
                    onPress={buttonLogin}>
                    <Text
                      style={{
                        color:
                          currentTheme === 'dark'
                            ? COLORS.textColorLight
                            : COLORS.textColorDark,
                      }}>
                      Login
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.secondButton,
                      {
                        borderColor:
                          currentTheme === 'dark'
                            ? COLORS.borderColorDark
                            : COLORS.borderColorLight,
                      },
                    ]}
                    onPress={buttonRegister}>
                    <MyText
                      style={{
                        color:
                          currentTheme === 'dark'
                            ? COLORS.textColorDark
                            : COLORS.textColorLight,
                      }}
                      textSize="mediumText2">
                      Cadastro
                    </MyText>
                  </TouchableOpacity>
                </View>

                <MyText style={styles.noAuthText} onPress={buttonHome}>
                  Continuar sem se autenticar
                </MyText>
              </View>
            </View>
          </View>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  loginMainView: {
    flex: 1,
  },

  bgStyle: {
    height: Dimensions.get('window').height / 2,
    opacity: 0.7,
  },

  bottomView: {
    flex: 1,
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
    borderWidth: 1,
    borderBottomWidth: 0,
  },

  WelcomeText: {
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'left',
  },

  WelcomeSubText: {
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'left',
    fontStyle: 'italic',
    color: COLORS.secondaryRed,
  },

  subContainer: {
    backgroundColor: COLORS.themeColor,
    flex: 1,
  },

  buttonsDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  firstButton: {
    width: Dimensions.get('screen').width / 2.5,
    borderRadius: BORDERRADIUS.radius_25,
    backgroundColor: COLORS.primaryBlackHex,
    height: 45,
    borderRightWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    left: 8,
  },

  secondButton: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    width: Dimensions.get('screen').width / 2.5,
    borderTopRightRadius: BORDERRADIUS.radius_25,
    borderBottomRightRadius: BORDERRADIUS.radius_25,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    right: 8,
  },

  noAuthText: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 16,
    marginVertical: 10,
  },
});
