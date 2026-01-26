import "../assets/css/base.css";
import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import membershipBgImg from "../assets/images/experiences-bg.png";
import Lottie from "lottie-react";
import successLottie from "../assets/images/Succes.json";
import "../assets/css/ship-details.css";
import yartShipImg1 from "../assets/images/ship-thumbnails1.png";
import yartShipImg2 from "../assets/images/ship-thumbnails2.png";
import yartShipImg3 from "../assets/images/ship-thumbnails3.png";

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const ShipDetails = () => {
  const navigate = useNavigate();
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);

  // Booking Form State
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    adults: 1,
    children: 0,
    marinaLocation: "",
    captain: "In-House Captain",
    selectedBenefit: "In-House Captain",
    specialRequests: "",
  });

  const [addOns, setAddOns] = useState([
    { id: "juice", name: "Fresh Juice", price: 5, quantity: 0, selected: true },
    { id: "ice", name: "ICE", price: 15, quantity: 0, selected: false },
    { id: "towel", name: "Towel", price: 10, quantity: 0, selected: false },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCounter = (field, operation) => {
    setFormData((prev) => ({
      ...prev,
      [field]:
        operation === "increment"
          ? prev[field] + 1
          : Math.max(0, prev[field] - 1),
    }));
  };

  const handleAddOnCounter = (id, operation) => {
    setAddOns((prev) =>
      prev.map((addon) =>
        addon.id === id
          ? {
              ...addon,
              quantity:
                operation === "increment"
                  ? addon.quantity + 1
                  : Math.max(0, addon.quantity - 1),
            }
          : addon,
      ),
    );
  };

  const toggleAddOn = (id) => {
    setAddOns((prev) =>
      prev.map((addon) =>
        addon.id === id ? { ...addon, selected: !addon.selected } : addon,
      ),
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowBookingSuccess(true);
  };

  return (
    <div
      className="ship-details-page position-relative"
      style={{
        backgroundImage: `url(${membershipBgImg})`,
        backgroundSize: "100% auto",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#16429F",
      }}
    >
      <Header />

      <div className="ship-details-container">
        <button className="sd-back-btn" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left"></i>
        </button>

        <div className="ship-details-card">
          <i className="bi bi-heart ship-details-heart-icon"></i>

          <div className="ship-details-header">
            <div className="ship-details-title-section">
              <h1 className="ship-details-title">TENDER 9 (T9)</h1>
              <p className="ship-details-subtitle">
                Twin Mercury Verado V6 (2 x 225 hp)
              </p>
            </div>
          </div>
          
          <div className="ship-details-content-row">
             <p className="ship-details-desc">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt.
              </p>
            
            <div className="ship-details-features">
              <div className="ship-details-feature-box">
                <i className="bi bi-tag-fill ship-details-feature-icon"></i>
                <span className="ship-details-feature-label">Category: A</span>
              </div>
              <div className="ship-details-feature-box">
                <i className="bi bi-calendar-event ship-details-feature-icon"></i>
                <span className="ship-details-feature-label">2025</span>
              </div>
              <div className="ship-details-feature-box">
                <i className="bi bi-arrows-expand ship-details-feature-icon"></i>
                <span className="ship-details-feature-label">Length: 16m</span>
              </div>
              <div className="ship-details-feature-box">
                <i className="bi bi-people-fill ship-details-feature-icon"></i>
                <span className="ship-details-feature-label">10 Person</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="sd-form-grid">
            {/* Row 1: Date, Time */}
            <div
              className="sd-label"
              style={{ marginBottom: "-10px", marginTop: "10px" }}
            >
              Select date & Time
            </div>
            <div className="sd-row-2-cols">
              <div className="sd-form-field">
                <div className="sd-input-icon-wrapper">
                  <input
                    type="text"
                    name="date"
                    className="sd-input"
                    placeholder="Date"
                    value={formData.date}
                    onChange={handleInputChange}
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                  />
                  <i className="bi bi-calendar4 sd-input-icon"></i>
                </div>
              </div>
              <div className="sd-form-field">
                <div className="sd-input-icon-wrapper">
                  <input
                    type="text"
                    name="time"
                    className="sd-input"
                    placeholder="Time"
                    value={formData.time}
                    onChange={handleInputChange}
                    onFocus={(e) => (e.target.type = "time")}
                    onBlur={(e) => (e.target.type = "text")}
                  />
                  <i className="bi bi-clock sd-input-icon"></i>
                </div>
              </div>
            </div>

            {/* Row 2: Passengers */}
            <div
              className="sd-label"
              style={{ marginBottom: "-10px", marginTop: "10px" }}
            >
              Passengers
            </div>
            <div className="sd-row-2-cols">
              <div className="sd-passenger-row">
                <div className="sd-passenger-label">
                  <i className="bi bi-people-fill"></i> Adults
                </div>
                <div className="sd-passenger-controls">
                  <button
                    type="button"
                    className="sd-counter-btn"
                    onClick={() => handleCounter("adults", "decrement")}
                  >
                    -
                  </button>
                  <span className="sd-counter-value">{formData.adults}</span>
                  <button
                    type="button"
                    className="sd-counter-btn"
                    onClick={() => handleCounter("adults", "increment")}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="sd-passenger-row">
                <div className="sd-passenger-label">
                  <i className="bi bi-person-fill"></i> Children
                </div>
                <div className="sd-passenger-controls">
                  <button
                    type="button"
                    className="sd-counter-btn"
                    onClick={() => handleCounter("children", "decrement")}
                  >
                    -
                  </button>
                  <span className="sd-counter-value">{formData.children}</span>
                  <button
                    type="button"
                    className="sd-counter-btn"
                    onClick={() => handleCounter("children", "increment")}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Row 3: Marina Location & In-House Captain */}
            <div className="sd-row-2-cols">
              <div className="sd-form-field">
                <label className="sd-label">Marina Location</label>
                <div className="sd-input-icon-wrapper">
                  <input
                    type="text"
                    name="marinaLocation"
                    className="sd-input"
                    value={formData.marinaLocation}
                    onChange={handleInputChange}
                  />
                  <i className="bi bi-geo-alt-fill sd-input-icon"></i>
                </div>
              </div>
              <div className="sd-form-field">
                <label className="sd-label">In-House Captain</label>
                <div className="sd-input-icon-wrapper">
                  <input
                    type="text"
                    name="captain"
                    className="sd-input"
                    value={formData.captain}
                    onChange={handleInputChange}
                  />
                  <i className="bi bi-person-badge-fill sd-input-icon"></i>
                </div>
              </div>
            </div>

            {/* Row 4: Select Benefits & Map */}
            <div className="sd-row-2-cols">
              <div className="sd-form-field bg-white">
                <label
                  className="sd-label text-black"
                  style={{ marginTop: "10px", marginLeft: "40px" }}
                >
                  Select Benefits
                </label>
                <div className="sd-benefits-group">
                  <label className="sd-benefit-item">
                    <input
                      type="radio"
                      name="selectedBenefit"
                      value="In-House Captain"
                      checked={formData.selectedBenefit === "In-House Captain"}
                      onChange={handleInputChange}
                    />
                    In-House Captain
                  </label>
                  <label className="sd-benefit-item">
                    <input
                      type="radio"
                      name="selectedBenefit"
                      value="Camping"
                      checked={formData.selectedBenefit === "Camping"}
                      onChange={handleInputChange}
                    />
                    Camping
                  </label>
                  <label className="sd-benefit-item">
                    <input
                      type="radio"
                      name="selectedBenefit"
                      value="Late Arrival"
                      checked={formData.selectedBenefit === "Late Arrival"}
                      onChange={handleInputChange}
                    />
                    Late Arrival
                  </label>
                </div>
              </div>

              <div className="sd-form-field">
                {/* Map Section */}
                <div className="sd-map-container">
                  <MapContainer
                    center={[25.276987, 55.296249]} // Dubai coordinates
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                    zoomControl={false}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[25.276987, 55.296249]}></Marker>
                  </MapContainer>
                </div>
              </div>
            </div>

            {/* Row 5: Add-ons & Special Requests */}
            <div
              className="sd-label"
              style={{ marginBottom: "-10px", marginTop: "10px" }}
            >
              Select Add-ons
            </div>
            <div className="sd-row-2-cols" style={{ alignItems: "stretch" }}>
              <div className="sd-form-field">
                <div className="sd-addons-container">
                  <div className="sd-addons-header">
                    <div>Add-on</div>
                    <div>Price</div>
                    <div>Quantity</div>
                  </div>
                  {addOns.map((addon) => (
                    <div className="sd-addon-row" key={addon.id}>
                      <div className="sd-addon-name">
                        <input
                          checked={addon.selected}
                          onChange={() => toggleAddOn(addon.id)}
                          className="sd-checkbox"
                          type="checkbox"
                        />
                        {addon.name}
                      </div>
                      <div>{addon.price} AED</div>
                      <div
                        className="sd-passenger-controls"
                        style={{ gap: "10px" }}
                      >
                        <button
                          type="button"
                          className="sd-counter-btn"
                          style={{
                            width: "20px",
                            height: "20px",
                            fontSize: "14px",
                          }}
                          onClick={() =>
                            handleAddOnCounter(addon.id, "decrement")
                          }
                        >
                          -
                        </button>
                        <span className="sd-counter-value">
                          {addon.quantity}
                        </span>
                        <button
                          type="button"
                          className="sd-counter-btn"
                          style={{
                            width: "20px",
                            height: "20px",
                            fontSize: "14px",
                          }}
                          onClick={() =>
                            handleAddOnCounter(addon.id, "increment")
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sd-form-field">
                <div className="sd-label">Special Requests</div>
                <textarea
                  className="sd-special-req-textarea"
                  value={formData.specialRequests}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      specialRequests: e.target.value,
                    }))
                  }
                ></textarea>
              </div>
            </div>

            <button type="submit" className="sd-submit-btn">
              Book Now
            </button>
          </form>
        </div>
      </div>

      {showBookingSuccess && (
        <div className="success-overlay">
          <div className="success-modal">
            <button
              className="success-close"
              onClick={() => setShowBookingSuccess(false)}
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
            <h3 className="success-title mb-2">Boat Booked</h3>
            <h3 className="success-title">Successfully!</h3>
            <button
              className="success-primary"
              onClick={() => {
                setShowBookingSuccess(false);
                navigate("/membership");
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}
      <div>
        <div
          className="experience-header-row"
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <button
            className="back-button"
            onClick={() => navigate(-1)}
            style={{
              background: "none",
              border: "none",
              color: "white",
              fontSize: "50px",
              cursor: "pointer",
              marginRight: "15px",
            }}
          >
            <i className="bi bi-arrow-left"></i>
          </button>
          {/* Title is below */}
        </div>
        <div className="ship-thumbnails">
          <img
            src={yartShipImg1}
            alt=""
            style={{
              width: "89px",
              height: "89px",
              border: "3px solid white",
              borderRadius: "10px",
            }}
          />
          <img
            src={yartShipImg2}
            alt=""
            style={{
              width: "89px",
              height: "89px",
              border: "3px solid white",
              borderRadius: "10px",
            }}
          />
          <img
            src={yartShipImg3}
            alt=""
            style={{
              width: "89px",
              height: "89px",
              border: "3px solid white",
              borderRadius: "10px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ShipDetails;
