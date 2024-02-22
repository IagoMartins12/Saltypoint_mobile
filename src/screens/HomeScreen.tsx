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
import {COLORS, FONTSIZE} from '../theme/theme';
import CustomIcon from '../components/CustomIcon';
import ProductCard from '../components/ProductCard';
import {global} from '../style';
import useGlobalStore from '../hooks/store/useGlobalStore';
import {Category, Product} from '../types/ModelsType';
import {visibleCategories} from '../utils';

const HomeScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const {products, categorys} = useGlobalStore();

  const buttonPressHandler = () => {
    navigation.push('Search');
  };

  const renderProductItem = ({item}: {item: Product}) => {
    return <ProductCard product={item} />;
  };

  return (
    <View style={styles.mainContainer}>
      <View style={[global.shadow, styles.headerContainer]}>
        <View style={styles.textDiv}>
          <Text style={styles.mainText}>
            Olá, <Text style={{color: COLORS.primaryRedHex}}>Iago! </Text>
          </Text>
          <TouchableOpacity
            onPress={buttonPressHandler}
            style={styles.searchIcon}>
            <CustomIcon
              name="search"
              size={25}
              color={COLORS.primaryOrangeHex}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.pointsText}>105 Pontos</Text>
      </View>

      <ScrollView
        contentContainerStyle={[styles.productsDiv]}
        showsVerticalScrollIndicator={false}>
        {visibleCategories(categorys).map((category, index) => (
          <View key={index} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category.category_name}</Text>
            <FlatList
              data={products.filter(
                (product: Product) => product.category_id === category.id,
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.flatListView}
              keyExtractor={item => item.id}
              renderItem={renderProductItem}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 10,
  },
  mainText: {
    fontSize: FONTSIZE.size_24,
    fontWeight: '700',
    color: COLORS.primaryBlackHex,
  },
  textDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchIcon: {
    flexDirection: 'row',
    gap: 10,
  },
  pointsText: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlackHex,
    textDecorationLine: 'underline',
  },
  productsDiv: {
    paddingHorizontal: 25,
    marginVertical: 15,
    gap: 20,
    paddingBottom: 70,
  },
  categoryContainer: {
    gap: 15,
    paddingVertical: 10,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.primaryBlackHex,
  },
  flatListView: {
    gap: 15,
  },
});

export default HomeScreen;
