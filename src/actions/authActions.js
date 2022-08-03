import { loginRequest, signupRequest } from '../api/authApi';

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SIGNUP_REQUEST, SIGNUP_FAIL, SIGNUP_SUCCESS } from './types';

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const { token, isUserAdmin, UsersEmail, UsersName } = await loginRequest(email, password);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token, isAdmin: isUserAdmin, name: UsersName, email: UsersEmail },
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

export const signup = (name, email, password) => async (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });

  try {
    await signupRequest(name, email, password);
    dispatch({ type: SIGNUP_SUCCESS });

    //True denotes that signup was successful, so signup page can redirect on success.
    return true;
  } catch (error) {
    dispatch({ type: SIGNUP_FAIL });
    return false;
  }
};
