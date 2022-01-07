import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { signup } from '../../actions/authActions';

const SignupPage = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  const onSignupSubmit = async (e) => {
    e.preventDefault();
    const isSignedup = await dispatch(
      signup(firstName, surname, email, password)
    );

    if (isSignedup) {
      navigate('/login');
    }
  };

  return (
    <>
      <div>
        <form onSubmit={onSignupSubmit}>
          <div>
            <label htmlFor="firstName">First name</label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="emailInput">Surname</label>
            <input
              id="surname"
              type="text"
              value={surname}
              onChange={(e) => {
                setSurname(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="emailInput">Email</label>
            <input
              id="emailInput"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="passwordInput">Password</label>
            <input
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
    </>
  );
};

export default SignupPage;
