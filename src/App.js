import React from 'react';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import HomePage from './pages/HomePage/HomePage';
import ShopPage from './pages/ShopPage/ShopPage';
import PhotoDetailsPage from './pages/PhotoDetailsPage/PhotoDetailsPage';
import CartPage from './pages/CartPage/CartPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import OrderCompletePage from './pages/OrderCompletePage/OrderCompletePage';
import MyPhotosPage from './pages/MyPhotosPage/MyPhotosPage';
import MyAccountPage from './pages/MyAccountPage/MyAccountPage';
import ForgotPasswordPage from './pages/ForgotPassword/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPassword/ResetPasswordPage';

import './styles/global.scss';

const STRIPE_PUBLISHABLE_KEY =
  'pk_test_51JmjyLBxc7UTHklpkl2msXfRPXO5UmEfW2b33xIk4S0y5Pc9oKObZibwotF3S626UWjGdGFQSJ7JGRZfVIwITrt800sVddKcVx';

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

//TODO: Route back to original route once logged in
const ProtectedLoginRoute = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn ? <Outlet /> : <LoginPage />;
};

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route path='/photo/:id' element={<PhotoDetailsPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/ForgotPassword' element={<ForgotPasswordPage />} />
          <Route path='/ResetPassword' element={<ResetPasswordPage />} />

          {/* Routes requiring user to be logged in */}
          <Route path='/' element={<ProtectedLoginRoute />}>
            <Route path='/myPhotos' element={<MyPhotosPage />} />
            <Route path='/checkout' element={<PaymentPage />} />
            <Route path='/myaccount' element={<MyAccountPage />} />
            <Route path='/order/success/:orderId' element={<OrderCompletePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Elements>
  );
};

export default App;
