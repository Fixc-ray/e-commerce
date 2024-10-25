import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Products from "./components/Products";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import Details from "./components/Details";
import Login from "./components/Login";
import Register from "./components/Register";
import MyProducts from "./components/Myproducts";
import Profile from "./components/Profile";
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import Home from './components/Home';

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
    window.alert(`${product.name} added to cart`);
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
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
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/Products" element={<Products onAddToCart={onAddToCart} />} />
          <Route path="/product" element={<ProductList />} />
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
              </ProtectedRoute>
            }
          />
          <Route path="/home" element={<Home />} />
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
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/details"
            element={<Details onAddToCart={onAddToCart} />}
          />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
