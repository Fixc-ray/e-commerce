import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Details from './components/Details';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import Products from './components/Products';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const onAddToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    window.alert(`${product.name} has been added to cart`);
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateCartQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const token = localStorage.getItem('token');

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="App">
        <Navbar cartCount={cartItems.length} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to={token ? "/home" : "/login"} />} />
            <Route path="/home" element={
              <ProtectedRoute>
                <Home onAddToCart={onAddToCart} />
              </ProtectedRoute>
            } />
            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart
                  cartItems={cartItems}
                  removeFromCart={removeItem}
                  updateCartQuantity={updateCartQuantity}
                />
              </ProtectedRoute>
            } />
            <Route path="/details" element={
              <ProtectedRoute>
                <Details onAddToCart={onAddToCart} />
              </ProtectedRoute>
            } />

            <Route path="/products" element={
              <ProtectedRoute>
                <Products onAddToCart={onAddToCart} />
              </ProtectedRoute>
            } />

            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;