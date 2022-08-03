import { makeRequest } from '../util/util.js';

export const fetchProductsRequest = async () => {
  return await makeRequest('/shop/products');
};

export const fetchProductRequest = async (id) => {
  return await makeRequest(`/shop/products/${id}`);
};
