//Actions needed:
//Get products (fetches a list of all products)
//

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_GET_REQUEST,
  PRODUCT_GET_FAIL,
  PRODUCT_GET_SUCCESS,
} from '../actions/types';

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { isLoading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { isLoading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { isLoading: false, error: action.payload };
    case PRODUCT_GET_SUCCESS:
      //Logic below required to ensure product is in same place in array as before
      const oldProductIndex = state.products.findIndex((prod) => prod.id === action.payload.id);
      if (oldProductIndex >= 0) {
        return {
          isLoading: false,
          products: [
            ...state.products.slice(0, oldProductIndex),
            action.payload,
            ...state.products.slice(oldProductIndex + 1),
          ],
        };
      } else {
        return { isLoading: false, products: [...state.products, action.payload] };
      }
    default:
      return state;
  }
};

//Seperate state to store product on product details page. Easier to work with than getting info from productList.
export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_GET_REQUEST:
      return { isLoading: true, product: {} };
    case PRODUCT_GET_SUCCESS:
      return { isLoading: false, product: action.payload };
    case PRODUCT_GET_FAIL:
      return { isLoading: false, error: action.payload };
    default:
      return state;
  }
};
