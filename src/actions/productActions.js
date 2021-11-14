import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_GET_REQUEST,
  PRODUCT_GET_FAIL,
  PRODUCT_GET_SUCCESS,
} from './types';
import productService from '../services/products-service';

//Fetches list of products from backend, productList.products is set to result
export const listProducts = () => async (dispatch, getState) => {
  console.log('List product action creator ');
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });

  const productList = await productService.getProducts();

  dispatch({
    type: PRODUCT_LIST_SUCCESS,
    payload: productList,
  });
};

//Fetches specific product from backend, productDetails.product is set to result
export const getProductDetails = (id) => async (dispatch, getState) => {
  dispatch({
    type: PRODUCT_GET_REQUEST,
  });

  const product = await productService.getProduct(id);

  dispatch({
    type: PRODUCT_GET_SUCCESS,
    payload: product,
  });
};
