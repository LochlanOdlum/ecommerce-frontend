import React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ordersApi from '../../api/ordersApi';
import useCart from '../../hooks/useCart';
import { EmptyCart } from '../../actions/cartActions';

const PaymentPage = () => {
  const elements = useElements();
  const stripe = useStripe();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { cartItems, cartTotal, error, isLoaded } = useCart();
  const { cartItems, isLoaded } = useCart();

  if (!isLoaded) {
    return <div>Loading data!</div>;
  }

  const cartItemIds = cartItems.map((item) => item.id);

  const onPaymentSubmit = async (e) => {
    console.log('t');

    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    try {
      const { clientSecret, orderId } = await ordersApi.startOrder(cartItemIds);

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (!error) {
        dispatch(EmptyCart());
        navigate(`/order/success/${orderId}`);
      }
    } catch (error) {
      //TODO: Add error handling. error component to display error at top of payment page????
      //Would need to have state to store error. General error state or state for payment page containing errors?
      console.log(error);
    }
  };

  return (
    <>
      <h1>Payment</h1>
      <form id='payment-form' onSubmit={onPaymentSubmit}>
        <label htmlFor='card-element'>Card</label>
        <CardElement id='card-element' />
        <button type='submit'>Pay</button>
      </form>
    </>
  );
};

export default PaymentPage;
