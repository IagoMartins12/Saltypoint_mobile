import {Dimensions, ImageBackground, StyleSheet, View} from 'react-native';
import MyText from '../Text';
import {Product} from '../../types/ModelsType';
import {BORDERRADIUS} from '../../theme/theme';

interface ProductCardProps {
  product: Product;
}

const ProductRecomendCard: React.FC<ProductCardProps> = ({product}) => {
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <ImageBackground
          source={{
            uri: product.product_image,
          }}
          style={styles.CartItemImage}
        />
      </View>

      <View style={styles.content}>
        <MyText style={styles.textName}>{product.name}</MyText>

        <View style={{}}>
          <MyText style={styles.textPrice}>
            R$ {product.value.toFixed(2)}
          </MyText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    height: Dimensions.get('screen').height / 3.25,
    width: Dimensions.get('screen').width / 2.6,
    padding: 2,
    borderRadius: BORDERRADIUS.radius_20,
  },

  image: {
    padding: 10,
    width: '100%',
    height: '50%',
  },

  CartItemImage: {
    height: '100%',
    width: '100%',
  },

  content: {
    gap: 10,
    width: '100%',
    height: '50%',
    paddingHorizontal: 10,
    paddingVertical: 15,
    justifyContent: 'space-around',
  },

  addItemsDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconBox: {
    paddingVertical: 10,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textName: {
    fontSize: 16,
    fontWeight: '500',
    overflow: 'hidden',
    maxHeight: '40%',
  },
  textPrice: {
    fontSize: 14,
    textAlign: 'left',
    fontWeight: '400',
  },
});
export default ProductRecomendCard;
