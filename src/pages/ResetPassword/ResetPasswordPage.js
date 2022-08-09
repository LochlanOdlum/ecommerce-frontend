import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useSearchParams } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { resetPasswordRequest } from '../../api/authApi';

import './ResetPasswordPage.scss';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // "testCode"
  console.log(token);

  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password too short! Must be at least 8 characters')
      .max(64, 'Password too long! Password cannot be longer than 64 characters.'),
    repeatPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  });

  const onResetSubmit = async (values) => {
    await resetPasswordRequest(token, values.password);
  };

  return (
    <div className='rpp-container'>
      <NavBar />
      <div className='rpp'>
        <Formik
          onSubmit={onResetSubmit}
          initialValues={{ password: '', repeatPassword: '' }}
          validationSchema={validationSchema}
        >
          {({ values, touched, isValid, dirty, errors, handleChange, handleBlur, handleSubmit, isSubmitting }) => {
            return (
              <form class='rpp-form' onSubmit={handleSubmit}>
                <div className='rpp-title'>Reset Password</div>

                <div className='rpp-input-outer-container'>
                  <div className='rpp-input-container'>
                    <label className='rpp-label' htmlFor='rpppasswordInput'>
                      <svg width='18' height='24' viewBox='0 0 18 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M17.1973 10.8447H15.5371V4.50098C15.5371 2.49873 14.1382 0.875977 12.4121 0.875977H6.35742C4.63135 0.875977 3.23242 2.49873 3.23242 4.50098V10.8447H1.57227C1.14014 10.8447 0.791016 11.2497 0.791016 11.751V22.626C0.791016 23.1272 1.14014 23.5322 1.57227 23.5322H17.1973C17.6294 23.5322 17.9785 23.1272 17.9785 22.626V11.751C17.9785 11.2497 17.6294 10.8447 17.1973 10.8447ZM10.0684 17.5566V19.0576C10.0684 19.1822 9.98047 19.2842 9.87305 19.2842H8.89648C8.78906 19.2842 8.70117 19.1822 8.70117 19.0576V17.5566C8.49964 17.3888 8.34922 17.1511 8.27156 16.8778C8.19389 16.6045 8.193 16.3096 8.269 16.0357C8.345 15.7617 8.49397 15.5228 8.69447 15.3533C8.89498 15.1838 9.13667 15.0925 9.38477 15.0925C9.63286 15.0925 9.87455 15.1838 10.0751 15.3533C10.2756 15.5228 10.4245 15.7617 10.5005 16.0357C10.5765 16.3096 10.5756 16.6045 10.498 16.8778C10.4203 17.1511 10.2699 17.3888 10.0684 17.5566ZM13.7793 10.8447H4.99023V4.50098C4.99023 3.62588 5.60303 2.91504 6.35742 2.91504H12.4121C13.1665 2.91504 13.7793 3.62588 13.7793 4.50098V10.8447Z'
                          fill='black'
                        />
                      </svg>
                    </label>
                    <input
                      id='rpppasswordInput'
                      className='rppInput'
                      type='password'
                      placeholder='New Password'
                      value={values.password}
                      onChange={handleChange('password')}
                      onBlur={handleBlur('password')}
                    />
                  </div>
                  {touched.password && errors.password && (
                    <div className='form-error-inline-text'>{errors.password}</div>
                  )}
                </div>

                <div className='rpp-input-outer-container'>
                  <div className='rpp-input-container'>
                    <label className='rpp-label' htmlFor='rpppasswordInputRepeat'>
                      <svg width='19' height='24' viewBox='0 0 19 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M17.3232 10.8423H15.6631V4.49854C15.6631 2.49629 14.2642 0.873535 12.5381 0.873535H6.4834C4.75732 0.873535 3.3584 2.49629 3.3584 4.49854V10.8423H1.69824C1.26611 10.8423 0.916992 11.2473 0.916992 11.7485V22.6235C0.916992 23.1248 1.26611 23.5298 1.69824 23.5298H17.3232C17.7554 23.5298 18.1045 23.1248 18.1045 22.6235V11.7485C18.1045 11.2473 17.7554 10.8423 17.3232 10.8423ZM5.11621 4.49854C5.11621 3.62344 5.729 2.9126 6.4834 2.9126H12.5381C13.2925 2.9126 13.9053 3.62344 13.9053 4.49854V10.8423H5.11621V4.49854ZM16.3467 21.4907H2.6748V12.8813H16.3467V21.4907ZM8.82715 17.5542V19.0552C8.82715 19.1798 8.91504 19.2817 9.02246 19.2817H9.99902C10.1064 19.2817 10.1943 19.1798 10.1943 19.0552V17.5542C10.3959 17.3864 10.5463 17.1487 10.624 16.8753C10.7016 16.602 10.7025 16.3072 10.6265 16.0332C10.5505 15.7593 10.4015 15.5203 10.201 15.3509C10.0005 15.1814 9.75883 15.0901 9.51074 15.0901C9.26265 15.0901 9.02096 15.1814 8.82045 15.3509C8.61995 15.5203 8.47097 15.7593 8.39497 16.0332C8.31897 16.3072 8.31987 16.602 8.39753 16.8753C8.4752 17.1487 8.62562 17.3864 8.82715 17.5542Z'
                          fill='black'
                        />
                      </svg>
                    </label>
                    <input
                      id='rpppasswordInputRepeat'
                      className='rppInput'
                      type='password'
                      placeholder='Repeat new password'
                      value={values.repeatPassword}
                      onChange={handleChange('repeatPassword')}
                      onBlur={handleBlur('repeatPassword')}
                    />
                  </div>
                  {touched.repeatPassword && errors.repeatPassword && (
                    <div className='form-error-inline-text'>{errors.repeatPassword}</div>
                  )}
                </div>
                <button
                  type='submit'
                  className='button-cadet sup-login-button'
                  disabled={!dirty || !isValid || isSubmitting}
                >
                  Reset
                </button>
              </form>
            );
          }}
        </Formik>
        <img className='rpp-image' alt='skylight-photography' src='/images/signup-page-img1.png' />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
