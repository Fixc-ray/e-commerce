import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Details from './components/Details';

function App() {
    
    const [cartItems, setCartItems] = useState([]);

    const handleAddToCart = (product) => {
      setCartItems(prevItems => {
        const itemExists = prevItems.find(item => item.id === product.id);
        if (itemExists) {
          return prevItems.map(item =>
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
      setCartItems(cartItems.filter(item => item.id !== id));
    };

    const handleRemoveFromCart = (id) => {
      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <Router>
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home onAddToCart={handleAddToCart} 
        />} />
        <Route path="/cart" element={<Cart items={cartItems} 
        onRemoveItem={removeItem}
        />}
        />
        <Route path="/details"
            element={
              <Details
                onAddToCart={handleAddToCart}
                onRemoveItem={handleRemoveFromCart}
              />
        }/>
      </Routes>
        <br/>
      <Footer />
      
    </div>
    </Router>
  )
  
}

export default App;