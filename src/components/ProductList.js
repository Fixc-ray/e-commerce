// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../Api'; // Axios instance for backend communication

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch products on component mount
  useEffect(() => {
    API.get('/api/products')
      .then((res) => setProducts(res.data))
      .catch(() => alert('Failed to load products'));
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/products/${id}`);
      alert('Product deleted successfully');
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      alert('Failed to delete product');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-semibold mb-6">Your Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <div key={product.id} className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p className="text-gray-600">Price: ${product.price}</p>
            <p className="text-gray-500">{product.description}</p>

            <div className="mt-4 flex space-x-4">
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                onClick={() => navigate(`/edit-product/${product.id}`)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
