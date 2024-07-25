import {StyleSheet, View, ScrollView, ActivityIndicator} from 'react-native';
import {useState, useEffect, useCallback} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  GestureHandlerRootView,
  PanGestureHandler,
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

  useEffect(() => {
    enableGoBack(navigation);
  }, []);

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

    // setRefreshing(false);
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
        onGestureEvent={({nativeEvent}) => {
          if (nativeEvent.translationY > 0) {
            setIsDragging(true);
          }
        }}
        onHandlerStateChange={({nativeEvent}) => {
          if (nativeEvent.state === State.END) {
            setIsDragging(false);
            if (nativeEvent.translationY > 50) {
              onRefresh();
            }
          }
        }}>
        <View style={{flex: 1}}>
          {refreshing && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" />
            </View>
          )}
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
