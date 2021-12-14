import React from 'react';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import MyOrdersPage from './pages/MyOrdersPage';
import MyOrderPage from './pages/MyOrderPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PaymentPage from './pages/PaymentPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminNavSideBar from './components/AdminNavSideBar';

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
          <Route path='/' element={<LayoutsWithNavBar />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/product/:id' element={<ProductPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/payment' element={<PaymentPage />} />
            <Route path='/payment/success/:paymentIntentId' element={<PaymentSuccessPage />} />
            <Route path='/myOrders' element={<MyOrdersPage />} />
            <Route path='/myOrder/:orderId' element={<MyOrderPage />} />
          </Route>
          <Route path='/admin' element={<LayoutsWithAdminNavSideBar />}>
            <Route path='/admin/login' element={<AdminLoginPage />} />
            <Route path='/admin' element={<AdminDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Elements>
  );
};

export default App;
