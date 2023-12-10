import React, { useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/authActions';

import useOnClickOutsideElement from '../../hooks/useOnClickOutsideElement';

import './NavBar.scss';

const NavBar = () => {
  const modalToggleButton = useRef(null);
  const modalRef = useRef(null);
  // const [isUserModalOpen, setIsUserModalOpen] = useClickOutsideClose(modalRef);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const name = useSelector((state) => state.auth.name);
  const dispatch = useDispatch();
  useOnClickOutsideElement(modalRef, () => setIsUserModalOpen(false));

  const renderRightElements = () => {
    const signupElement = (
      <button
        className="navBar-desktop navBar-button button-cadet"
        onClick={() => {
          navigate('/signup');
        }}
      >
        Sign Up
      </button>
    );
    const loginElement = (
      <button
        className="navBar-desktop navBar-button button-orange"
        onClick={() => {
          navigate('/login');
        }}
      >
        Login
      </button>
    );

    const cartElement = (
      <img
        className="navBar-cart-icon"
        src="/images/cart-icon.svg"
        alt="cart-icon"
        onClick={() => {
          navigate('/cart');
        }}
      />
    );

    if (!isLoggedIn) {
      return (
        <>
          {signupElement}
          {loginElement}
          {cartElement}
        </>
      );
    } else {
      return (
        <>
          <div
            className={`nav-user-container ${isUserModalOpen ? 'active' : ''}`}
            onClick={() => {
              setIsUserModalOpen(true);
            }}
            ref={modalToggleButton}
          >
            Hi {name},
            <svg
              className="nav-user-arrow"
              width="17"
              height="11"
              viewBox="0 0 17 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className={`nav-user-arrow-path ${
                  isUserModalOpen ? 'active' : ''
                }`}
                d="M2.28767 0L8.00195 6.875L13.7162 0L16.002 1.375L8.00195 11L0.00195312 1.375L2.28767 0Z"
                fill="#8D8A8A"
              />
            </svg>
            {isUserModalOpen && (
              <div className="nav-user-modal" ref={modalRef}>
                <div className="nav-user-modal-link">
                  <Link to="/myphotos">My Photos</Link>
                </div>
                <div className="nav-user-modal-link">
                  <Link to="/myaccount">My Account</Link>{' '}
                </div>
                {isAdmin && (
                  <div className="nav-user-modal-link">
                    <a href="https://admin.skylightphotography.co.uk">
                      Dashboard
                    </a>
                  </div>
                )}
                <div className="nav-user-modal-bottom-container">
                  <div
                    className="nav-user-modal-link nav-user-modal-logout"
                    onClick={() => {
                      dispatch(logout());
                    }}
                  >
                    Sign out
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* <button
            onClick={() => {
              dispatch(logout());
            }}
          >
            Logout
          </button> */}
          <div className="naBbar-button-container">
            <Link to="/myphotos" className="navBar-button button-orange">
              My Photos
            </Link>
          </div>
          {cartElement}
        </>
      );
    }
  };

  return (
    <div className="navBar-container">
      <div className="navBar">
        {/* Regular left side menu */}
        <div className="navBar-desktop navBar-start-desktop">
          <div className="navBar-start-item-container">
            <Link
              to="/"
              className={`navBar-start-item-a ${
                pathname === '/' ? 'active' : ''
              }`}
            >
              Home
            </Link>
          </div>
          <div className="navBar-start-item-container">
            <Link
              to="/shop"
              className={`navBar-start-item-a ${
                pathname === '/shop' ? 'active' : ''
              }`}
            >
              Shop
            </Link>
          </div>
        </div>

        {/* Mobile Burger menu */}
        <div className="navBar-mobile navBar-start-mobile">
          <img
            className="navBar-burger-menu-icon"
            src="/images/menu.svg"
            alt="burger-menu-icon"
            onClick={() => {
              navigate('/cart');
            }}
          />
        </div>

        {/* Central logo image */}
        <img
          alt="skylight-photography-logo"
          src="/images/logo.png"
          className="navBar-logo"
          onClick={() => {
            navigate('/');
          }}
        />

        {/* Regular right side menu */}
        <div className="navBar-end">{renderRightElements()}</div>
      </div>
    </div>
  );
};

export default NavBar;
