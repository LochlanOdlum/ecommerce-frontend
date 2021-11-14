const API_URL = 'http://localhost:5000/products/';

const getProducts = async () => {
  console.log('Getting products');
  const requestOptions = {
    method: 'GET',
  };

  const res = await fetch(`${API_URL}`, requestOptions);
  const products = await res.json();

  return products;
};

const getProduct = async (id) => {
  console.log('Getting product');
  const requestOptions = {
    method: 'GET',
  };

  const res = await fetch(`${API_URL}${id}`, requestOptions);
  const product = await res.json();

  return product;
};

export default {
  getProducts,
  getProduct,
};
