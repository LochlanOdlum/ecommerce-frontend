import { makeRequest } from '../util/util.js';

export const signupRequest = async (name, email, password) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  };

  return await makeRequest('/signup', requestOptions);
};

export const loginRequest = async (email, password) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  };

  return await makeRequest('/login', requestOptions);
};
