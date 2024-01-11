import {
  Alert,
  Button,
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import {Controller, useForm} from 'react-hook-form';
import {InputComponent} from '../components/Input';

const MainScreen = ({navigation}: any) => {
  const buttonRegister = () => {
    navigation.push('Register');
  };

  const buttonLogin = () => {
    navigation.push('Login');
  };

  return (
    <View style={styles.loginMainView}>
      <ImageBackground
        style={styles.bgStyle}
        source={require('../assets/pizzaWallpapper.jpg')}></ImageBackground>

      <View style={styles.subContainer}>
        <View style={styles.bottomView}>
          <View style={{padding: 40, gap: 20}}>
            <View>
              <Text style={styles.WelcomeText}>Seja bem vindo a </Text>
              <Text style={styles.WelcomeSubText}>Salty Point</Text>
            </View>

            <View>
              <Text>Bateu aquela fome? Nós resolvemos o seu problema!</Text>
              <Text>Peça a melhor pizza da região pelo nosso aplicativo</Text>
            </View>
          </View>

          <View style={styles.buttonsDiv}>
            <TouchableOpacity style={styles.firstButton} onPress={buttonLogin}>
              <Text style={{color: '#FFFFFF'}}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondButton}
              onPress={buttonRegister}>
              <Text style={{color: '#000000'}}>Cadastro</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.noAuthText}>Continuar sem se autenticar</Text>
        </View>
      </View>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  loginMainView: {
    flex: 1,
  },

  bgStyle: {
    height: Dimensions.get('window').height / 2,
    opacity: 0.75,
  },

  bottomView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
    borderWidth: 1,
    borderBottomWidth: 0,
  },

  WelcomeText: {
    fontSize: 36,
    color: COLORS.primaryBlackHex,
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
    backgroundColor: '#FFFFFF',
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
    fontSize: FONTSIZE.size_16,
    marginVertical: 10,
  },
});
