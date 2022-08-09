import { makeRequest } from '../util/util.js';

export const signupRequest = async (name, email, password) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  };

  return await makeRequest('/auth/signup', requestOptions);
};

export const loginRequest = async (email, password) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  };

  return await makeRequest('/auth/login', requestOptions);
};

export const getMyDetailsRequest = async () => {
  return await makeRequest('/auth/myDetails');
};

export const updateMyDetailsRequest = async (updatedFields) => {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ updatedFields }),
  };

  return await makeRequest('/auth/myDetails', requestOptions);
};

export const changeMyPasswordRequest = async (password, newPassword) => {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, newPassword }),
  };

  return await makeRequest('/auth/changeMyPassword', requestOptions);
};

export const sendResetPasswordLinkRequest = async (email) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  };

  return await makeRequest('/auth/sendResetPasswordLink', requestOptions);
};

export const resetPasswordRequest = async (token, newPassword) => {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, newPassword }),
  };

  return await makeRequest('/auth/resetPassword', requestOptions);
};
