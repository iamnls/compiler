import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Home" // Import Home component to display as background
import "./ForgotPassword.css";  // Import the CSS file for styling

const ForgotPassword = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleOutsideClick = (e) => {
    if (formRef.current && !formRef.current.contains(e.target)) {
      navigate("/"); // Redirect to home page if clicked outside the form
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic for password reset here
    alert("Password reset link has been sent to your email!");
  };

  return (
    <div className="forgot-password-page">
      {/* Render Home component in the background */}
      <Home />
      <div className="overlay" onClick={handleOutsideClick}>
        <div className="forgot-password-form" ref={formRef}>
          <h2>Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="form-input"
            />
            <button type="submit" className="submit-button">
              Reset Password
            </button>
          </form>
          <div className="form-links">
            <p>
              Remember your password? <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;