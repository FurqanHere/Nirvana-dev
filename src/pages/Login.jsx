import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

import backgroundImage from "../assets/images/login-bg.png";
import fingerprint from "../assets/images/fingerprint.png";
import googleIcon from "../assets/images/google.png";
import appleIcon from "../assets/images/apple.png";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="login-card">
        <div className="login-header">
          <h1>Hello</h1>
          <p>Welcome Back!</p>
        </div>

        <form className="login-form">
          <div className="login-fields">
            <div className="login-field">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder=""
                className="login-input"
              />
            </div>

            <div className="login-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder=""
                className="login-input"
              />
            </div>
          </div>

          <button type="button" className="login-button">
            Login Account
          </button>

          <button type="button" className="login-button secondary">
            <img src={fingerprint} alt="Login with UAE Pass" />
            <span>Login with UAE Pass</span>
          </button>
        </form>

        <div className="login-divider">
          <span>Or continue with</span>
        </div>

        <div className="login-social">
          <button type="button" aria-label="Login with Google" >
            <img src={googleIcon} alt="Google" className="google" />
          </button>
          <button type="button" aria-label="Login with Apple">
            <img src={appleIcon} alt="Apple" className="apple" />
          </button>
        </div>

        <div className="login-footer">
          <span>Create an account?</span>
          <button type="button" onClick={() => navigate("/create-account")}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

