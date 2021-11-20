import React from 'react';
import { useSelector } from 'react-redux';

import useProducts from '../hooks/useProducts';

//Expected output: {items, total}
const useCart = () => {
  const { products, error, isLoaded } = useProducts();
  const cart = useSelector((state) => state.cart);

  let missingProduct = false;

  const cartItemsWithInfo = cart.items.map((item) => {
    const prod = products.find((p) => p.id === item.id);

    if (!prod) {
      missingProduct = true;
    }

    return { ...prod };
  });

  if (missingProduct && !isLoaded) {
    return { isLoaded, cartItems: [] };
  }

  if (missingProduct && isLoaded) {
    return { error: 'Could not find all products in cart' };
  }

  let cartTotal = cartItemsWithInfo.reduce((accumulator, current) => accumulator + Number(current.price), 0);
  cartTotal = Math.round(cartTotal * 1e12) / 1e12;

  return { cartItems: cartItemsWithInfo, cartTotal, error, isLoaded };
};

export default useCart;
