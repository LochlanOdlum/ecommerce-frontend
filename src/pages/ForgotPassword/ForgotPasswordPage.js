import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavBar from '../../components/NavBar/NavBar';
import { sendResetPasswordLinkRequest } from '../../api/authApi';

import './ForgotPasswordPage.scss';

const ForgotPassword = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [submitStatus, setSubmitStatus] = useState({ isLoading: false, isSuccessful: false, error: null });

  const validationSchema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required('E-mail Address is required'),
  });

  const onForgotSubmit = async (values) => {
    try {
      setSubmitStatus({ isLoading: true, isSuccessful: false, error: null });
      await sendResetPasswordLinkRequest(values.email);
      setSubmitStatus({ isLoading: false, isSuccessful: true, error: null });
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoggedIn) {
    return <Navigate to='/' />;
  }

  return (
    <div className='fpp-container'>
      <NavBar />
      <div className='fpp'>
        <img className='fpp-image' alt='skylight-photography' src='/images/login-page-img.png' />
        {!submitStatus.isSuccessful && !submitStatus.error && (
          <Formik onSubmit={onForgotSubmit} initialValues={{ email: '' }} validationSchema={validationSchema}>
            {({ values, touched, isValid, dirty, errors, handleChange, handleBlur, handleSubmit, isSubmitting }) => {
              return (
                <form className='fpp-form' onSubmit={handleSubmit}>
                  <div className='fpp-title'>Recover Password</div>
                  <div className='fpp-subtext'>
                    Enter the email address associated with your account and we’ll send you a link to reset your
                    password.
                  </div>
                  <div className='fpp-email-input-outer-container'>
                    <div className={`fpp-email-input-container${touched.email && errors.email ? ' error' : ''}`}>
                      <label className='fpp-label' htmlFor='fppemailInput'>
                        <svg width='21' height='17' viewBox='0 0 21 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M17.9785 0.419922H3.97852C3.18287 0.419922 2.4198 0.735992 1.8572 1.2986C1.29459 1.86121 0.978516 2.62427 0.978516 3.41992V13.4199C0.978516 14.2156 1.29459 14.9786 1.8572 15.5412C2.4198 16.1039 3.18287 16.4199 3.97852 16.4199H17.9785C18.7742 16.4199 19.5372 16.1039 20.0998 15.5412C20.6624 14.9786 20.9785 14.2156 20.9785 13.4199V3.41992C20.9785 2.62427 20.6624 1.86121 20.0998 1.2986C19.5372 0.735992 18.7742 0.419922 17.9785 0.419922V0.419922ZM17.3085 2.41992L10.9785 7.16992L4.64852 2.41992H17.3085ZM17.9785 14.4199H3.97852C3.7133 14.4199 3.45895 14.3146 3.27141 14.127C3.08387 13.9395 2.97852 13.6851 2.97852 13.4199V3.66992L10.3785 9.21992C10.5516 9.34974 10.7621 9.41992 10.9785 9.41992C11.1949 9.41992 11.4054 9.34974 11.5785 9.21992L18.9785 3.66992V13.4199C18.9785 13.6851 18.8732 13.9395 18.6856 14.127C18.4981 14.3146 18.2437 14.4199 17.9785 14.4199Z'
                            fill='black'
                          />
                        </svg>
                      </label>
                      <input
                        id='fppemailInput'
                        placeholder='E-mail Address'
                        type='email'
                        value={values.email}
                        onChange={handleChange('email')}
                        onBlur={handleBlur('email')}
                      />
                    </div>
                    {touched.email && errors.email && <div className='form-error-inline-text'>{errors.email}</div>}
                  </div>

                  <button
                    type='submit'
                    className='button-orange fpp-continue-button'
                    disabled={!dirty || !isValid || isSubmitting}
                  >
                    Continue
                  </button>
                  <br />
                </form>
              );
            }}
          </Formik>
        )}
        {submitStatus.isSuccessful && (
          <div className='fpp-mail-success'>
            <img className='fpp-success-mail-icon' src='/images/mail-circle-icon.svg' alt='mail-success-icon' />
            <div className='fpp-success-title'>Check your email </div>
            <div className='fpp-success-text'>
              An email has been sent if it is assosicated with an account. Please check your email for instructions on
              resetting your password.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
