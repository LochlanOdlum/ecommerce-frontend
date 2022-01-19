import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrderList } from '../actions/orderActions';

//Purpose is to ensure product list is fetched from server and added to redux state
//Maybe add optional parm for fetchNewList, if true then will fetch product list from backend and update state
//first time the component mounts (could be usefull for cart)
const useOrders = () => {
  const { orders, isLoading, isLoaded, error } = useSelector((state) => state.orderList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading && !isLoaded) {
      dispatch(fetchOrderList());
    }
    // eslint-disable-next-line
  }, []);

  return { orders, isLoaded, error };
};

export default useOrders;
