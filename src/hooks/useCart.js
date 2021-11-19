import React from 'react';
import { useSelector } from 'react-redux';

//Expected output: {items, total}
const useCart = () => {
  const cart = useSelector((state) => state.cart);
  const products = useSelector((state) => state.productList.products);

  const cartItemsWithInfo = cart.items.map((item) => {
    const prod = products.find((p) => p.id === item.id);
    return { ...prod };
  });

  let cartTotal = cartItemsWithInfo.reduce((accumulator, current) => accumulator + Number(current.price), 0);
  cartTotal = Math.round(cartTotal * 1e12) / 1e12;

  return { cartItems: cartItemsWithInfo, cartTotal };
};

export default useCart;
