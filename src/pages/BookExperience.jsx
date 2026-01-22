import "../assets/css/style.base.css";
import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import membershipBgImg from "../assets/images/experiences-bg.png";
import yartShipImg1 from "../assets/images/ship-thumbnails1.png";
import yartShipImg2 from "../assets/images/ship-thumbnails2.png";
import yartShipImg3 from "../assets/images/ship-thumbnails3.png";
import Lottie from "lottie-react";
import successLottie from "../assets/images/Succes.json";
import "../assets/css/book-experience.css";

const BookExperience = () => {
  const navigate = useNavigate();
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);

  // Booking Form State
  const [formData, setFormData] = useState({
    fullName: "Sheikh Bin Tamim",
    email: "sheikh@bintamim.com",
    phone: "+971 24 153 6987",
    emiratesId: "",
    promoCode: "",
    date: "",
    time: "",
    adults: 1,
    children: 0,
    captain: false,
    specialRequests: "",
  });

  const [addOns, setAddOns] = useState([
    { id: "juice", name: "Fresh Juice", price: 5, quantity: 0, selected: true },
    { id: "towel", name: "Towel", price: 10, quantity: 0, selected: false }, // Towel unchecked in Figma
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
    // Simplified validation for demo - mostly pre-filled
    setShowBookingSuccess(true);
  };

  return (
    <div
      className="book-experience-page position-relative"
      style={{
        backgroundImage: `url(${membershipBgImg})`,
        backgroundSize: "100% auto",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#16429F",
      }}
    >
      <Header />

      <div className="book-experience-container">
        <button className="be-back-btn" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left"></i>
        </button>

        <div className="book-experience-card">
          <div className="book-experience-header">
            <h1 className="book-experience-title">TENDER 9 (T9)</h1>
            <p className="book-experience-subtitle">
              Twin Mercury Verado V6 (2 x 225 hp)
            </p>
            <p className="book-experience-desc">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="be-form-grid">
            {/* Row 1: Name, Email, Phone */}
            <div className="be-row-3-cols">
              <div className="be-form-field">
                <label className="be-label">Name</label>
                <input
                  type="text"
                  name="fullName"
                  className="be-input"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="be-form-field">
                <label className="be-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="be-input"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="be-form-field">
                <label className="be-label">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  className="be-input"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Row 2: Emirates ID, Promo Code */}
            <div className="be-row-2-cols">
              <div className="be-form-field">
                <label className="be-label">Emirates Id (optional)</label>
                <input
                  type="text"
                  name="emiratesId"
                  className="be-input"
                  placeholder="784 - xxxx xxxx x"
                  value={formData.emiratesId}
                  onChange={handleInputChange}
                />
              </div>
              <div className="be-form-field">
                <label className="be-label">Promo code (optional)</label>
                <div className="be-promo-wrapper">
                  <input
                    type="text"
                    name="promoCode"
                    className="be-input be-promo-input"
                    placeholder="Enter Code"
                    value={formData.promoCode}
                    onChange={handleInputChange}
                  />
                  <button type="button" className="be-promo-btn">
                    Apply
                  </button>
                </div>
              </div>
            </div>

            {/* Row 3: Date, Time */}
            <div
              className="be-label"
              style={{ marginBottom: "-10px", marginTop: "10px" }}
            >
              Select date & Time
            </div>
            <div className="be-row-2-cols">
              <div className="be-form-field">
                <div className="be-input-icon-wrapper">
                  <input
                    type="text"
                    name="date"
                    className="be-input"
                    placeholder="Date"
                    value={formData.date}
                    onChange={handleInputChange}
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                  />
                  <i className="bi bi-calendar4 be-input-icon"></i>
                </div>
              </div>
              <div className="be-form-field">
                <div className="be-input-icon-wrapper">
                  <input
                    type="text"
                    name="time"
                    className="be-input"
                    placeholder="Time"
                    value={formData.time}
                    onChange={handleInputChange}
                    onFocus={(e) => (e.target.type = "time")}
                    onBlur={(e) => (e.target.type = "text")}
                  />
                  <i className="bi bi-clock be-input-icon"></i>
                </div>
              </div>
            </div>

            {/* Row 4: Passengers */}
            <div
              className="be-label"
              style={{ marginBottom: "-10px", marginTop: "10px" }}
            >
              Passengers
            </div>
            <div className="be-row-2-cols">
              <div className="be-passenger-row">
                <div className="be-passenger-label">
                  <i className="bi bi-people-fill"></i> Adults
                </div>
                <div className="be-passenger-controls">
                  <button
                    type="button"
                    className="be-counter-btn"
                    onClick={() => handleCounter("adults", "decrement")}
                  >
                    -
                  </button>
                  <span className="be-counter-value">{formData.adults}</span>
                  <button
                    type="button"
                    className="be-counter-btn"
                    onClick={() => handleCounter("adults", "increment")}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="be-toggle-row">
                <div className="be-toggle-label">
                  <i className="bi bi-person-badge-fill"></i> In-House Captain
                </div>
                <label className="be-toggle-switch">
                  <input
                    type="checkbox"
                    className="be-toggle-input"
                    checked={formData.captain}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        captain: e.target.checked,
                      }))
                    }
                  />
                  <span className="be-toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="be-row-2-cols">
              <div className="be-passenger-row">
                <div className="be-passenger-label">
                  <i className="bi bi-person-fill"></i> Children
                </div>
                <div className="be-passenger-controls">
                  <button
                    type="button"
                    className="be-counter-btn"
                    onClick={() => handleCounter("children", "decrement")}
                  >
                    -
                  </button>
                  <span className="be-counter-value">{formData.children}</span>
                  <button
                    type="button"
                    className="be-counter-btn"
                    onClick={() => handleCounter("children", "increment")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div></div> {/* Empty placeholder for alignment */}
            </div>

            {/* Row 5: Add-ons & Special Requests */}
            <div className="be-row-2-cols" style={{ alignItems: "stretch" }}>
              <div className="be-form-field">
                <div className="be-label">Select Add-ons</div>
                <div className="be-addons-container">
                  <div className="be-addons-header">
                    <div>Add-on</div>
                    <div>Price</div>
                    <div>Quantity</div>
                  </div>
                  {addOns.map((addon) => (
                    <div className="be-addon-row" key={addon.id}>
                      <div className="be-addon-name">
                        <input
                          checked={addon.selected}
                          onChange={() => toggleAddOn(addon.id)}
                          className="be-checkbox"
                          type="checkbox"
                          style={{
                            accentColor: "#007bff",
                            borderRadius: "50%",
                          }} // standard checkbox with color
                        />
                        {addon.name}
                      </div>
                      <div>{addon.price} AED</div>
                      <div
                        className="be-passenger-controls"
                        style={{ gap: "10px" }}
                      >
                        <button
                          type="button"
                          className="be-counter-btn"
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
                        <span className="be-counter-value">
                          {addon.quantity}
                        </span>
                        <button
                          type="button"
                          className="be-counter-btn"
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

              <div className="be-form-field">
                <div className="be-label">Special Requests</div>
                <textarea
                  className="be-special-req-textarea"
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

            <button type="submit" className="be-submit-btn">
              Submit
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
            <h3 className="success-title mb-4">Submitted Successful!</h3>
            <p className="success-subtitle">
              We have received your request, our team <br />
              will contact with you soon.
            </p>
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

export default BookExperience;
