import React from "react";

function Details({ products }) {
    
  return (
    <div className="products-card m-2 shadow-md border border-black-300">
      <img className="w-full h-48 object-cover rounded " src={products.photoUrl}/>
      <h2 className="text-2xl font-semibold m-3">Name: {products.name}</h2>
      <h4 className="text-base"> Product Description: {products.description}</h4>
      <h4 className=""> Price: {products.price}</h4>
      <h4> Category: {products.category}</h4>
    </div>
  );
}

export default Details;
