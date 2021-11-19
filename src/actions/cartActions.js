import { ADD_CART_ITEM, DELETE_CART_ITEM } from './types';

export const AddCartItem = (id) => async (dispatch) => {
  dispatch({
    type: ADD_CART_ITEM,
    payload: Number(id),
  });
};

export const DeleteCartItem = (id) => async (dispatch) => {
  dispatch({
    type: DELETE_CART_ITEM,
    payload: Number(id),
  });
};
