import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../theme/theme';
import CustomIcon from '../CustomIcon';
import MyText from '../Text';
import useTheme from '../../hooks/useTheme';

interface CartProductCardType {}
const CardProductOrder: React.FC<CartProductCardType> = ({}) => {
  const {currentTheme} = useTheme();
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
            <MyText style={styles.titleText}>
              2x{' '}
              {/* {getProductName2(cart_product.product_id, cart_product.size)} */}
              Pizza de mussarela
            </MyText>
            <MyText style={styles.priceText}>R$ 30,00</MyText>
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
                <CustomIcon pack="Entypo" name="dot-single" size={25} />
              </View>
              <MyText style={styles.productText}>2x Pizza de mussarela</MyText>
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
                <CustomIcon pack="Entypo" name="dot-single" size={25} />
              </View>
              <MyText style={styles.productText}>2x Borda de catupiry</MyText>
            </View>

            {/* {cart_product.observation ? ( */}

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 22,
              }}>
              <MyText style={styles.observationText}> Bem passada</MyText>
            </View>
            {/* ) : null} */}
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
