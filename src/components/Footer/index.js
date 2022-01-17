import React from 'react';

import './index.css';

const Footer = () => {
  return (
    <div className='footer-container'>
      <div className='footer-content'>
        <div className='footer-content-left'>
          <img src='/images/logo.png' />
          <div className='footer-left-text'>
            It is a long established fact that a reader will be distracted by the readable content
          </div>
          <div className='footer-left-logos'>
            <img src='/images/linked-in-logo-footer.png' />
            <img src='/images/twitter-logo-footer.png' />
            <img src='/images/facebook-logo-footer.png' />
          </div>
        </div>
        <div className='footer-content-right'> </div>
      </div>
      <div className='footer-copyright'>© 2021 All Rights Reserved</div>
    </div>
  );
};

export default Footer;
