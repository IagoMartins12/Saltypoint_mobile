import {
  Dimensions,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import MyText from '../Text';
import CustomIcon from '../CustomIcon';
import {Cart_product, Product} from '../../types/ModelsType';
import {useState} from 'react';
import useGlobalStore from '../../hooks/store/useGlobalStore';

interface ProductCardProps {
  cartProduct: Cart_product;
  onPress?: (id: string) => void;
}

const ProductCartCard: React.FC<ProductCardProps> = ({
  cartProduct,
  onPress,
}) => {
  const [count, setCount] = useState(1);
  const {products} = useGlobalStore();
  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const getProductName2 = (productId: string, size: number | null) => {
    let name: string;
    const product = products.find((p: Product) => p.id === productId);

    if (!product) {
      return 'Produto desconhecido';
    }

    if (size === 1) {
      return product?.name.replace('Pizza', 'Brotinho');
    } else {
      return product?.name;
    }
  };

  const getProductImage = (productId: string) => {
    let name: string;
    const product = products.find((p: Product) => p.id === productId);

    if (!product) {
      return 'P';
    }

    return product.product_image;
  };

  return (
    <TouchableOpacity
      style={[styles.container]}
      onPress={() => {
        if (onPress) {
          // onPress(product.id);
        }
      }}>
      <View style={styles.image}>
        <ImageBackground
          source={{
            uri: getProductImage(cartProduct.product_id),
          }}
          style={styles.CartItemImage}
        />
      </View>

      <View style={styles.content}>
        <MyText style={styles.textName}>
          {getProductName2(cartProduct.product_id, cartProduct.size)}{' '}
        </MyText>

        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {/* <MyText style={styles.textPrice}>
            R$ {product?.value?.toFixed(2)}
          </MyText> */}

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
              <MyText textSize="mediumText2"> {count} </MyText>
            </View>
            <Pressable style={[styles.iconBox]} onPress={increaseCount}>
              <CustomIcon name="plus" size={20} color="red" pack="Feather" />
            </Pressable>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
