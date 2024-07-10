import React from 'react';
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
import MyText from '../Text';
import useTheme from '../../hooks/useTheme';
import HeartIcon from '../HeartIcon';

interface ProductCardHorizontalProps {
  showPoints?: boolean;
  product: Product;
  onPress: (id: string) => void;
}

const ProductCardHorizontal: React.FC<ProductCardHorizontalProps> = ({
  product,
  showPoints = true,
  onPress,
}) => {
  const {currentTheme} = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.mainDiv,
        global.shadow,
        {
          backgroundColor:
            currentTheme === 'light'
              ? COLORS.cardColorLight
              : COLORS.cardColorDark,
        },
      ]}
      onPress={() => {
        onPress(product.id);
      }}>
      <View style={styles.cardContainer}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}>
          <ImageBackground
            borderRadius={1000}
            resizeMode={'contain'}
            source={{
              uri: product.product_image,
            }}
            style={[styles.cardItemImage]}>
            <HeartIcon productId={product.id} />
          </ImageBackground>
        </View>

        <View style={styles.cardInfoContainer}>
          <MyText style={styles.productTitle}>{product.name}</MyText>

          <MyText style={styles.subTextProduct}>{product.description}</MyText>

          <View style={styles.infoDiv}>
            <MyText style={styles.priceText}>
              {' '}
              R$ {product.value.toFixed(2)}
            </MyText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainDiv: {
    borderBottomEndRadius: 25,
    borderBottomLeftRadius: 26,
    height: Dimensions.get('window').height / 5,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flex: 1,
  },
  pointsText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryRedHex,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingBottom: 2,
    gap: 5,
  },
  cardContainer: {
    flexDirection: 'row',
    flex: 1,
    gap: 15,
  },
  cardItemImage: {
    width: 125,
    height: 125,
  },
  cardInfoContainer: {
    paddingLeft: 7,
    paddingVertical: 7,
    paddingRight: 30,
    width: 'auto',
    flex: 1,
    gap: 5,
    justifyContent: 'space-between',
  },
  productTitle: {
    fontSize: FONTSIZE.size_18,
    fontWeight: '700',
  },
  subTextProduct: {
    fontSize: FONTSIZE.size_12,
    fontWeight: '400',
    overflow: 'hidden',
    height: '30%',
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

  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
});

export default ProductCardHorizontal;
