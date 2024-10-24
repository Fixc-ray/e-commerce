// src/components/ProductForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../Api'; // Axios instance for backend communication

const ProductForm = ({ isEdit = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
  });
  const navigate = useNavigate();
  const { productId } = useParams(); // For edit functionality

  // If editing, load product data on mount
  useEffect(() => {
    if (isEdit && productId) {
      API.get(`/api/products/${productId}`)
        .then((res) => setFormData(res.data))
        .catch((err) => alert('Failed to load product data'));
    }
  }, [isEdit, productId]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await API.put(`/api/products/${productId}`, formData);
        alert('Product updated successfully!');
      } else {
        await API.post('/api/products', formData);
        alert('Product created successfully!');
      }
      navigate('/products'); // Redirect to product list
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to submit product');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full"
      >
        <h2 className="text-2xl font-semibold mb-6">
          {isEdit ? 'Edit Product' : 'Add New Product'}
        </h2>

        {/* Product Name */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded"
          />
        </div>

        {/* Product Price */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded"
            step="0.01"
          />
        </div>

        {/* Product Category */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />
        </div>

        {/* Product Description */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {isEdit ? 'Update Product' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
