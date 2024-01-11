import {useEffect} from 'react';
import useGlobalStore from '../../hooks/store/useGlobalStore';
import useAuth from '../../hooks/auth/useAuth';
import {
  getCategories,
  getProducts,
  getStates,
  getTypePagaments,
} from '../../services';

export const FetchData = () => {
  // const {setCategorys, setProducts, setTypePagament, setStates} =
  //   useGlobalStore();

  // const {isLogged} = useAuth();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const [categoryData, productData, typePagamentData, statesDate] =
  //         await Promise.all([
  //           getCategories(),
  //           getProducts(),
  //           getTypePagaments(),
  //           getStates(),
  //         ]);

  //       setCategorys(categoryData);
  //       setProducts(productData);
  //       setTypePagament(typePagamentData);
  //       setStates(statesDate);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return <></>;
};
