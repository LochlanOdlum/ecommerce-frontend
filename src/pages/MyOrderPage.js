import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchOrder } from '../actions/orderActions';
import useOrders from '../hooks/useOrders';

const MyOrderPage = () => {
  const dispatch = useDispatch();
  const orderId = Number(useParams().orderId);
  const { orders, isLoaded, error } = useOrders();

  useEffect(() => {
    dispatch(fetchOrder(orderId));
  }, [dispatch, orderId]);

  const order = orders.find((ord) => ord.id === orderId);

  console.log(order);

  return <div>Order page!</div>;
};

export default MyOrderPage;
