import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FetchData} from '../components/FetchData';

const HomeScreen = () => {
  return (
    <View>
      <Text>HomeScreen</Text>
      <FetchData />
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
