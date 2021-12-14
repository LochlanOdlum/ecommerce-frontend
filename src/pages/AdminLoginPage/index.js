import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../actions/authActions';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin } = useSelector((state) => state.auth);
  const { isLoading, errorMessage } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const onLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  if (isLoggedIn && isAdmin) {
    return <Navigate to='/admin' />;
  }

  if (isLoggedIn && !isAdmin) {
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
      </div>
    </>
  );
};

export default AdminLoginPage;
