import {StyleSheet, View} from 'react-native';
import {useState, useEffect, useCallback} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  FlatList,
  GestureHandlerRootView,
  PanGestureHandler,
  RefreshControl,
  State,
} from 'react-native-gesture-handler';
import SectionTitle from '../../components/SectionTitle';
import OrderCard from '../../components/OrderCard';
import {COLORS} from '../../theme/theme';
import {enableGoBack} from '../../utils';
import useTheme from '../../hooks/useTheme';
import usePrivateStore from '../../hooks/store/usePrivateStore';
import EmptyAnimation from '../../components/Lottie/EmptyAnimation';
import {getOrders} from '../../services';
import useShowToast from '../../hooks/customHooks/useShowToast';

const OrderScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const {currentTheme} = useTheme();
  const {orders, setOrders} = usePrivateStore(); // Adicione fetchOrders para refetch
  const [refreshing, setRefreshing] = useState(false); // Estado de carregamento
  const [isDragging, setIsDragging] = useState(false); // Estado de arrasto
  const {showToast} = useShowToast();

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

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(response);
      showToast('Pedidos atualizados', 'success');
    } catch (error) {
      showToast('Erro ao atualizar pedidos', 'error');
    }
  };

  // Função de refetch
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchOrders();
    setRefreshing(false);
  }, []);

  // Ordenar as orders pela data de criação da mais recente para a mais antiga
  const sortedOrders = orders.slice().sort((a, b) => {
    const dateA = new Date(a.order_date);
    const dateB = new Date(b.order_date);
    return dateB.getTime() - dateA.getTime();
  });

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
          {sortedOrders.length > 0 ? (
            <FlatList
              data={sortedOrders}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  // refreshing={this.props.refreshing}
                  // onRefresh={this._onRefresh.bind(this)}
                />
              }
              renderItem={data => (
                <OrderCard
                  onPress={goToOrder}
                  order={data.item}
                  key={data.index}
                />
              )}
              style={[
                styles.mainContainer,
                {
                  backgroundColor:
                    currentTheme === 'light'
                      ? COLORS.backgroundColorLight
                      : COLORS.backgroundColorDark,
                },
              ]}></FlatList>
          ) : (
            <View style={{flex: 1}}>
              <EmptyAnimation text="Você ainda não fez nenhum pedido" />
            </View>
          )}

          {/* <ScrollView
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
          </ScrollView> */}
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
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // cor de fundo semitransparente opcional
    zIndex: 1,
  },
});

export default OrderScreen;
