import {StyleSheet, View} from 'react-native';
import {useEffect} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
  ScrollView,
} from 'react-native-gesture-handler';
import SectionTitle from '../../components/SectionTitle';
import OrderCard from '../../components/OrderCard';
import {COLORS} from '../../theme/theme';
import {enableGoBack} from '../../utils';
import useTheme from '../../hooks/useTheme';
import usePrivateStore from '../../hooks/store/usePrivateStore';
import EmptyAnimation from '../../components/Lottie/EmptyAnimation';

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

  const goToOrder = (id: string) => {
    navigation.navigate('MyOrder', {
      id,
    });
  };

  useEffect(() => {
    enableGoBack(navigation);
  }, []);

  // Ordenar as orders pela data de criação da mais recente para a mais antiga
  const sortedOrders = orders.slice().sort((a, b) => {
    const dateA = new Date(a.order_date);
    const dateB = new Date(b.order_date);
    return dateB.getTime() - dateA.getTime();
  });

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
            {sortedOrders.length > 0 ? (
              <View style={{gap: 10, flex: 1}}>
                {sortedOrders.map((order, i) => (
                  <OrderCard onPress={goToOrder} order={order} key={i} />
                ))}
              </View>
            ) : (
              <View style={{flex: 1}}>
                <EmptyAnimation text="Você ainda não fez nenhum pedido" />
              </View>
            )}
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
