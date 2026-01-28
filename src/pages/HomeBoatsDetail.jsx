import "../assets/css/base.css";
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { toast } from "react-toastify";
import ApiService from "../services/ApiService";
import { useLocation } from "react-router-dom";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

// Images
import lengthImg from "../assets/images/length.png";
import bedImg from "../assets/images/bed.png";
import personIcon from "../assets/images/person.png";
import calendarImg from "../assets/images/calender-date.png";
import clockImg from "../assets/images/date.png";

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const redIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAzMiA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE2IDBDMTEuNTgyIDAgOCAzLjU4MiA4IDhDOCAxMy4zMzMgMTYgMjYgMTYgMjZDMTYgMjYgMjQgMTMuMzMzIDI0IDhDMjQgMy41ODIgMjAuNDE4IDAgMTYgMFoiIGZpbGw9IiNGRjAwMDAiLz4KPGNpcmNsZSBjeD0iMTYiIGN5PSI4IiByPSI0IiBmaWxsPSIjRkZGRkZGIi8+Cjwvc3ZnPgo=",
  iconSize: [32, 40],
  iconAnchor: [16, 40],
  popupAnchor: [0, -40],
});

const HomeBoatsDetail = () => {
  const locationState = useLocation();
  const boatData = locationState.state?.boatData || {};

  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    adults: "",
    children: "",
    location: boatData.location?.name || "",
    captain: "In-House Captain",
    selectedOption: "In-House Captain"
  });
  
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData({ ...bookingData, [name]: value });
  };

  const handleOptionChange = (e) => {
    setBookingData({ ...bookingData, selectedOption: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!bookingData.date) newErrors.date = "Date is required";
    if (!bookingData.time) newErrors.time = "Time is required";
    if (!bookingData.adults) newErrors.adults = "Adults count is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleBook = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        const payload = new FormData();
        payload.append("boat_id", boatData.id);
        payload.append("booking_date", bookingData.date);
        payload.append("booking_time", bookingData.time);
        payload.append("adults", bookingData.adults);
        payload.append("children", bookingData.children || 0);
        payload.append("location_id", boatData.location_id || 5); // Default to 5 if not available
        payload.append("special_requests", bookingData.selectedOption);

        const response = await ApiService.post("/createBooking", payload);
        
        if (response.data.status) {
          setShowSuccessPopup(true);
        } else {
          toast.error(response.data.message || "Failed to create booking");
        }
      } catch (error) {
        console.error("Booking error:", error);
        toast.error("An error occurred while creating booking");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="home-boats-detail-page">
      {showSuccessPopup && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: '#1E40AF', // Deep blue
            padding: '40px',
            borderRadius: '16px',
            textAlign: 'center',
            width: '400px',
            maxWidth: '90%',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: 'white',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <i className="bi bi-check-lg" style={{ fontSize: '48px', color: '#1E40AF' }}></i>
            </div>
            <h2 style={{ 
              color: 'white', 
              fontSize: '28px', 
              fontWeight: '600', 
              marginBottom: '32px',
              lineHeight: '1.4'
            }}>
              Boat Booked<br />Successfully!
            </h2>
            <button 
              onClick={() => navigate('/dashboard/bookings/boat')}
              style={{
                backgroundColor: 'white',
                color: '#1E40AF',
                border: 'none',
                padding: '16px',
                width: '100%',
                borderRadius: '8px',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.1s'
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              Done
            </button>
          </div>
        </div>
      )}
      <div className="detail-view">
        <div className="detail-card mt-0">
          <div className="detail-top">
            <div className="detail-header">
              <div>
                <p className="detail-kicker">{boatData.name || "Boat Name"}</p>
                <p className="detail-subtitle">
                  {boatData.description || "Luxury Boat Experience"}
                </p>
              </div>
              <div className="detail-specs">
                {[
                  { img: lengthImg, label: `Length:${boatData.length_meters || "N/A"}m` },
                  { img: personIcon, label: `${boatData.max_persons || "N/A"} Person` },
                  { img: bedImg, label: `${boatData.num_beds || "N/A"} Bed` },
                ].map((item) => (
                  <div key={item.label} className="detail-spec-card">
                    <img src={item.img} alt={item.label} />
                    <p>{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="detail-description">
            {boatData.description || "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."}
          </p>

          <div className="detail-form">
            <div className="detail-row date-time-row">
              <label className="detail-section-label">
                Select date &amp; Time
              </label>
              <div className="detail-date-time-fields">
                <div className="detail-input-wrapper">
                  <input 
                    name="date"
                    placeholder="Date" 
                    className={`detail-input ${errors.date ? "error" : ""}`}
                    value={bookingData.date}
                    onChange={handleChange}
                    type="date"
                  />
                  <img
                    src={calendarImg}
                    alt="Calendar"
                    className="detail-input-icon"
                  />
                </div>
                <div className="detail-input-wrapper">
                  <input 
                    name="time"
                    placeholder="Time" 
                    className={`detail-input ${errors.time ? "error" : ""}`}
                    value={bookingData.time}
                    onChange={handleChange}
                    type="time"
                  />
                  <img
                    src={clockImg}
                    alt="Clock"
                    className="detail-input-icon"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="detail-section-label mb-4">
                Passenger
              </label>
              <div className="detail-row two">
                <div className="detail-field">
                  <label className="detail-field-label">Adults</label>
                  <div className="detail-input-wrapper">
                    <input 
                      name="adults"
                      placeholder="Adults" 
                      className={`detail-input ${errors.adults ? "error" : ""}`}
                      value={bookingData.adults}
                      onChange={handleChange}
                      type="number"
                      min="1"
                    />
                    <img
                      src={personIcon}
                      alt="Person"
                      className="detail-input-icon"
                    />
                  </div>
                </div>
                <div className="detail-field">
                  <label className="detail-field-label">Children</label>
                  <div className="detail-input-wrapper">
                    <input
                      name="children"
                      placeholder="Children"
                      className="detail-input"
                      value={bookingData.children}
                      onChange={handleChange}
                      type="number"
                      min="0"
                    />
                    <img
                      src={personIcon}
                      alt="Person"
                      className="detail-input-icon"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="detail-row two">
              <div className="detail-field">
                <label className="detail-field-label">Add Location</label>
                <div className="detail-input-wrapper">
                  <input
                    name="location"
                    placeholder="Enter location"
                    className={`detail-input ${errors.location ? "error" : ""}`}
                    value={bookingData.location}
                    onChange={handleChange}
                  />
                  <i className="bi bi-geo-alt-fill detail-input-icon"></i>
                </div>
              </div>
              <div className="detail-field">
                <label className="detail-field-label">
                  In-House Captain
                </label>
                <div className="detail-input-wrapper">
                  <input
                    name="captain"
                    placeholder="Select Captain"
                    className="detail-input"
                    value={bookingData.captain}
                    onChange={handleChange}
                  />
                  <i className="bi bi-person-badge detail-input-icon"></i>
                </div>
              </div>
            </div>

            <div className="detail-row options">
              <div className="detail-options-card">
                <label className="detail-options-title">
                  Select Options
                </label>
                <div className="detail-radio-group">
                  <label className="detail-radio-label">
                    <input
                      type="radio"
                      name="selectedOption"
                      value="In-House Captain"
                      checked={bookingData.selectedOption === "In-House Captain"}
                      onChange={handleOptionChange}
                      className="detail-radio"
                    />
                    <span>In-House Captain</span>
                  </label>
                  <label className="detail-radio-label">
                    <input
                      type="radio"
                      name="selectedOption"
                      value="Camping"
                      checked={bookingData.selectedOption === "Camping"}
                      onChange={handleOptionChange}
                      className="detail-radio"
                    />
                    <span>Camping</span>
                  </label>
                  <label className="detail-radio-label">
                    <input
                      type="radio"
                      name="selectedOption"
                      value="Late Arrival"
                      checked={bookingData.selectedOption === "Late Arrival"}
                      onChange={handleOptionChange}
                      className="detail-radio"
                    />
                    <span>Late Arrival</span>
                  </label>
                </div>
              </div>
              <div className="detail-map-container">
                <MapContainer
                  center={[25.2048, 55.2708]}
                  zoom={13}
                  style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: "12px",
                  }}
                  zoomControl={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[25.2048, 55.2708]} icon={redIcon}>
                    <Popup>Selected Location</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>

            <div className="detail-submit">
              <button
                type="button"
                className="doc-submit-btn"
                onClick={handleBook}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBoatsDetail;
