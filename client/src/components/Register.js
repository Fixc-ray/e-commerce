import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("http://127.0.0.1:5000/register", {
        username,
        password,
        email,
      });
      alert(res.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Registration Error", error);
      setError(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="epic-register-container">
      <div className="epic-register-side">
        <div className="epic-side-content">
          <h1 className="epic-side-title">Join TasteNShop!</h1>
          <h3 className="epic-side-subtitle">Already Have An Account?</h3>
          <p className="epic-side-text">Sign in to access your account and continue shopping</p>
          <button onClick={goToLogin} className="epic-signin-btn">Sign In</button>
        </div>
      </div>

      <div className="epic-register-form-section">
        <form onSubmit={handleRegister} className="epic-register-form">
          <h2 className="epic-register-title">Create Account</h2>
          
          {error && <p className="epic-error-message">{error}</p>}
          
          <div className="epic-input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="epic-input"
            />
          </div>
          
          <div className="epic-input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="epic-input"
            />
          </div>
          
          <div className="epic-input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="epic-input"
            />
          </div>
          
          <button type="submit" disabled={loading} className="epic-register-btn">
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;