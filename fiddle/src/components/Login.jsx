import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from '../AuthContext/AuthContext'; // Import the useAuth hook
import "./Login.css";
import Home from "./Home";

const Login = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const { login } = useAuth();  // Get login function from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Close the form if the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        navigate("/");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navigate]);

  // Handle the login functionality
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5001/api/auth/login", {
        email,
        password,
      });

      console.log("Login Success:", response.data);

      if (response.data.success) {
        const { role, token } = response.data;
        login(role, token);  // Update the context with the user role and token
        
        // Store the token and role in localStorage if you prefer
        localStorage.setItem("token", token);  // Store the token
        localStorage.setItem("role", role);    // Store the user role

        // Navigate based on the role
        if (role === "admin") {
          navigate("/admin");  // Redirect admin users to the dashboard
        } else {
          navigate("/");  // Redirect regular users to home
        }
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login Failed:", error.message);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-page">
      <Home/>
      <div className="overlay">
        <div className="login-form" ref={formRef}>
          <h2>Login</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
              autoComplete="email"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
              autoComplete="current-password"
            />
            <button type="submit" className="submit-button">
              Login
            </button>
          </form>
          <div className="form-links">
            <a href="/forgot-password">Forgot Password?</a>
            <p>
              Don't have an account? <a href="/signup">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
