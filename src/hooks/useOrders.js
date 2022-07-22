import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrderList } from '../actions/orderActions';

//Purpose is to ensure product list is fetched from server and added to redux state
//Maybe add optional parm for fetchNewList, if true then will fetch product list from backend and update state
//first time the component mounts (could be usefull for cart)
const useOrders = () => {
  const [orderItems, setOrderItems] = useState([]);
  const { orders, isLoading, isLoaded, error } = useSelector((state) => state.orderList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading && !isLoaded) {
      dispatch(fetchOrderList());
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!orders) {
      return;
    }

    console.log('tttttttttttttt');
    console.log(orders);

    const newOrderItems = [];

    orders.forEach((order) => {
      newOrderItems.push(...order.orderItems);
    });

    setOrderItems(newOrderItems);
  }, [orders]);

  return { orders, orderItems, isLoaded, error };
};

export default useOrders;
