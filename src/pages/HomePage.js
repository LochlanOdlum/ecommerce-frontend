import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useProducts from '../hooks/useProducts';

const HomePage = () => {
  const { products, isLoaded, error } = useProducts();

  const renderProducts = () => {
    if (error) {
      return <div>Error fetching product data!</div>;
    }

    if (!isLoaded) {
      return <div>Loading product data!</div>;
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

  return (
    <div>
      <Link to='/cart'>Cart</Link>

      {renderProducts()}
    </div>
  );
};

export default HomePage;
