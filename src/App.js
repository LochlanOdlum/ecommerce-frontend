import React from 'react';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import PhotoDetailsPage from './pages/PhotoDetailsPage';
import CartPage from './pages/CartPage';
import MyOrdersPage from './pages/MyOrdersPage';
import MyOrderPage from './pages/MyOrderPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PaymentPage from './pages/PaymentPage';
import OrderCompletePage from './pages/OrderCompletePage';
import MyPhotosPage from './pages/MyPhotosPage';
import MyAccountPage from './pages/MyAccountPage';

import AdminNavSideBar from './components/AdminNavSideBar';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminPhotoPage from './pages/AdminPhotoPage';

import './app.css';

const STRIPE_PUBLISHABLE_KEY =
  'pk_test_51JmjyLBxc7UTHklpkl2msXfRPXO5UmEfW2b33xIk4S0y5Pc9oKObZibwotF3S626UWjGdGFQSJ7JGRZfVIwITrt800sVddKcVx';

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const LayoutsWithNavBar = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

const LayoutsWithAdminNavSideBar = () => {
  return (
    <>
      <AdminNavSideBar />
      <Outlet />
    </>
  );
};

const App = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchProductList());
  // }, [dispatch]);

  return (
    <Elements stripe={stripePromise}>
      <BrowserRouter>
        <Routes>
          {/* Routes nested in this Route Component will have nav bar */}
          {/* <Route path='/' element={<LayoutsWithNavBar />}> */}
          <Route path='/' element={<HomePage />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route path='/photo/:id' element={<PhotoDetailsPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/checkout' element={<PaymentPage />} />
          <Route path='/order/success/:orderId' element={<OrderCompletePage />} />
          <Route path='/myOrders' element={<MyOrdersPage />} />
          <Route path='/myOrder/:orderId' element={<MyOrderPage />} />
          <Route path='/myPhotos' element={<MyPhotosPage />} />
          <Route path='/myaccount' element={<MyAccountPage />} />
          {/* </Route> */}
          <Route path='/admin/login' element={<AdminLoginPage />} />
          <Route path='/admin' element={<LayoutsWithAdminNavSideBar />}>
            <Route path='/admin' element={<AdminDashboardPage />} />
            <Route path='/admin/photos' element={<AdminPhotoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Elements>
  );
};

export default App;
