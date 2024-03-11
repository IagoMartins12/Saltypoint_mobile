import {useEffect} from 'react';
import useGlobalStore from '../../hooks/store/useGlobalStore';
import {
  getCategories,
  getGeneralData,
  getProducts,
  getRewards,
  getStates,
  getTypePagaments,
  getUserInfos,
} from '../../services';
import {useColorScheme} from 'react-native';
import useTheme from '../../hooks/useTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import usePrivateStore from '../../hooks/store/usePrivateStore';
import useAuth from '../../hooks/auth/useAuth';

const FetchData = () => {
  const {
    setProducts,
    setCategorys,
    setStates,
    setTypePagament,
    setReward,
    setGeneralData,
  } = useGlobalStore();

  const {
    setAddress,
    setUser,
    setFavorites,
    setCart_product,
    setCoupons,
    setOrders,
    setUserReward,
  } = usePrivateStore();
  const {setCurrentTheme} = useTheme();
  const colorScheme = useColorScheme();
  const {isLogged} = useAuth();

  const fetchTheme = async () => {
    const savedTheme = await AsyncStorage.getItem('theme');
    if (savedTheme) {
      const systemTheme = savedTheme === 'dark' ? 'dark' : 'light';

      setCurrentTheme(systemTheme);
    }
    if (!savedTheme) {
      const systemTheme = colorScheme === 'dark' ? 'dark' : 'light';
      setCurrentTheme(systemTheme);
    }
  };

  const fetchData = async () => {
    try {
      const [
        categoryData,
        productData,
        typePagamentData,
        statesDate,
        rewardData,
        generalData,
      ] = await Promise.all([
        getCategories(),
        getProducts(),
        getTypePagaments(),
        getStates(),
        getRewards(),
        getGeneralData(),
      ]);

      setCategorys(categoryData);
      setProducts(productData);
      setTypePagament(typePagamentData);
      setStates(statesDate);
      setReward(rewardData);
      setGeneralData(generalData);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPrivateData = async () => {
    try {
      const getData = await getUserInfos();
      setCoupons(getData.coupons);
      setAddress(getData.userAddress);
      setUser(getData.user);
      setFavorites(getData.favorites);
      setCart_product(getData.cartProducts);
      setOrders(getData.orders);
      setUserReward(getData.rewards);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTheme();
    fetchData();
  }, []);

  useEffect(() => {
    if (isLogged) {
      console.log('fetch....');
      fetchPrivateData();
    }
  }, [isLogged]);

  return <></>;
};

export default FetchData;
