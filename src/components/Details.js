import React from "react";

function Details({ products }) {
    
  return (
    <div className="products-card">
      <img src={products.photoUrl}/>
      <h2>Name: {products.name}</h2>
      <h4> Product Description: {products.description}</h4>
      <h4> Price: {products.price}</h4>
      <h4> Category: {products.category}</h4>
      <button>Add to Cart</button>
    </div>
  );
}

export default Details;
