import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css"
import Home from "./Home";


const SignUp=() => {
  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleOutsideClick = (e) => {
    if (formRef.current && !formRef.current.contains(e.target)) {
      navigate("/"); // Redirect to the home page
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add signup logic here
    alert("Account created successfully!");
  };

  return (
    <div className="signup-page">
      <Home />
      {/* Render Home component in the background */}
      
      <div className="overlay" onClick={handleOutsideClick}>
        <div className="signup-form" ref={formRef}>
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              required
              className="form-input"
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              className="form-input"
            />
            <input
              type="phone number"
              placeholder="Phone Number"
              required
              className="form-input"
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="form-input"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              className="form-input"
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

export default SignUp
