// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../Api'; // Import API instance
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Track login errors
  const navigate = useNavigate(); // For navigation

  // Handle login logic
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page refresh
    try {
      const res = await API.post('/login', { username, password }); // API call

      // Store token and user info in localStorage
      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      // Redirect to the profile page on success
      alert('Login successful!');
      navigate('/profile');
    } catch (error) {
      // Handle and display login errors
      const message = error.response?.data?.message || 'Login failed';
      setError(message);
      alert(message); // Optional: Alert error message
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Sign In</h2>

        {/* Username Input */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Display Error Message */}
        {error && <p className="error-message">{error}</p>}

        {/* Login Button */}
        <button type="submit">Login</button>
      </form>

      <div className="side">
        <h1>Hello, There</h1>
        <h3>Don't have an account?</h3>
        <p>Register with us to use all features of the website</p>

        <button className="border" onClick={() => navigate('/register')}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Login;
