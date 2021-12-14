import React from 'react';
import useOrders from '../hooks/useOrders';

const MyOrdersPage = () => {
  const { orders, isLoaded, error } = useOrders();

  console.log(orders);

  if (!isLoaded) {
    return <div>Loading Orders!</div>;
  }

  return <div>My Orders</div>;
};

export default MyOrdersPage;
