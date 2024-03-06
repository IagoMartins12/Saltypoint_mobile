import {useEffect} from 'react';
import useGlobalStore from '../../hooks/store/useGlobalStore';
import {
  getCategories,
  getProducts,
  getRewards,
  getStates,
  getTypePagaments,
} from '../../services';
import {useColorScheme} from 'react-native';
import useTheme from '../../hooks/useTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FetchData = () => {
  const {setProducts, setCategorys, setStates, setTypePagament, setReward} =
    useGlobalStore();
  const {setCurrentTheme} = useTheme();
  const colorScheme = useColorScheme();

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
      ] = await Promise.all([
        getCategories(),
        getProducts(),
        getTypePagaments(),
        getStates(),
        getRewards(),
      ]);

      setCategorys(categoryData);
      setProducts(productData);
      setTypePagament(typePagamentData);
      setStates(statesDate);
      setReward(rewardData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTheme();
    fetchData();
  }, []);

  return <></>;
};

export default FetchData;
