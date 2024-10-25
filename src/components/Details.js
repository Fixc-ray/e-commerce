import React from "react";

function Details({ product, onAddToCart }) {
  if (!product) {
    return <p>No product details available.</p>;
  }

  return (
    <div className="border p-4 shadow-md rounded-lg">
      <img
        className="w-full h-48 object-cover rounded"
        src={product.photo_url}
        alt={product.name}
      />
      <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-gray-500">Category: {product.category}</p>
      <p className="text-lg font-bold mt-2">${product.price}</p>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
        onClick={() => onAddToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default Details;
