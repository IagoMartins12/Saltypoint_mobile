import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
  ScrollView,
} from 'react-native-gesture-handler';
import SectionTitle from '../../components/SectionTitle';
import {global} from '../../style';
import OrderCard from '../../components/OrderCard';
import {COLORS} from '../../theme/theme';
import {enableGoBack} from '../../utils';
import useTheme from '../../hooks/useTheme';
import usePrivateStore from '../../hooks/store/usePrivateStore';

const OrderScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const {currentTheme} = useTheme();
  const {orders} = usePrivateStore();
  const onSwipeLeft = () => {
    // Navegar para a página desejada
    navigation.navigate('Settings');
  };

  const comeBack = () => {
    navigation.navigate('Settings');
  };

  const goToOrder = () => {
    navigation.navigate('MyOrder');
  };

  useEffect(() => {
    enableGoBack(navigation);
  }, []);
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
          <SectionTitle comeBack={comeBack} />
          <ScrollView
            style={[
              styles.mainContainer,
              {
                backgroundColor:
                  currentTheme === 'light'
                    ? COLORS.backgroundColorLight
                    : COLORS.backgroundColorDark,
              },
            ]}>
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
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 60,
  },
});

export default OrderScreen;
