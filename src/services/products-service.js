const API_URL = 'http://localhost:5000/products/';

const getProducts = async () => {
  console.log('Getting products');
  const requestOptions = {
    method: 'GET',
  };

  const res = await fetch(API_URL, requestOptions);
  const products = await res.json();

  return products;
};

export default {
  getProducts,
};
