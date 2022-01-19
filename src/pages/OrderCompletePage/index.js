import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ordersApi from '../../api/ordersApi';

const OrderCompletePage = () => {
  const orderId = useParams().orderId;
  const [order, setOrder] = useState({ orderInfo: null, isLoading: true });

  useEffect(() => {
    const getOrderInfo = async () => {
      try {
        const orderInfo = await ordersApi.fetchOrder(orderId);
        setOrder({ orderInfo, isLoading: false });
      } catch (error) {
        console.log(error);
      }
    };

    getOrderInfo();
  }, [orderId]);

  console.log(orderId);

  console.log(order);

  if (order.isLoading) {
    return <div>Loading order info!</div>;
  }

  const calculateOrderTotal = (orderItems) =>
    orderItems.reduce((accumulator, currentItem) => accumulator + Number(currentItem.price), 0);

  return (
    <div>
      <div>Payment Success!</div>
      <div>Order #{order.orderInfo.id}</div>
      <div>Total: {calculateOrderTotal(order.orderInfo.orderItems)}</div>
    </div>
  );
};

export default OrderCompletePage;
