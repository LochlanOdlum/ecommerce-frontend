import errorParser from './helpers.js/errorParser';

const API_URL = 'https://skylight-photography.herokuapp.com/';

const signup = async (name, email, password) => {
  const response = await fetch(API_URL + 'signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
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
  const { token, isUserAdmin, UsersEmail, UsersName } = data;

  errorParser(response, data);

  return { token, isUserAdmin, UsersEmail, UsersName };
};

// signup('Loch', 'Odlum', 'lodlum5@gmail.com', 'password');
// login('lodlum5@gmail.com', 'password');=

const authApi = {
  signup,
  login,
};

export default authApi;
