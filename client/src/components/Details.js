import React from 'react';

function Details({ product, onAddToCart }) {
  if (!product) {
    return  <p className="text-center text-xl mt-10">
              No product details available.
            </p>;
  }

  return (
    <div className="products-card m-2 shadow-md border w-full sm:w-72 md:w-80 lg:w-96 p-5 rounded-lg transition-transform transform hover:scale-105">
      <img
        className="w-full h-48 object-cover rounded-lg mb-3"
        src={product.photoUrl}
        alt={product.name}
      />
      <h2 className="text-xl font-semibold text-gray-800 m-1">{product.name}</h2>
      <h4 className="description mt-2 text-gray-600">{product.description}</h4>
      <h4 className="text-gray-500">Category: {product.category}</h4>
      <h4 className="text-lg font-semibold text-gray-700 mt-2">{product.price}</h4>

      <button 
        className="bg-blue-600 text-white px-5 py-2 rounded mt-4 hover:bg-blue-700 transition-all duration-300 ease-in-out shadow-sm hover:shadow-md"
        onClick={() => onAddToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default Details;
