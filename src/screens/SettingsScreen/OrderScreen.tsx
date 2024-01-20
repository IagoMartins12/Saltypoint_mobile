import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  ScrollView,
  State,
} from 'react-native-gesture-handler';
import SectionTitle from '../../components/SectionTitle';
import {global} from '../../style';
import OrderCard from '../../components/OrderCard';
import {COLORS} from '../../theme/theme';

const OrderScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const onSwipeLeft = () => {
    // Navegar para a página desejada
    navigation.navigate('Settings');
  };

  const comeBack = () => {
    navigation.pop();
  };

  const goToOrder = () => {
    navigation.navigate('MyOrder');
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
            <View style={{gap: 10, flex: 1}}>
              <OrderCard onPress={goToOrder} />
              <OrderCard onPress={goToOrder} />
              <OrderCard onPress={goToOrder} />
              <OrderCard onPress={goToOrder} />
            </View>
          </ScrollView>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 30,
  },
});

export default OrderScreen;
