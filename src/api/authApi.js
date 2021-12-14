import errorParser from './helpers.js/errorParser';

const API_URL = 'https://skylight-photography.herokuapp.com/';

const signup = async (firstName, surname, email, password) => {
  const response = await fetch(API_URL + 'signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ firstName, surname, email, password }),
  });

  const data = await response.json();

  errorParser(response, data);
};

const login = async (email, password) => {
  const response = await fetch(API_URL + 'login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  const { token, isAdmin } = data;

  errorParser(response, data);

  return { token, isAdmin };
};

// signup('Loch', 'Odlum', 'lodlum5@gmail.com', 'password');
// login('lodlum5@gmail.com', 'password');=

const authApi = {
  signup,
  login,
};

export default authApi;
