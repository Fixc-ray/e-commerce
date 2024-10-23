import React, { useEffect, useState } from "react";
import Details from './Details';
import Search from "./Search";
import Navbar from "./Navbar";

function Home({ onAddToCart, onRemoveItem }) {
  const url = "http://127.0.0.1:8080/api/products";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setError("Failed to load products.");
      });
  }, []);

  if (loading) {
    return (
      <div>
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>{error}</div>
    );
  }

  return (
    <div>
      <div className="mt-20px">
        <Search 
          items={products}
          onAddToCart={onAddToCart}
        />
      </div>
      <div className="product-list">
        {products.map(product => (
          <Details 
            key={product.id} // Assuming each product has a unique 'id'
            product={product}
            onAddToCart={onAddToCart}
            onRemoveItem={onRemoveItem}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
