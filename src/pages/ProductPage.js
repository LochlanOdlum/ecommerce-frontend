import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { getProductDetails } from '../actions/productActions';

const ProductPage = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, isLoading, error } = useSelector((state) => state.productDetails);

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, []);

  console.log(props);

  const renderProduct = () => {
    if (isLoading) {
      return <div>Loading</div>;
    }
    if (error) {
      return <div>Error loading product data</div>;
    }
    return (
      <div>
        {product.title}
        {product.description}
        {product.price}
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

export default ProductPage;
