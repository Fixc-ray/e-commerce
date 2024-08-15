import React, { useEffect, useState } from 'react';

function Details({ product , onAddToCart}) {

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://e-commerce-silk-xi-95.vercel.app/products")
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(error => console.log("Error Fetching Cart Items"));
  }, []);

  const calculateTotal = () => {
    let totalPrice = 0;
    for (const item of items) {
      totalPrice += item.price * item.quantity; 
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
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };
  return (
    <div className="products-card m-2 shadow-md border w-60">
      <img
        className="w-full h-48 object-cover rounded"
        src={product.photoUrl}
        alt={product.name}
      />
      <h2 className="text-2xl font-semibold m-3">Name: {product.name}</h2>
      <h4 className="text-base"> Product Description: {product.description}</h4>
      <h4 className=""> Price: {product.price}</h4>
      <h4> Category: {product.category}</h4>
      <button 
        className="add-to-cart-button bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => onAddToCart(product)}
      >
        Add to Cart
      </button>
      <h2 className="text-2xl font-bold mt-3">Name: {product.name}</h2>
      <hr/>
      <h4 className="text-base ">Product Description: {product.description}</h4>
      <h4 className="">Price: {product.price}</h4>
      <h4>Category: {product.category}</h4>
    </div>
  );
}

export default Details;
