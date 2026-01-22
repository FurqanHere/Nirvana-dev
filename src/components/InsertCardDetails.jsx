import "../assets/css/style.base.css";
import React from "react";
import Lottie from "lottie-react";
import successLottie from "../assets/images/Succes.json";

const InsertCardDetails = ({
  cardInfo,
  cardInfoErrors,
  onFullNameChange,
  onCardNumberChange,
  onExpiryDateChange,
  onCvvChange,
  onPayClick,
  showPaymentSuccess,
  onClosePaymentSuccess,
  onViewInvoice,
  onBackToPackages,
}) => {
  return (
    <>
      <div className="card-info-view">
        <h2 className="card-info-heading">Insert Card Details</h2>
        <div className="card-info-form-card">
          <div className="card-info-form-row">
            <div className="card-info-form-field">
              <label>
                Full Name <span className="card-info-required">*</span>
              </label>
              <input
                value={cardInfo.fullName}
                onChange={onFullNameChange}
                className={
                  cardInfoErrors.fullName ? "card-info-input-error" : ""
                }
              />
              {cardInfoErrors.fullName && (
                <span className="card-info-error-message">
                  {cardInfoErrors.fullName}
                </span>
              )}
            </div>
            <div className="card-info-form-field">
              <label>
                Card Number <span className="card-info-required">*</span>
              </label>
              <input
                value={cardInfo.cardNumber}
                onChange={onCardNumberChange}
                className={
                  cardInfoErrors.cardNumber ? "card-info-input-error" : ""
                }
                placeholder="1234 5678 9012 3456"
                maxLength="19"
              />
              {cardInfoErrors.cardNumber && (
                <span className="card-info-error-message">
                  {cardInfoErrors.cardNumber}
                </span>
              )}
            </div>
          </div>
          <div className="card-info-form-row">
            <div className="card-info-form-field">
              <label>
                Expiry Date <span className="card-info-required">*</span>
              </label>
              <input
                value={cardInfo.expiryDate}
                onChange={onExpiryDateChange}
                className={
                  cardInfoErrors.expiryDate ? "card-info-input-error" : ""
                }
                placeholder="MM/YY"
                maxLength="5"
              />
              {cardInfoErrors.expiryDate && (
                <span className="card-info-error-message">
                  {cardInfoErrors.expiryDate}
                </span>
              )}
            </div>
            <div className="card-info-form-field">
              <label>
                CVV <span className="card-info-required">*</span>
              </label>
              <input
                value={cardInfo.cvv}
                onChange={onCvvChange}
                className={cardInfoErrors.cvv ? "card-info-input-error" : ""}
                placeholder="123"
                maxLength="4"
                type="password"
              />
              {cardInfoErrors.cvv && (
                <span className="card-info-error-message">
                  {cardInfoErrors.cvv}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="card-info-pay-container">
          <button
            type="button"
            className="card-info-pay-btn"
            onClick={onPayClick}
          >
            Pay
          </button>
        </div>
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
                onClick={onViewInvoice}
              >
                View Invoice
              </button>
              <button
                className="success-primary"
                onClick={onViewInvoice}
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

export default InsertCardDetails;
