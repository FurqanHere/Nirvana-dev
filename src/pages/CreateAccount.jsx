import "../assets/css/style.base.css";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./CreateAccount.css";

import backgroundImage from "../assets/images/login-bg.png";
import googleIcon from "../assets/images/google.png";
import appleIcon from "../assets/images/apple.png";
import uaeFlag from "../assets/images/flag.png";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    if (typeof window !== "undefined") {
      const userData = {};
      localStorage.setItem("user", JSON.stringify(userData));
    }
    navigate("/phone-otp", { replace: true, state: { flow: "signup" } });
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
      className="create-page"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="create-card" data-aos="fade-up" data-aos-delay="100">
        <div className="create-header">
          <h1>Create Account</h1>
          <p>Add information for account</p>
        </div>

        <form className="create-form">
          <div className="create-grid">
            <div className="login-field">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder=""
                className="login-input"
              />
            </div>

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
          </div>

          <div className="create-grid d-flex">
            <div className="login-field">
              <label htmlFor="phone">Phone Number</label>
              <div className="phone-field">
                <span className="flag-img ms-3 me-2">
                  <img src={uaeFlag} alt="UAE" />
                </span>
                <span className="phone-prefix" aria-label="UAE country code">
                   +971
                </span>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder=""
                  className="login-input phone-input"
                />
              </div>
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

          <button
            type="button"
            className="login-button create-button"
            onClick={handleCreateAccount}
          >
            Create Account
          </button>
        </form>

        <div className="login-divider">
          <span>Or continue with</span>
        </div>

        <div className="login-social">
          <button type="button" aria-label="Login with Google">
            <img src={googleIcon} alt="Google" className="google" />
          </button>
          <button type="button" aria-label="Login with Apple">
            <img src={appleIcon} alt="Apple" className="apple" />
          </button>
        </div>

        <div className="login-footer">
          <span>already have an account?</span>
          <button type="button" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
