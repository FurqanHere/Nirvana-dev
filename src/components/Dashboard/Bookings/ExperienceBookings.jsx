import "../../../assets/css/base.css";
import React, { useMemo, useState, useEffect } from "react";
import bookingShips from "../../../assets/images/bookingShips.png";
import qrCodeImage from "../../../assets/images/qr-code-image.png";
import ApiService from "../../../services/ApiService";
import { toast } from "react-toastify";

const ExperienceBookings = ({ onViewBooking }) => {
  const [search, setSearch] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await ApiService.get("/getExperienceBookings");
      if (response.data.status) {
        setBookings(response.data.data.bookings || []);
      }
    } catch (error) {
      console.error("Error fetching experience bookings:", error);
      // toast.error("Failed to fetch experience bookings");
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = useMemo(() => {
    return bookings
      .filter((booking) =>
        booking.experience?.title?.toLowerCase().includes(search.toLowerCase())
      )
      .map((booking) => ({
        id: booking.id,
         title: booking.experience?.title || "Experience",
         ref: booking.booking_reference || `#${booking.id}`,
         status: booking.status || "Upcoming",
         sessionLabel: booking.booking_time || "Session",
        dateLabel: new Date(booking.booking_date).toLocaleDateString("en-US", {
          weekday: "short",
          day: "numeric",
          month: "long",
        }),
        image: (booking.experience?.images?.length > 0 ? booking.experience.images[0] : booking.experience?.image) || bookingShips,
      }));
  }, [bookings, search]);

  return (
    <div className="booking-management-view">
      <div className="booking-management-header">
        <div className="experience-header-left">
            <button className="booking-back-btn">
                <i className="bi bi-arrow-left" style={{ fontSize: "32px" }}></i>
            </button>
            <h2 className="experience-page-title">Experience Bookings</h2>
        </div>

        <div className="booking-search">
          <input
            type="text"
            className="booking-search-input"
            placeholder="Search here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <i className="bi bi-search booking-search-icon" />
        </div>
      </div>

      <div className="booking-cards-grid">
        {loading ? (
           <p>Loading...</p>
        ) : filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
          <div 
            key={booking.id} 
            className="booking-card"
            onClick={() => onViewBooking && onViewBooking(booking)}
          >
            <div className="booking-card-image-wrapper">
              <span className="booking-status-badge">
                {booking.status}
              </span>
              <img src={booking.image} alt={booking.title} className="booking-main-image" />
              <div className="booking-qr-overlay">
                <img src={qrCodeImage} alt="QR Code" />
              </div>
            </div>
            
            <div className="booking-card-details">
              <div className="booking-info-left">
                <h3 className="booking-card-title">{booking.title}</h3>
                <div className="booking-meta-row">
                  <span className="booking-meta-label">
                    {booking.sessionLabel}
                  </span>
                  <span className="booking-meta-separator">|</span>
                  <span className="booking-meta-value">
                    {booking.dateLabel}
                  </span>
                </div>
              </div>
              
              <div className="booking-action-right">
                <button 
                  type="button" 
                  className="booking-view-btn"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))
        ) : (
            <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default ExperienceBookings;