import "../assets/css/base.css";
import React from "react";
import paymentBgImg from "../assets/images/payment-bg.png";
import blueTickImg from "../assets/images/blue-tick.png";

const SelectPaymentOptions = ({
  selectedPackage,
  selectedPackageData,
  selectedFrequency,
  onFrequencyChange,
  onContinue,
}) => {
  const data = selectedPackageData || {};

  return (
    <div className="payment-options-container">
      <div
        className="selected-package-card"
        style={{ backgroundImage: `url(${paymentBgImg})` }}
      >
        <div className="selected-package-info">
          <div>
            <h3 className="selected-package-name">{selectedPackage}</h3>
            <p className="selected-package-label">{data.description}</p>
          </div>
          <div className="selected-package-price">AED {data.monthly_price}/mo</div>
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
              <p className="frequency-price">AED {data.monthly_price}/mo</p>
            </div>
            <p className="frequency-details">{data.monthly_details}</p>
            <div className="frequency-footer">
              <p className="frequency-note">
                Refundable, One-Time {parseFloat(data.vat_percentage)}% VAT.
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
              <p className="frequency-price">AED {data.semi_annual_price}</p>
            </div>
            <p className="frequency-details">{data.semi_annual_details}</p>
            <div className="frequency-footer">
              <p className="frequency-note">
                Refundable, One-Time {parseFloat(data.vat_percentage)}% VAT.
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
              <p className="frequency-price">AED {data.annual_price}</p>
            </div>
            <p className="frequency-details">{data.annual_details}</p>
            <div className="frequency-footer">
              <p className="frequency-note">
                Refundable, One-Time {parseFloat(data.vat_percentage)}% VAT.
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
