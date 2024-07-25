import {StyleSheet, View} from 'react-native';
import ProductFlavourCard from '../../ProductFlavourCard';
import {COLORS} from '../../../theme/theme';
import useTheme from '../../../hooks/useTheme';
import MyText from '../../Text';
import useGlobalStore from '../../../hooks/store/useGlobalStore';
import {Category, Product} from '../../../types/ModelsType';

interface CornicioneProps {
  filteredProducts: Product[];
  handleCornicioneSelect: (cornicioneId: string) => void;
  flavour3: string;
}
const Cornicione: React.FC<CornicioneProps> = ({
  filteredProducts,
  handleCornicioneSelect,
  flavour3,
}) => {
  const {currentTheme} = useTheme();
  const {categorys, products} = useGlobalStore();
  return (
    <View>
      <View
        style={[
          styles.hrStyle,
          {
            borderColor:
              currentTheme === 'dark'
                ? COLORS.borderColorDark
                : COLORS.borderColorLight,
          },
        ]}>
        <MyText style={{fontSize: 18, fontWeight: '700'}}>Bordas? </MyText>
      </View>

      {categorys
        .filter((c: Category) => c.category_name === 'Bordas')
        .map(category =>
          products
            .filter((p: Product) => p.category_id === category.id)
            .map((product, i) => (
              <View
                style={[
                  i !== filteredProducts.length - 1
                    ? [
                        styles.hrStyle,
                        {
                          borderColor:
                            currentTheme === 'dark'
                              ? COLORS.borderColorDark
                              : COLORS.borderColorLight,
                        },
                      ]
                    : null,
                  ,
                  styles.flavourBox,
                ]}
                key={i}>
                <ProductFlavourCard
                  product={product}
                  selectedFlavour2={flavour3}
                  handleSecondFlavour={handleCornicioneSelect}
                />
              </View>
            )),
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  hrStyle: {
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  flavourBox: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default Cornicione;
