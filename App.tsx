import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

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

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="MainScreen"
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
          name="Searchscreen"
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
          name="Tab"
          component={TabNavigator}
          options={{animation: 'slide_from_bottom'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
