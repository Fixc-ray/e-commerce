import React from 'react';

function Details({ product, onAddToCart }) {
  if (!product) {
    return  <p className="text-center text-xl mt-10">
              No product details available.
            </p>;
  }

  return (
    <div className="products-card m-2 shadow-md border w-60 p-4 rounded-lg">
      <img
        className="w-full h-48 object-cover rounded"
        src={product.photoUrl}
        alt={product.name}
      />
      <h2 className="text-2xl font-semibold m-3">{product.name}</h2>
      <h4 className="description mt-2 text-gray-600">{product.description}</h4>
      <h4 className="text-gray-500">Category: {product.category}</h4>
      <h4 className="text-lg font-semibold text-gray-700 mt-2">{product.price}</h4>

      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700 transition-all duration-200"
        onClick={() => onAddToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default Details;
