import {useEffect} from 'react';
import {
  Dimensions,
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
import {Product} from '../types/ModelsType';
import {enableGoBack, visibleCategories} from '../utils';
import useTheme from '../hooks/useTheme';
import MyText from '../components/Text';
import CarouselHome from '../components/Carrousel';
import IMAGES from '../assets';
import ClosedView from '../components/ClosedView';
import usePrivateStore from '../hooks/store/usePrivateStore';

const data = [
  {
    id: 1,
    image: IMAGES.CAROUSEL.CAROUSEL,
  },
  {
    id: 2,
    image: IMAGES.CAROUSEL.CAROUSEL2,
  },
  {
    id: 3,
    image: IMAGES.CAROUSEL.CAROUSEL3,
  },
  {
    id: 4,
    image: IMAGES.CAROUSEL.PIZZA,
  },
  {
    id: 5,
    image: IMAGES.CAROUSEL.ESFIHA,
  },
];

const HomeScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const {products, categorys} = useGlobalStore();
  const {currentTheme} = useTheme();
  const {user} = usePrivateStore();
  const buttonPressHandler = () => {
    navigation.push('Search');
  };

  const onPress = (id: string) => {
    navigation.navigate('Product', {id});
  };

  const renderProductItem = ({item}: {item: Product}) => {
    return <ProductCard product={item} onPress={onPress} />;
  };

  useEffect(() => {
    enableGoBack(navigation);
  }, []);
  return (
    <View
      style={[
        styles.mainContainer,
        {
          backgroundColor:
            currentTheme === 'light'
              ? COLORS.backgroundColorLight
              : COLORS.backgroundColorDark,
        },
      ]}>
      <View style={[global.shadow, styles.headerContainer]}>
        <View
          style={[
            styles.textDiv,
            {
              justifyContent: user ? 'space-between' : 'flex-end',
            },
          ]}>
          {user ? (
            <MyText style={styles.mainText}>
              Olá,{' '}
              <Text style={{color: COLORS.primaryRedHex}}>{user.name}! </Text>
            </MyText>
          ) : null}

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
      </View>

      <ScrollView
        contentContainerStyle={[styles.productsDiv]}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            height: Dimensions.get('screen').height * 0.3,
          }}>
          <CarouselHome entries={data} />
        </View>

        {visibleCategories(categorys).map((category, index) => (
          <View key={index} style={styles.categoryContainer}>
            <MyText style={styles.categoryTitle}>
              {category.category_name}
            </MyText>
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
      <ClosedView />
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
  },
  textDiv: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    flexDirection: 'row',
    gap: 10,
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
  },
  flatListView: {
    gap: 15,
  },
});

export default HomeScreen;
