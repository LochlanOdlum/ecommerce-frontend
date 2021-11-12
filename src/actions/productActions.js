import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_FAIL, PRODUCT_LIST_SUCCESS } from './types';
import productService from '../services/products-service';

export const listProducts = () => async (dispatch, getState) => {
  console.log('List product action creator ');
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });

  const productList = await productService.getProducts();

  console.log('t');
  dispatch({
    type: PRODUCT_LIST_SUCCESS,
    payload: productList,
  });
};
