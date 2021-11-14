import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';

const HomePage = () => {
  const { isLoading, products, error } = useSelector((state) => state.productList);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Use effect');
    if (!products.length) {
      dispatch(listProducts());
    }
  }, []);

  const renderProducts = () => {
    if (isLoading) {
      return <div>Loading</div>;
    }

    if (error) {
      return <div>{error.message}</div>;
    }

    return products.map((product) => {
      return (
        <div key={product.id}>
          <div>{product.title}</div>
          <div>{product.price}</div>
          <Link to={`/product/${product.id}`}>Click me!</Link>
        </div>
      );
    });
  };

  return <div>{renderProducts()}</div>;
};

export default HomePage;
