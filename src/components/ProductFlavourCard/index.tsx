import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import MyText from '../Text';
import CustomIcon from '../CustomIcon';
import {Product} from '../../types/ModelsType';
import {COLORS} from '../../theme/theme';

interface ProductCardProps {
  product: Product;
  selectedFlavour2: string;
  setSelectedFlavour2: React.Dispatch<React.SetStateAction<string>>;
}

const ProductFlavourCard: React.FC<ProductCardProps> = ({
  product,
  selectedFlavour2,
  setSelectedFlavour2,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <ImageBackground
          source={{
            uri: product.product_image,
          }}
          resizeMode="contain"
          style={styles.CartItemImage}
          borderRadius={15}
        />
      </View>

      <View style={styles.content}>
        <MyText style={styles.textName}>{product.name} </MyText>
        <MyText style={styles.description}>{product.description} </MyText>

        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <MyText style={styles.textPrice}>
            R$ {product.value.toFixed(2)}
          </MyText>
        </View>
      </View>

      <TouchableOpacity
        style={styles.iconBox}
        onPress={() => {
          if (selectedFlavour2) return setSelectedFlavour2(null);
          setSelectedFlavour2(product.id);
        }}>
        {selectedFlavour2 === product.id ? (
          <CustomIcon
            name="close-outline"
            size={25}
            pack="Ionicons"
            color={COLORS.secondaryRed}
          />
        ) : (
          <CustomIcon
            name="plus"
            size={25}
            pack="Feather"
            color={COLORS.secondaryRed}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: Dimensions.get('screen').height / 8,
    gap: 15,
    marginVertical: 10,
    position: 'relative',
  },

  image: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  CartItemImage: {
    height: '100%',
    width: '100%',
  },

  content: {
    gap: 10,
    justifyContent: 'center',
    width: '70%',
  },

  textName: {
    fontSize: 18,
    fontWeight: '600',
    maxWidth: '70%',
    width: '70%',
  },

  description: {
    fontSize: 14,
    fontWeight: '400',
    maxWidth: '70%',
    width: '70%',
  },
  textPrice: {
    fontSize: 16,
    textAlign: 'left',
    fontWeight: '500',
  },
  iconBox: {
    position: 'absolute',
    right: 30,
    top: 40,
  },
});
export default ProductFlavourCard;
