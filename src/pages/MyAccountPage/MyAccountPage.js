import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateMyDetails } from '../../actions/authActions';
import { getMyDetails } from '../../actions/authActions';
import { changeMyPasswordRequest } from '../../api/authApi';

import NavBar from '../../components/NavBar/NavBar';
import MailingList from '../../components/MailingList/MailingList';
import Footer from '../../components/Footer/Footer';

import './MyAccountPage.scss';

const MyAccountPage = () => {
  const { name, email, phoneNumber } = useSelector((state) => state.auth);
  const [nameInputValue, setNameInputValue] = useState(name);
  const [emailInputValue, setEmailInputValue] = useState(email);
  const [phoneNumberInputValue, setPhoneNumberInputValue] = useState(phoneNumber);
  const [currentPasswordInputValue, setCurrentPasswordInputValue] = useState('');
  const [newPasswordInputValue, setNewPasswordInputValue] = useState('');
  const [confirmNewPasswordInputValue, setConfirmNewPasswordInputValue] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyDetails());
    // eslint-disable-next-line
  }, []);

  const handleUpdateInfoClick = () => {
    dispatch(
      updateMyDetails({
        updatedName: nameInputValue,
        updatedEmail: emailInputValue,
        updatedPhoneNumber: phoneNumberInputValue,
      })
    );
  };

  const handleChangePasswordClick = async () => {
    if (newPasswordInputValue !== confirmNewPasswordInputValue) {
      return;
    }
    try {
      await changeMyPasswordRequest(currentPasswordInputValue, newPasswordInputValue);
      setCurrentPasswordInputValue('');
      setNewPasswordInputValue('');
      setConfirmNewPasswordInputValue('');
    } catch {}
  };

  return (
    <>
      <NavBar />
      <div className='ma-page'>
        <div className='ma-page-inner'>
          <div className='ma-header'>My Account</div>
          <div className='ma-personal-info-container'>
            <div className='ma-subheader'>View and Edit your personal information below</div>
            <hr className='ma-hr' />
            <div className='ma-personal-info-inputs'>
              <div className='ma-input-container'>
                <label className='ma-input-label'>Name</label>
                <div className='ma-input-element-container'>
                  <input
                    type='text'
                    className='ma-input'
                    value={nameInputValue}
                    onChange={(e) => setNameInputValue(e.target.value)}
                  />
                </div>
              </div>
              <div className='ma-input-container'>
                <label className='ma-input-label'>E-mail Address</label>
                <div className='ma-input-element-container'>
                  <input
                    type='text'
                    className='ma-input'
                    value={emailInputValue}
                    onChange={(e) => setEmailInputValue(e.target.value)}
                  />
                </div>
              </div>
              <div className='ma-input-container'>
                <label className='ma-input-label'>Phone Number (optional)</label>
                <div className='ma-input-element-container'>
                  <input
                    type='text'
                    className='ma-input'
                    value={phoneNumberInputValue}
                    onChange={(e) => setPhoneNumberInputValue(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className='button-orange ma-update-button' onClick={handleUpdateInfoClick}>
              Update Info
            </div>
          </div>
          <div className='ma-change-password-container'>
            <div className='ma-subheader'>Change Password</div>
            <hr className='ma-hr' />
            <div className='ma-change-password-inputs'>
              <div className='ma-input-container'>
                <label className='ma-input-label'>Current Password</label>
                <div className='ma-input-element-container'>
                  <input
                    type='password'
                    className='ma-input'
                    value={currentPasswordInputValue}
                    onChange={(e) => setCurrentPasswordInputValue(e.target.value)}
                  />
                </div>
              </div>
              <div className='ma-input-container'>
                <label className='ma-input-label'>New Password</label>
                <div className='ma-input-element-container'>
                  <input
                    type='password'
                    className='ma-input'
                    value={newPasswordInputValue}
                    onChange={(e) => setNewPasswordInputValue(e.target.value)}
                  />
                </div>
              </div>
              <div className='ma-input-container ma-confirm-new-password-container'>
                <label className='ma-input-label'>Confirm New Password</label>
                <div className='ma-input-element-container'>
                  <input
                    type='password'
                    className='ma-input'
                    value={confirmNewPasswordInputValue}
                    onChange={(e) => setConfirmNewPasswordInputValue(e.target.value)}
                  />
                </div>
              </div>
              <div
                className='button-orange ma-update-button ma-change-password-button'
                onClick={handleChangePasswordClick}
              >
                Change password
              </div>
            </div>
          </div>
        </div>
      </div>
      <MailingList />
      <Footer />
    </>
  );
};

export default MyAccountPage;
