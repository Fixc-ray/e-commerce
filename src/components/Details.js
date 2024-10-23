import React, { useEffect, useState } from 'react';

function Details({ product, onAddToCart }) {
  const [hasDisplayedMessage, setHasDisplayedMessage] = useState(false);

  useEffect(() => {
    if (!product && !hasDisplayedMessage) {
      setHasDisplayedMessage(true);
    }
  }, [product, hasDisplayedMessage]);

  if (!product) {
    return (
      <div className="loading-placeholder">
        {hasDisplayedMessage ? null : <p>No product details available.</p>}
      </div>
    );
  }

  return (
    <div className="products-card m-2 shadow-md border w-60">
      <img
        className="w-full h-48 object-cover rounded"
        src={product.photo_url}
        alt={product.name}
      />
      <h2 className="text-2xl font-semibold m-3">{product.name}</h2>
      <h4 className="description">{product.description}</h4>
      <h4 className="description">Category: {product.category}</h4>
      <h4 className="description-price">${product.price.toFixed(2)}</h4>

      <button 
        className="add-to-cart-button px-4 py-2 rounded"
        onClick={() => onAddToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default Details;
