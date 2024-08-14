import React from "react";

function Details({ product }) {
  return (
    <div className="products-card m-2 shadow-md border border-black-300">
      <img
        className="w-full h-48 object-cover rounded "
        src={product.photoUrl}
      />
      <h2 className="text-2xl font-semibold m-3">Name: {product.name}</h2>
      <h4 className="text-base"> Product Description: {product.description}</h4>
      <h4 className=""> Price: {product.price}</h4>
      <h4> Category: {product.category}</h4>
    </div>
  );
}

export default Details;
