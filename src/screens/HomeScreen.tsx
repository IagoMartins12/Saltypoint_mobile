import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ProductCard from '../components/ProductCard';
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
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const onSwipeRight = () => {
    // Navegar para a página desejada
    navigation.navigate('Search');
  };

  const ListRef: any = useRef<FlatList>();

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.textDiv}>
        <Text style={styles.mainText}>
          Olá, <Text style={{color: COLORS.primaryRedHex}}>Iago! </Text>
        </Text>

        <View>
          <Text style={styles.addressText}> Estrada de ligação, 22</Text>
        </View>
      </View>

      <View>
        <Text>
          105 <Text>Pontos </Text>
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.CategoryScrollViewStyle}>
        {categories.map((data, index) => (
          <View
            key={index.toString()}
            style={styles.CategoryScrollViewContainer}>
            <TouchableOpacity
              style={styles.CategoryScrollViewItem}
              onPress={() => {
                ListRef?.current?.scrollToOffset({
                  animated: true,
                  offset: 0,
                });
                setCategoryIndex({index: index, category: categories[index]});
                // setSortedCoffee([
                //   ...getCoffeeList(categories[index], CoffeeList),
                // ]);
              }}>
              <Text
                style={[
                  styles.CategoryText,
                  categoryIndex.index == index
                    ? {
                        color: COLORS.primaryOrangeHex,
                        borderBottomWidth: 2,
                        borderColor: COLORS.primaryRedHex,
                      }
                    : {},
                ]}>
                {data}
              </Text>
              {categoryIndex.index == index ? (
                <View style={styles.ActiveCategory} />
              ) : (
                <></>
              )}
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <View style={styles.productsDiv}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  mainText: {
    fontSize: FONTSIZE.size_24,
    fontWeight: '700',
  },

  addressText: {
    fontSize: FONTSIZE.size_16,
    fontWeight: '400',
    color: COLORS.primaryOrangeHex,
  },

  textDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  pointsDiv: {},

  productsDiv: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 'auto',
    rowGap: 25,
    justifyContent: 'space-around',
    marginBottom: 100,
  },

  CategoryScrollViewStyle: {
    marginVertical: SPACING.space_20,
  },
  CategoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_10,
  },
  CategoryScrollViewItem: {
    alignItems: 'center',
  },
  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  ActiveCategory: {
    flex: 1,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
});

export default HomeScreen;
