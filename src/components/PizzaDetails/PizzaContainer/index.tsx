import {StyleSheet, View} from 'react-native';
import {COLORS} from '../../../theme/theme';
import MyText from '../../Text';
import {Product} from '../../../types/ModelsType';

interface SelectProps {
  currentProduct: Product;
  getName: () => string;
  size: string;
}
const PizzaContainer: React.FC<SelectProps> = ({
  currentProduct,
  size,
  getName,
}) => {
  return (
    <View
      style={{
        gap: 15,
      }}>
      <View style={styles.titleView}>
        <MyText style={styles.tittle}>{getName()}</MyText>

        <MyText style={styles.price}>
          R${' '}
          {size === '1'
            ? (currentProduct.value - 10).toFixed(2)
            : currentProduct.value.toFixed(2)}
        </MyText>
      </View>

      <MyText style={styles.description}>{currentProduct.description}</MyText>
    </View>
  );
};

const styles = StyleSheet.create({
  titleView: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  tittle: {
    fontSize: 20,
    fontWeight: '700',
    width: '60%',
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

export default PizzaContainer;
