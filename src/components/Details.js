import React, { useEffect, useState } from 'react';

function Details({ product , onAddToCart}) {
  
  return (
    <div className="products-card m-2 shadow-md border w-60">
      <img
        className="w-full h-48 object-cover rounded"
        src={product.photoUrl}
        alt={product.name}
      />
      <h2 className="text-2xl font-semibold m-3">{product.name}</h2>
      <h4 className="description">Product Description: {product.description}</h4>
      <h4 className="description">Price: {product.price}</h4>
      <h4 className="description"> Category: {product.category}</h4>
      <br/>

      <div>
        <button 
          className="add-to-cart-button bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => onAddToCart(product)}
          >
          Add to Cart
        </button>
      </div>
      
    </div>
  );
}

export default Details;
