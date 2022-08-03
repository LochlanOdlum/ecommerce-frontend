import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { signup } from '../../actions/authActions';
import NavBar from '../../components/NavBar/NavBar';

import './SignupPage.scss';

const SignupPage = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  if (isLoggedIn) {
    return <Navigate to='/' />;
  }

  const onSignupSubmit = async (e) => {
    e.preventDefault();
    const isSignedup = await dispatch(signup(name, email, password));

    if (isSignedup) {
      navigate('/login');
    }
  };

  return (
    <div className='sup-container'>
      <NavBar />
      <div className='sup'>
        <form class='sup-form' onSubmit={onSignupSubmit}>
          <div className='sup-title'>Sign Up</div>

          <div className='sup-name-input-container sup-input-container'>
            <label className='sup-label' htmlFor='passwordInput'>
              <svg width='20' height='23' viewBox='0 0 20 23' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M9.7959 11.7812C12.5573 11.7812 14.7959 9.54267 14.7959 6.78125C14.7959 4.01983 12.5573 1.78125 9.7959 1.78125C7.03447 1.78125 4.7959 4.01983 4.7959 6.78125C4.7959 9.54267 7.03447 11.7812 9.7959 11.7812Z'
                  stroke='black'
                  stroke-width='2'
                />
                <path
                  d='M14.796 13.7813H15.148C15.879 13.7815 16.5849 14.0486 17.1329 14.5325C17.6809 15.0164 18.0333 15.6838 18.124 16.4093L18.515 19.5333C18.5501 19.8147 18.525 20.1004 18.4414 20.3714C18.3577 20.6424 18.2173 20.8924 18.0296 21.105C17.8419 21.3176 17.6111 21.4879 17.3525 21.6045C17.094 21.7211 16.8136 21.7813 16.53 21.7812H3.06196C2.77834 21.7813 2.49795 21.7211 2.2394 21.6045C1.98086 21.4879 1.75006 21.3176 1.56233 21.105C1.37461 20.8924 1.23425 20.6424 1.15056 20.3714C1.06688 20.1004 1.04179 19.8147 1.07696 19.5333L1.46696 16.4093C1.55766 15.6835 1.91037 15.0158 2.45879 14.5319C3.00721 14.0479 3.71354 13.781 4.44496 13.7813H4.79596'
                  stroke='black'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>
            </label>
            <input
              className='supInput'
              type='text'
              placeholder='Name'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          <div className='sup-input-container'>
            <label className='sup-label' htmlFor='emailInput'>
              <svg width='21' height='17' viewBox='0 0 21 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M17.9785 0.419922H3.97852C3.18287 0.419922 2.4198 0.735992 1.8572 1.2986C1.29459 1.86121 0.978516 2.62427 0.978516 3.41992V13.4199C0.978516 14.2156 1.29459 14.9786 1.8572 15.5412C2.4198 16.1039 3.18287 16.4199 3.97852 16.4199H17.9785C18.7742 16.4199 19.5372 16.1039 20.0998 15.5412C20.6624 14.9786 20.9785 14.2156 20.9785 13.4199V3.41992C20.9785 2.62427 20.6624 1.86121 20.0998 1.2986C19.5372 0.735992 18.7742 0.419922 17.9785 0.419922V0.419922ZM17.3085 2.41992L10.9785 7.16992L4.64852 2.41992H17.3085ZM17.9785 14.4199H3.97852C3.7133 14.4199 3.45895 14.3146 3.27141 14.127C3.08387 13.9395 2.97852 13.6851 2.97852 13.4199V3.66992L10.3785 9.21992C10.5516 9.34974 10.7621 9.41992 10.9785 9.41992C11.1949 9.41992 11.4054 9.34974 11.5785 9.21992L18.9785 3.66992V13.4199C18.9785 13.6851 18.8732 13.9395 18.6856 14.127C18.4981 14.3146 18.2437 14.4199 17.9785 14.4199Z'
                  fill='black'
                />
              </svg>
            </label>
            <input
              id='supemailInput'
              className='supInput'
              placeholder='E-mail Address'
              type='email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className='sup-input-container'>
            <label className='sup-label' htmlFor='passwordInput'>
              <svg width='18' height='24' viewBox='0 0 18 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M17.1973 10.8447H15.5371V4.50098C15.5371 2.49873 14.1382 0.875977 12.4121 0.875977H6.35742C4.63135 0.875977 3.23242 2.49873 3.23242 4.50098V10.8447H1.57227C1.14014 10.8447 0.791016 11.2497 0.791016 11.751V22.626C0.791016 23.1272 1.14014 23.5322 1.57227 23.5322H17.1973C17.6294 23.5322 17.9785 23.1272 17.9785 22.626V11.751C17.9785 11.2497 17.6294 10.8447 17.1973 10.8447ZM10.0684 17.5566V19.0576C10.0684 19.1822 9.98047 19.2842 9.87305 19.2842H8.89648C8.78906 19.2842 8.70117 19.1822 8.70117 19.0576V17.5566C8.49964 17.3888 8.34922 17.1511 8.27156 16.8778C8.19389 16.6045 8.193 16.3096 8.269 16.0357C8.345 15.7617 8.49397 15.5228 8.69447 15.3533C8.89498 15.1838 9.13667 15.0925 9.38477 15.0925C9.63286 15.0925 9.87455 15.1838 10.0751 15.3533C10.2756 15.5228 10.4245 15.7617 10.5005 16.0357C10.5765 16.3096 10.5756 16.6045 10.498 16.8778C10.4203 17.1511 10.2699 17.3888 10.0684 17.5566ZM13.7793 10.8447H4.99023V4.50098C4.99023 3.62588 5.60303 2.91504 6.35742 2.91504H12.4121C13.1665 2.91504 13.7793 3.62588 13.7793 4.50098V10.8447Z'
                  fill='black'
                />
              </svg>
            </label>
            <input
              id='suppasswordInput'
              className='supInput'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className='sup-input-container'>
            <label className='sup-label' htmlFor='passwordInput'>
              <svg width='19' height='24' viewBox='0 0 19 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M17.3232 10.8423H15.6631V4.49854C15.6631 2.49629 14.2642 0.873535 12.5381 0.873535H6.4834C4.75732 0.873535 3.3584 2.49629 3.3584 4.49854V10.8423H1.69824C1.26611 10.8423 0.916992 11.2473 0.916992 11.7485V22.6235C0.916992 23.1248 1.26611 23.5298 1.69824 23.5298H17.3232C17.7554 23.5298 18.1045 23.1248 18.1045 22.6235V11.7485C18.1045 11.2473 17.7554 10.8423 17.3232 10.8423ZM5.11621 4.49854C5.11621 3.62344 5.729 2.9126 6.4834 2.9126H12.5381C13.2925 2.9126 13.9053 3.62344 13.9053 4.49854V10.8423H5.11621V4.49854ZM16.3467 21.4907H2.6748V12.8813H16.3467V21.4907ZM8.82715 17.5542V19.0552C8.82715 19.1798 8.91504 19.2817 9.02246 19.2817H9.99902C10.1064 19.2817 10.1943 19.1798 10.1943 19.0552V17.5542C10.3959 17.3864 10.5463 17.1487 10.624 16.8753C10.7016 16.602 10.7025 16.3072 10.6265 16.0332C10.5505 15.7593 10.4015 15.5203 10.201 15.3509C10.0005 15.1814 9.75883 15.0901 9.51074 15.0901C9.26265 15.0901 9.02096 15.1814 8.82045 15.3509C8.61995 15.5203 8.47097 15.7593 8.39497 16.0332C8.31897 16.3072 8.31987 16.602 8.39753 16.8753C8.4752 17.1487 8.62562 17.3864 8.82715 17.5542Z'
                  fill='black'
                />
              </svg>
            </label>
            <input
              id='suppasswordInput'
              className='supInput'
              type='password'
              placeholder='Repeat password'
              value={repeatPassword}
              onChange={(e) => {
                setRepeatPassword(e.target.value);
              }}
            />
          </div>
          <button type='submit' className='button-cadet sup-login-button'>
            Sign up
          </button>
          <br />
          <div className='sup-signup-link-container'>
            <span className='sup-signup-pretext'>Already have an account?</span>
            <span className='sup-signup-link'>
              <Link to='/login'>Login</Link>
            </span>
          </div>
        </form>
        <img className='sup-image' alt='skylight-photography' src='/images/signup-page-img1.png' />
      </div>
    </div>
  );
};

// return (
//   <div className='sup-container'>
//     <NavBar />
//     <form onSubmit={onSignupSubmit}>
//       <div>
//         <label htmlFor='firstName'>First name</label>
//         <input
//           id='firstName'
//           type='text'
//           value={firstName}
//           onChange={(e) => {
//             setFirstName(e.target.value);
//           }}
//         />
//       </div>
//       <div>
//         <label htmlFor='emailInput'>Surname</label>
//         <input
//           id='surname'
//           type='text'
//           value={surname}
//           onChange={(e) => {
//             setSurname(e.target.value);
//           }}
//         />
//       </div>
//       <div>
//         <label htmlFor='emailInput'>Email</label>
//         <input
//           id='emailInput'
//           type='email'
//           value={email}
//           onChange={(e) => {
//             setEmail(e.target.value);
//           }}
//         />
//       </div>
//       <div>
//         <label htmlFor='passwordInput'>Password</label>
//         <input
//           id='passwordInput'
//           type='password'
//           value={password}
//           onChange={(e) => {
//             setPassword(e.target.value);
//           }}
//         />
//       </div>
//       <button type='submit'>Login</button>
//     </form>
//   </div>
// );
// };

export default SignupPage;
