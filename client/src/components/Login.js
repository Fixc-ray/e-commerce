import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const res = await axios.post("http://127.0.0.1:5000/login", { username, password });
      
      // Store token and user data
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      alert("Login successful!");
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="epic-login-container">
      <div className="epic-login-form-section">
        <form onSubmit={handleLogin} className="epic-login-form">
          <h2 className="epic-login-title">Sign In</h2>
          
          {error && <p className="epic-error-message">{error}</p>}

          {/* Username Input */}
          <div className="epic-input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-label="Username"
              required
              className="epic-input"
            />
          </div>

          {/* Password Input */}
          <div className="epic-input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Password"
              required
              className="epic-input"
            />
          </div>

          {/* Login Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="epic-login-btn"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>

      <div className="epic-login-side">
        <div className="epic-side-content">
          <h1 className="epic-side-title">Welcome Back!</h1>
          <h3 className="epic-side-subtitle">Don't have an account?</h3>
          <p className="epic-side-text">Join TasteNShop to access all features and start shopping</p>
          
          {/* Redirect to Register Page */}
          <button 
            className="epic-signup-btn" 
            onClick={() => navigate("/register")}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;