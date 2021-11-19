import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductList } from '../actions/productActions';

//Purpose is to ensure product list is fetched from server and added to redux state
//Maybe add optional parm for fetchNewList, if true then will fetch product list from backend and update state
//first time the component mounts (could be usefull for cart)
const useProducts = () => {
  const { products, isLoading, isLoaded, error } = useSelector((state) => state.productList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading && !isLoaded) {
      dispatch(fetchProductList());
    }
  }, []);

  return { products, isLoaded, error };
};

export default useProducts;
