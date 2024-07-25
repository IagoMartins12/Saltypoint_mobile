import React from 'react';
import {StyleSheet, TextInput, View, TouchableOpacity} from 'react-native';
import {COLORS} from '../../../theme/theme';
import useTheme from '../../../hooks/useTheme';
import MyText from '../../Text';
import {Product} from '../../../types/ModelsType';
import CustomIcon from '../../CustomIcon';
import Animated from 'react-native-reanimated';
import ProductFlavourCard from '../../ProductFlavourCard';
import {ProductCardProps} from '../../ProductCard';

interface SecondFlavourProps {
  filteredProducts: Product[];
  size: string;
  animatedStyle: any;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  returnCard: (product: Product) => JSX.Element;
}

const SecondFlavour: React.FC<SecondFlavourProps> = ({
  filteredProducts,
  size,
  animatedStyle,
  searchText,
  setSearchText,
  returnCard,
}) => {
  const {currentTheme} = useTheme();
  const brotinhoList = filteredProducts.map(p => ({
    ...p,
    name: p.name.replace('Pizza', 'Brotinho'),
  }));
  const renderProductFlavourCard = (product: Product, index: number) => (
    <View
      style={[
        styles.hrStyle,
        index !== filteredProducts.length - 1 && {
          borderColor:
            currentTheme === 'dark'
              ? COLORS.borderColorDark
              : COLORS.borderColorLight,
        },
        styles.flavourBox,
      ]}
      key={index}>
      {returnCard(product)}
    </View>
  );

  return (
    <Animated.View style={[animatedStyle]}>
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
        <MyText style={{fontSize: 18, fontWeight: '700'}}>
          Selecione o sabor{' '}
        </MyText>
      </View>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor:
              currentTheme === 'dark'
                ? COLORS.borderColorDark
                : COLORS.borderColorLight,
          },
        ]}>
        <TextInput
          placeholder="Calabresa / Mussarela"
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor={
            currentTheme === 'dark'
              ? COLORS.textColorDark
              : COLORS.textColorLight
          }
          style={[
            styles.textInput,
            {
              color:
                currentTheme === 'dark'
                  ? COLORS.textColorDark
                  : COLORS.textColorLight,
            },
          ]}
        />
        <TouchableOpacity>
          <CustomIcon name="search" size={18} />
        </TouchableOpacity>
      </View>
      {size === '0'
        ? filteredProducts.map(renderProductFlavourCard)
        : brotinhoList.map(renderProductFlavourCard)}
    </Animated.View>
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
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderWidth: 1,
    alignSelf: 'flex-end',
    marginTop: 15,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
  },
});

export default SecondFlavour;
