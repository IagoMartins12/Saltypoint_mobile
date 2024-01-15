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

const FavoriteScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const onSwipeRight = () => {
    // Navegar para a página desejada
    navigation.navigate('Profile');
  };

  const onSwipeLeft = () => {
    // Navegar para a página desejada
    navigation.navigate('Cart');
  };

  return (
    <ScrollView
      style={styles.mainContainer}
      showsVerticalScrollIndicator={false}>
      <View style={styles.productsDiv}>
        <TitleSection title="Favoritos" />
        <>
          <ProductCardHorizontal showPoints={false} />
          <ProductCardHorizontal showPoints={false} />
          <ProductCardHorizontal showPoints={false} />
          <ProductCardHorizontal showPoints={false} />
          <ProductCardHorizontal showPoints={false} />
        </>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 'auto',
    rowGap: 10,
    justifyContent: 'space-around',
    marginBottom: 40,
  },
});

export default FavoriteScreen;
