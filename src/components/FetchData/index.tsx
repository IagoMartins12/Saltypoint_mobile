import {useEffect} from 'react';
import useGlobalStore from '../../hooks/store/useGlobalStore';
import useAuth from '../../hooks/auth/useAuth';
import {
  getCategories,
  getProducts,
  getRewards,
  getStates,
  getTypePagaments,
} from '../../services';

const FetchData = () => {
  const {setProducts, setCategorys, setStates, setTypePagament, setReward} =
    useGlobalStore();

  // const {isLogged} = useAuth();

  useEffect(() => {
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

    fetchData();
  }, []);

  return <></>;
};

export default FetchData;
