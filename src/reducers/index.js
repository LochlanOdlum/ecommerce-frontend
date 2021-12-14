import { combineReducers } from 'redux';
import { productListReducer } from './productReducers';
import { cartReducer } from './cartReducers';
import { authReducer, loginReducer, signupReducer } from './authReducers';
import { OrderListReducer } from './ordersReducers';

export default combineReducers({
  productList: productListReducer,
  cart: cartReducer,
  orderList: OrderListReducer,
  auth: authReducer,
  login: loginReducer,
  signup: signupReducer,
});
