import {Dimensions, Image, Pressable, StyleSheet, View} from 'react-native';
import CustomIcon from '../CustomIcon';
import MyText from '../Text';
import {COLORS} from '../../theme/theme';
import {Product} from '../../types/ModelsType';

import TextAreaComponent from '../TextArea';
import HeartIcon from '../HeartIcon';

interface PizzaProps {
  currentProduct: Product;
  comeBack: () => void;
  setObservation: React.Dispatch<React.SetStateAction<string>>;
}
const ProductDetails: React.FC<PizzaProps> = ({
  comeBack,
  currentProduct,
  setObservation,
}) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.productImage,
          {
            paddingVertical: 0,
          },
        ]}>
        <Image
          resizeMode={'cover'}
          source={{
            uri: currentProduct?.product_image ?? '',
          }}
          style={styles.CartItemImage}
        />

        <Pressable style={styles.CardArrow} onPress={comeBack}>
          <CustomIcon name={'arrow-left'} size={30} pack="Feather" />
        </Pressable>
        <HeartIcon productId={currentProduct.id} isProductPage />
      </View>

      <View style={styles.containerBox}>
        <View
          style={{
            gap: 15,
          }}>
          <View style={styles.titleView}>
            <MyText style={styles.tittle}>{currentProduct.name}</MyText>

            <MyText style={styles.price}>
              R$ {currentProduct.value.toFixed(2)}
            </MyText>
          </View>

          <MyText style={styles.description} numberLines={3}>
            {currentProduct.description}
          </MyText>
        </View>

        <TextAreaComponent label="Observação" setObservation={setObservation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },

  productImage: {
    height: Dimensions.get('screen').height / 2,
    justifyContent: 'flex-end',
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

  containerBox: {
    width: '90%',
    alignSelf: 'center',
    gap: 20,
    justifyContent: 'space-between',
  },

  titleView: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  tittle: {
    fontSize: 20,
    fontWeight: '700',
  },

  price: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.secondaryRed,
  },

  description: {
    fontSize: 16,
    fontWeight: '300',
  },
});

export default ProductDetails;
