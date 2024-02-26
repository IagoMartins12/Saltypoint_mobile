import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import ProductCardHorizontal from '../components/ProductCardHorizontal';
import TitleSection from '../components/TitleSection';
import {global} from '../style';
import {Product} from '../types/ModelsType';
import useGlobalStore from '../hooks/store/useGlobalStore';

const FavoriteScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const {products} = useGlobalStore();

  const onPress = (id: string) => {
    navigation.navigate('Product', {id});
  };

  return (
    <ScrollView
      style={global.mainContainer}
      showsVerticalScrollIndicator={false}>
      <TitleSection title="Favoritos" />
      <View style={styles.productsDiv}>
        {products.map((p: Product) => (
          <ProductCardHorizontal
            product={p}
            key={p.id}
            showPoints={false}
            onPress={onPress}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 30,
  },
  productsDiv: {
    rowGap: 10,
    marginTop: 15,
    marginBottom: 40,
  },
});

export default FavoriteScreen;
