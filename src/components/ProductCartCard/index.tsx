import {
  Dimensions,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MyText from '../Text';
import CustomIcon from '../CustomIcon';
import {Product} from '../../types/ModelsType';
import {useState} from 'react';

interface ProductCardProps {
  product: Product;
}

const ProductCartCard: React.FC<ProductCardProps> = ({product}) => {
  const [count, setCount] = useState(1);

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

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
        <MyText style={styles.textName}>{product.name} </MyText>

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

          <View style={[styles.addItemsDiv]}>
            {count === 1 ? (
              <Pressable style={[styles.iconBox]} onPress={decreaseCount}>
                <CustomIcon
                  name="trash-2"
                  size={20}
                  color="red"
                  pack="Feather"
                />
              </Pressable>
            ) : (
              <Pressable style={[styles.iconBox]} onPress={decreaseCount}>
                <CustomIcon name="minus" size={20} color="red" pack="Feather" />
              </Pressable>
            )}

            <View style={[styles.iconBox]}>
              <Text> {count} </Text>
            </View>
            <Pressable style={[styles.iconBox]} onPress={increaseCount}>
              <CustomIcon name="plus" size={20} color="red" pack="Feather" />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: Dimensions.get('screen').height / 7,
    gap: 15,
  },

  image: {
    width: '35%',
  },

  CartItemImage: {
    height: '100%',
    width: '100%',
  },

  content: {
    gap: 10,
    justifyContent: 'center',
    width: '63%',
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
    fontSize: 18,
    fontWeight: '600',
  },
  textPrice: {
    fontSize: 16,
    textAlign: 'left',
    fontWeight: '500',
  },
});
export default ProductCartCard;
