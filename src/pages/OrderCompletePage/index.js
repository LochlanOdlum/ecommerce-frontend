import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOrder } from '../../actions/orderActions';
import { useDispatch } from 'react-redux';
import useOrders from '../../hooks/useOrders';

import NavBar from '../../components/NavBar';

const OrderCompletePage = () => {
  const { orders } = useOrders();
  const orderId = useParams().orderId;
  const dispatch = useDispatch();

  const order = orders.find((order) => order.id === +orderId);

  useEffect(() => {
    dispatch(fetchOrder(orderId));

    // eslint-disable-next-line
  }, [orderId]);

  console.log(order);

  return (
    <>
      <NavBar />
      <div>
        {!order && <div>Loading order info!</div>}

        {order && (
          <>
            <div>Payment Success!</div>
            <div>Order #{order.id}</div>
            <div>Total: £{order.totalPriceInPence / 100}</div>{' '}
          </>
        )}
      </div>
    </>
  );
};

export default OrderCompletePage;
