import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useEffect, useState} from 'react';
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
import {addCartProduct} from '../services';
import useShowToast from '../hooks/customHooks/useShowToast';

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
  const {orders, cart_product, setCart_product} = usePrivateStore();
  const {showToast} = useShowToast();
  const route = useRoute();

  const handleRepeatOrder = async () => {
    let success = true; // Variável de controle para verificar se tudo ocorreu bem
    const updatedCartProduct = [...cart_product]; // Novo array temporário
    setHasPlayed(true);

    const filteredOrderItems = currentOrder.orderItems.filter(
      item => item.value !== '0',
    );

    for (const product of filteredOrderItems) {
      try {
        const response = await addCartProduct(product);

        updatedCartProduct.push(response); // Adiciona o produto ao novo array temporário
      } catch (error) {
        showToast('Erro ao adicionar produto', 'error');
        success = false; // Define a variável de sucesso como false em caso de erro
      }
    }

    if (success) {
      setCart_product(updatedCartProduct); // Atualiza o estado com o novo array temporário
      showToast('Produtos adicionados', 'success');
      return;
    }
  };

  const {currentTheme} = useTheme();
  const onSwipeLeft = () => {
    navigation.navigate('Order');
  };
  const comeBack = () => {
    navigation.pop();
  };

  useEffect(() => {
    //@ts-ignore
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

                {currentOrder ? (
                  <View>
                    <CurrentOrderInfo order={currentOrder} />
                  </View>
                ) : null}
              </View>
              {hasPlayed ? (
                <View style={styles.buttonContainer}>
                  <CartAnimation setHasPlayed={setHasPlayed} />
                </View>
              ) : (
                <TouchableOpacity
                  style={[styles.buttonContainer, {backgroundColor: 'red'}]}
                  onPress={handleRepeatOrder}>
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
