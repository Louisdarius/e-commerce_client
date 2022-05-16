import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import RegisterPage from './pages/users/RegisterPage';
import LoginPage from './pages/users/LoginPage';
import ProductsListPage from './pages/products/ProductsListPage';
import ProductPage from './pages/products/ProductPage';
import CartPage from './pages/products/CartPage';
import ProfilePage from './pages/users/ProfilePage';
import UserInfoPage from './pages/users/UserInfoPage';
import EditUserInfoPage from './pages/users/EditUserInfoPage';
import DeleteAccountPage from './pages/users/DeleteAccountPage';
import ShippingPage from './pages/orders/ShippingPage';
import PaymentMethodPage from './pages/orders/PaymentMethodPage';
import PlaceOrderPage from './pages/orders/PlaceOrderPage';
import TopUpPage from './pages/users/TopUpPage';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<ProductsListPage />} exact />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/userInfo' element={<UserInfoPage />} />
        <Route path='/editUserInfo' element={<EditUserInfoPage />} />
        <Route path='/deleteAccount' element={<DeleteAccountPage />} />
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/shipping' element={<ShippingPage />} />
        <Route path='/paymentMethodPage' element={<PaymentMethodPage />} />
        <Route path='/placeOrder' element={<PlaceOrderPage />} />
        <Route path='/topUp' element={<TopUpPage />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
