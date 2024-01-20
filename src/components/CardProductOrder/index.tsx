import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../theme/theme';
import CustomIcon from '../CustomIcon';

interface CartProductCardType {}
const CardProductOrder: React.FC<CartProductCardType> = ({}) => {
  //   const {products} = useGlobalStore();

  //   const getProductName2 = (productId: string, size: number | null) => {
  //     let name: string;
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

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>
              2x{' '}
              {/* {getProductName2(cart_product.product_id, cart_product.size)} */}
              Pizza de mussarela
            </Text>
            <Text style={styles.priceText}>R$ 30,00</Text>
          </View>
          <View style={styles.productInfoContainer}>
            {/* {cart_product.product_id_2 ? (
            <>
              {[cart_product.product_id, cart_product.product_id_2].map(
                (productId, index) => (
                  <Text key={index} style={styles.productText}>
                    {cart_product.quantity}x 1/2{' '}
                    {getProductName2(productId, cart_product.size)}
                  </Text>
                ),
              )}
            </>
          ) : ( */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View>
                <CustomIcon
                  pack="Entypo"
                  name="dot-single"
                  size={25}
                  color={COLORS.primaryBlackHex}
                />
              </View>
              <Text style={styles.productText}>2x Pizza de mussarela</Text>
            </View>

            {/* )} */}

            {/* {cart_product.product_id_3 ? (
            <Text style={styles.productText}>
              {cart_product.quantity}x{' '}
              {getProductName2(cart_product.product_id_3, cart_product.size)}
            </Text>
          ) : null} */}

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View>
                <CustomIcon
                  pack="Entypo"
                  name="dot-single"
                  size={25}
                  color={COLORS.primaryBlackHex}
                />
              </View>
              <Text style={styles.productText}>2x Borda de catupiry</Text>
            </View>

            {/* {cart_product.observation ? ( */}

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 22,
              }}>
              <Text style={styles.observationText}> Bem passada</Text>
            </View>
            {/* ) : null} */}
          </View>
        </View>
      </View>
      <View style={styles.hrStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
    paddingHorizontal: 10,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 10,
  },
  hrStyle: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth * 0.5,
    marginHorizontal: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontWeight: '600',
    fontSize: 20,
    color: COLORS.primaryBlackHex,
  },
  priceText: {
    fontWeight: '400',
    fontSize: 18,
    alignSelf: 'center',
    color: COLORS.primaryBlackHex,
  },
  productInfoContainer: {
    flexDirection: 'column',
    gap: 3,
  },
  productText: {
    fontFamily: 'light',
    fontSize: 16,
    paddingHorizontal: 2,
    color: COLORS.primaryBlackHex,
  },
  observationText: {
    fontFamily: 'light',
    fontSize: 16,
    paddingHorizontal: 2,
    color: COLORS.primaryBlackHex,
  },
});

export default CardProductOrder;
