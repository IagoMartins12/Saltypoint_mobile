import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {BORDERRADIUS, COLORS, FONTSIZE, SPACING} from '../../theme/theme';
import CustomIcon from '../CustomIcon';
import {global} from '../../style';
import {Product} from '../../types/ModelsType';
import useTheme from '../../hooks/useTheme';
import MyText from '../Text';

export interface ProductCardProps {
  product: Product;
  onPress: (id: string) => void;
}
const ProductCard: React.FC<ProductCardProps> = ({product, onPress}) => {
  const getPoints = product.value;
  const {currentTheme} = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.mainDiv,
        global.shadow,
        {
          backgroundColor:
            currentTheme === 'dark'
              ? COLORS.cardColorDark
              : COLORS.cardColorLight,
        },
      ]}
      onPress={() => {
        onPress(product.id);
      }}>
      <View style={styles.PointsText}>
        <CustomIcon name="reply" size={11} />
        <MyText textSize="mediumText2"> Ganhe {getPoints} pontos </MyText>
      </View>

      <ImageBackground
        source={{
          uri: product.product_image,
        }}
        style={styles.CartItemImage}>
        <View style={styles.CardRatingContainer}>
          <CustomIcon name={'heart'} size={20} />
        </View>
      </ImageBackground>

      <View
        style={{
          paddingHorizontal: 7,
          justifyContent: 'space-around',
          flex: 1,
        }}>
        <MyText style={styles.productTitle}>{product.name}</MyText>

        <View style={styles.infoDiv}>
          <MyText style={styles.priceText}>
            {' '}
            R$ {product.value.toFixed(2)}
          </MyText>
          {/* <CustomIcon name="cart-plus" size={25} /> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainDiv: {
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
