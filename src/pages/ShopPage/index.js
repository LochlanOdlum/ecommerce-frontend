import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useProducts from '../../hooks/useProducts';

const ShopPage = () => {
  const { products, isLoaded, error } = useProducts();

  const priceToPounds = (pence) => {
    const array = Array.from(String(pence));
    array.splice(array.length - 2, 0, '.');

    return array.join('');
  };

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
          <div>{priceToPounds(product.price)}</div>
          <Link to={`/photo/${product.id}`}>Click me!</Link>
        </div>
      );
    });
  };

  return (
    <div>
      <div>Products:</div>

      {renderProducts()}
    </div>
  );
};

export default ShopPage;
