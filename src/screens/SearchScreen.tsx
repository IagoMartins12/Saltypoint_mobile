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
import {BORDERRADIUS, FONTSIZE} from '../theme/theme';
import CustomIcon from '../components/CustomIcon';
import SearchText from '../components/SearchText';
import ProductCard from '../components/ProductCard';
import useGlobalStore from '../hooks/store/useGlobalStore';
import {Product} from '../types/ModelsType';
import {visibleCategories} from '../utils';
import {global} from '../style';

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

  useEffect(() => {
    setCurrentWidth(onFocus ? '95%' : '90%');
  }, [onFocus]);

  useEffect(() => {
    setProductState(products);
  }, [products]);

  useEffect(() => {
    handleSearchInput(searchText);
  }, [searchText]);

  const renderProductList = () => (
    <ScrollView
      contentContainerStyle={[styles.productDiv, {paddingBottom: 15}]}
      showsVerticalScrollIndicator={false}>
      {productState.map((p: Product) => (
        <ProductCard product={p} key={p.id} />
      ))}
    </ScrollView>
  );

  return (
    <View style={global.mainContainer}>
      <SearchComponent
        setOnFocus={setOnFocus}
        width={currentWidth}
        onFocus={onFocus}
        searchText={searchText}
        setSearchText={setSearchText}
        buttonPressHandler={buttonPressHandler}
      />

      {onFocus && searchText !== '' && renderProductList()}

      {!onFocus && (
        <View style={{marginVertical: 20, gap: 10}}>
          <Text style={styles.categoryText}>Categorias</Text>

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
                      currentCategory === category.id ? '#2FDBBC' : '#fff0f0da',
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
                <Text style={styles.categoryBoxName}>
                  {category.category_name}
                </Text>
                {category.id === currentCategory && (
                  <CustomIcon
                    name="close"
                    size={25}
                    color="#000000"
                    pack="Ionicons"
                  />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          {currentCategory === null ? (
            <View style={{marginVertical: 20, gap: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={styles.categoryText}>Recentes</Text>
                <Text style={styles.categoryText}>Limpar</Text>
              </View>

              <View style={styles.searchTextHistory}>
                <SearchText text="Calabresa" />
                <SearchText text="Calabresa" />
                <SearchText text="Calabresa" />
              </View>
            </View>
          ) : (
            <ScrollView
              contentContainerStyle={styles.productDiv}
              showsVerticalScrollIndicator={false}>
              {productState
                .filter((p: Product) => {
                  if (currentCategory === '0') return productState;
                  return p.category_id === currentCategory;
                })
                .map((p: Product) => (
                  <ProductCard product={p} key={p.id} />
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
    color: 'black',
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
    fontSize: FONTSIZE.size_14,
    fontWeight: '500',
    color: 'black',
  },

  CategoryScrollViewStyle: {
    columnGap: 15,
  },

  searchTextHistory: {
    gap: 15,
  },

  productDiv: {
    flexDirection: 'row',
    rowGap: 25,
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginTop: 25,
  },
});

export default SearchScreen;
