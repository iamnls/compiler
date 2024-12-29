import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import Home from "./Home";
import "./Login.css";

const Login = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const handleOutsideClick = (e) => {
    if (formRef.current && !formRef.current.contains(e.target)) {
      navigate("/"); // Redirect to the home page
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (captchaVerified) {
      alert("Logged in successfully!");
      // Add login logic here
    } else {
      alert("Please complete the reCAPTCHA verification.");
    }
  };

  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value); // Check if the value is not null or empty
  };

  return (
    <div className="login-page">
      {/* Render Home component in the background */}
      <Home />
      <div className="overlay" onClick={handleOutsideClick}>
        <div className="login-form" ref={formRef}>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email / Phone Number"
              required
              className="form-input"
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="form-input"
            />
            <div className="form-options">
              <label>
                <input type="checkbox" />
                Remember Me
              </label>
            </div>

            {/* Google reCAPTCHA */}
            <div className="recaptcha-container">
              <ReCAPTCHA
                sitekey="YOUR_RECAPTCHA_SITE_KEY" // Replace with your site key from Google reCAPTCHA
                onChange={handleCaptchaChange}
              />
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={!captchaVerified} // Disable button until reCAPTCHA is verified
            >
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
