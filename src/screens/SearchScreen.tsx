import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import TitleSection from '../components/TitleSection';
import SearchComponent from '../components/SearchComponent';
import {BORDERRADIUS, FONTSIZE} from '../theme/theme';
import CustomIcon from '../components/CustomIcon';
import SearchText from '../components/SearchText';
import {global} from '../style';
import ProductCard from '../components/ProductCard';

const categories = ['Pizza', 'Esfiha', 'Combos', 'Refrigerantes', 'Promoção'];

const SearchScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [currentCategory, setCurrentCategory] = useState<null | number>(null);
  const [onFocus, setOnFocus] = useState(false);
  const [currentWidth, setCurrentWidth] = useState('100%');
  const [searchText, setSearchText] = useState('');

  const buttonPressHandler = () => {
    navigation.pop();
  };

  useEffect(() => {
    if (onFocus) setCurrentWidth('95%');
    if (!onFocus) setCurrentWidth('90%');
  }, [onFocus]);

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

      {onFocus ? (
        <>
          {searchText !== '' ? (
            <ScrollView
              contentContainerStyle={[styles.productDiv, {paddingBottom: 15}]}
              showsVerticalScrollIndicator={false}>
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </ScrollView>
          ) : null}
        </>
      ) : (
        <>
          <View style={{marginVertical: 20, gap: 10}}>
            <Text style={styles.categoryText}>Categorias</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.CategoryScrollViewStyle}>
              {categories.map((category, key) => (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.categoryBox,
                    {
                      backgroundColor:
                        currentCategory === key ? '#2FDBBC' : '#fff0f0da',
                      opacity:
                        currentCategory !== null && currentCategory !== key
                          ? 0.5
                          : 1,
                    },
                  ]}
                  onPress={() => {
                    setCurrentCategory(prev => (prev === key ? null : key));
                  }}>
                  <Text style={styles.categoryBoxName}>{category}</Text>
                  {key === currentCategory ? (
                    <CustomIcon
                      name="close"
                      size={25}
                      color="#000000"
                      pack="Ionicons"
                    />
                  ) : null}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

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
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </ScrollView>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  categoryText: {
    fontSize: FONTSIZE.size_14,
    fontWeight: '700',
    color: 'black',
  },

  categoryBox: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDERRADIUS.radius_15,
    flexDirection: 'row',
    gap: 15,
  },

  categoryBoxName: {
    fontSize: FONTSIZE.size_16,
    fontWeight: '600',
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
