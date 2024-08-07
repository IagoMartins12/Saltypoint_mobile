import {ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ProductCardHorizontal from '../components/ProductCardHorizontal';
import TitleSection from '../components/TitleSection';
import {global} from '../style';
import {Product} from '../types/ModelsType';
import useGlobalStore from '../hooks/store/useGlobalStore';
import useTheme from '../hooks/useTheme';
import {COLORS} from '../theme/theme';
import usePrivateStore from '../hooks/store/usePrivateStore';
import EmptyAnimation from '../components/Lottie/EmptyAnimation';
import NoAuth from '../components/NoAuth';

const FavoriteScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const {products} = useGlobalStore();
  const {user, favorites} = usePrivateStore();
  const {currentTheme} = useTheme();

  const onPress = (id: string) => {
    navigation.navigate('Product', {id});
  };

  const goToLogin = () => {
    return navigation.push('Login');
  };

  const renderFavoriteProducts = () => {
    if (favorites?.length > 0) {
      return favorites.map((favorite, index) => {
        const product = products.find(
          (p: Product) => p.id === favorite.product_id,
        );
        if (product) {
          return (
            <ProductCardHorizontal
              product={product}
              key={index}
              showPoints={false}
              onPress={onPress}
            />
          );
        }
        return null;
      });
    } else {
      return (
        <View style={styles.emptyFavoritesContainer}>
          <EmptyAnimation text="Você ainda não favoritou nenhum produto" />
        </View>
      );
    }
  };

  if (user) {
    return (
      <ScrollView
        style={[
          global.mainContainer,
          {
            backgroundColor:
              currentTheme === 'light'
                ? COLORS.backgroundColorLight
                : COLORS.backgroundColorDark,
            marginBottom: 50,
          },
        ]}
        showsVerticalScrollIndicator={false}>
        <TitleSection title="Favoritos" />
        <View style={styles.productsDiv}>{renderFavoriteProducts()}</View>
      </ScrollView>
    );
  } else {
    return <NoAuth goToLogin={goToLogin} />;
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 30,
  },
  productsDiv: {
    rowGap: 10,
    marginTop: 15,
    marginBottom: 40,
  },
  emptyFavoritesContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default FavoriteScreen;
