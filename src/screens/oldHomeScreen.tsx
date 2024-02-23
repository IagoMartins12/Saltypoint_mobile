import React, {useRef, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {COLORS, FONTSIZE, SPACING} from '../theme/theme';
import CustomIcon from '../components/CustomIcon';
import ProductCard from '../components/ProductCard';
import ProductCardHorizontal from '../components/ProductCardHorizontal';
import {global} from '../style';
import useGlobalStore from '../hooks/store/useGlobalStore';
import {Category, Product} from '../types/ModelsType';
import {visibleCategories} from '../utils';

const categories = [
  'Todos',
  'Pizza',
  'Esfiha',
  'Refrigerantes',
  'Combos',
  'Promoção',
];

const HomeScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [currentCard, setCurrentCard] = useState(0);
  const ListRef = useRef<FlatList<Product>>(null);

  const {products, categorys} = useGlobalStore();

  const buttonPressHandler = () => {
    navigation.push('Search');
  };

  const ViewList = [
    <CustomIcon
      name="grip-vertical"
      size={20}
      pack="FontAwesome6"
      color={currentCard === 0 ? 'blue' : 'black'}
    />,
    <CustomIcon
      name="grip-lines"
      size={20}
      pack="FontAwesome6"
      color={currentCard === 1 ? 'blue' : 'black'}
    />,
  ];

  const renderProductItem = ({item}: {item: Product}) => {
    return <ProductCard product={item} />;
  };

  return (
    <View style={styles.mainContainer}>
      <View
        style={[
          global.shadow,
          {
            paddingHorizontal: 20,
            paddingTop: 25,
          },
        ]}>
        <View style={styles.textDiv}>
          <Text style={styles.mainText}>
            Olá, <Text style={{color: COLORS.primaryRedHex}}>Iago! </Text>
          </Text>
          <TouchableOpacity
            onPress={buttonPressHandler}
            style={{
              flexDirection: 'row',
              gap: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomIcon
              name="search"
              size={25}
              color={COLORS.primaryOrangeHex}
            />
          </TouchableOpacity>
        </View>

        <View>
          <Text
            style={{
              fontSize: FONTSIZE.size_14,
              color: COLORS.primaryBlackHex,
              textDecorationLine: 'underline',
            }}>
            105 Pontos
          </Text>
        </View>
      </View>

      <View style={styles.ViewDiv}>
        {ViewList.map((icon, key) => (
          <TouchableOpacity
            key={key}
            style={styles.IconDiv}
            onPress={() => {
              setCurrentCard(key);
            }}>
            {icon}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.productsDiv,
          {
            flexDirection: currentCard === 0 ? 'row' : 'column',
            flexWrap: currentCard === 0 ? 'wrap' : 'nowrap',
          },
        ]}
        showsVerticalScrollIndicator={false}>
        {currentCard === 0 ? (
          <>
            {visibleCategories(categorys).map((category, index) => (
              <View
                key={index}
                style={{
                  gap: 15,
                  backgroundColor: '#000000',
                  paddingVertical: 10,
                }}>
                <Text style={styles.categoryTitle}>
                  {category.category_name}
                </Text>
                <FlatList
                  data={products.filter(
                    (product: Product) => product.category_id === category.id,
                  )}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={[styles.flatListView]}
                  keyExtractor={item => item.id}
                  renderItem={renderProductItem}
                />
              </View>
            ))}
          </>
        ) : (
          <View style={{rowGap: 15, flex: 1}}>
            {products.map((p: Product) => (
              <ProductCardHorizontal product={p} key={p.id} />
            ))}
          </View>
        )}
      </ScrollView>

      {/* <ScrollView
        contentContainerStyle={[
          styles.productsDiv,
          {
            flexDirection: currentCard === 0 ? 'row' : 'column',
            flexWrap: currentCard === 0 ? 'wrap' : 'nowrap',
          },
        ]}
        showsVerticalScrollIndicator={false}>
        {currentCard === 0 ? (
          <>
            {products.map((p: Product) => (
              <ProductCard product={p} key={p.id} />
            ))}
          </>
        ) : (
          <View style={{rowGap: 15, flex: 1}}>
            {products.map((p: Product) => (
              <ProductCardHorizontal product={p} key={p.id} />
            ))}
          </View>
        )}
      </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  mainText: {
    fontSize: FONTSIZE.size_24,
    fontWeight: '700',
    color: COLORS.primaryBlackHex,
  },

  textDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  productsDiv: {
    paddingHorizontal: 25,
    gap: 30,
  },

  ViewDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  IconDiv: {
    padding: 10,
  },

  flatListView: {
    gap: 15,
  },
  categoryTitle: {
    fontSize: FONTSIZE.size_20,
    fontWeight: 'bold',
    color: COLORS.primaryBlackHex,
  },
});

export default HomeScreen;
