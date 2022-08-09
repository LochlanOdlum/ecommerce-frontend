import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.scss';

const onLinkClick = () => {
  window.scrollTo(0, 0);
};

const Footer = () => {
  return (
    <div className='footer-container'>
      <div className='footer-content'>
        <div className='footer-content-left'>
          <img src='/images/logo.png' alt='skylight-photography-logo' />
          <div className='footer-left-text'>
            Check out our socials below to keep up to date with Skylight Photography
          </div>
          <div className='footer-left-logos'>
            <img className='footer-left-logo' src='/images/linked-in-logo-footer.png' alt='linked-in-logo' />
            <img className='footer-left-logo' src='/images/twitter-logo-footer.png' alt='twitter-logo' />
            <img className='footer-left-logo' src='/images/facebook-logo-footer.png' alt='facebook-logo' />
          </div>
        </div>
        <div className='footer-content-right'>
          <div className='footer-right-column'>
            <div className='footer-right-header'>About</div>
            <Link className='footer-right-column-subtext' to='/' onClick={onLinkClick}>
              Home
            </Link>
            <Link className='footer-right-column-subtext' to='/shop' onClick={onLinkClick}>
              Shop
            </Link>
          </div>
          <div className='footer-right-column'>
            <div className='footer-right-header'>Information</div>
            <Link to='/myaccount' className='footer-right-column-subtext' onClick={onLinkClick}>
              Account
            </Link>
            <Link to='/myphotos' className='footer-right-column-subtext' onClick={onLinkClick}>
              My Photos
            </Link>
            {/* <div className='footer-right-column-subtext'>Newsletter</div> */}
          </div>
          <div className='footer-right-column'>
            <div className='footer-right-header'>Get In Touch</div>
            {/* <div className='get-in-touch-row footer-right-column-subtext'> */}
            {/* <div>Telephone:</div>
              <div className='get-in-touch-value'>07585 952895</div> */}
            {/* </div> */}
            <div className='get-in-touch-row footer-right-column-subtext'>
              <div>E-mail:</div>
              <div className='get-in-touch-value'>skylightphotography@gmail.com</div>
            </div>
          </div>
        </div>
      </div>
      <div className='footer-copyright'>© 2022 All Rights Reserved</div>
    </div>
  );
};

export default Footer;
