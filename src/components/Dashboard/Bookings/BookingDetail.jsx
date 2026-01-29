import "../../../assets/css/base.css";
import React, { useState, useEffect } from "react";
import ApiService from "../../../services/ApiService";
import { toast } from "react-toastify";
import bookingImage from "../../../assets/images/bs-ship.png"; 
import qrCodeImage from "../../../assets/images/qr-code-image.png";
import divider from "../../../assets/images/divider.png"

const BookingDetail = ({ booking, onBack }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    if (booking?.id) {
      fetchBookingDetails();
    }
  }, [booking]);

  const fetchBookingDetails = async () => {
    try {
      const response = await ApiService.get(`/getBookingDetails/${booking.id}`);
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

  const handleCancelBooking = async () => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    setCancelling(true);
    try {
      // Assuming endpoint expects booking_id in body
      const response = await ApiService.post("/cancelBooking", { booking_id: booking.id });
      if (response.data.status) {
        toast.success(response.data.message || "Booking cancelled successfully");
        if (onBack) onBack(); // Go back to list
      } else {
        toast.error(response.data.message || "Failed to cancel booking");
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("An error occurred while cancelling");
    } finally {
      setCancelling(false);
    }
  };

  // Helper to format date if API returns raw string
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

  const displayData = details || booking; // Prefer API details, fallback to prop

  return (
    <div className="booking-detail-view">
      <div className="booking-detail-header">
        <button className="booking-back-btn" onClick={onBack}>
          <i className="bi bi-arrow-left"></i>
          <span>Booking Detail</span>
        </button>
      </div>

      <div className="booking-detail-hero">
        <img 
          src={displayData?.boat?.main_image || displayData?.image || booking?.boat?.main_image || bookingImage} 
          alt={displayData?.boat?.name || booking?.boat?.name || "Booking"} 
          className="booking-hero-image" 
        />
      </div>

      <div className="booking-title-row">
        <h2 className="booking-suite-title">
          {displayData?.boat?.name || displayData?.title || booking?.boat?.name || "Calma Suite 1"}
        </h2>
        <button 
          className="booking-cancel-btn" 
          onClick={handleCancelBooking}
          disabled={cancelling}
        >
          {cancelling ? "Cancelling..." : "Cancel"}
        </button>
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

export default BookingDetail;