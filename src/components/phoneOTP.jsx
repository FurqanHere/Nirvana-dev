import "../assets/css/style.base.css";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import membershipBgImg from "../assets/images/login-bg.png";
import whiteTickImg from "../assets/images/white-tick-img.png";

const PhoneOTP = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showSuccess, setShowSuccess] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const flow = location.state?.flow || "contract";
  const isSignup = flow === "signup";

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setOtp(["", "", "", ""]);
    setTimeLeft(30);
    inputRefs.current[0]?.focus();
  };

  const handleContinue = () => {
    setShowSuccess(true);
  };

  return (
    <div className="review-contract-page">
      <Header />
      <section
        className="review-contract-hero"
        style={{ backgroundImage: `url(${membershipBgImg})`, height: "100vh" }}
      >
        <div className="review-contract-overlay">
          <div className="review-contract-card phone-otp-card">
            <h2 className="phone-otp-title">OTP sent via Phone</h2>
            <div className="phone-otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="password"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  className="phone-otp-input"
                  inputMode="numeric"
                />
              ))}
            </div>
            <div className="phone-otp-timer">
              00:{timeLeft.toString().padStart(2, "0")}
            </div>
            <p className="phone-otp-resend-text">
              Didn&apos;t receive the code? Resend in {timeLeft}s
            </p>
            <button
              type="button"
              className="phone-otp-resend-link"
              onClick={handleResend}
              disabled={timeLeft > 0}
            >
              Resend
            </button>
            <button
              type="button"
              className="phone-otp-continue-btn"
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </div>
      </section>
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-modal otp-success-modal">
            <div className="otp-success-content">
              <div className="success-icon">
                <img 
                  src={whiteTickImg} 
                  alt="Agreement Signed" 
                  style={{ width: 142, height: 142 }} 
                />
              </div>
              <h3 className="success-title">
                {isSignup ? "Welcome Aboard!" : "Agreement Signed!"}
              </h3>
              {isSignup && (
                <p className="success-subtitle">
                  Welcome aboard! Get ready to set sail and explore your membership.
                </p>
              )}
            </div>
            <div className="success-actions">
              <button
                type="button"
                className="success-secondary"
                onClick={() => {
                  if (isSignup) {
                    navigate("/membership");
                  } else {
                    navigate("/membership", {
                      state: { showFinalReview: true },
                    });
                  }
                }}
              >
                {isSignup ? "Continue to Membership" : "Done"}
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PhoneOTP;
