import {ChangeEvent} from 'react';
import {
  Cart_product,
  Category,
  Discount_cupom,
  User,
  User_Adress,
  User_Rewards,
} from '../types/ModelsType';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Dimensions} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {APP_SETTINGS} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const formatDate = (dateString: string, numericOnly = false): string => {
  const date = new Date(dateString);

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  if (numericOnly) {
    return `${day}/${monthIndex + 1}/${year}`;
  } else {
    const monthNames = [
      'janeiro',
      'fevereiro',
      'março',
      'abril',
      'maio',
      'junho',
      'julho',
      'agosto',
      'setembro',
      'outubro',
      'novembro',
      'dezembro',
    ];

    return `${day} de ${monthNames[monthIndex]} de ${year}`;
  }
};

export const formatCep = (value: string) => {
  const numericValue = value.replace(/\D/g, '');
  const formattedCep =
    numericValue.length <= 5
      ? numericValue
      : numericValue.slice(0, 5) + '-' + numericValue.slice(5, 8);

  return formattedCep;
};

export const checkIfAddressIsValid = (address: string) => {
  const validDistricts = [
    'Sol nascente',
    'Sulina',
    'Décima',
    'area',
    'Bandeirantes',
    'Morada',
  ];

  const lowercaseAddress = address.toLowerCase();

  return validDistricts.some(district =>
    lowercaseAddress.includes(district.toLowerCase()),
  );
};

export const formatPhoneNumber = (inputValue: string) => {
  const numericPhoneNumber = inputValue.replace(/\D/g, '');

  let formattedPhoneNumber = '';

  for (let i = 0; i < numericPhoneNumber.length; i++) {
    if (i === 0) {
      formattedPhoneNumber = `(${numericPhoneNumber[i]}`;
    } else if (i === 2) {
      formattedPhoneNumber += `) ${numericPhoneNumber[i]}`;
    } else if (i === 7) {
      formattedPhoneNumber += `-${numericPhoneNumber[i]}`;
    } else {
      formattedPhoneNumber += numericPhoneNumber[i];
    }
  }

  return formattedPhoneNumber;
};

export const formatPhoneNumberUser = (phoneNumber: string) => {
  // Remove todos os caracteres não numéricos
  const numericPhoneNumber = phoneNumber.replace(/\D/g, '');

  // Aplica o regex para formatar como (xx) xxxxx-xxxx
  return numericPhoneNumber.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
};

export const formatOrderDate = (orderDate: Date) => {
  const date = new Date(orderDate);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDate = `${day}/${month}/${year} • ${hours}:${minutes
    .toString()
    .padStart(2, '0')}`;

  return formattedDate;
};

export const categoriesToExclude = ['Bordas', 'Brindes', 'Promoções'];

export const visibleCategories = (
  category: Category[],
  includeAll?: boolean,
) => {
  if (includeAll) {
    return [
      {category_name: 'Todos', id: '0'},
      ...category.filter(
        category => !categoriesToExclude.includes(category.category_name),
      ),
    ];
  }

  return [
    ...category.filter(
      category => !categoriesToExclude.includes(category.category_name),
    ),
  ];
};

export const handleInputChange = (event: string) => {
  event = formatPhoneNumber(event);

  return event;
};

export const getCartTotal = (cart_product: Cart_product[]) => {
  return cart_product.reduce((total, item) => total + Number(item.value), 0);
};
export const getCartTotalLenght = (cart_product: Cart_product[]) => {
  return cart_product.reduce((total, item) => total + Number(item.quantity), 0);
};

export const getDiscount = (discount: number, cartProductTotal: number) => {
  const orderDiscount = (discount / 100) * cartProductTotal;
  return orderDiscount;
};

export const getAddressInfo = (address: User_Adress[], user: User) => {
  const userAddress = address.find(a => a.id === user?.user_Adress_id);
  return userAddress;
};

export const getTaxa = (district: String | undefined) => {
  if (!district) return;
  const lowercaseAddress = district.toLowerCase();

  const rate = APP_SETTINGS.districtRate.some(district =>
    lowercaseAddress.includes(district.toLowerCase()),
  );

  return rate;
};
export const setIntro = async () => {
  await AsyncStorage.setItem('intro', 'true');
};

export const checkIntro = async () => {
  try {
    const getIntro = await AsyncStorage.getItem('intro');
    if (getIntro !== null) {
      // O valor existe, então não é o primeiro acesso
      return false;
    } else {
      // O valor não existe, então é o primeiro acesso
      return true;
    }
  } catch (error) {
    // Tratar erros aqui, se necessário
    console.error('Erro ao verificar o acesso inicial:', error);
    return false; // Assumindo que um erro significa que não é o primeiro acesso
  }
};

export const checkUser = async () => {
  try {
    const getUser = await AsyncStorage.getItem('secret');
    if (getUser !== null) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    // Tratar erros aqui, se necessário
    console.error('Erro ao verificar o acesso inicial:', error);
    return false; // Assumindo que um erro significa que não é o primeiro acesso
  }
};
export const getTotal = (
  cart_product: Cart_product[],
  currentCode: User_Rewards | Discount_cupom,
  isCoupon: boolean,
  isReward: boolean,
  deliveryFee?: number,
) => {
  let cartProductTotal = getCartTotal(cart_product);

  if (currentCode && isCoupon) {
    cartProductTotal -= getDiscount(
      (currentCode as Discount_cupom).discount,
      cartProductTotal,
    );
  }

  if (
    currentCode &&
    isReward &&
    (currentCode as User_Rewards).rewardType === 0
  ) {
    cartProductTotal -= getDiscount(
      (currentCode as User_Rewards).rewardDiscount,
      cartProductTotal,
    );
  }

  if (deliveryFee) {
    return cartProductTotal + deliveryFee;
  }

  return cartProductTotal;
};

export const iconSize = 30;
export const iconColor = '#000000';
export const enableGoBack = (navigation: NativeStackNavigationProp<any>) => {
  navigation.addListener('beforeRemove', e => {
    e.preventDefault();
  });
};
