import "../../../assets/css/base.css";
import React, { useState, useEffect } from "react";
import ApiService from "../../../services/ApiService";
import { toast } from "react-toastify";
import bookingImage from "../../../assets/images/bs-ship.png"; 
import qrCodeImage from "../../../assets/images/qr-code-image.png";
import divider from "../../../assets/images/divider.png"

const ViewExperienceBookingDetail = ({ booking, onBack }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (booking?.id) {
      fetchBookingDetails();
    }
  }, [booking]);

  const fetchBookingDetails = async () => {
    try {
      const response = await ApiService.get(`/getExperienceBookingDetails/${booking.id}`);
      if (response.data.status) {
        setDetails(response.data.data.booking);
      } else {
        toast.error(response.data.message || "Failed to fetch booking details");
      }
    } catch (error) {
      console.error("Error fetching booking details:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper to format date
  const formatDate = (dateStr) => {
    if (!dateStr) return booking?.dateLabel || "Dec 31, 2025";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  const displayData = details || booking;

  return (
    <div className="booking-detail-view">
      <div className="booking-detail-header">
        <button className="booking-back-btn" onClick={onBack}>
          <i className="bi bi-arrow-left"></i>
          <span>Experince Booking Details</span>
        </button>
      </div>

      <div className="booking-detail-hero">
        <img 
            src={
              (displayData?.experience?.images?.length > 0 ? displayData.experience.images[0] : null) || 
              displayData?.experience?.image || 
              displayData?.image || 
              booking?.image || 
              bookingImage
            } 
            alt={displayData?.experience?.title || displayData?.title || booking?.title || "Booking"} 
            className="booking-hero-image" 
        />
      </div>

      <div className="booking-title-row">
        <h2 className="booking-suite-title">
            {displayData?.experience?.title || displayData?.title || booking?.experience?.title || "Experience Title"}
        </h2>
        {/* Cancel button removed as per request */}
      </div>

      <div className="booking-info-section mt-4">
        <div className="booking-section-header">
          <h3 className="booking-info-title">Booking Information</h3>
          <span className="booking-ref">Ref #:{displayData?.booking_reference || displayData?.ref || "3265"}</span>
        </div>

        <div className="booking-datetime-row">
          <div className="booking-dt-group">
              <div className="booking-dt-item">
                <div className="booking-dt-icon">
                    <i className="bi bi-calendar4-week"></i>
                </div>
                <div className="booking-dt-text">
                  <span className="dt-label">Date</span>
                  <span className="dt-value">{formatDate(displayData?.booking_date || displayData?.dateLabel)}</span>
                </div>
              </div>
              <div className="booking-dt-item">
                <div className="booking-dt-icon">
                    <i className="bi bi-clock"></i>
                </div>
                <div className="booking-dt-text">
                  <span className="dt-label">Time</span>
                  <span className="dt-value">{displayData?.booking_time || displayData?.sessionLabel || "1:00 PM to 5:00 PM"}</span>
                </div>
              </div>
          </div>
          <div className="booking-qr-display">
            <div className="qr-code-circle">
                 <img src={displayData?.qr_code || qrCodeImage} alt="QR Code" />
            </div>
          </div>
        </div>
      </div>
      
      <img src={divider} alt="" style={{ width: "100%", margin: "20px 0" }} />

      <div className="booking-details-list">
        <div className="booking-detail-item">
            <div className="detail-icon-box">
                <i className="bi bi-person-fill"></i>
            </div>
            <div className="detail-content">
                <span className="detail-label">Number of Passengers Booked</span>
                <span className="detail-value">
                  {details 
                    ? `${(parseInt(details.adults) || 0) + (parseInt(details.children) || 0)} Person`
                    : (booking?.passengers || "10 Person")
                  }
                </span>
            </div>
        </div>
        <div className="booking-detail-item">
             <div className="detail-icon-box">
                <i className="bi bi-chat-dots-fill"></i>
            </div>
            <div className="detail-content">
                <span className="detail-label">Special Requests</span>
                <div className="detail-value-list">
                    {displayData?.specialRequests || displayData?.special_requests ? (
                        <span>{displayData.specialRequests || displayData.special_requests}</span>
                    ) : (
                        <>
                            <span className="detail-bullet">.</span>
                            <span className="detail-bullet">.</span>
                        </>
                    )}
                </div>
            </div>
        </div>
        <div className="booking-detail-item">
             <div className="detail-icon-box">
                <i className="bi bi-hand-thumbs-up-fill"></i>
            </div>
            <div className="detail-content">
                <span className="detail-label">Booked Benefits</span>
                 <div className="detail-value-list">
                    <span className="detail-value">• In-House Captain (250 AED)</span>
                    <span className="detail-bullet">.</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ViewExperienceBookingDetail;
