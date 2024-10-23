import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });
  const [editingProduct, setEditingProduct] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8080/api/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (error) {
      setError('Failed to load user data.');
    }
  };

  const fetchUserProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8080/api/my-products', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(response.data);
    } catch (error) {
      setError('Failed to load products.');
    }
  };

  const fetchUserCart = async () => {
    try {
        const cartResponse = await axios.get('http://127.0.0.1:8080/api/cart/me', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setCartItems(cartResponse.data);
    } catch (error) {
        console.error("Error fetching cart items:", error); // Log error details
        setError('Failed to load cart items.');
    }
};


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserData();
      await fetchUserProducts();
      await fetchUserCart();
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleAddProduct = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8080/api/products', newProduct, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts([...products, response.data]);
      setNewProduct({ name: '', price: '' });
    } catch (error) {
      setError('Failed to add product.');
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://127.0.0.1:8080/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(products.filter(product => product.product_id !== productId));
    } catch (error) {
      setError('Failed to delete product.');
    }
  };

  const handleEditProduct = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8080/api/products/${editingProduct.product_id}`, editingProduct, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(products.map(product => product.product_id === editingProduct.product_id ? response.data : product));
      setEditingProduct(null);
    } catch (error) {
      setError('Failed to edit product.');
    }
  };

  const handleStartEditing = (product) => {
    setEditingProduct(product);
  };

  const handleChangeEditingProduct = (e) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };

  const handleChangeNewProduct = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">User Profile</h2>
      
      <div className="mb-6 p-4 border rounded-md shadow-sm bg-gray-50">
        <h3 className="text-lg font-bold">User Information</h3>
        <p className="mt-2">Username: <span className="font-medium">{user.username}</span></p>
        <p>Email: <span className="font-medium">{user.email}</span></p>
        <button className="mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Edit Profile
        </button>
      </div>

      <div className="mb-6 p-4 border rounded-md shadow-sm bg-gray-50">
        <h3 className="text-lg font-bold">My Products</h3>
        
        <div className="mb-4">
          <h4 className="text-md font-semibold">Add New Product</h4>
          <input type="text" name="name" placeholder="Product Name" value={newProduct.name} onChange={handleChangeNewProduct} />
          <input type="number" name="price" placeholder="Product Price" value={newProduct.price} onChange={handleChangeNewProduct} />
          <button onClick={handleAddProduct} className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">
            Add Product
          </button>
        </div>

        {products.length > 0 ? (
          <ul className="mt-2">
            {products.map((product) => (
              <li key={product.product_id} className="flex justify-between items-center border-b py-2">
                <span>{product.name} - ${product.price}</span>
                <div>
                  <button onClick={() => handleStartEditing(product)} className="mx-2 px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteProduct(product.product_id)} className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2">No products found.</p>
        )}
      </div>

      {editingProduct && (
        <div className="mb-6 p-4 border rounded-md shadow-sm bg-gray-50">
          <h3 className="text-lg font-bold">Edit Product</h3>
          <input type="text" name="name" placeholder="Product Name" value={editingProduct.name} onChange={handleChangeEditingProduct} />
          <input type="number" name="price" placeholder="Product Price" value={editingProduct.price} onChange={handleChangeEditingProduct} />
          <button onClick={handleEditProduct} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
            Update Product
          </button>
          <button onClick={() => setEditingProduct(null)} className="ml-2 px-4 py-2 text-white bg-gray-400 rounded hover:bg-gray-500">
            Cancel
          </button>
        </div>
      )}

      <div className="mb-6 p-4 border rounded-md shadow-sm bg-gray-50">
        <h3 className="text-lg font-bold">My Cart</h3>
        {cartItems.length > 0 ? (
          <ul className="mt-2">
            {cartItems.map((item) => (
              <li key={item.product_id} className="flex justify-between items-center border-b py-2">
                <span>Product ID: {item.product_id}, Quantity: {item.quantity}</span>
                <button className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600">
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2">No items in cart.</p>
        )}
      </div>

      <button onClick={handleLogout} className="w-full mt-4 px-4 py-2 text-white bg-gray-800 rounded hover:bg-gray-900">
        Logout
      </button>
    </div>
  );
};

export default Profile;
