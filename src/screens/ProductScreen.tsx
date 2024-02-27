import React, {useEffect, useState} from 'react';
import {StyleSheet, Dimensions, Pressable, Image, View} from 'react-native';
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

export type NavigationProps = {
  navigation: NativeStackNavigationProp<any>;
};

const ProductScreen = ({navigation}: NavigationProps) => {
  const [quantity, setQuantity] = useState(1);
  const [value, setValue] = useState<number | string>(0);
  const [disabled, setDisabled] = useState(true);
  const [otherProductsValue, setOtherProductsValue] = useState<number | string>(
    0,
  );

  const brotinhoPrice = 10 * quantity;
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const increaseQuantity = () => {
    return setQuantity(value => value + 1);
  };

  const decreaseQuantity = () => {
    if (quantity <= 0) return;
    return setQuantity(value => value - 1);
  };
  const {products} = useGlobalStore();
  const router = useRoute();

  //@ts-ignore
  const productId: string = router.params?.id;
  const isPizza = currentProduct?.name.toUpperCase().includes('PIZZA');

  useEffect(() => {
    const myProduct = products.find((p: Product) => p.id === productId);
    setCurrentProduct(myProduct);
  }, []);

  const comeBack = () => {
    navigation.pop();
  };

  if (!currentProduct) {
    return null;
  }
  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler
        onHandlerStateChange={({nativeEvent}) => {
          if (
            nativeEvent.state === State.END &&
            nativeEvent.translationX > 50
          ) {
            comeBack();
          }
        }}>
        <View style={styles.container}>
          <ScrollView style={{flex: 1}}>
            {isPizza ? (
              <PizzaDetails
                comeBack={comeBack}
                currentProduct={currentProduct}
              />
            ) : (
              <ProductDetails
                comeBack={comeBack}
                currentProduct={currentProduct}
              />
            )}
          </ScrollView>
          <ProductFixed
            quantity={quantity}
            value={currentProduct.value * quantity}
            decreaseQuantity={decreaseQuantity}
            increaseQuantity={increaseQuantity}
          />
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    gap: 20,
  },

  productImage: {
    height: Dimensions.get('screen').height / 2,
    justifyContent: 'flex-end',
  },
  CartItemImage: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  CardArrow: {
    position: 'absolute',
    top: 25,
    left: 20,
  },
  CardHeart: {
    position: 'absolute',
    top: 25,
    right: 20,
  },

  containerBox: {
    width: '90%',
    alignSelf: 'center',
    gap: 20,
    flex: 1,
  },

  titleView: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  tittle: {
    fontSize: 20,
    fontWeight: '700',
  },

  price: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.secondaryRed,
  },

  description: {
    fontSize: 16,
    fontWeight: '300',
  },
});

export default ProductScreen;
