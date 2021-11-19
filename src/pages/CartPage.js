import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import useCart from '../hooks/useCart';

const CartPage = () => {
  const { cartItems, cartTotal } = useCart();
  const { products, isLoaded, error } = useProducts();

  const renderCartItems = () => {
    if (error) {
      return <div>Error fetching product data!</div>;
    }

    if (!isLoaded) {
      return <div>Loading product data!</div>;
    }

    //Could be possible that product list doesn't contain product with id of that in cart, add error handling for that case
    return cartItems.map((item) => {
      return <div key={item.id}>{item.title}</div>;
    });
  };

  return (
    <div>
      <Link to='/'>Home</Link>
      {renderCartItems()}
      Cart total: {cartTotal}
    </div>
  );
};

export default CartPage;
