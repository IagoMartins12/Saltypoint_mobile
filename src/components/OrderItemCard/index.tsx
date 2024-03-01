import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../theme/theme';
import MyText from '../Text';

const OrderItemCard = () => {
  //   const {products} = useGlobalStore();

  //   const getProductName2 = (productId, size) => {
  //     const product = products.find(p => p.id === productId);

  //     if (!product) {
  //       return 'Produto desconhecido';
  //     }

  //     if (size === 1) {
  //       return product?.name.replace('Pizza', 'Brotinho');
  //     } else {
  //       return product?.name;
  //     }
  //   };

  //   const getQuantity = () => {
  //     if (quantity > 1) {
  //       return quantity - 1;
  //     }

  //     return null;
  //   };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.itemInfo}>
          <View style={styles.quantityContainer}>
            <View style={styles.quantityBadge}>
              <MyText style={styles.quantityText}>10</MyText>
            </View>
          </View>
          <MyText style={styles.productName}>Pizza de portuguesa</MyText>
        </View>

        <MyText style={styles.moreItemsText}>mais 2 itens</MyText>
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
});

export default OrderItemCard;
