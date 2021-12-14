import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import useCart from '../hooks/useCart';

const CartPage = () => {
  const { cartItems, cartTotal, error, isLoaded } = useCart();

  const renderCartItems = () => {
    if (!isLoaded) {
      return <div>Loading cart data!</div>;
    }

    return cartItems.map((item) => {
      return <div key={item.id}>{item.title}</div>;
    });
  };

  if (error) {
    return <div>Error fetching cart data!</div>;
  }

  return (
    <div>
      {renderCartItems()}
      Cart total: {cartTotal}
      <br />
      <Link to='/payment'>Continue to purchase</Link>
    </div>
  );
};

export default CartPage;
