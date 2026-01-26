import "../../../assets/css/base.css";
import React from "react";
import bookingImage from "../../../assets/images/bs-ship.png"; 
import qrCodeImage from "../../../assets/images/qr-code-image.png";
import divider from "../../../assets/images/divider.png"

const BookingDetail = ({ booking, onBack }) => {
  return (
    <div className="booking-detail-view">
      <div className="booking-detail-header">
        <button className="booking-back-btn" onClick={onBack}>
          <i className="bi bi-arrow-left"></i>
          <span>Booking Detail</span>
        </button>
      </div>

      <div className="booking-detail-hero">
        <img src={booking?.image || bookingImage} alt={booking?.title || "Booking"} className="booking-hero-image" />
      </div>

      <div className="booking-title-row">
        <h2 className="booking-suite-title">{booking?.title || "Calma Suite 1"}</h2>
        <button className="booking-cancel-btn">Cancel</button>
      </div>

      <img src={divider} alt="" style={{ width: "100%", }} />

      <div className="booking-info-section">
        <div className="booking-section-header">
          <h3 className="booking-info-title">Booking Information</h3>
          <span className="booking-ref">Ref #:{booking?.ref || "3265"}</span>
        </div>

        <div className="booking-datetime-row">
          <div className="booking-dt-group">
              <div className="booking-dt-item">
                <div className="booking-dt-icon">
                    <i className="bi bi-calendar4-week"></i>
                </div>
                <div className="booking-dt-text">
                  <span className="dt-label">Date</span>
                  <span className="dt-value">{booking?.dateLabel || "Dec 31, 2025"}</span>
                </div>
              </div>
              <div className="booking-dt-item">
                <div className="booking-dt-icon">
                    <i className="bi bi-clock"></i>
                </div>
                <div className="booking-dt-text">
                  <span className="dt-label">Time</span>
                  <span className="dt-value">1:00 PM to 5:00 PM</span>
                </div>
              </div>
          </div>
          <div className="booking-qr-display">
            <img src={qrCodeImage} alt="QR Code" />
          </div>
        </div>
      </div>
      
      <div className="booking-divider"></div>

      <div className="booking-details-list">
        <div className="booking-detail-item">
            <div className="detail-icon-box">
                <i className="bi bi-person-fill"></i>
            </div>
            <div className="detail-content">
                <span className="detail-label">Number of Passengers Booked</span>
                <span className="detail-value">10 Person</span>
            </div>
        </div>
        <div className="booking-detail-item">
             <div className="detail-icon-box">
                <i className="bi bi-chat-dots-fill"></i>
            </div>
            <div className="detail-content">
                <span className="detail-label">Special Requests</span>
                <span className="detail-value text-muted">.</span>
                <span className="detail-value text-muted">.</span>
            </div>
        </div>
        <div className="booking-detail-item">
             <div className="detail-icon-box">
                <i className="bi bi-hand-thumbs-up-fill"></i>
            </div>
            <div className="detail-content">
                <span className="detail-label">Booked Benefits</span>
                <span className="detail-value">• In-House Captain (250 AED)</span>
                <span className="detail-value text-muted">.</span>
            </div>
        </div>
      </div>

      <div className="booking-divider"></div>
      
      <div className="booking-addons-section">
          <div className="addons-header-row">
             <div className="addons-icon-wrapper">
                 <i className="bi bi-cart-plus"></i>
             </div>
             <div className="addons-table-container">
                 <h4 className="section-title">Booking Add-On</h4>
                 <table className="booking-table">
                    <thead>
                        <tr>
                            <th className="th-addon">Add-On</th>
                            <th className="th-qty">Quantity</th>
                            <th className="th-price">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Ice</td>
                            <td>2</td>
                            <td>5 AED</td>
                        </tr>
                        <tr className="table-total-row">
                            <td colSpan="2" className="text-right">Total</td>
                            <td>10 AED</td>
                        </tr>
                    </tbody>
                 </table>
             </div>
          </div>
      </div>

      <div className="booking-payment-section">
          <h4 className="section-title">Payment Breakdown:</h4>
           <table className="payment-table">
                <tbody>
                    <tr>
                        <td>In-house Captain</td>
                        <td className="text-right">250 AED</td>
                    </tr>
                     <tr>
                        <td>Add-Ons</td>
                        <td className="text-right">10 AED</td>
                    </tr>
                     <tr>
                        <td>Fuel Cost</td>
                        <td className="text-right">50 AED</td>
                    </tr>
                     <tr>
                        <td>Tax%</td>
                        <td className="text-right">15.5 AED</td>
                    </tr>
                    <tr className="payment-total-row">
                        <td>Booking Total Price</td>
                        <td className="text-right">325.5 AED</td>
                    </tr>
                </tbody>
           </table>
      </div>
    </div>
  );
};

export default BookingDetail;