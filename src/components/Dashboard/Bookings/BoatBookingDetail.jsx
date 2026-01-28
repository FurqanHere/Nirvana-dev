import "../../../assets/css/base.css";
import React, { useMemo, useState, useEffect } from "react";
import bookingShips from "../../../assets/images/bookingShips.png";
import qrCodeImage from "../../../assets/images/boat-qr.png";
import ApiService from "../../../services/ApiService";
import { toast } from "react-toastify";

const BoatBookingDetail = ({ onViewBooking }) => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [search, setSearch] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBookings(activeTab);
  }, [activeTab]);

  const fetchBookings = async (status) => {
    setLoading(true);
    try {
      const response = await ApiService.get(`/getBookings?status=${status}`);
      if (response.data.status) {
        setBookings(response.data.data.bookings || []);
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) =>
      booking.boat?.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [bookings, search]);

  const formatDate = (dateString) => {
    const options = { weekday: 'short', day: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="booking-management-view">
      <h2 className="booking-management-title">Boat Bookings</h2>

      <div className="booking-management-header">
        <div className="booking-tabs">
          <button
            type="button"
            className={`booking-tab ${
              activeTab === "upcoming" ? "active" : ""
            }`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming Booking
          </button>
          <button
            type="button"
            className={`booking-tab ${
              activeTab === "past" ? "active" : ""
            }`}
            onClick={() => setActiveTab("past")}
          >
            Previous Trip
          </button>
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
            <p style={{ color: 'white' }}>Loading bookings...</p>
        ) : filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <div key={booking.id} className="booking-card" onClick={() => onViewBooking(booking)}>
              <div className="booking-card-image-wrapper">
                <span className="booking-status-badge">
                  {booking.status}
                </span>
                <img 
                  src={booking.boat?.main_image || bookingShips} 
                  alt={booking.boat?.name || "Boat"} 
                  className="booking-main-image" 
                />
                <div className="booking-qr-overlay">
                  {booking.qr_code ? (
                      <img src={booking.qr_code} alt="QR Code" />
                  ) : (
                      <img src={qrCodeImage} alt="QR Code" />
                  )}
                </div>
              </div>
              
              <div className="booking-card-details">
                <div className="booking-info-left">
                  <h3 className="booking-card-title">{booking.boat?.name || "Unknown Boat"}</h3>
                  <div className="booking-meta-row">
                    <span className="booking-meta-label">
                      {booking.booking_time}
                    </span>
                    <span className="booking-meta-separator">|</span>
                    <span className="booking-meta-value">
                      {formatDate(booking.booking_date)}
                    </span>
                  </div>
                </div>
                
                <div className="booking-action-right">
                  <button type="button" className="booking-view-btn">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: 'white' }}>No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default BoatBookingDetail;

