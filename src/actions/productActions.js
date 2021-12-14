import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_FETCH_REQUEST,
  PRODUCT_FETCH_FAIL,
  PRODUCT_FETCH_SUCCESS,
} from './types';
import productsApi from '../api/productsApi';

//Fetches list of products from backend, productList.products is set to result
export const fetchProductList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });

    const productList = await productsApi.fetchProducts();

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: productList,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error,
    });
  }
};

//Will fetch product from backend and put to productList
export const fetchProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_FETCH_REQUEST,
    });

    const product = await productsApi.fetchProduct(id);

    dispatch({
      type: PRODUCT_FETCH_SUCCESS,
      payload: product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_FETCH_FAIL,
      payload: error,
    });
  }
};
