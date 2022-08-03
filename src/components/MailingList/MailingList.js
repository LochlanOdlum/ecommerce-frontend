import React, { useState } from 'react';

import './MailingList.scss';

const MailingList = () => {
  const [email, setEmail] = useState();

  const handleMailListSignup = (e) => {
    e.preventDefault();
  };

  return (
    <div className='mail-list-container'>
      <div className='mail-list'>
        <div className='mail-list-title'>Mailing List</div>
        <form className='mail-list-form' onSubmit={handleMailListSignup}>
          <input
            className='mail-list-email-input'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder='E-mail Address'
            type='email'
          />
          <button className='button-orange mail-list-email-signup-button' type='submit'>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default MailingList;
