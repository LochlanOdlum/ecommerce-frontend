// import React from 'react';
import { useSelector } from 'react-redux';

import useProducts from '../hooks/useProducts';

const priceToPounds = (pence) => {
  const array = Array.from(String(pence));
  array.splice(array.length - 2, 0, '.');

  return +array.join('');
};

//Expected output: {items, total}
const useCart = () => {
  const { products, error, isLoaded } = useProducts();
  const cart = useSelector((state) => state.cart);

  let missingProduct = false;

  const cartItemsWithInfo = cart.itemIds.map((itemId) => {
    const prod = products.find((p) => p.id === itemId);

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

  let cartTotal = cartItemsWithInfo.reduce((accumulator, current) => accumulator + Number(current.priceInPence), 0);
  cartTotal = priceToPounds(cartTotal);

  return { cartItems: cartItemsWithInfo, cartTotal, error, isLoaded };
};

export default useCart;
