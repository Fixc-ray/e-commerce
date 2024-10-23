import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8080/login', { username, password });
      localStorage.setItem('token', res.data.access_token);
      alert('Login successful!');
      navigate('/home');
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Sign In</h2>
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
        <button type="submit">Login</button>
      </form>
      <div className="side">
        <h1>Hello, There</h1>
        <h3>Don't have an account?</h3>
        <p>Register with us to use all features of the website</p>
        <button className="border" onClick={() => navigate("/register")}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;