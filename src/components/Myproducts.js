import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    try {
      const response = await axios.get('http://127.0.0.1:8080/api/my-products', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setProducts(response.data); // Set the products state
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to load products.'); // Handle errors
    } finally {
      setLoading(false); // Set loading to false regardless of success or error
    }
  };

  useEffect(() => {
    fetchProducts(); // Call the fetch function
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>My Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.product_id}>{product.name} - ${product.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyProducts;
