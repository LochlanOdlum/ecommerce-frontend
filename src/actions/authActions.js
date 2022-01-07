import authApi from '../api/authApi';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SIGNUP_REQUEST,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
} from './types';

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const { token, isAdmin } = await authApi.login(email, password);
    console.log('Logged in ');
    console.log(token, isAdmin);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token, isAdmin },
    });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL });
  }
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const signup =
  (firstName, surname, email, password) => async (dispatch) => {
    dispatch({ type: SIGNUP_REQUEST });

    try {
      await authApi.signup(firstName, surname, email, password);
      dispatch({ type: SIGNUP_SUCCESS });

      //True denotes that signup was successful, so signup page can redirect on success.
      return true;
    } catch (error) {
      dispatch({ type: SIGNUP_FAIL });
      return false;
    }
  };
