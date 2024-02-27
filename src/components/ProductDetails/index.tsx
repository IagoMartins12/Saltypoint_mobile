import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomIcon from '../CustomIcon';
import MyText from '../Text';
import {COLORS} from '../../theme/theme';
import {Product} from '../../types/ModelsType';
import useGlobalStore from '../../hooks/store/useGlobalStore';
import ProductFlavourCard from '../ProductFlavourCard';
import {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {useRoute} from '@react-navigation/native';
import TextAreaComponent from '../TextArea';

interface PizzaProps {
  currentProduct: Product;
  comeBack: () => void;
}
const ProductDetails: React.FC<PizzaProps> = ({comeBack, currentProduct}) => {
  const isPizza = currentProduct?.name.toUpperCase().includes('PIZZA');

  const {products} = useGlobalStore();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.productImage,
          {
            paddingVertical: isPizza ? 50 : 0,
          },
        ]}>
        <Image
          resizeMode={isPizza ? 'contain' : 'cover'}
          source={{
            uri: currentProduct?.product_image ?? '',
          }}
          style={styles.CartItemImage}
        />

        <Pressable style={styles.CardArrow} onPress={comeBack}>
          <CustomIcon
            name={'arrow-left'}
            size={30}
            pack="Feather"
            color={'#000000'}
          />
        </Pressable>
        <Pressable style={styles.CardHeart}>
          <CustomIcon
            name={'heart'}
            color={'#000000'}
            size={30}
            pack="Feather"
          />
        </Pressable>
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

          <MyText style={styles.description}>
            {currentProduct.description}
          </MyText>
        </View>

        <TextAreaComponent label="Observação" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
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
  CardHeart: {
    position: 'absolute',
    top: 25,
    right: 20,
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
