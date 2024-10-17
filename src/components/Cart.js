import React, { useEffect, useState } from 'react';
import Details from './Details';
// import { Link } from 'react-router-dom';

function Cart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://e-commerce-silk-xi-95.vercel.app/products")
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(error => console.log("Error Fetching Cart Items", error));
  }, []);

  const calculateTotal = () => {
    let totalPrice = 0;
    for (const item of items) {
      totalPrice += item.price * (item.quantity || 1); 
    }
    return totalPrice.toFixed(2);
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleAddToCart = (product) => {
    setItems(prevItems => {
      const itemExists = prevItems.find(item => item.id === product.id);
      if (itemExists) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  }
    
    return (
    <div className='cart'>
      <h1>Shopping Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {items.length > 10 && <p>You have a lot of items in your cart!</p>}
          <div className="cart-items">
            {items.map(item => (
              <div key={item.id} className="cart-item">
                <Details product={item} onAddToCart={handleAddToCart} />
                <button onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            ))}
          </div>
          <h2>Total: ${calculateTotal()}</h2>
        </div>
      )}
    </div>
  );
}

export default Cart;
