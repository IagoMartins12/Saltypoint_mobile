import {useEffect} from 'react';
import useGlobalStore from '../../hooks/store/useGlobalStore';
import useAuth from '../../hooks/auth/useAuth';
import {
  getCategories,
  getProducts,
  getStates,
  getTypePagaments,
} from '../../services';

const FetchData = () => {
  const {setProducts, setCategorys, setStates, setTypePagament} =
    useGlobalStore();

  // const {isLogged} = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const productData = await getProducts();
        // setProducts(productData);
        const [categoryData, productData, typePagamentData, statesDate] =
          await Promise.all([
            getCategories(),
            getProducts(),
            getTypePagaments(),
            getStates(),
          ]);

        setCategorys(categoryData);
        setProducts(productData);
        setTypePagament(typePagamentData);
        setStates(statesDate);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return <></>;
};

export default FetchData;
