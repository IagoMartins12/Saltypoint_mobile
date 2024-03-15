import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../theme/theme';
import CustomIcon from '../CustomIcon';
import MyText from '../Text';
import useTheme from '../../hooks/useTheme';
import {Cart_product, Product} from '../../types/ModelsType';
import useGlobalStore from '../../hooks/store/useGlobalStore';

interface CartProductCardType {
  cart_product: Cart_product;
}
const CardProductOrder: React.FC<CartProductCardType> = ({cart_product}) => {
  const {currentTheme} = useTheme();
  const {products} = useGlobalStore();

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

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <View style={styles.titleContainer}>
            <MyText style={styles.titleText}>
              {cart_product.quantity}x{' '}
              {getProductName2(cart_product.product_id, cart_product.size)}
            </MyText>
            <MyText style={styles.priceText}> R$ {cart_product.value}</MyText>
          </View>
          <View style={styles.productInfoContainer}>
            {cart_product.product_id_2 ? (
              <>
                {[cart_product.product_id, cart_product.product_id_2].map(
                  (productId, index) => (
                    <View
                      style={{flexDirection: 'row', alignItems: 'center'}}
                      key={index}>
                      <View>
                        <CustomIcon pack="Entypo" name="dot-single" size={25} />
                      </View>
                      <MyText style={styles.productText}>
                        {cart_product.quantity}x 1/2{' '}
                        {getProductName2(productId, cart_product.size)}
                      </MyText>
                    </View>
                  ),
                )}
              </>
            ) : null}

            {cart_product.product_id_3 ? (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View>
                  <CustomIcon pack="Entypo" name="dot-single" size={25} />
                </View>
                <MyText style={styles.productText}>
                  {cart_product.quantity}x{' '}
                  {getProductName2(
                    cart_product.product_id_3,
                    cart_product.size,
                  )}
                  y
                </MyText>
              </View>
            ) : null}

            {cart_product.observation ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 22,
                }}>
                <MyText style={styles.observationText}>
                  {' '}
                  {cart_product.observation}
                </MyText>
              </View>
            ) : null}
          </View>
        </View>
      </View>
      <View
        style={[
          styles.hrStyle,
          {
            borderBottomColor:
              currentTheme === 'dark'
                ? COLORS.borderColorDark
                : COLORS.borderColorLight,
          },
        ]}
      />
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
    borderBottomWidth: 1,
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
    width: '75%',
  },
  priceText: {
    fontWeight: '400',
    fontSize: 18,
    alignSelf: 'center',
  },
  productInfoContainer: {
    flexDirection: 'column',
    gap: 3,
  },
  productText: {
    fontFamily: 'light',
    fontSize: 16,
    paddingHorizontal: 2,
  },
  observationText: {
    fontFamily: 'light',
    fontSize: 16,
    paddingHorizontal: 2,
  },
});

export default CardProductOrder;
