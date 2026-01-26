import "../assets/css/base.css";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Login.css";
import ApiService from "../services/ApiService";
import { toast } from "react-toastify";

import backgroundImage from "../assets/images/login-bg.png";
import fingerprint from "../assets/images/fingerprint.png";
import googleIcon from "../assets/images/google.png";
import appleIcon from "../assets/images/apple.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Forgot Password State
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotOtp, setForgotOtp] = useState(["", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotLoading, setForgotLoading] = useState(false);
  const otpRefs = useRef([]);

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...forgotOtp];
    next[index] = value;
    setForgotOtp(next);
    if (value && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !forgotOtp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const resetForgotState = () => {
    setShowForgotModal(false);
    setForgotEmail("");
    setForgotOtp(["", "", "", ""]);
    setNewPassword("");
    setConfirmPassword("");
    setForgotStep(1);
  };

  const handleForgotSubmit = async () => {
    if (forgotStep === 1) {
      if (!forgotEmail) {
        toast.error("Please enter your email");
        return;
      }
      setForgotLoading(true);
      try {
        const response = await ApiService.post("/forgotPassword", { email: forgotEmail.trim() });
        if (response.data.status) {
          toast.success(response.data.message || "OTP sent successfully");
          setForgotStep(2);
        } else {
          toast.error(response.data.message || "Failed to send OTP");
        }
      } catch (error) {
        console.error("Forgot Password Error:", error);
        toast.error("An error occurred");
      } finally {
        setForgotLoading(false);
      }
    } else if (forgotStep === 2) {
      // Verify OTP Step
      const otpString = forgotOtp.join("");
      if (otpString.length !== 4) {
        toast.error("Please enter valid 4-digit OTP");
        return;
      }
      
      setForgotLoading(true);
      try {
        const payload = {
          email: forgotEmail.trim(),
          otp: otpString,
          device_token: "web_token_dummy",
          device_type: "WEB",
        };
        const response = await ApiService.post("/verifyOtp", payload);
        
        if (response.data.status) {
          toast.success("OTP Verified Successfully");
          setForgotStep(3);
        } else {
          toast.error(response.data.message || "Invalid OTP");
        }
      } catch (error) {
        console.error("Verify OTP Error:", error);
        toast.error("An error occurred while verifying OTP");
      } finally {
        setForgotLoading(false);
      }
    } else {
      // Reset Password Step
      const otpString = forgotOtp.join("");
      if (!newPassword || !confirmPassword) {
        toast.error("Please enter new password and confirmation");
        return;
      }
      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      setForgotLoading(true);
      try {
        const payload = {
          email: forgotEmail.trim(),
          otp: otpString,
          password: newPassword,
          password_confirmation: confirmPassword
        };
        const response = await ApiService.post("/resetPassword", payload);
        if (response.data.status) {
          toast.success(response.data.message || "Password reset successfully");
          resetForgotState();
        } else {
          toast.error(response.data.message || "Failed to reset password");
        }
      } catch (error) {
        console.error("Reset Password Error:", error);
        toast.error("An error occurred");
      } finally {
        setForgotLoading(false);
      }
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        email,
        password,
        device_token: "web_token_dummy", // Using dummy token for web
        device_type: "WEB", // Using WEB for website
      };

      const response = await ApiService.post("/login", payload);

      if (response.data.status) {
        toast.success(response.data.message || "Login successful");
        const { user, auth_token } = response.data.data;
        
        // Save user data and token to localStorage
        // ApiService expects auth_token inside the user object in localStorage
        const userData = {
          ...user,
          auth_token
        };
        
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(userData));
        }
        
        navigate("/dashboard", { replace: true });
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      // Error handling is also done in ApiService interceptor, but we can add specific handling here if needed
      if (error.response && error.response.data && error.response.data.message) {
         // Toast is already handled in ApiService for most error codes, but redundant safety is okay
      }
    } finally {
      setLoading(false);
    }
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
            className="forgot-password-link" 
            onClick={() => setShowForgotModal(true)}
          >
            Forgot Password?
          </button>

          <button
            type="button"
            className="login-button"
            onClick={handleLogin}
            disabled={loading}
            style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? "Logging in..." : "Login Account"}
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
          <button type="button" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="modal-overlay" onClick={resetForgotState}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">
              {forgotStep === 1 ? "Forgot Password" : forgotStep === 2 ? "Verify OTP" : "Reset Password"}
            </h3>
            
            <div className="modal-form">
              {forgotStep === 1 && (
                <>
                  <p className="text-center mb-3">
                    Enter your email address to receive an OTP.
                  </p>
                  <input
                    type="text"
                    className="modal-input"
                    placeholder="Email Address"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                  />
                </>
              )}

              {forgotStep === 2 && (
                <>
                  <p className="text-center mb-3">
                    Enter the OTP sent to your email.
                  </p>
                  <div className="otp-inputs">
                    {forgotOtp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => otpRefs.current[index] = el}
                        type="text"
                        maxLength="1"
                        className="otp-input"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      />
                    ))}
                  </div>
                </>
              )}

              {forgotStep === 3 && (
                <>
                  <p className="text-center mb-3">
                    Enter your new password.
                  </p>
                  <input
                    type="password"
                    className="modal-input"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    className="modal-input"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </>
              )}
            </div>

            <div className="modal-actions">
              <button 
                className="modal-btn modal-btn-secondary"
                onClick={resetForgotState}
                disabled={forgotLoading}
              >
                Cancel
              </button>
              <button 
                className="modal-btn modal-btn-primary"
                onClick={handleForgotSubmit}
                disabled={forgotLoading}
              >
                {forgotLoading ? "Processing..." : (forgotStep === 1 ? "Obtain OTP" : "Continue")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;