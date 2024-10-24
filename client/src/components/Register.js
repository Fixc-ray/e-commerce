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
      alert(error.response?.data?.message || "Registration failed");
      console.error("Registration Error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="side">
        <h1>Hello, There!</h1>
        <h3>Already Have An Account?</h3>
        <p>Sign in instead of creating another account</p>
        <button onClick={goToLogin}>Sign In</button>
      </div>

      <form onSubmit={handleRegister}>
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
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
        <button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Register;