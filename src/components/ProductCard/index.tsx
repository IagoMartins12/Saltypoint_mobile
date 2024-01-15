import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  ImageBackground,
} from 'react-native';
import {BORDERRADIUS, COLORS, FONTSIZE, SPACING} from '../../theme/theme';
import CustomIcon from '../CustomIcon';

const ProductCard = () => {
  return (
    <View style={styles.mainDiv}>
      <View style={styles.PointsText}>
        <CustomIcon name="reply" size={11} color="#ffffff" />
        <Text style={{color: '#ffffff'}}> Ganhe 5 pontos </Text>
      </View>

      <ImageBackground
        source={require('../../assets/pizzaCard.jpg')}
        style={styles.CartItemImage}>
        <View style={styles.CardRatingContainer}>
          <CustomIcon name={'heart'} color={'#ffffff'} size={20} />
        </View>
      </ImageBackground>

      <View
        style={{
          paddingHorizontal: 7,
          justifyContent: 'space-around',
          flex: 1,
        }}>
        <Text style={styles.productTitle}>Pizza de portuguesa</Text>

        <View style={styles.infoDiv}>
          <Text style={styles.priceText}> R$ 30,00</Text>
          <CustomIcon name="cart-plus" size={25} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainDiv: {
    backgroundColor: '#ffffff',
    height: Dimensions.get('window').height / 3.6,
    width: Dimensions.get('window').width / 2.4,
    borderRadius: BORDERRADIUS.radius_15,
  },
  PointsText: {
    gap: 5,
    backgroundColor: '#2505b3',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopLeftRadius: BORDERRADIUS.radius_15,
    borderTopRightRadius: BORDERRADIUS.radius_15,
    paddingBottom: 2,
  },
  CartItemImage: {
    height: 120,
    width: 'auto',
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
