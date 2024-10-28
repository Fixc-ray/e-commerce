import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get('http://127.0.0.1:8080/api/my-products', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setProducts(response.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to load products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
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