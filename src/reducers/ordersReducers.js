import {
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_FETCH_SUCCESS,
  ORDER_FETCH_FAIL,
  ORDER_LIST_FAIL,
} from '../actions/types';

export const OrderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { isLoading: true, orders: [] };
    case ORDER_LIST_SUCCESS:
      return { isLoading: false, isLoaded: true, orders: action.payload };
    case ORDER_LIST_FAIL:
      return { isLoading: false, error: action.payload, orders: [] };
    case ORDER_FETCH_SUCCESS:
      //Logic below required to ensure newly fetched ORDER is put in same place in array as before
      const oldOrderIndex = state.orders.findIndex((prod) => prod.id === action.payload.id);
      if (oldOrderIndex >= 0) {
        return {
          isLoading: false,
          isLoaded: true,
          ORDERs: [...state.orders.slice(0, oldOrderIndex), action.payload, ...state.orders.slice(oldOrderIndex + 1)],
        };
      } else {
        return { isLoading: false, isLoaded: true, orders: [...state.orders, action.payload] };
      }
    case ORDER_FETCH_FAIL:
      return { isLoading: false, error: action.payload, orders: [] };
    default:
      return state;
  }
};
