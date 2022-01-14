import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../actions/types';

const initialState = { isLoggedIn: false, token: null, isAdmin: false, name: null };

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        isLoggedIn: false,
        name: null,
        token: null,
        isAdmin: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        name: null,
        token: null,
        isAdmin: null,
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        name: null,
        token: null,
        isAdmin: null,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggedIn: false,
        name: null,
        token: null,
        isAdmin: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        name: action.payload.name,
        token: action.payload.token,
        isAdmin: action.payload.isAdmin,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        name: null,
        token: null,
        isAdmin: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        name: null,
        token: null,
        isAdmin: null,
      };
    default:
      return state;
  }
};

export const loginReducer = (state = { isLoading: false, errorMessage: null }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        isLoading: true,
        errorMessage: null,
      };
    case LOGIN_SUCCESS:
      return {
        isLoading: false,
        errorMessage: null,
      };
    case LOGIN_FAIL:
      return {
        isLoading: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export const signupReducer = (state = { isLoading: false, errorMessage: null }, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        isLoading: true,
        errorMessage: null,
      };
    case SIGNUP_SUCCESS:
      return {
        isLoading: false,
        errorMessage: null,
      };
    case SIGNUP_FAIL:
      return {
        isLoading: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
