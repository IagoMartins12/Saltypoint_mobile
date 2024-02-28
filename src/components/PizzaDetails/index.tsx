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
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';
import {Category, Product} from '../../types/ModelsType';
import useGlobalStore from '../../hooks/store/useGlobalStore';
import ProductFlavourCard from '../ProductFlavourCard';
import {useEffect, useState} from 'react';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import TextAreaComponent from '../TextArea';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
interface PizzaProps {
  currentProduct: Product;
  comeBack: () => void;
  value: string | number;
  setValue: React.Dispatch<React.SetStateAction<string | number>>;
  quantity: number;
  scrollToSection: (options: 'Size' | 'Flavour') => void;
  scrollToCornicione: () => void;
}

const pizzaSize = [
  {
    name: 'Pizza',
    icon: <CustomIcon name="pizza" size={25} pack="Ionicons" />,
    id: '0',
  },
  {
    name: 'Brotinho',
    icon: <CustomIcon name="pizza" size={25} pack="Ionicons" />,
    id: '1',
  },
];

const pizzaFlavour = [
  {
    name: '1 Sabor',
    id: '0',
  },
  {
    name: '2 Sabores',
    id: '1',
  },
];

const PizzaDetails: React.FC<PizzaProps> = ({
  currentProduct,
  comeBack,
  quantity,
  setValue,
  value,
  scrollToSection,
  scrollToCornicione,
}) => {
  const [selectedOptions, setSelectedOptions] = useState({
    size: '0',
    flavour: '0',
    flavour2: null,
    flavour3: null,
  });
  const [otherProductsValue, setOtherProductsValue] = useState<number | string>(
    0,
  );
  const [searchText, setSearchText] = useState<string>('');

  const {products, categorys} = useGlobalStore();
  const fadeInOpacity = useSharedValue(0);
  const brotinhoPrice = 10 * quantity;
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeInOpacity.value,
    };
  });

  const filteredProducts = products
    .filter(
      (p: Product) =>
        p.id !== currentProduct.id &&
        p.category_id === currentProduct.category_id,
    )
    .filter(
      p =>
        p.name.toUpperCase().includes(searchText.toUpperCase()) ||
        p.description.toUpperCase().includes(searchText.toUpperCase()),
    );

  const brotinhoList = products
    .filter(
      (p: Product) =>
        p.id !== currentProduct.id &&
        p.category_id === currentProduct.category_id,
    )
    .filter(
      p =>
        p.name.toUpperCase().includes(searchText.toUpperCase()) ||
        p.description.toUpperCase().includes(searchText.toUpperCase()),
    )
    .map(p => ({
      ...p,
      name: p.name.replace('Pizza', 'Brotinho'),
    }));

  const getCategory = categorys.find(
    (c: Category) => c.id === currentProduct.category_id,
  )?.category_name;

  const getName = (flavour2?: string) => {
    const name =
      currentProduct.name.toUpperCase().includes('PIZZA') &&
      selectedOptions.size === '1'
        ? currentProduct.name.replace('Pizza', 'Brotinho')
        : currentProduct.name;

    // if (!flavour2) return name;

    // const getFlavourName = products.find((p: Product) => p.id === flavour2);
    // const spliFlavourName = getFlavourName.name
    //   .replace('Pizza', '')
    //   .replace('de', '')
    //   .replace(' ', '');
    // const splitName = name.replace('de', 'meia').concat(` /${spliFlavourName}`);

    return name;
  };

  const handleSizeSelect = (sizeId: string) => {
    setSelectedOptions({...selectedOptions, size: sizeId});
    scrollToSection('Size');
  };

  const handleFlavourSelect = (flavourId: string | null) => {
    setSelectedOptions({...selectedOptions, flavour: flavourId});

    if (flavourId === '1') {
      scrollToSection('Flavour');
    }
  };

  const handleSecondFlavour = (flavourId: string | null) => {
    setSelectedOptions({
      ...selectedOptions,
      flavour2: flavourId,
    });

    if (flavourId) scrollToCornicione();
  };

  const handleCornicioneSelect = (cornicioneId: string) => {
    setSelectedOptions({...selectedOptions, flavour3: cornicioneId});
  };

  const checkDiference = (product: Product) => {
    const value = product.value - currentProduct.value;

    return value.toFixed(2);
  };

  const checkValue = () => {
    let newValue = currentProduct.value * quantity;

    //Se uma borda for selecionado
    if (selectedOptions.flavour3 && currentProduct) {
      const product = products.find(
        (p: Product) => p.id === selectedOptions.flavour3,
      );

      if (!product) return;

      //Se um segundo sabor for selecionado
      if (
        selectedOptions.flavour2 &&
        otherProductsValue !== 0 &&
        +otherProductsValue > +currentProduct.value
      ) {
        if (selectedOptions.size === '1') {
          const newValue =
            +otherProductsValue * quantity + product.value * quantity;
          return setValue((newValue - brotinhoPrice).toFixed(2));
        }
        return setValue(
          (+otherProductsValue * quantity + product.value * quantity).toFixed(
            2,
          ),
        );
      } else {
        if (selectedOptions.size === '1') {
          return setValue(
            (
              currentProduct.value * quantity +
              product.value * quantity -
              brotinhoPrice
            ).toFixed(2),
          );
        }

        return setValue(
          (currentProduct.value * quantity + product.value * quantity).toFixed(
            2,
          ),
        );
      }
    }

    //Se um segundo sabor for selecionado
    if (
      selectedOptions.flavour2 &&
      otherProductsValue !== 0 &&
      +otherProductsValue > currentProduct.value
    ) {
      if (selectedOptions.size === '1') {
        return setValue(
          (+otherProductsValue * quantity - brotinhoPrice).toFixed(2),
        );
      }

      return setValue((+otherProductsValue * quantity).toFixed(2));
    }

    //Se nenhum outro produto foi selecionado
    if (!selectedOptions.flavour3 && !selectedOptions.flavour2) {
      if (selectedOptions.size === '1') {
        const newValue = currentProduct.value * quantity - brotinhoPrice;
        return setValue(newValue.toFixed(2));
      }

      const newValue = currentProduct.value * quantity;
      return setValue(newValue.toFixed(2));
    }

    return setValue(newValue.toFixed(2));
  };

  // Atualizar o valor compartilhado quando a segunda opção de sabor for selecionada
  useEffect(() => {
    if (selectedOptions.flavour === '1') {
      fadeInOpacity.value = withTiming(1, {duration: 800});
    } else {
      fadeInOpacity.value = withTiming(0, {duration: 500});
    }
  }, [selectedOptions.flavour]);

  useEffect(() => {
    checkValue();
  }, [value, quantity, selectedOptions, otherProductsValue]);

  useEffect(() => {
    if (selectedOptions.flavour2) {
      const product = products.find(
        (p: Product) => p.id === selectedOptions.flavour2,
      );

      if (product) {
        const maxValue = Math.max(currentProduct?.value, product.value);

        setOtherProductsValue(maxValue);
      }
    }
  }, [selectedOptions.flavour2]);

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={[styles.productImage]}>
        <Image
          resizeMode={'contain'}
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
            <MyText style={styles.tittle}>
              {getName(selectedOptions.flavour2)}
            </MyText>

            <MyText style={styles.price}>
              R${' '}
              {selectedOptions.size === '1'
                ? (currentProduct.value - 10).toFixed(2)
                : currentProduct.value.toFixed(2)}
            </MyText>
          </View>

          <MyText style={styles.description}>
            {currentProduct.description}
          </MyText>
        </View>

        <View style={styles.contentBox}>
          {/* Pizza size */}
          <View style={styles.iconContainer}>
            {pizzaSize.map((op, i) => (
              <Pressable
                style={[
                  styles.iconBox,
                  {
                    backgroundColor:
                      op.id === selectedOptions.size
                        ? '#f19b9b'
                        : COLORS.primaryGray,

                    borderWidth: op.id === selectedOptions.size ? 1 : 0.5,
                    borderColor: '#000000',
                  },
                ]}
                key={i}
                onPress={() => handleSizeSelect(op.id)}>
                {op.icon}

                <MyText style={styles.iconText}>{op.name}</MyText>
              </Pressable>
            ))}
          </View>

          {/* Pizza flavour select  */}
          <View>
            <View style={[styles.hrStyle]}>
              <MyText>Quantos sabores? </MyText>
            </View>

            {pizzaFlavour.map((p, i) => (
              <View style={[styles.hrStyle, styles.flavourBox]} key={i}>
                <MyText>{p.name}</MyText>
                <TouchableOpacity
                  style={[
                    styles.roundedButton,
                    {
                      backgroundColor:
                        selectedOptions.flavour === p.id
                          ? COLORS.secondaryRed
                          : COLORS.primaryGray,
                    },
                  ]}
                  onPress={() => handleFlavourSelect(p.id)}>
                  <View
                    style={[
                      styles.insideRoundedButton,
                      {
                        backgroundColor:
                          selectedOptions.flavour === p.id
                            ? '#ffffff'
                            : COLORS.primaryGray,
                      },
                    ]}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Pizza second flavour */}
          {selectedOptions.flavour === '1' ? (
            <Animated.View style={[styles.fadeInView, animatedStyle]}>
              <View style={[styles.hrStyle]}>
                <MyText>Selecione o sabor? </MyText>
              </View>
              <View style={[styles.InputContainerComponent]}>
                <TextInput
                  placeholder="Calabresa / Mussarela"
                  value={searchText}
                  onChangeText={text => setSearchText(text)}
                  placeholderTextColor={COLORS.primaryLightGreyHex}
                  style={styles.TextInputContainer}
                />
                <TouchableOpacity>
                  <CustomIcon name="search" size={18} />
                </TouchableOpacity>
              </View>
              {selectedOptions.size === '0'
                ? filteredProducts.map((p, i) => (
                    <View
                      style={[
                        i !== filteredProducts.length - 1
                          ? styles.hrStyle
                          : null,
                        styles.flavourBox,
                      ]}
                      key={i}>
                      <ProductFlavourCard
                        pageProduct={currentProduct}
                        checkDiference={checkDiference}
                        product={p}
                        key={i}
                        selectedFlavour2={selectedOptions.flavour2}
                        handleSecondFlavour={handleSecondFlavour}
                      />
                    </View>
                  ))
                : brotinhoList.map((p, i) => (
                    <View
                      style={[
                        i !== filteredProducts.length - 1
                          ? styles.hrStyle
                          : null,
                        styles.flavourBox,
                      ]}
                      key={i}>
                      <ProductFlavourCard
                        pageProduct={currentProduct}
                        checkDiference={checkDiference}
                        product={p}
                        key={i}
                        selectedFlavour2={selectedOptions.flavour2}
                        handleSecondFlavour={handleSecondFlavour}
                      />
                    </View>
                  ))}
            </Animated.View>
          ) : null}

          {/* Cornicione  */}

          {getCategory && !getCategory.includes('Doces') && (
            <View>
              <View style={[styles.hrStyle]}>
                <MyText>Bordas? </MyText>
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
                            ? styles.hrStyle
                            : null,
                          ,
                          styles.flavourBox,
                        ]}
                        key={i}>
                        <ProductFlavourCard
                          product={product}
                          selectedFlavour2={selectedOptions.flavour3}
                          handleSecondFlavour={handleCornicioneSelect}
                        />
                      </View>
                    )),
                )}
            </View>
          )}
        </View>

        <TextAreaComponent label="Observação" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    gap: 20,
  },

  productImage: {
    height: Dimensions.get('screen').height / 2,
    justifyContent: 'flex-end',
    paddingVertical: 50,
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
    flex: 1,
  },

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

  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  iconBox: {
    width: '48%',
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconText: {
    fontSize: 18,
    fontWeight: '600',
  },

  hrStyle: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },

  flavourBox: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  roundedButton: {
    width: 25,
    height: 25,
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondaryRed,
  },

  insideRoundedButton: {
    width: 10,
    height: 10,
    borderRadius: 1000,
  },
  InputContainerComponent: {
    flexDirection: 'row',
    marginTop: 15,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderWidth: 1,
    alignSelf: 'flex-end',
  },

  TextInputContainer: {
    flex: 1,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: '#000000',
  },
  fadeInView: {},

  contentBox: {
    gap: 15,
    flex: 1,
  },
});

export default PizzaDetails;
