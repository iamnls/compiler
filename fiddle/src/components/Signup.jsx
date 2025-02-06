import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests
import "./Signup.css";
import Home from "./Home";

const SignUp = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();

  // State for input fields
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  // Prevent scrolling when signup modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleOutsideClick = (e) => {
    if (formRef.current && !formRef.current.contains(e.target)) {
      navigate("/"); // Redirect to home page when clicking outside
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number (Only digits and 10 characters)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError("Phone number must be 10 digits.");
      return;
    }

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      // Send signup data to the backend
      const response = await axios.post("http://localhost:5001/api/auth/signup", {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      if (response.data.success) {
        alert("Account created successfully!");
        navigate("/login"); // Redirect to login after successful signup
      } else {
        setError(response.data.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      // Improved error handling
      if (err.response) {
        // The request was made and the server responded with an error status code
        setError(err.response.data.message || "An error occurred while signing up.");
        console.error("Server responded with error:", err.response.data);
      } else if (err.request) {
        // The request was made but no response was received
        setError("No response from server. Please try again later.");
        console.error("Request made but no response:", err.request);
      } else {
        // Something else happened
        setError("An unexpected error occurred.");
        console.error("Unexpected error:", err.message);
      }
    }
  };

  return (
    <div className="signup-page">
      <Home/> {/* Renders Home component in the background */}

      <div className="overlay" onClick={handleOutsideClick}>
        <div className="signup-form animate-popup" ref={formRef}>
          <h2>Sign Up</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              required
              className="form-input"
              value={formData.fullName}
              onChange={handleInputChange}
              autoComplete="name"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="form-input"
              value={formData.email}
              onChange={handleInputChange}
              autoComplete="email"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              required
              className="form-input"
              value={formData.phone}
              onChange={handleInputChange}
              autoComplete="tel"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="form-input"
              value={formData.password}
              onChange={handleInputChange}
              autoComplete="new-password"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              className="form-input"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              autoComplete="new-password"
            />
            <button type="submit" className="submit-button">
              Sign Up
            </button>
          </form>
          <div className="form-links">
            <a href="/forgot-password">Forgot Password?</a>
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
