import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Pressable,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import {useRoute} from '@react-navigation/native';
import SectionTitle from '../components/SectionTitle';
import {global} from '../style';
import {Product} from '../types/ModelsType';
import useGlobalStore from '../hooks/store/useGlobalStore';
import CustomIcon from '../components/CustomIcon';
import {SPACING} from '../theme/theme';

export type NavigationProps = {
  navigation: NativeStackNavigationProp<any>;
};

const ProductScreen = ({navigation}: NavigationProps) => {
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const {products} = useGlobalStore();
  const router = useRoute();

  //@ts-ignore
  const productId: string = router.params?.id;

  useEffect(() => {
    const myProduct = products.find((p: Product) => p.id === productId);
    setCurrentProduct(myProduct);
  }, []);

  const comeBack = () => {
    navigation.pop();
  };

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
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.productImage}>
              {/* <ImageBackground /> */}
              <ImageBackground
                source={{
                  uri: currentProduct?.product_image ?? '',
                }}
                style={styles.CartItemImage}>
                <Pressable style={styles.CardArrow} onPress={comeBack}>
                  <CustomIcon
                    name={'arrow-left'}
                    size={30}
                    pack="Feather"
                    color={'#FFFFFF'}
                  />
                </Pressable>
                <Pressable style={styles.CardHeart}>
                  <CustomIcon
                    name={'heart'}
                    color={'#FFFFFF'}
                    size={30}
                    pack="Feather"
                  />
                </Pressable>
              </ImageBackground>
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
  contentContainer: {
    flex: 1,
  },

  productImage: {
    flex: 0.6,
  },
  CartItemImage: {
    height: '100%',
    padding: 25,
  },
  CardArrow: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  CardHeart: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
});

export default ProductScreen;
