const API_URL = 'https://skylight-photography.herokuapp.com/shop/products/';

const fetchProducts = async () => {
  // console.log('Getting products');
  const requestOptions = {
    method: 'GET',
  };

  const res = await fetch(`${API_URL}`, requestOptions);
  const products = await res.json();

  return products;
};

const fetchProduct = async (id) => {
  console.log('Getting product');
  const requestOptions = {
    method: 'GET',
  };

  const res = await fetch(`${API_URL}${id}`, requestOptions);
  const product = await res.json();

  return product;
};

export default {
  fetchProducts,
  fetchProduct,
};
