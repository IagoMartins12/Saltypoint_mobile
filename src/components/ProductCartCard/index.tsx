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
import usePrivateStore from '../../hooks/store/usePrivateStore';
import {removeCartProduct, updateCartProduct} from '../../services';
import CallToast from '../Toast';

interface ProductCardProps {
  cartProduct: Cart_product;
  onPress?: (id: string) => void;
}

const ProductCartCard: React.FC<ProductCardProps> = ({
  cartProduct,
  onPress,
}) => {
  const [count, setCount] = useState(cartProduct.quantity);
  const {products} = useGlobalStore();
  const {showToast} = CallToast();
  const {cart_product, setCart_product} = usePrivateStore();

  const handleDeleteAddress = async () => {
    if (cartProduct) {
      const response = await removeCartProduct({
        cart_product_id: cartProduct.id,
      });

      if (response.status === 200) {
        const updateCart = cart_product.filter(
          (cart: Cart_product) => cart.id !== cartProduct.id,
        );
        setCart_product(updateCart);
        return showToast('Produto excluido', 'success');
      } else {
        return showToast('Erro ao deletar produto', 'error');
      }
    }
  };

  const handleUpdateProduct = async (productCount: number) => {
    const response = await updateCartProduct({
      id: cartProduct.id,
      quantity: productCount,
      value: String(
        (
          Number(+cartProduct.value / cartProduct.quantity) * productCount
        ).toFixed(2),
      ),
    });

    if (response.status === 200) {
      // Encontrar o índice do objeto no array cart_product
      const index = cart_product.findIndex(
        (item: Cart_product) => item.id === cartProduct.id,
      );
      if (index !== -1) {
        // Criar uma cópia do array cart_product
        const updatedCartProduct = [...cart_product];
        // Atualizar a propriedade quantity do objeto correspondente com o novo valor
        updatedCartProduct[index].quantity = productCount;
        (updatedCartProduct[index].value = String(
          (
            Number(+cartProduct.value / cartProduct.quantity) * productCount
          ).toFixed(2),
        )),
          // Atualizar o estado cart_product com o array atualizado
          setCart_product(updatedCartProduct);
      }
      // Mostrar mensagem de sucesso
      showToast('Produto atualizado', 'success');
      return true;
    } else {
      // Mostrar mensagem de erro
      showToast('Erro ao atualizar produto', 'error');
      return false;
    }
  };

  const increaseCount = async () => {
    const response = await handleUpdateProduct(count + 1); // Atualiza o produto com o novo valor de count

    // if (response) {
    setCount(prevCount => prevCount + 1);
    // }
  };

  const decreaseCount = async () => {
    if (count > 1) {
      const response = await handleUpdateProduct(count - 1); // Atualiza o produto com o novo valor de count

      // if (response) {
      setCount(prevCount => prevCount - 1);
      // }
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
          onPress(cartProduct.product_id);
        }
      }}>
      <View style={styles.image}>
        <ImageBackground
          borderRadius={1000}
          imageStyle={{
            objectFit: 'fill',
          }}
          source={{
            uri: getProductImage(cartProduct?.product_id),
          }}
          style={styles.CartItemImage}
        />
      </View>

      <View style={styles.content}>
        <MyText style={styles.textName}>
          {getProductName2(cartProduct?.product_id, cartProduct.size)}{' '}
        </MyText>

        <View>
          {cartProduct.product_id_2 ? (
            <>
              {[cartProduct.product_id, cartProduct.product_id_2].map(
                (productId, index) => (
                  <MyText key={index} style={styles.subtitle}>
                    {cartProduct.quantity}x 1/2{' '}
                    {getProductName2(productId, cartProduct.size)}
                  </MyText>
                ),
              )}
            </>
          ) : (
            <MyText style={styles.subtitle}>
              {cartProduct.quantity}x{' '}
              {getProductName2(cartProduct.product_id, cartProduct.size)}
            </MyText>
          )}

          {cartProduct.product_id_3 ? (
            <MyText style={styles.subtitle}>
              {cartProduct.quantity}x{' '}
              {getProductName2(cartProduct.product_id_3, cartProduct.size)}
            </MyText>
          ) : null}

          {cartProduct.observation ? (
            <MyText style={styles.subtitle}>{cartProduct.observation}</MyText>
          ) : null}
        </View>

        <View
          style={{
            flexDirection: 'row',
            width: '90%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <MyText style={styles.textPrice}>R$ {cartProduct?.value}</MyText>

          <View style={[styles.addItemsDiv]}>
            {/* {count === 1 ? ( */}
            {+cartProduct.value !== 0 && (
              <Pressable style={[styles.iconBox]} onPress={handleDeleteAddress}>
                <CustomIcon
                  name="trash-2"
                  size={20}
                  color="red"
                  pack="Feather"
                />
              </Pressable>
            )}

            {/* ) : (
              <Pressable style={[styles.iconBox]} onPress={decreaseCount}>
                <CustomIcon name="minus" size={20} color="red" pack="Feather" />
              </Pressable>
            )} */}

            {/* <View style={[styles.iconBox]}>
              <MyText textSize="mediumText2"> {count} </MyText>
            </View>
            <Pressable style={[styles.iconBox]} onPress={increaseCount}>
              <CustomIcon name="plus" size={20} color="red" pack="Feather" />
            </Pressable> */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: Dimensions.get('screen').height / 5.75,
    gap: 15,
  },

  image: {
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  CartItemImage: {
    height: 120,
    width: 120,
    // height: '100%',
    // width: '100%',
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
    fontSize: 16,
    fontWeight: '600',
  },
  textPrice: {
    fontSize: 16,
    textAlign: 'left',
    fontWeight: '500',
  },

  subtitle: {
    fontSize: 13,
    fontWeight: '300',
  },
});
export default ProductCartCard;
