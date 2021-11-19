//Actions needed:
//Get products (fetches a list of all products)
//

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_FETCH_SUCCESS,
  PRODUCT_FETCH_FAIL,
} from '../actions/types';

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { isLoading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { isLoading: false, isLoaded: true, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { isLoading: false, error: action.payload, products: [] };
    case PRODUCT_FETCH_SUCCESS:
      //Logic below required to ensure newly fetched product is put in same place in array as before
      const oldProductIndex = state.products.findIndex((prod) => prod.id === action.payload.id);
      if (oldProductIndex >= 0) {
        return {
          isLoading: false,
          isLoaded: true,
          products: [
            ...state.products.slice(0, oldProductIndex),
            action.payload,
            ...state.products.slice(oldProductIndex + 1),
          ],
        };
      } else {
        return { isLoading: false, isLoaded: true, products: [...state.products, action.payload] };
      }
    case PRODUCT_FETCH_FAIL:
      return { isLoading: false, error: action.payload, products: [] };
    default:
      return state;
  }
};

//Seperate state to store product on product details page. Easier to work with than getting info from productList.
