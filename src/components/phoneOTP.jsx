import "../assets/css/style.base.css";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import membershipBgImg from "../assets/images/login-bg.png";
import whiteTickImg from "../assets/images/white-tick-img.png";
import ApiService from "../services/ApiService";
import { toast } from "react-toastify";

const PhoneOTP = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showSuccess, setShowSuccess] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const flow = location.state?.flow || "contract";
  const email = location.state?.email;
  const phone = location.state?.phone;
  const isSignup = flow === "signup";
  const [loading, setLoading] = useState(false);

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

  const handleResend = async () => {
    if (email) {
      try {
        const payload = {
          email: email
        };
        const response = await ApiService.post("/resendOtp", payload);
        
        if (response.data.status) {
          toast.success(response.data.message || "OTP sent successfully.");
          const expires_in = response.data.data?.otp_expires_in || 30;
          setOtp(["", "", "", ""]);
          setTimeLeft(expires_in);
          inputRefs.current[0]?.focus();
        } else {
          toast.error(response.data.message || "Failed to resend OTP");
        }
      } catch (error) {
        console.error("Resend OTP Error:", error);
        toast.error("An error occurred while resending OTP");
      }
    } else {
      setOtp(["", "", "", ""]);
      setTimeLeft(30);
      inputRefs.current[0]?.focus();
    }
  };

  const handleContinue = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 4) {
      toast.error("Please enter a valid 4-digit OTP");
      return;
    }

    // If contract flow, prioritize signing
    if (flow === "contract") {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("otp", otpString);
        
        // Add required op parameter
        formData.append("op", "1234");
        
        // Add user_id if available
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser.id) {
              formData.append("user_id", parsedUser.id);
            }
          } catch (e) {
            console.error("Error parsing user from local storage", e);
          }
        }

        // Add personal details if available
        const personalDetails = location.state?.personalDetails;
        if (personalDetails) {
          Object.keys(personalDetails).forEach(key => {
            formData.append(key, personalDetails[key]);
          });
        }

        const response = await ApiService.post("/signContract", formData);

        if (response.data.status) {
          toast.success(response.data.message || "Contract signed successfully.");
          
          // Update user data if provided in response
          if (response.data.data?.user) {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
              const parsedUser = JSON.parse(storedUser);
              const updatedUser = { ...parsedUser, ...response.data.data.user };
              localStorage.setItem("user", JSON.stringify(updatedUser));
            }
          }

          setShowSuccess(true);
        } else {
          toast.error(response.data.message || "Failed to sign contract");
        }
      } catch (error) {
        console.error("Sign Contract Error:", error);
        toast.error(error.response?.data?.message || "Error signing contract");
      } finally {
        setLoading(false);
      }
    } 
    // If we have an email, verify against backend
    else if (email) {
      setLoading(true);
      try {
        const payload = {
          email: email,
          otp: otpString,
          device_token: "web_token_dummy", // Using dummy token for web
          device_type: "WEB", // Using WEB for website
        };

        const response = await ApiService.post("/verifyOtp", payload);

        if (response.data.status) {
          // Remove "Phone" from the success message if it exists
          const successMsg = response.data.message || "Verified successfully.";
          const cleanMsg = successMsg.replace("Phone ", "");
          toast.success(cleanMsg);
          
          const { user, auth_token } = response.data.data;
          const userData = {
            ...user,
            auth_token
          };
          
          if (typeof window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(userData));
          }

          setShowSuccess(true);
        } else {
          toast.error(response.data.message || "OTP verification failed");
        }
      } catch (error) {
        console.error("OTP Verification Error:", error);
        if (error.response && error.response.data && error.response.data.message) {
           // Handled by toast usually
        }
      } finally {
        setLoading(false);
      }
    } else {
      // Fallback for flows without email (like previous contract flow mock)
      // or if just testing UI
      if (otpString.length === 4) {
        setShowSuccess(true);
      }
    }
  };

  return (
    <div className="review-contract-page">
      <Header showAuthButtons={false} />
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
              disabled={loading}
              style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? "Verifying..." : "Continue"}
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
                      state: { 
                        showFinalReview: true,
                        personalDetails: location.state?.personalDetails,
                        package: location.state?.package
                      },
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
