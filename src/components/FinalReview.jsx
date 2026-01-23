import "../assets/css/style.base.css";
import React from "react";
import whiteBgTick from "../assets/images/white-bg-tick.png";

const FinalReview = ({ personalDetails, pkg, onProceed }) => {
  return (
    <div className="final-review final-review-screen">
      <h2 className="details-heading">Final Review</h2>

      <div className="final-review-top">
        <div className="final-card primary">
          <div className="final-primary-content">
            <p className="final-plan-name">{pkg?.name || "Package Name"}</p>
            <p className="final-plan-price">AED {pkg?.monthly_price || "0"}/mo</p>
            <p className="final-plan-desc">{pkg?.description || "Package description"}</p>
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
              <span className="final-secondary-price">AED {pkg?.monthly_price || "0"}/mo</span>
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
            <p className="final-value">{personalDetails?.fullName || "-"}</p>
          </div>
          <div className="border-bottom">
            <p className="final-label">Email</p>
            <p className="final-value">{personalDetails?.email || "-"}</p>
          </div>
        </div>
        <div className="final-row">
          <div className="border-bottom">
            <p className="final-label">Passport</p>
            <p className="final-value">{personalDetails?.passport || "-"}</p>
          </div>
          <div className="border-bottom">
            <p className="final-label">Country</p>
            <p className="final-value">{personalDetails?.nationality || "-"}</p>
          </div>
        </div>
        <div className="final-row">
          <div className="border-bottom">
            <p className="final-label">Phone Number</p>
            <p className="final-value">{personalDetails?.phone || "-"}</p>
          </div>
          <div className="border-bottom">
            <p className="final-label">Emirates ID</p>
            <p className="final-value">{personalDetails?.emiratesId || "-"}</p>
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
