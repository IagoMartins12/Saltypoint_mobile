import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  ScrollView,
  State,
} from 'react-native-gesture-handler';
import SectionTitle from '../components/SectionTitle';
import {COLORS} from '../theme/theme';
import CustomIcon from '../components/CustomIcon';
import CardProductOrder from '../components/CardProductOrder';
import CurrentOrderInfo from '../components/OrderInfo';
import CartAnimation from '../components/Lottie/CartAnimation';
import useTheme from '../hooks/useTheme';
import {useRoute} from '@react-navigation/native';
import {Order, OrderType} from '../types/ModelsType';
import usePrivateStore from '../hooks/store/usePrivateStore';

type responseType = {
  params: {
    id: string;
  };
};
const MyOrderScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [currentOrder, setCurrentOrder] = useState<null | OrderType>(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const {orders} = usePrivateStore();
  const route = useRoute();

  const {currentTheme} = useTheme();
  const onSwipeLeft = () => {
    navigation.navigate('Order');
  };
  const comeBack = () => {
    navigation.pop();
  };

  useEffect(() => {
    const orderId = route.params?.id;

    const myOrder = orders.find((o: Order) => o.id === orderId);

    if (myOrder) {
      setCurrentOrder(myOrder);
    }
  }, [route]);
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
            <View style={{flex: 1, paddingBottom: 15}}>
              <View>
                {currentOrder?.orderItems.length > 0 ? (
                  <>
                    <View>
                      {currentOrder.orderItems.map(item => (
                        <CardProductOrder cart_product={item} key={item.id} />
                      ))}
                    </View>
                  </>
                ) : null}

                <View>
                  {/* {currentOrder.map((order, i) => (
                    <CurrentOrderInfo order={order} key={i} />
                  ))} */}

                  <CurrentOrderInfo />
                </View>
              </View>
              {hasPlayed ? (
                <View style={styles.buttonContainer}>
                  <CartAnimation setHasPlayed={setHasPlayed} />
                </View>
              ) : (
                <TouchableOpacity
                  style={[styles.buttonContainer, {backgroundColor: 'red'}]}
                  onPress={() => setHasPlayed(true)}>
                  <CustomIcon name="shopping-cart" pack="Feather" size={22} />
                  <Text style={styles.buttonText}>Repetir pedido</Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
  },
  buttonContainer: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  buttonText: {
    color: 'white',
    marginLeft: 5,
  },
});

export default MyOrderScreen;
