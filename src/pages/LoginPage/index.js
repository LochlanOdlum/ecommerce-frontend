import React, { useEffect, useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../../components/NavBar';

import { login, logout } from '../../actions/authActions';

import './index.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { isLoading, errorMessage } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  // dispatch(logout());

  const onLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  if (isLoggedIn) {
    return <Navigate to='/' />;
  }

  return (
    <div className='lip-container'>
      <NavBar />
      <div className='lip'>
        <img className='lip-image' src='/images/login-page-img.png' />
        <form class='lip-form' onSubmit={onLoginSubmit}>
          <div className='lip-title'>Login</div>
          <div className='lip-email-input-container'>
            <label className='lip-label' htmlFor='emailInput'>
              <svg width='21' height='17' viewBox='0 0 21 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M17.9785 0.419922H3.97852C3.18287 0.419922 2.4198 0.735992 1.8572 1.2986C1.29459 1.86121 0.978516 2.62427 0.978516 3.41992V13.4199C0.978516 14.2156 1.29459 14.9786 1.8572 15.5412C2.4198 16.1039 3.18287 16.4199 3.97852 16.4199H17.9785C18.7742 16.4199 19.5372 16.1039 20.0998 15.5412C20.6624 14.9786 20.9785 14.2156 20.9785 13.4199V3.41992C20.9785 2.62427 20.6624 1.86121 20.0998 1.2986C19.5372 0.735992 18.7742 0.419922 17.9785 0.419922V0.419922ZM17.3085 2.41992L10.9785 7.16992L4.64852 2.41992H17.3085ZM17.9785 14.4199H3.97852C3.7133 14.4199 3.45895 14.3146 3.27141 14.127C3.08387 13.9395 2.97852 13.6851 2.97852 13.4199V3.66992L10.3785 9.21992C10.5516 9.34974 10.7621 9.41992 10.9785 9.41992C11.1949 9.41992 11.4054 9.34974 11.5785 9.21992L18.9785 3.66992V13.4199C18.9785 13.6851 18.8732 13.9395 18.6856 14.127C18.4981 14.3146 18.2437 14.4199 17.9785 14.4199Z'
                  fill='black'
                />
              </svg>
            </label>
            <input
              id='lipemailInput'
              placeholder='E-mail Address'
              type='email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className='lip-password-input-container'>
            <label className='lip-label' htmlFor='passwordInput'>
              <svg width='18' height='24' viewBox='0 0 18 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M17.1973 10.8447H15.5371V4.50098C15.5371 2.49873 14.1382 0.875977 12.4121 0.875977H6.35742C4.63135 0.875977 3.23242 2.49873 3.23242 4.50098V10.8447H1.57227C1.14014 10.8447 0.791016 11.2497 0.791016 11.751V22.626C0.791016 23.1272 1.14014 23.5322 1.57227 23.5322H17.1973C17.6294 23.5322 17.9785 23.1272 17.9785 22.626V11.751C17.9785 11.2497 17.6294 10.8447 17.1973 10.8447ZM10.0684 17.5566V19.0576C10.0684 19.1822 9.98047 19.2842 9.87305 19.2842H8.89648C8.78906 19.2842 8.70117 19.1822 8.70117 19.0576V17.5566C8.49964 17.3888 8.34922 17.1511 8.27156 16.8778C8.19389 16.6045 8.193 16.3096 8.269 16.0357C8.345 15.7617 8.49397 15.5228 8.69447 15.3533C8.89498 15.1838 9.13667 15.0925 9.38477 15.0925C9.63286 15.0925 9.87455 15.1838 10.0751 15.3533C10.2756 15.5228 10.4245 15.7617 10.5005 16.0357C10.5765 16.3096 10.5756 16.6045 10.498 16.8778C10.4203 17.1511 10.2699 17.3888 10.0684 17.5566ZM13.7793 10.8447H4.99023V4.50098C4.99023 3.62588 5.60303 2.91504 6.35742 2.91504H12.4121C13.1665 2.91504 13.7793 3.62588 13.7793 4.50098V10.8447Z'
                  fill='black'
                />
              </svg>
            </label>
            <input
              id='lippasswordInput'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button type='submit' className='orange-brown-button lip-login-button'>
            Login
          </button>
          <br />
          <div className='lip-signup-link-container'>
            <span className='lip-signup-pretext'>Don't have an account?</span>
            <span className='lip-signup-link'>
              <Link to='/signup'>Signup</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
