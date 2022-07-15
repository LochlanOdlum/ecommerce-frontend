import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../actions/authActions';

import './AdminLoginPage.css';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const navigate = useNavigate();
  const { isLoggedIn, isAdmin } = useSelector((state) => state.auth);
  // const { isLoading, errorMessage } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const onLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  if (isLoggedIn && isAdmin) {
    return <Navigate to="/admin" />;
  }

  if (isLoggedIn && !isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="alip-main">
      <div className="alip-login-container">
        <form onSubmit={onLoginSubmit} className="alip-login-form">
          <div>
            {/* <label htmlFor="emailInput">Email</label> */}
            <input
              className="alip-input alip-email-input"
              placeholder="johndoe@xyz.com"
              id="emailInput"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            {/* <label htmlFor="passwordInput">Password</label> */}
            <input
              className="alip-input alip-password-input"
              placeholder="•••••••••"
              id="passwordInput"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
