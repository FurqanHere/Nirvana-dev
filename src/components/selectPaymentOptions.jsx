import "../assets/css/style.base.css";
import React from "react";
import paymentBgImg from "../assets/images/payment-bg.png";
import blueTickImg from "../assets/images/blue-tick.png";

const SelectPaymentOptions = ({
  selectedPackage,
  selectedFrequency,
  onFrequencyChange,
  onContinue,
}) => {
  return (
    <div className="payment-options-container">
      <div
        className="selected-package-card"
        style={{ backgroundImage: `url(${paymentBgImg})` }}
      >
        <div className="selected-package-info">
          <div>
            <h3 className="selected-package-name">{selectedPackage}</h3>
            <p className="selected-package-label">Primary Best package</p>
          </div>
          <div className="selected-package-price">AED 1,499/mo</div>
          <div className="selected-package-checkmark">
            <img src={blueTickImg} alt="" />
          </div>
        </div>
      </div>

      <div className="payment-frequency-grid">
        <div
          className={`payment-frequency-card ${
            selectedFrequency === "Monthly" ? "selected" : ""
          }`}
          onClick={() => onFrequencyChange("Monthly")}
        >
          <div className="frequency-info">
            <div className="frequency-header">
              <h4 className="frequency-name">Monthly</h4>
              <p className="frequency-price">AED 2,500/mo</p>
            </div>
            <p className="frequency-details">Package price × 12 (paid monthly)</p>
            <div className="frequency-footer">
              <p className="frequency-note">
                Refundable, One-Time 5% VAT.
              </p>
              <div className="frequency-radio">
                <input
                  type="radio"
                  name="frequency"
                  checked={selectedFrequency === "Monthly"}
                  onChange={() => onFrequencyChange("Monthly")}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className={`payment-frequency-card ${
            selectedFrequency === "Semi-Annual" ? "selected" : ""
          }`}
          onClick={() => onFrequencyChange("Semi-Annual")}
        >
          <div className="frequency-info">
            <div className="frequency-header">
              <h4 className="frequency-name">Semi-Annual</h4>
              <p className="frequency-price">AED 2,500/mo</p>
            </div>
            <p className="frequency-details">Two payments</p>
            <div className="frequency-footer">
              <p className="frequency-note">
                Refundable, One-Time 5% VAT.
              </p>
              <div className="frequency-radio">
                <input
                  type="radio"
                  name="frequency"
                  checked={selectedFrequency === "Semi-Annual"}
                  onChange={() => onFrequencyChange("Semi-Annual")}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className={`payment-frequency-card ${
            selectedFrequency === "Annual" ? "selected" : ""
          }`}
          onClick={() => onFrequencyChange("Annual")}
        >
          <div className="frequency-info">
            <div className="frequency-header">
              <h4 className="frequency-name">Annual</h4>
              <p className="frequency-price">AED 2,500/mo</p>
            </div>
            <p className="frequency-details">One full payment</p>
            <div className="frequency-footer">
              <p className="frequency-note">
                Refundable, One-Time 5% VAT.
              </p>
              <div className="frequency-radio">
                <input
                  type="radio"
                  name="frequency"
                  checked={selectedFrequency === "Annual"}
                  onChange={() => onFrequencyChange("Annual")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="payment-continue-container">
        <button
          type="button"
          className="payment-continue-btn"
          onClick={onContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SelectPaymentOptions;

