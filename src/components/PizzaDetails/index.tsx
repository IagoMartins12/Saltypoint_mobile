import {StyleSheet, View} from 'react-native';

import {Category, Product} from '../../types/ModelsType';
import useGlobalStore from '../../hooks/store/useGlobalStore';
import {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import TextAreaComponent from '../TextArea';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Cornicione from './Cornicione';
import SecondFlavour from './SecondFlavour';
import SelectFlavour from './SelectFlavour';
import PizzaSize from './PizzaSize';
import PizzaContainer from './PizzaContainer';
import PizzaImage from './PizzaImage';
import ProductFlavourCard from '../ProductFlavourCard';
interface PizzaProps {
  currentProduct: Product;
  comeBack: () => void;
  value: string | number;
  setValue: React.Dispatch<React.SetStateAction<string | number>>;
  setObservation: React.Dispatch<React.SetStateAction<string>>;
  quantity: number;
  scrollToSection: (options: 'Size' | 'Flavour') => void;
  scrollToCornicione: () => void;
  selectedOptions: {
    size: string;
    flavour: string;
    flavour2: any;
    flavour3: any;
  };
  setSelectedOptions: React.Dispatch<
    React.SetStateAction<{
      size: string;
      flavour: string;
      flavour2: any;
      flavour3: any;
    }>
  >;
}

const PizzaDetails: React.FC<PizzaProps> = ({
  currentProduct,
  comeBack,
  quantity,
  setValue,
  value,
  scrollToSection,
  scrollToCornicione,
  setObservation,
  selectedOptions,
  setSelectedOptions,
}) => {
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

  const filteredProducts = products.filter(
    (p: Product) =>
      p.id !== currentProduct.id &&
      p.category_id === currentProduct.category_id &&
      (p.name.toUpperCase().includes(searchText.toUpperCase()) ||
        p.description.toUpperCase().includes(searchText.toUpperCase())),
  );

  const getCategory = categorys.find(
    (c: Category) => c.id === currentProduct.category_id,
  )?.category_name;

  const getName = () =>
    currentProduct.name.toUpperCase().includes('PIZZA') &&
    selectedOptions.size === '1'
      ? currentProduct.name.replace('Pizza', 'Brotinho')
      : currentProduct.name;

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

  const returnCard = (product: Product) => {
    return (
      <ProductFlavourCard
        pageProduct={currentProduct}
        checkDiference={checkDiference}
        product={product}
        selectedFlavour2={selectedOptions.flavour2}
        handleSecondFlavour={handleSecondFlavour}
      />
    );
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

    // const otherProductsCheck =
    // otherProductsValue !== 0 && +otherProductsValue > currentProduct.value;

    const isBrotinho = selectedOptions.size === '1';

    //Se uma borda for selecionado
    if (selectedOptions.flavour3 && currentProduct) {
      const product = products.find(
        (p: Product) => p.id === selectedOptions.flavour3,
      );

      if (!product) return;

      //Se um segundo sabor for selecionado
      if (selectedOptions.flavour2) {
        if (isBrotinho) {
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
        if (isBrotinho) {
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
    if (selectedOptions.flavour2) {
      if (isBrotinho) {
        return setValue(
          (+otherProductsValue * quantity - brotinhoPrice).toFixed(2),
        );
      }

      return setValue((+otherProductsValue * quantity).toFixed(2));
    }

    //Se nenhum outro produto foi selecionado
    if (!selectedOptions.flavour3 && !selectedOptions.flavour2) {
      if (isBrotinho) {
        const newValue = currentProduct.value * quantity - brotinhoPrice;
        return setValue(newValue.toFixed(2));
      }

      const newValue = currentProduct.value * quantity;
      return setValue(newValue.toFixed(2));
    }

    return setValue(newValue.toFixed(2));
  };

  useEffect(() => {
    checkValue();
  }, [value, quantity, selectedOptions, otherProductsValue]);

  useEffect(() => {
    if (selectedOptions.flavour === '1') {
      fadeInOpacity.value = withTiming(1, {duration: 500});
    } else {
      fadeInOpacity.value = withTiming(0, {duration: 500});
    }

    if (selectedOptions.flavour2) {
      const product = products.find(
        (p: Product) => p.id === selectedOptions.flavour2,
      );

      if (product) {
        const maxValue = Math.max(currentProduct?.value, product.value);

        setOtherProductsValue(maxValue);
      }
    }
  }, [selectedOptions.flavour2, selectedOptions.flavour]);

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <PizzaImage comeBack={comeBack} currentProduct={currentProduct} />
      <View style={styles.containerBox}>
        {/* Pizza Details  */}
        <PizzaContainer
          currentProduct={currentProduct}
          getName={getName}
          size={selectedOptions.size}
        />

        <View style={styles.contentBox}>
          {/* Pizza size */}
          <PizzaSize
            handleSizeSelect={handleSizeSelect}
            size={selectedOptions.size}
          />

          {/* Pizza flavour select  */}
          <SelectFlavour
            flavour={selectedOptions.flavour}
            handleFlavourSelect={handleFlavourSelect}
          />

          {/* Pizza second flavour */}
          {selectedOptions.flavour === '1' ? (
            <SecondFlavour
              animatedStyle={animatedStyle}
              filteredProducts={filteredProducts}
              searchText={searchText}
              setSearchText={setSearchText}
              size={selectedOptions.size}
              returnCard={returnCard}
            />
          ) : null}

          {/* Cornicione  */}
          {getCategory && !getCategory.includes('Doces') && (
            <Cornicione
              filteredProducts={filteredProducts}
              flavour3={selectedOptions.flavour3}
              handleCornicioneSelect={handleCornicioneSelect}
            />
          )}
        </View>

        <TextAreaComponent label="Observação" setObservation={setObservation} />
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
    paddingBottom: 20,
  },

  containerBox: {
    width: '90%',
    alignSelf: 'center',
    gap: 20,
    flex: 1,
  },

  contentBox: {
    gap: 15,
    flex: 1,
  },
});

export default PizzaDetails;
