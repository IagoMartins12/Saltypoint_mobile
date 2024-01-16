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
import ProductCardHorizontal from '../components/ProductCardHorizontal';
import CustomIcon from '../components/CustomIcon';
import {global} from '../style';
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
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });

  const ListRef: any = useRef<FlatList>();

  const buttonPressHandler = () => {
    navigation.push('Searchscreen');
  };

  // Searchscreen;

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

  return (
    <View style={global.mainContainer}>
      <View>
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
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </>
        ) : (
          <View style={{rowGap: 15, flex: 1}}>
            <ProductCardHorizontal />
            <ProductCardHorizontal />
            <ProductCardHorizontal />
            <ProductCardHorizontal />
            <ProductCardHorizontal />
            <ProductCardHorizontal />
          </View>
        )}
      </ScrollView>
    </View>
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
    fontSize: FONTSIZE.size_14,
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
    rowGap: 25,
    justifyContent: 'space-around',
    marginBottom: 100,
  },

  CategoryScrollViewStyle: {
    marginTop: 20,
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
  ViewDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 15,
  },
  IconDiv: {
    padding: 10,
  },
});

export default HomeScreen;
