import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../theme/theme';
import MyText from '../Text';
import {Cart_product, Product} from '../../types/ModelsType';
import useGlobalStore from '../../hooks/store/useGlobalStore';

interface OrderItemCardProps {
  cart_product: Cart_product;
  quantity: number;
  formattedData: string;
}
const OrderItemCard = ({
  cart_product,
  quantity,
  formattedData,
}: OrderItemCardProps) => {
  const {products} = useGlobalStore();

  const getProductName2 = (productId, size) => {
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

  const getQuantity = () => {
    if (quantity > 1) {
      return quantity - 1;
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.itemInfo}>
          <View style={styles.quantityContainer}>
            <View style={styles.quantityBadge}>
              <MyText style={styles.quantityText}>
                {cart_product.quantity}
              </MyText>
            </View>
          </View>
          <MyText style={styles.productName}>
            {getProductName2(cart_product.product_id, cart_product.size)}
          </MyText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: getQuantity() > 0 ? 'space-between' : 'flex-end',
            marginTop: 5,
          }}>
          {getQuantity() > 0 ? (
            <MyText style={styles.moreItemsText}>
              mais {getQuantity()} itens
            </MyText>
          ) : null}

          <MyText style={styles.data}>{formattedData}</MyText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  content: {
    padding: 10,
    gap: 15,
    flex: 1,
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  quantityContainer: {
    backgroundColor: '#d4d4d4', // Adapte a cor conforme necessário
    width: 25,
    height: 25,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityBadge: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000000',
  },
  productName: {
    fontSize: 16,
    fontWeight: '400',
  },
  moreItemsText: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  data: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default OrderItemCard;
