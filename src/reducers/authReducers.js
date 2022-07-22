import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../actions/types';

//TODO: IDEA?
// const getDefaultAuthValues = () => {
//   return { isLoggedIn: false, name: null, token: null, isAdmin: null, email: null };
// };

//then just write ...getDefaultAuthValues(),

const initialState = { isLoggedIn: false, token: null, isAdmin: false, name: null };

export const authReducer = (state = initialState, action) => {
  console.log(action.payload);
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        isLoggedIn: false,
        name: null,
        token: null,
        isAdmin: null,
        email: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        name: null,
        token: null,
        isAdmin: null,
        email: null,
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        name: null,
        token: null,
        isAdmin: null,
        email: null,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggedIn: false,
        name: null,
        token: null,
        isAdmin: null,
        email: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        name: action.payload.name,
        token: action.payload.token,
        isAdmin: action.payload.isAdmin,
        email: action.payload.email,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        name: null,
        token: null,
        isAdmin: null,
        email: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        name: null,
        token: null,
        isAdmin: null,
        email: null,
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
