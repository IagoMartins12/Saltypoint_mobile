import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import useGlobalStore from '../hooks/store/useGlobalStore';
import {FetchData} from '../components/FetchData';

const HomeScreen = () => {
  const {products} = useGlobalStore();

  return (
    <View>
      <Text>HomeScreen</Text>
      <FetchData />
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
