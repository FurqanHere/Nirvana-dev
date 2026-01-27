import "../assets/css/base.css";
import React from "react";
import Lottie from "lottie-react";
import successLottie from "../assets/images/Succes.json";
import MasterAndVisa from "../assets/images/MasterAndVisa.png";
import AppleAndGoogle from "../assets/images/AppleAndGoogle.png";

const Payment = ({ 
  selectedPaymentMethod, 
  onChangeMethod, 
  onProceed,
  showPaymentSuccess,
  onClosePaymentSuccess,
  onContinue
}) => {
  return (
    <>
    <div className="payment-method-view">
      <h2 className="details-heading">Payment</h2>
      <div className="payment-method-card">
        <div className="payment-grid">
          <div className="promo-block">
            <p className="payment-label">Do you have a promocode?</p>
            <div className="promo-input-wrapper">
              <input
                className="promo-input"
                placeholder="AXHUY2"
              />
              <button type="button" className="promo-apply">
                Apply
              </button>
            </div>
          </div>

          <div className="payment-method-block">
            <p className="payment-label">Select a payment method</p>
            <div
              className={`pay-option ${
                selectedPaymentMethod === "online" ? "pay-selected" : ""
              }`}
              onClick={() => onChangeMethod("online")}
            >
              <div
                className={`pay-radio ${
                  selectedPaymentMethod !== "online" ? "pay-off" : ""
                }`}
              >
                <svg
                  className="pay-radio-check"
                  width="12"
                  height="9"
                  viewBox="0 0 12 9"
                  fill="none"
                >
                  <path
                    d="M1 4.5L4.5 8L11 1"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="pay-label">Pay Online</span>
              <div className="pay-icons">
                <img 
                  src={MasterAndVisa} 
                  alt="Mastercard and Visa" 
                  style={{ height: "43px", width: "auto" }} 
                />
                <img 
                  src={AppleAndGoogle} 
                  alt="Apple Pay and Google Pay" 
                  style={{ height: "43px", width: "auto" }} 
                />
              </div>
            </div>
          </div>

          <div className="payment-method-block">
            <p className="payment-label">Select a payment method</p>
            <div
              className={`pay-option ${
                selectedPaymentMethod === "cash" ? "pay-selected" : ""
              }`}
              onClick={() => onChangeMethod("cash")}
            >
              <div
                className={`pay-radio ${
                  selectedPaymentMethod !== "cash" ? "pay-off" : ""
                }`}
              >
                <svg
                  className="pay-radio-check"
                  width="12"
                  height="9"
                  viewBox="0 0 12 9"
                  fill="none"
                >
                  <path
                    d="M1 4.5L4.5 8L11 1"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="pay-label">
                Cash / Cheques / Card
                <span className="pay-sub">(at office)</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <button
        className="schedule-submit-btn payment-cta"
        onClick={onProceed}
      >
        Proceed to Pay
      </button>
    </div>

    {showPaymentSuccess && (
        <div className="success-overlay">
          <div className="success-modal">
            <button
              className="success-close"
              onClick={onClosePaymentSuccess}
              aria-label="Close"
            >
              ×
            </button>
            <div className="success-icon">
              <div className="success-icon-circle">
                <Lottie
                  animationData={successLottie}
                  loop={false}
                  style={{ width: "142px", height: "142px" }}
                />
              </div>
            </div>
            <h3 className="success-title">Payment Successful</h3>
            <p className="success-subtitle">SEALUX ฿ 1,499</p>
            <div className="success-details">
              <div className="success-detail-title">Date &amp; Time</div>
              <div className="success-detail-value">
                Dec 31, 2025 – 10 AM – 12 PM
              </div>
              <div className="success-detail-ref">
                Payment Registration: NYB-0040
              </div>
            </div>
            <div className="success-actions">
              <button
                className="success-secondary"
                onClick={onContinue}
              >
                View Invoice
              </button>
              <button
                className="success-primary"
                onClick={onContinue}
              >
                Continue to Documents
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Payment;

