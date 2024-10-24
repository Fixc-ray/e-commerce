import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import Details from "./components/Details";
import Login from "./components/Login";
import Register from "./components/Register";
import { Navigate } from "react-router-dom";
import MyProducts from "./components/Myproducts";
import Profile from "./components/Profile";
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const onAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateCartQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity from dropping below 1
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <div>
      <Router>
        <Navbar />
        <div className="content-wrapper"> 
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/home" element={<Home onAddToCart={onAddToCart} />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/add-product" element={<ProductForm />} />
            <Route
              path="/edit-product/:productId"
              element={<ProductForm isEdit />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/my-products"
              element={
                <ProtectedRoute>
                  <MyProducts />
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cartItems}
                  removeFromCart={removeItem}
                  updateCartQuantity={updateCartQuantity}
                />
              }
            />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/details"
              element={<Details onAddToCart={onAddToCart} />}
            />
            <Route
              path="/my-products"
              element={
                <ProtectedRoute>
                  <MyProducts />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
