import {StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import Toast, {ToastRef} from 'react-native-toast-message';

import TabNavigator from './src/navigators/TabNavigator';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import MainScreen from './src/screens/MainScreen';
import SearchScreen from './src/screens/SearchScreen';
import ProfileScreen from './src/screens/SettingsScreen/ProfileScreen';
import AddressScreen from './src/screens/SettingsScreen/AddressScreen';
import OrderScreen from './src/screens/SettingsScreen/OrderScreen';
import CouponsScreen from './src/screens/SettingsScreen/CouponsScreen';
import FidelityScreen from './src/screens/SettingsScreen/FidelityScreen';
import TermScreen from './src/screens/SettingsScreen/TermScreen';
import MyOrderScreen from './src/screens/MyOrderScreen';
import CepStepScreen from './src/screens/AddressScreens/CepStepScreen';
import SaveAddressScreen from './src/screens/AddressScreens/SaveAddressScreen';
import GeoAddressScreen from './src/screens/AddressScreens/GeoAddressScreen';
import AddressCartScreen from './src/screens/CartSceens/AddressCartScreen';
import ResumeCartScreen from './src/screens/CartSceens/ResumeScreen';
import CatchRewardScreen from './src/screens/CatchRewardScreen';
import ProductScreen from './src/screens/ProductScreen';
import IntroScreen from './src/screens/Intro/IntroScreen';
import ForgetPasswordScreen from './src/screens/ForgetPasswordScreen';
import FetchData from './src/components/FetchData/index';
import useAuth, {checkAndSetToken} from './src/hooks/auth/useAuth';
import {checkIntro} from './src/utils';
const Stack = createNativeStackNavigator();

const App = () => {
  const [mainScreen, setMainScreen] = useState(''); // Definindo estado inicial

  const {isLogged, token} = useAuth();

  useEffect(() => {
    const checkIfFirstUse = async () => {
      try {
        const isFirstUse = await checkIntro();
        if (isFirstUse) {
          console.log('primeiro acesso');
          setMainScreen('Intro');
        } else if (isLogged) {
          console.log('está logado');
          setMainScreen('Tab');
        } else {
          console.log('não está logado e nem é o primeiro acesso');
          setMainScreen('Main');
        }
      } catch (error) {
        console.error('Erro ao verificar o acesso inicial:', error);
        setMainScreen('Main'); // Em caso de erro, assumindo que não é o primeiro acesso
      }
    };

    checkIfFirstUse();
  }, [isLogged]);

  useEffect(() => {
    if (mainScreen !== '') {
    }
  }, [mainScreen]);
  useEffect(() => {
    checkAndSetToken();
  }, []);
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={mainScreen}
          screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="Intro"
            component={IntroScreen}
            options={{animation: 'slide_from_left'}}
          />

          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{animation: 'slide_from_bottom'}}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{animation: 'slide_from_left'}}
          />
          <Stack.Screen
            name="ForgetPassword"
            component={ForgetPasswordScreen}
            options={{animation: 'slide_from_bottom'}}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{animation: 'slide_from_right'}}
          />
          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{animation: 'slide_from_right'}}
          />

          <Stack.Screen
            name="CatchReward"
            component={CatchRewardScreen}
            options={{animation: 'slide_from_right'}}
          />

          <Stack.Screen
            name="Product"
            component={ProductScreen}
            options={{animation: 'slide_from_right'}}
          />

          <Stack.Screen
            name="Tab"
            component={TabNavigator}
            options={{animation: 'slide_from_bottom'}}
          />
          {/* Settings stack  */}
          <Stack.Group>
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{animation: 'slide_from_right'}}
            />
            <Stack.Screen
              name="Address"
              component={AddressScreen}
              options={{animation: 'slide_from_right'}}
            />
            <Stack.Screen
              name="Order"
              component={OrderScreen}
              options={{
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="MyOrder"
              component={MyOrderScreen}
              options={{animation: 'slide_from_right'}}
            />
            <Stack.Screen
              name="Coupons"
              component={CouponsScreen}
              options={{animation: 'slide_from_right'}}
            />

            <Stack.Screen
              name="Fidelity"
              component={FidelityScreen}
              options={{animation: 'slide_from_right'}}
            />
            <Stack.Screen
              name="Term"
              component={TermScreen}
              options={{animation: 'slide_from_right'}}
            />
          </Stack.Group>

          {/* Endereço stack */}
          <Stack.Group>
            <Stack.Screen
              name="Cep"
              component={CepStepScreen}
              options={{animation: 'slide_from_bottom'}}
            />

            <Stack.Screen
              name="SaveAddress"
              component={SaveAddressScreen}
              options={{animation: 'slide_from_bottom'}}
            />

            <Stack.Screen
              name="GeoAddress"
              component={GeoAddressScreen}
              options={{animation: 'slide_from_bottom'}}
            />
          </Stack.Group>

          {/* Cart Stack */}
          <Stack.Group>
            <Stack.Screen
              name="AddressCart"
              component={AddressCartScreen}
              options={{animation: 'slide_from_right'}}
            />

            <Stack.Screen
              name="ResumeCart"
              component={ResumeCartScreen}
              options={{animation: 'slide_from_right'}}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
      <FetchData />
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
