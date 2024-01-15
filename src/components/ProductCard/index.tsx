import {Dimensions, StyleSheet, View, Image, Text} from 'react-native';
import {BORDERRADIUS, COLORS, FONTSIZE, SPACING} from '../../theme/theme';
import Icon from 'react-native-vector-icons/FontAwesome'; // Substitua 'FontAwesome' pelo conjunto de ícones desejado

const ProductCard = () => {
  return (
    <View style={styles.mainDiv}>
      <Text style={styles.PointsText}> Ganhe 5 pontos </Text>
      <Image
        source={require('../../assets/pizzaCard.jpg')}
        style={styles.CartItemImage}
      />
      <Text style={styles.productTitle}>Pizza de portuguesa</Text>

      <View>
        <Text> R$ 30,00</Text>
        <Icon name="camera" size={30} color="#900" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainDiv: {
    backgroundColor: '#ffffff',
    height: Dimensions.get('window').height / 3.5,
    width: Dimensions.get('window').width / 2.4,
    borderRadius: BORDERRADIUS.radius_15,
  },
  PointsText: {
    backgroundColor: '#2505b3',
    textAlign: 'center',
    color: '#ffffff',
    borderTopLeftRadius: BORDERRADIUS.radius_15,
    borderTopRightRadius: BORDERRADIUS.radius_15,
  },
  CartItemImage: {
    height: 120,
    width: 'auto',
  },
  productTitle: {
    fontSize: FONTSIZE.size_16,
    fontWeight: '700',
    color: '#000000',
    paddingHorizontal: 7,
  },
});

export default ProductCard;
