import React from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  ImageBackground,
} from 'react-native';
import {BORDERRADIUS, COLORS, FONTSIZE, SPACING} from '../../theme/theme';
import CustomIcon from '../CustomIcon';

interface ProductCardHorizontalProps {
  showPoints?: boolean;
}

const ProductCardHorizontal: React.FC<ProductCardHorizontalProps> = ({
  showPoints = true,
}) => {
  const renderPointsText = () => {
    if (!showPoints) return null;

    return (
      <View style={styles.pointsText}>
        <CustomIcon name="reply" size={11} color="#ffffff" />
        <Text style={{color: '#ffffff'}}> Ganhe 5 pontos </Text>
      </View>
    );
  };

  return (
    <View style={styles.mainDiv}>
      {renderPointsText()}

      <View style={styles.cardContainer}>
        <ImageBackground
          source={require('../../assets/pizzaCard.jpg')}
          style={styles.cardItemImage}>
          <View style={styles.cardRatingContainer}>
            <CustomIcon name={'heart'} color={'#ffffff'} size={20} />
          </View>
        </ImageBackground>

        <View style={styles.cardInfoContainer}>
          <Text style={styles.productTitle}>Pizza de portuguesa</Text>

          <Text style={styles.subTextProduct}>
            Uma deliciosa pizza de portuguesa, que contém mussarela, cebola,
            milho, ovos e palmito
          </Text>

          <View style={styles.infoDiv}>
            <Text style={styles.priceText}> R$ 30,00</Text>
            <CustomIcon name="cart-plus" size={25} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainDiv: {
    backgroundColor: '#ffffff',
    height: Dimensions.get('window').height / 5,
    width: Dimensions.get('window').width,
  },
  pointsText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2505b3',
    borderTopLeftRadius: 50,
    paddingBottom: 2,
    gap: 5,
  },
  cardContainer: {
    flexDirection: 'row',
    flex: 1,
    borderRadius: 50,
  },
  cardItemImage: {
    width: Dimensions.get('window').width / 2.25,
    height: 'auto',
    borderRadius: 50,
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
    color: '#000000',
  },
  subTextProduct: {
    fontSize: FONTSIZE.size_12,
    fontWeight: '400',
    color: '#000000',
    overflow: 'hidden',
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
  cardRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default ProductCardHorizontal;
