import "../../../assets/css/base.css";
import React, { useMemo, useState } from "react";
import bookingShips from "../../../assets/images/bookingShips.png";
import qrCodeImage from "../../../assets/images/boat-qr.png";

const BoatBookingDetail = ({ onViewBooking }) => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [search, setSearch] = useState("");

  const bookings = useMemo(
    () =>
      Array.from({ length: 6 }).map((_, index) => ({
        id: index + 1,
        title: "TENDER 9 (T9)",
        status: "Upcoming",
        sessionLabel: "Session",
        dateLabel: "Fri 18 October",
      })),
    []
  );

  const filteredBookings = bookings.filter((booking) =>
    booking.title.toLowerCase().includes(search.toLowerCase())
  );

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
              activeTab === "previous" ? "active" : ""
            }`}
            onClick={() => setActiveTab("previous")}
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
        {filteredBookings.map((booking) => (
          <div key={booking.id} className="booking-card" onClick={() => onViewBooking(booking)}>
            <div className="booking-card-image-wrapper">
              <span className="booking-status-badge">
                {booking.status}
              </span>
              <img src={bookingShips} alt={booking.title} className="booking-main-image" />
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
                <button type="button" className="booking-view-btn">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoatBookingDetail;

