const API_URL = 'http://localhost:5000/';

const errorParser = (response, data) => {
  if (!response.ok) {
    if (data.message) {
      const error = new Error(data.message);
      throw error;
    }
    if (data.errors) {
      const error = new Error();
      error.errors = data.errors;
      throw new Error();
    }
    throw new Error('Unexpected error');
  }
};

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

  errorParser(response, data);

  localStorage.setItem('user', JSON.stringify(data));
};

// signup('Loch', 'Odlum', 'lodlum5@gmail.com', 'password');
login('lodlum@me.com', 'password');
