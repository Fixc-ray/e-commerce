import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://127.0.0.1:5000/login', { username, password });
      localStorage.setItem('token', res.data.access_token);
      alert('Login successful!');
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error);
      alert(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false)
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

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Login Button */}
        <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="side">
        <h1>Hello, There</h1>
        <h3>Don't have an account?</h3>
        <p>Register with us to use all features of the website</p>
        
        {/* Redirect to Register Page */}
        <button className="border" onClick={() => navigate("/register")}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Login;