import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  ScrollView,
  State,
} from 'react-native-gesture-handler';
import SectionTitle from '../components/SectionTitle';
import {global} from '../style';
import {COLORS} from '../theme/theme';

const MyOrderScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const onSwipeLeft = () => {
    navigation.navigate('Order');
  };
  const comeBack = () => {
    navigation.pop();
  };
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <PanGestureHandler
        onHandlerStateChange={({nativeEvent}) => {
          if (
            nativeEvent.state === State.END &&
            nativeEvent.translationX > 50
          ) {
            onSwipeLeft();
          }
        }}>
        <View style={{flex: 1}}>
          <View style={{flex: 0.09, backgroundColor: COLORS.primaryBlackHex}}>
            <SectionTitle comeBack={comeBack} />
          </View>
          <ScrollView style={global.mainContainer}>
            <View style={{gap: 15, flex: 1}}>
              <Text>MyOrderScreen</Text>
            </View>
          </ScrollView>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({});

export default MyOrderScreen;
