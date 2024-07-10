import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {COLORS} from '../../theme/theme';
import MyText from '../Text';
import useTheme from '../../hooks/useTheme';
import {Cart_product, Discount_cupom} from '../../types/ModelsType';
import {formatDate} from '../../utils';
import useCurrrentCode from '../../hooks/reward';
import usePrivateStore from '../../hooks/store/usePrivateStore';

const CouponCardSelected = ({coupon}: {coupon: Discount_cupom}) => {
  const {currentTheme} = useTheme();
  const {currentCode, setCurrentCode} = useCurrrentCode();
  const {cart_product, setCart_product} = usePrivateStore();

  const removeItemCart = () => {
    const filteredCart = cart_product.filter(
      (item: Cart_product) => item.observation !== 'Recompensa',
    );
    setCart_product(filteredCart);
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderColor:
            currentCode === coupon
              ? COLORS.secondaryRed
              : currentTheme === 'dark'
              ? COLORS.borderColorDark
              : COLORS.borderColorLight,
        },
      ]}
      onPress={() => {
        removeItemCart();
        setCurrentCode(coupon);
      }}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/coupon.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <View>
          <MyText style={styles.couponNameText}>
            Desconto de {coupon.discount}%
          </MyText>
        </View>

        <MyText style={styles.rewardCode}>#{coupon.cupom_name}</MyText>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <MyText style={styles.validityText}>Validade:</MyText>
          <MyText style={styles.normalText}>
            {formatDate(coupon.expiration_date.toString(), true)}
          </MyText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('screen').height / 6.5,
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
  },
  imageContainer: {
    width: '35%',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  image: {
    width: '80%',
    height: '80%',
  },
  textContainer: {
    width: '60%',
    paddingHorizontal: 15,
    paddingVertical: 15,
    gap: 10,
    justifyContent: 'space-between',
  },
  rewardCode: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: 'red',
  },
  couponNameText: {
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center',
  },

  validityText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  normalText: {
    fontWeight: 'normal',
    fontSize: 16,
  },
});

export default CouponCardSelected;
