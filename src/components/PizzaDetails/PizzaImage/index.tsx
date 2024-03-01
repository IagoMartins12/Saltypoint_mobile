import {Dimensions, Image, Pressable, StyleSheet, View} from 'react-native';
import {Product} from '../../../types/ModelsType';
import CustomIcon from '../../CustomIcon';

interface SelectProps {
  currentProduct: Product;
  comeBack: () => void;
}
const PizzaImage: React.FC<SelectProps> = ({currentProduct, comeBack}) => {
  return (
    <View style={[styles.productImage]}>
      <Image
        resizeMode={'contain'}
        source={{
          uri: currentProduct?.product_image ?? '',
        }}
        style={styles.CartItemImage}
      />

      <Pressable style={styles.CardArrow} onPress={comeBack}>
        <CustomIcon name={'arrow-left'} size={30} pack="Feather" />
      </Pressable>
      <Pressable style={styles.CardHeart}>
        <CustomIcon name={'heart'} size={30} pack="Feather" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  productImage: {
    height: Dimensions.get('screen').height / 2,
    justifyContent: 'flex-end',
    paddingVertical: 50,
  },
  CartItemImage: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  CardArrow: {
    position: 'absolute',
    top: 25,
    left: 20,
  },
  CardHeart: {
    position: 'absolute',
    top: 25,
    right: 20,
  },
});

export default PizzaImage;
