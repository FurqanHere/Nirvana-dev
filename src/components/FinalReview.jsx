import "../assets/css/style.base.css";
import React from "react";
import whiteBgTick from "../assets/images/white-bg-tick.png";

const FinalReview = ({ onProceed }) => {
  return (
    <div className="final-review">
      <h2 className="details-heading">Final Review</h2>

      <div className="final-review-top">
        <div className="final-card primary">
          <div className="final-primary-content">
            <p className="final-plan-name">SEALUX</p>
            <p className="final-plan-price">AED 1,499/mo</p>
            <p className="final-plan-desc">Primary Best Package buy for easy.</p>
          </div>
          <div className="final-plan-check">
            <img
              src={whiteBgTick}
              alt="Selected"
              className="final-check-img"
            />
          </div>
        </div>

        <div className="final-right-section">
          <div className="final-card secondary">
            <div className="final-secondary-top">
              <span className="final-term">Monthly</span>
              <span className="final-secondary-price">AED 2,500/mo</span>
            </div>
            <p className="final-secondary-sub">
              Package price × 12 (paid monthly)
            </p>
            <p className="final-secondary-note">
              Refundable, One-Time 5% VAT.
            </p>
          </div>
        </div>
      </div>

      <div className="final-details-card">
        <div className="final-row">
          <div className="border-bottom">
            <p className="final-label">Full Name</p>
            <p className="final-value">Baki Phililnder</p>
          </div>
          <div className="border-bottom">
            <p className="final-label">Email</p>
            <p className="final-value">baki@phililnderzen.com</p>
          </div>
        </div>
        <div className="final-row">
          <div className="border-bottom">
            <p className="final-label">Email</p>
            <p className="final-value">baki@phililnderzen.com</p>
          </div>
          <div className="border-bottom">
            <p className="final-label">Country</p>
            <p className="final-value">United Arab Emirates</p>
          </div>
        </div>
        <div className="final-row">
          <div className="border-bottom">
            <p className="final-label">Phone Number</p>
            <p className="final-value">+971 26 078 7961</p>
          </div>
          <div className="border-bottom">
            <p className="final-label">Emirates ID</p>
            <p className="final-value">784-2654-2578169-4</p>
          </div>
        </div>
        <div className="final-row status-row">
          <div className="final-status">
            <span className="final-label">Contract Status</span>
            <span className="final-value">Agreed</span>
          </div>
          <button
            className="details-btn secondary"
            onClick={onProceed}
          >
            Proceed To Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalReview;

