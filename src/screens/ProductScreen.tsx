import {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
  ScrollView,
} from 'react-native-gesture-handler';
import {useRoute} from '@react-navigation/native';

import {Product} from '../types/ModelsType';
import useGlobalStore from '../hooks/store/useGlobalStore';
import {COLORS} from '../theme/theme';
import PizzaDetails from '../components/PizzaDetails';
import ProductFixed from '../components/ProductFixed';
import ProductDetails from '../components/ProductDetails';
import CartAnimation from '../components/Lottie/CartAnimation';
import useTheme from '../hooks/useTheme';
import usePrivateStore from '../hooks/store/usePrivateStore';
import {addCartProduct} from '../services';
import useShowToast from '../hooks/customHooks/useShowToast';

export type NavigationProps = {
  navigation: NativeStackNavigationProp<any>;
};

const ProductScreen = ({navigation}: NavigationProps) => {
  const [selectedOptions, setSelectedOptions] = useState({
    size: '0',
    flavour: '0',
    flavour2: null,
    flavour3: null,
  });

  const [quantity, setQuantity] = useState(1);
  const [value, setValue] = useState<number | string>(0);
  const [disabled, setDisabled] = useState(true);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [observation, setObservation] = useState('');
  const [loading, setLoading] = useState(false);
  const {products} = useGlobalStore();
  const {user, cart_product, setCart_product} = usePrivateStore();
  const {showToast} = useShowToast();
  const {currentTheme} = useTheme();

  const router = useRoute();
  const scrollViewRef = useRef<ScrollView>(null); // Ref para o ScrollView

  const goBack = () => {
    navigation.pop();
  };

  const onSubmit = async () => {
    if (!user)
      return showToast('Faça o login para adicionar o produto', 'error');

    setLoading(true);
    if (isPizza) {
      const response = await addCartProduct({
        product_id: productId,
        product_id_2: selectedOptions.flavour2,
        product_id_3: selectedOptions.flavour3,
        observation: observation,
        quantity: quantity,
        value: String(value),
        size: Number(selectedOptions.size),
      });
      setLoading(false);
      if (response) {
        const updatedCartProduct = [...cart_product, response];
        setCart_product(updatedCartProduct);
        setHasPlayed(true);
        setQuantity(1);
        return showToast('Produto adicionado', 'success');
      }

      showToast('Erro ao adicionar produto', 'error');
      return;
    }

    const response = await addCartProduct({
      product_id: productId,
      observation: observation,
      quantity: quantity,
      value: String((Number(currentProduct.value) * quantity).toFixed(2)),
      size: 0,
    });
    setLoading(false);

    if (response) {
      const updatedCartProduct = [...cart_product, response];
      setCart_product(updatedCartProduct);
      setHasPlayed(true);
      setQuantity(1);
      return showToast('Produto adicionado', 'success');
    }

    showToast('Erro ao adicionar produto', 'error');
  };
  //@ts-ignore
  const productId: string = router.params?.id;
  const isPizza = currentProduct?.name.toUpperCase().includes('PIZZA');

  const increaseQuantity = () => {
    return setQuantity(value => value + 1);
  };

  const decreaseQuantity = () => {
    if (quantity <= 0) return;
    return setQuantity(value => value - 1);
  };

  const scrollToSection = (options: 'Size' | 'Flavour') => {
    if (options === 'Size') {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          y: 250,
          animated: true,
        });
      }
    }

    if (options === 'Flavour') {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          y: 625,
          animated: true,
        });
      }
    }
  };

  const scrollToCornicione = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: 2500, // Ajuste o valor de 'y' conforme necessário para rolar até a seção desejada
        animated: true,
      });
    }
  };

  const comeBack = () => {
    navigation.pop();
  };

  useEffect(() => {
    const myProduct = products.find((p: Product) => p.id === productId);
    setCurrentProduct(myProduct);
  }, []);

  useEffect(() => {
    if (quantity === 0) return setDisabled(true);
    setDisabled(false);
  }, [quantity]);

  if (!currentProduct) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor:
            currentTheme === 'dark'
              ? COLORS.backgroundColorDark
              : COLORS.backgroundColorLight,
        }}
      />
    );
  }

  return (
    <GestureHandlerRootView
      style={[
        styles.container,
        {
          backgroundColor:
            currentTheme === 'dark'
              ? COLORS.backgroundColorDark
              : COLORS.backgroundColorLight,
        },
      ]}>
      <PanGestureHandler
        onHandlerStateChange={({nativeEvent}) => {
          if (
            nativeEvent.state === State.END &&
            nativeEvent.translationX > 50
          ) {
            comeBack();
          }
        }}>
        <View
          style={[
            styles.container,
            {
              backgroundColor:
                currentTheme === 'dark'
                  ? COLORS.backgroundColorDark
                  : COLORS.backgroundColorLight,
            },
          ]}>
          <ScrollView style={{flex: 1}} ref={scrollViewRef}>
            {isPizza ? (
              <PizzaDetails
                comeBack={comeBack}
                currentProduct={currentProduct}
                setValue={setValue}
                value={value}
                quantity={quantity}
                scrollToSection={scrollToSection}
                scrollToCornicione={scrollToCornicione}
                setObservation={setObservation}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
              />
            ) : (
              <ProductDetails
                comeBack={comeBack}
                currentProduct={currentProduct}
                setObservation={setObservation}
              />
            )}
          </ScrollView>
          {hasPlayed ? (
            <View style={styles.buttonContainer}>
              <CartAnimation
                setHasPlayed={setHasPlayed}
                product
                goBack={goBack}
              />
            </View>
          ) : (
            <ProductFixed
              quantity={quantity}
              value={
                isPizza
                  ? Number(value)
                  : Number(currentProduct.value) * quantity
              }
              decreaseQuantity={decreaseQuantity}
              increaseQuantity={increaseQuantity}
              onPress={onSubmit}
              loading={loading}
              disabled={disabled}
            />
          )}
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default ProductScreen;
