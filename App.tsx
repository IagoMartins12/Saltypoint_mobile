import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import TabNavigator from './src/navigators/TabNavigator';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import MainScreen from './src/screens/MainScreen';
import SearchScreen from './src/screens/SearchScreen';

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
