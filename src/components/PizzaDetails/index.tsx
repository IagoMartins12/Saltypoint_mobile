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
import {useRef, useState} from 'react';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import TextAreaComponent from '../TextArea';

interface PizzaProps {
  currentProduct: Product;
  comeBack: () => void;
}

const pizzaSize = [
  {
    name: 'Brotinho',
    icon: <CustomIcon name="pizza" size={25} pack="Ionicons" />,
    id: '0',
  },
  {
    name: 'Pizza',
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

const PizzaDetails: React.FC<PizzaProps> = ({currentProduct, comeBack}) => {
  const [selectedOptions, setSelectedOptions] = useState({
    size: null,
    flavour: null,
    flavour2: null,
    flavour3: null,
  });
  const [searchText, setSearchText] = useState<string>('');

  const isPizza = currentProduct?.name.toUpperCase().includes('PIZZA');
  const scrollViewRef = useRef<ScrollView>(null); // Ref para o ScrollView

  const {products, categorys} = useGlobalStore();
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

  const scrollToSection = () => {
    console.log('scroll');
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: 1200, // Ajuste o valor de 'y' conforme necessário para rolar até a seção desejada
        animated: true,
      });
    }
  };

  const getCategory = categorys.find(
    (c: Category) => c.id === currentProduct.category_id,
  )?.category_name;

  const handleSizeSelect = (sizeId: string) => {
    setSelectedOptions({...selectedOptions, size: sizeId});
  };

  const handleFlavourSelect = (flavourId: string) => {
    setSelectedOptions({...selectedOptions, flavour: flavourId});
    if (flavourId === '1') {
      // Se '2 Sabores' for selecionado, rolar até a seção desejada
      scrollToSection();
    }
  };

  const handleCornicioneSelect = (cornicioneId: string) => {
    setSelectedOptions({...selectedOptions, flavour3: cornicioneId});
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
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
            <MyText style={styles.tittle}>
              {currentProduct.name.toUpperCase().includes('PIZZA') &&
              selectedOptions.size === '0'
                ? currentProduct.name.replace('Pizza', 'Brotinho')
                : currentProduct.name}
            </MyText>

            <MyText style={styles.price}>
              R$ {currentProduct.value.toFixed(2)}
            </MyText>
          </View>

          <MyText style={styles.description}>
            {currentProduct.description}
          </MyText>
        </View>
        <View
          style={{
            flex: 1,
          }}>
          <View
            style={{
              gap: 15,
              flex: 1,
            }}>
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

            {/* Segundo sabor */}
            {selectedOptions.flavour === '1' ? (
              <View>
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
                {filteredProducts.map((p, i) => (
                  <View
                    style={[
                      i !== filteredProducts.length - 1 ? styles.hrStyle : null,
                      styles.flavourBox,
                    ]}
                    key={i}>
                    <ProductFlavourCard
                      product={p}
                      key={i}
                      selectedFlavour2={selectedOptions.flavour2}
                      setSelectedFlavour2={(flavourId: string) =>
                        setSelectedOptions({
                          ...selectedOptions,
                          flavour2: flavourId,
                        })
                      }
                    />
                  </View>
                ))}
              </View>
            ) : null}

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
                            setSelectedFlavour2={handleCornicioneSelect}
                          />
                        </View>
                      )),
                  )}
              </View>
            )}
          </View>
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
});

export default PizzaDetails;
