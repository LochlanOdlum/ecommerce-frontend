import {
  ORDER_LIST_REQUEST,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ORDER_FETCH_REQUEST,
  ORDER_FETCH_FAIL,
  ORDER_FETCH_SUCCESS,
} from './types';
import ordersApi from '../api/ordersApi';

//Fetches list of orders from backend, orderList.orders is set to result
export const fetchOrderList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });

    const orderList = await ordersApi.fetchOrders();

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: orderList,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: error,
    });
  }
};

//Will fetch order from backend and put to orderList
export const fetchOrder = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_FETCH_REQUEST,
    });

    const order = await ordersApi.fetchOrder(id);

    dispatch({
      type: ORDER_FETCH_SUCCESS,
      payload: order,
    });
  } catch (error) {
    dispatch({
      type: ORDER_FETCH_FAIL,
      payload: error,
    });
  }
};
