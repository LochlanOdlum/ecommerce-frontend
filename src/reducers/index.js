import { combineReducers } from 'redux';
import { productListReducer } from './productReducers';
import { cartReducer } from './cartReducers';

export default combineReducers({
  productList: productListReducer,
  cart: cartReducer,
});
