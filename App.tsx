import {StyleSheet} from 'react-native';
import React, {useRef} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
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

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Main"
          screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{animation: 'slide_from_left'}}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{animation: 'slide_from_left'}}
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
            options={{animation: 'slide_from_right'}}
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
          <Stack.Screen
            name="Tab"
            component={TabNavigator}
            options={{animation: 'slide_from_bottom'}}
          />

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
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
