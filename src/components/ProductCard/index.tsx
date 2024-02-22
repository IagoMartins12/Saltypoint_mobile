import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  ImageBackground,
} from 'react-native';
import {BORDERRADIUS, COLORS, FONTSIZE, SPACING} from '../../theme/theme';
import CustomIcon from '../CustomIcon';
import {global} from '../../style';
import {Product} from '../../types/ModelsType';

export interface ProductCardProps {
  product: Product;
}
const ProductCard: React.FC<ProductCardProps> = ({product}) => {
  const getPoints = product.value;
  return (
    <View style={[styles.mainDiv, global.shadow]}>
      <View style={styles.PointsText}>
        <CustomIcon name="reply" size={11} color="#ffffff" />
        <Text style={{color: '#ffffff'}}> Ganhe {getPoints} pontos </Text>
      </View>

      <ImageBackground
        source={{
          uri: product.product_image,
        }}
        style={styles.CartItemImage}>
        <View style={styles.CardRatingContainer}>
          <CustomIcon name={'heart'} color={'gray'} size={20} />
        </View>
      </ImageBackground>

      <View
        style={{
          paddingHorizontal: 7,
          justifyContent: 'space-around',
          flex: 1,
        }}>
        <Text style={styles.productTitle}>{product.name}</Text>

        <View style={styles.infoDiv}>
          <Text style={styles.priceText}> R$ {product.value.toFixed(2)}</Text>
          {/* <CustomIcon name="cart-plus" size={25} /> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainDiv: {
    backgroundColor: '#FFFFFF',
    height: Dimensions.get('window').height / 3.15,
    width: Dimensions.get('window').width / 2.4,
    borderRadius: BORDERRADIUS.radius_15,
    marginBottom: 2,
  },
  PointsText: {
    gap: 5,
    backgroundColor: COLORS.primaryRedHex,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopLeftRadius: BORDERRADIUS.radius_15,
    borderTopRightRadius: BORDERRADIUS.radius_15,
  },
  CartItemImage: {
    height: 150,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    padding: 10,
    objectFit: 'fill',
  },
  productTitle: {
    fontSize: FONTSIZE.size_16,
    fontWeight: '700',
    color: '#000000',
  },
  infoDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 5,
  },
  priceText: {
    fontSize: FONTSIZE.size_16,
    fontWeight: '700',

    color: COLORS.secondaryRed,
  },

  CardRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.space_10,
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default ProductCard;
