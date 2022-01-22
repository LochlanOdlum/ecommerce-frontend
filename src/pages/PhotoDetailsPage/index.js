import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import useProducts from '../../hooks/useProducts';
import { fetchProduct } from '../../actions/productActions';
import { AddCartItem } from '../../actions/cartActions';

const PhotoDetailsPage = (props) => {
  const id = Number(useParams().id);
  const dispatch = useDispatch();

  const { products, isLoaded, error } = useProducts();

  useEffect(() => {
    //Causes product to be updated in product List
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(AddCartItem(id));
  };

  const renderProduct = () => {
    if (error) {
      return <div>Error loading product data</div>;
    }
    if (!isLoaded) {
      return <div>Loading</div>;
    }

    const product = products.find((p) => p.id === id);

    return (
      <div>
        {product.title}
        {product.description}
        {product.priceInPounds}
        <img alt='skylight-photography' style={{ width: '500px' }} src={product.mediumWatermarkedImagePublicURL} />
        <button onClick={handleAddToCart}>Add to cart</button>
      </div>
    );
  };

  return (
    <div>
      <Link to='/'>Home</Link>
      {renderProduct()}
    </div>
  );
};

export default PhotoDetailsPage;
