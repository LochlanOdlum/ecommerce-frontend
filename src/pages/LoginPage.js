import React, { useEffect, useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { login } from '../actions/authActions';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { isLoading, errorMessage } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const onLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  if (isLoggedIn) {
    return <Navigate to='/' />;
  }

  return (
    <>
      <div>
        <form onSubmit={onLoginSubmit}>
          <div>
            <label htmlFor='emailInput'>Email</label>
            <input
              id='emailInput'
              type='email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor='passwordInput'>Password</label>
            <input
              id='passwordInput'
              type='password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button type='submit'>Login</button>
        </form>
        <br />
        Or <Link to='/signup'>Signup</Link>
      </div>
    </>
  );
};

export default LoginPage;
