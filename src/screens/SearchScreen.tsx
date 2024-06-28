import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import SearchComponent from '../components/SearchComponent';
import {BORDERRADIUS, COLORS, FONTSIZE} from '../theme/theme';
import CustomIcon from '../components/CustomIcon';
import SearchText from '../components/SearchText';
import ProductCard from '../components/ProductCard';
import useGlobalStore from '../hooks/store/useGlobalStore';
import {Product} from '../types/ModelsType';
import {visibleCategories} from '../utils';
import {global} from '../style';
import MyText from '../components/Text';
import useTheme from '../hooks/useTheme';

const SearchScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [productState, setProductState] = useState<Product[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [onFocus, setOnFocus] = useState(false);
  const [currentWidth, setCurrentWidth] = useState('100%');
  const [searchText, setSearchText] = useState('');

  const {products, categorys} = useGlobalStore();
  const {currentTheme} = useTheme();
  const buttonPressHandler = () => {
    navigation.pop();
  };

  const handleSearchInput = (query: string) => {
    const newProducts = products.filter(
      (p: Product) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()),
    );

    const filteredProduct = newProducts.filter(p =>
      visibleCategories(categorys).some(
        category => category.id === p.category_id,
      ),
    );

    setProductState(filteredProduct);
  };

  const onPress = (id: string) => {
    navigation.navigate('Product', {id});
  };

  const renderProductList = () => (
    <ScrollView
      contentContainerStyle={[styles.productDiv, {paddingBottom: 15}]}
      showsVerticalScrollIndicator={false}>
      {productState.map((p: Product) => (
        <ProductCard product={p} key={p.id} onPress={onPress} />
      ))}
    </ScrollView>
  );

  useEffect(() => {
    setCurrentWidth(onFocus ? '95%' : '90%');
  }, [onFocus]);

  useEffect(() => {
    setProductState(products);
  }, [products]);

  useEffect(() => {
    handleSearchInput(searchText);
  }, [searchText]);

  return (
    <View
      style={[
        global.mainContainer,
        {
          backgroundColor:
            currentTheme === 'light'
              ? COLORS.backgroundColorLight
              : COLORS.backgroundColorDark,
        },
      ]}>
      <SearchComponent
        setOnFocus={setOnFocus}
        width={currentWidth}
        onFocus={onFocus}
        searchText={searchText}
        setSearchText={setSearchText}
        buttonPressHandler={buttonPressHandler}
      />

      {onFocus && searchText !== '' && renderProductList()}

      {onFocus && searchText !== '' && productState.length <= 0 && (
        <View
          style={{
            alignSelf: 'flex-start',
            width: '100%',
            height: '100%',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}>
            <MyText
              style={{
                fontSize: 24,
                fontWeight: 'bold',
              }}>
              Sem resultados
            </MyText>
          </View>
        </View>
      )}

      {!onFocus && (
        <View
          style={{
            marginVertical: 20,
            gap: 10,
            flex: onFocus || currentCategory ? 1 : null,
          }}>
          <MyText style={styles.categoryText}>Categorias</MyText>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.CategoryScrollViewStyle}>
            {visibleCategories(categorys).map((category, key) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.categoryBox,
                  {
                    backgroundColor:
                      currentCategory === category.id
                        ? COLORS.primaryRedHex
                        : '#fcd4d4da',
                    opacity:
                      currentCategory !== null &&
                      currentCategory !== category.id
                        ? 0.5
                        : 1,
                  },
                ]}
                onPress={() => {
                  setCurrentCategory(prev =>
                    prev === category.id ? null : category.id,
                  );
                }}>
                <MyText style={styles.categoryBoxName}>
                  {category.category_name}
                </MyText>
                {category.id === currentCategory && (
                  <CustomIcon name="close" size={20} pack="Ionicons" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          {currentCategory === null ? null : (
            <ScrollView
              contentContainerStyle={styles.productDiv}
              showsVerticalScrollIndicator={false}>
              {productState
                .filter((p: Product) => {
                  if (currentCategory === '0') return productState;
                  return p.category_id === currentCategory;
                })
                .map((p: Product) => (
                  <ProductCard product={p} key={p.id} onPress={onPress} />
                ))}
            </ScrollView>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  categoryText: {
    fontSize: FONTSIZE.size_14,
    fontWeight: '700',
  },

  categoryBox: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDERRADIUS.radius_15,
    flexDirection: 'row',
    gap: 15,
  },

  categoryBoxName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000000',
  },

  CategoryScrollViewStyle: {
    columnGap: 10,
  },

  searchTextHistory: {
    gap: 15,
  },

  productDiv: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingVertical: 15,
    gap: 15,
  },
});

export default SearchScreen;
