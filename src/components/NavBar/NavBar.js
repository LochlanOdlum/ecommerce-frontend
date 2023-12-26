import React, { useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/authActions';
// import MobileOnly from '../MobileOnly/MobileOnly';
import DesktopOnly from '../DesktopOnly/DesktopOnly';

import useOnClickOutsideElement from '../../hooks/useOnClickOutsideElement';

import './NavBar.scss';

const NavBar = () => {
  const modalToggleButton = useRef(null);
  const modalRef = useRef(null);
  const burgerMenuRef = useRef(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const name = useSelector((state) => state.auth.name);
  const dispatch = useDispatch();
  useOnClickOutsideElement(modalRef, () => setIsUserModalOpen(false));
  useOnClickOutsideElement(burgerMenuRef, () => setIsBurgerMenuOpen(false));

  const renderRightElements = () => {
    const signupElement = (
      <DesktopOnly>
        <button
          className="navBar-desktop sp-small-button navBar-button button-cadet"
          onClick={() => {
            navigate('/signup');
          }}
        >
          Sign Up
        </button>
      </DesktopOnly>
    );
    const loginElement = (
      <DesktopOnly>
        <button
          className="navBar-desktop sp-small-button navBar-button button-orange"
          onClick={() => {
            navigate('/login');
          }}
        >
          Login
        </button>
      </DesktopOnly>
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
          <DesktopOnly>
            <div className="naBbar-button-container">
              <Link
                to="/myphotos"
                className="sp-small-button navBar-button button-orange"
              >
                My Photos
              </Link>
            </div>
          </DesktopOnly>
          {cartElement}
        </>
      );
    }
  };

  const renderBurgerMenuElements = () => {
    const signupElement = (
      <button
        className="sp-small-button navBar-button button-cadet"
        onClick={() => {
          navigate('/signup');
        }}
      >
        Sign Up
      </button>
    );
    const loginElement = (
      <button
        className="sp-small-button navBar-button button-orange"
        onClick={() => {
          navigate('/login');
        }}
      >
        Login
      </button>
    );

    return (
      <>
        <Link
          to="/"
          className={`navBar-burger-item ${pathname === '/' ? 'active' : ''}`}
        >
          Home
        </Link>
        <Link
          to="/shop"
          className={`navBar-burger-item ${
            pathname === '/shop' ? 'active' : ''
          }`}
        >
          Shop
        </Link>
        {signupElement}
        {loginElement}
      </>
    );
  };

  return (
    <>
      <div className="navBar-container">
        <div className="navBar">
          {/* Desktop left side menu */}
          <DesktopOnly>
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
          </DesktopOnly>

          {/* Mobile Burger menu */}
          <div className="navBar-mobile navBar-start-mobile">
            <img
              className="navBar-burger-menu-icon"
              src="/images/menu.svg"
              alt="burger-menu-icon"
              onClick={() => {
                setIsBurgerMenuOpen(true);
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

        {isBurgerMenuOpen && (
          <div className="navBar-burger-menu" ref={burgerMenuRef}>
            {renderBurgerMenuElements()}
          </div>
        )}
      </div>
      {isBurgerMenuOpen && <div className="navBar-burger-menu-overlay" />}
    </>
  );
};

export default NavBar;
