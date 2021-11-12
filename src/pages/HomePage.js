import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';

const HomePage = () => {
  const products = useSelector((state) => state.productList.products);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Use effect');
    dispatch(listProducts());
  }, []);

  return <div>Home Page</div>;
};

export default HomePage;
