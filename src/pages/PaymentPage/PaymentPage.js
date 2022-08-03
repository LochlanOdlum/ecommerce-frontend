import React from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startOrderRequest } from '../../api/ordersApi';
import useCart from '../../hooks/useCart';
import { EmptyCart } from '../../actions/cartActions';

import NavBar from '../../components/NavBar/NavBar';
import './PaymentPage.scss';
import useCollections from '../../hooks/useCollections';

const PaymentPage = () => {
  const elements = useElements();
  const stripe = useStripe();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name, email } = useSelector((state) => state.auth);
  const { cartItems, cartTotal, isLoaded } = useCart();
  const { collectionMap } = useCollections();

  const inputStyle = {
    fontSize: '20px',
    '::placeholder': {
      color: '#B1ADAD',
    },
  };

  if (!isLoaded) {
    return <div>Loading data!</div>;
  }

  const cartItemIds = cartItems.map((item) => item.id);

  const renderOrderSummaryItems = () =>
    cartItems.map((cartItem) => (
      <div className='pp-order-summary-item' key={cartItem.id}>
        <img className='pp-summary-item-img' alt={cartItem.title} src={cartItem.imageWmarkedMedSquarePublicURL} />
        <div className='pp-summary-item-titleandcollection'>
          <div className='pp-summary-item-title'>{cartItem.title}</div>
          <div className='pp-summary-item-collection'>{collectionMap[cartItem.collectionId]}</div>
        </div>
        <div className='pp-summary-item-price'>£{cartItem.priceInPence / 100}</div>
      </div>
    ));

  const onPaymentSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    try {
      //TODO: When guest option available will need to conditionally change where email, name come from.
      const { clientSecret, orderId } = await startOrderRequest(email, name, cartItemIds);

      const cardNumberElement = elements.getElement(CardNumberElement);

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumberElement,
        },
      });
      // const {error, paymentMethod} = await stripe?.createPaymentMethod({
      //   type: 'card',
      //   card: cardNumberElement,  // pass as card
      //   billing_details: {
      //     name, // name of the user
      //   },
      // });

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
      <NavBar />
      <div className='pp-container'>
        <h1 className='pp-title-checkout'>Checkout</h1>
        <div className='pp-payment-container'>
          <div className='pp-form-container'>
            <h2 className='pp-subtitle'>Payment Method</h2>
            <p className='pp-description'>
              All transactions are secure and your credit card information is never stored
            </p>
            <div className='payment-option'>
              {radioSelected}
              <div className='payment-option-1-text'>Credit/Debit Card</div>
              <div className='payment-option-1-icons'>
                <img className='payment-option-1-visa-icon' alt='visa icon' src='/images/VisaIcon.png' />
                <img
                  className='payment-option-1-mastercard-icon'
                  alt='mastercard icon'
                  src='/images/mastercardIcon.svg'
                />
              </div>
            </div>
            <form className='payment-form' onSubmit={onPaymentSubmit}>
              {/* <label htmlFor='card-element'>Card</label> */}
              <div className='pp-stripe-order-row-1'>
                <CardNumberElement
                  className='stripe-element'
                  options={{
                    style: {
                      base: inputStyle,
                    },
                    placeholder: 'Card Number',
                  }}
                />
              </div>
              <div className='pp-stripe-order-row-2'>
                <CardExpiryElement
                  className='stripe-element pp-stripe-card-expiry'
                  options={{
                    style: {
                      base: inputStyle,
                    },
                  }}
                />

                <CardCvcElement
                  className='stripe-element pp-stripe-card-cvc'
                  options={{
                    style: {
                      base: inputStyle,
                    },
                  }}
                />
              </div>
              <button type='submit' id='pp-place-order-button' className='button-orange'>
                Place Order
              </button>
              <Link to='/shop' className='pp-return-to-store'>
                <div className='pp-back-arrow-returnstore'>{backArrow}</div>Return to Store
              </Link>
            </form>
          </div>
          <div className='pp-order-summary'>
            <div className='pp-order-summary-title-container'>
              <h2 className='pp-order-summary-title'>Your Order</h2>
              <Link to='/cart' className='pp-order-summary-edit-text'>
                (Edit)
              </Link>
            </div>
            {renderOrderSummaryItems()}
            <div className='pp-order-summary-total-info'>
              <div className='pp-order-summary-total-title'>Total</div>
              <div className='pp-order-summary-total-value'>£{cartTotal}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const backArrow = (
  <svg width='14' height='10' viewBox='0 0 14 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M14.0009 5.09731C14.0009 4.9647 13.9482 4.83753 13.8544 4.74376C13.7607 4.64999 13.6335 4.59731 13.5009 4.59731H1.70789L4.85489 1.45131C4.90138 1.40482 4.93826 1.34963 4.96342 1.28889C4.98858 1.22816 5.00153 1.16306 5.00153 1.09731C5.00153 1.03157 4.98858 0.966467 4.96342 0.905728C4.93826 0.844988 4.90138 0.789799 4.85489 0.743311C4.80841 0.696823 4.75322 0.659947 4.69248 0.634788C4.63174 0.609629 4.56664 0.59668 4.50089 0.59668C4.43515 0.59668 4.37005 0.609629 4.30931 0.634788C4.24857 0.659947 4.19338 0.696823 4.14689 0.743311L0.146894 4.74331C0.100331 4.78976 0.0633877 4.84493 0.0381812 4.90568C0.0129748 4.96642 0 5.03154 0 5.09731C0 5.16308 0.0129748 5.2282 0.0381812 5.28894C0.0633877 5.34969 0.100331 5.40487 0.146894 5.45131L4.14689 9.45131C4.19338 9.4978 4.24857 9.53468 4.30931 9.55983C4.37005 9.58499 4.43515 9.59794 4.50089 9.59794C4.56664 9.59794 4.63174 9.58499 4.69248 9.55983C4.75322 9.53468 4.80841 9.4978 4.85489 9.45131C4.90138 9.40482 4.93826 9.34963 4.96342 9.28889C4.98858 9.22816 5.00153 9.16305 5.00153 9.09731C5.00153 9.03157 4.98858 8.96647 4.96342 8.90573C4.93826 8.84499 4.90138 8.7898 4.85489 8.74331L1.70789 5.59731H13.5009C13.6335 5.59731 13.7607 5.54463 13.8544 5.45086C13.9482 5.3571 14.0009 5.22992 14.0009 5.09731Z'
      fill='black'
    />
  </svg>
);

const radioSelected = (
  <svg width='31' height='30' viewBox='0 0 31 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M15.918 6.25C11.0942 6.25 7.16797 10.1763 7.16797 15C7.16797 19.8237 11.0942 23.75 15.918 23.75C20.7417 23.75 24.668 19.8237 24.668 15C24.668 10.1763 20.7417 6.25 15.918 6.25ZM15.918 21.25C12.4717 21.25 9.66797 18.4462 9.66797 15C9.66797 11.5538 12.4717 8.75 15.918 8.75C19.3642 8.75 22.168 11.5538 22.168 15C22.168 18.4462 19.3642 21.25 15.918 21.25Z'
      fill='black'
    />
    <path
      d='M15.918 11.25C13.8842 11.25 12.168 12.9663 12.168 15C12.168 17.0338 13.8842 18.75 15.918 18.75C17.9517 18.75 19.668 17.0338 19.668 15C19.668 12.9663 17.9517 11.25 15.918 11.25Z'
      fill='black'
    />
  </svg>
);

export default PaymentPage;
