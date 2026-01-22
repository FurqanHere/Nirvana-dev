import "../assets/css/style.base.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Login.css";

import backgroundImage from "../assets/images/login-bg.png";
import fingerprint from "../assets/images/fingerprint.png";
import googleIcon from "../assets/images/google.png";
import appleIcon from "../assets/images/apple.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (typeof window !== "undefined") {
      const userData = { email };
      localStorage.setItem("user", JSON.stringify(userData));
    }
    navigate("/dashboard", { replace: true });
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
    });
  }, []);

  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="login-card" data-aos="fade-up" data-aos-delay="100">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="button"
            className="login-button"
            onClick={handleLogin}
          >
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
