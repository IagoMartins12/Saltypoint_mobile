import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useGlobalStore from '../hooks/store/useGlobalStore';
import MyText from '../components/Text';
import EmptyAnimation from '../components/Lottie/EmptyAnimation';
import ProductCartCard from '../components/ProductCartCard';
import {global} from '../style';
import {useRef, useState} from 'react';
import ProductRecomendCard from '../components/ProductRecomendCard';

const CartScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const cartNotEmpty = true;

  const {products} = useGlobalStore();
  const ListRef: any = useRef<FlatList>();

  const totalProducts = products.slice(0, 4);
  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.mainContainer}>
        {cartNotEmpty ? (
          <View style={styles.containerView}>
            <View style={[styles.productView, styles.paddingView]}>
              {totalProducts.map((p, i) => (
                <>
                  <ProductCartCard product={p} key={p.id} />
                  {i !== totalProducts.length ? (
                    <View style={global.hrStyle} key={i} />
                  ) : null}
                </>
              ))}
            </View>

            <MyText style={styles.textFlatList}> Peça também</MyText>

            <FlatList
              data={totalProducts}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[styles.paddingView, styles.flatListView]}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                return <ProductRecomendCard product={item} />;
              }}
            />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <EmptyAnimation />
            <MyText
              style={{
                fontSize: 22,
                flex: 0.5,
                textAlign: 'center',
              }}>
              Sem produtos no carrinho
            </MyText>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingBottom: 50,
  },

  containerView: {},
  productView: {
    backgroundColor: 'white',

    gap: 10,
  },

  textFlatList: {
    paddingHorizontal: 20,
    fontSize: 18,
    fontWeight: '600',
    paddingTop: 20,
  },

  paddingView: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  flatListView: {
    gap: 10,
  },
});

export default CartScreen;
