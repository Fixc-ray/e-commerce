import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!userData || !token) {
      navigate('/');
    } else {
      setUser(JSON.parse(userData));

      // Fetch the user's products
      axios.get('/api/user/products', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleDeleteProduct = (productId) => {
    const token = localStorage.getItem('token');
    axios.delete(`/api/products/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => {
      setProducts(products.filter(product => product.id !== productId));
    })
    .catch(error => {
      console.error('Error deleting product:', error);
    });
  };

  const handleEditProduct = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  const handleAddProduct = () => {
    navigate('/add-product');
  };

  if (!user) {
    return <p className="text-center mt-10 text-lg">Loading...</p>;
  }

  return (
    <div className="mt-20 bg-gray-100 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white p-10 rounded-lg shadow-lg">
        <div className="flex items-center space-x-6 mb-8">
          <img
            src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${user.username}`}
            alt="User Avatar"
            className="w-24 h-24 rounded-full shadow-md"
          />
          <div>
            <h2 className="text-3xl font-semibold text-gray-800">
              Welcome, {user.username}!
            </h2>
            <p className="text-gray-500">Email: {user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-gray-50 border rounded-lg shadow-sm">
            <h3 className="text-lg font-bold text-gray-700 mb-2">User Info</h3>
            <p className="text-gray-600">
              <span className="font-medium">Username:</span> {user.username}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> {user.email}
            </p>
          </div>

          <div className="p-6 bg-gray-50 border rounded-lg shadow-sm flex flex-col space-y-4">
            <button
              className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
              onClick={() => navigate('/edit-profile')}
            >
              Edit Profile
            </button>
            <button
              className="w-full px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Your Products</h3>
          {products.length === 0 ? (
            <p className="text-gray-600">You have no products.</p>
          ) : (
            <div className="space-y-4 mt-20">
              {products.map(product => (
                <div key={product.id} className="p-4 bg-gray-50 border rounded-lg shadow-sm flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-bold">{product.name}</h4>
                    <p className="text-gray-600">{product.description}</p>
                  </div>
                  <div className="space-x-4">
                    <button
                      className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 transition"
                      onClick={() => handleEditProduct(product.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6">
          <button
            className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
            onClick={handleAddProduct}
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
