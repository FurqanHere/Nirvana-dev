import "../assets/css/base.css";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useNavigate, useLocation } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import membershipBgImg from "../assets/images/experiences-bg.png";
import Lottie from "lottie-react";
import successLottie from "../assets/images/Succes.json";
import "../assets/css/boat-details.css";
import yartShipImg1 from "../assets/images/ship-thumbnails1.png";
import yartShipImg2 from "../assets/images/ship-thumbnails2.png";
import yartShipImg3 from "../assets/images/ship-thumbnails3.png";
import ApiService from "../services/ApiService";
import { toast } from "react-toastify";
import { Dropdown } from "primereact/dropdown";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const ShipDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialBoatData = location.state?.boatData;
  const [boatData, setBoatData] = useState(initialBoatData || {});
  const [isFavourite, setIsFavourite] = useState(initialBoatData?.is_favourite || false);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [benefits, setBenefits] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (initialBoatData?.id) {
      const fetchBoatDetails = async () => {
        try {
          const response = await ApiService.get(`/getBoatDetails/${initialBoatData.id}`);
          if (response.data.status) {
            const details = response.data.data;
            setBoatData(prev => ({ ...prev, ...details }));
            setIsFavourite(details.is_favourite);
          }
        } catch (error) {
          console.error("Error fetching boat details:", error);
        }
      };
      fetchBoatDetails();
    }
  }, [initialBoatData?.id]);

  const toggleFavourite = async () => {
    if (!boatData?.id) return;
    
    try {
      const response = await ApiService.post("/toggleBoatFavourite", { boat_id: boatData.id });
      if (response.data.status) {
        setIsFavourite(response.data.data.is_favourite);
        // toast.success(response.data.message); // ApiService already handles errors, success toast optional
      }
    } catch (error) {
      console.error("Error toggling favourite:", error);
    }
  };

  // Booking Form State
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    adults: 1,
    children: 0,
    marinaLocation: "",
    captain: "In-House Captain",
    selectedBenefit: "",
    specialRequests: "",
  });

  const [addOns, setAddOns] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.date) {
      toast.error("Please select a date");
      return;
    }
    if (!formData.time) {
      toast.error("Please select a time");
      return;
    }
    if (formData.adults < 1) {
      toast.error("At least 1 adult is required");
      return;
    }

    const selectedAddOns = addOns
      .filter((addon) => addon.selected && addon.quantity > 0)
      .map((addon) => ({
        id: addon.id,
        quantity: addon.quantity,
      }));

    // Find location ID from selected name
    const selectedLoc = locations.find(l => l.name === formData.marinaLocation);
    const locationId = selectedLoc ? selectedLoc.id : (boatData.location_id || 5);

    try {
      const payload = new FormData();
      payload.append("boat_id", boatData.id);
      payload.append("booking_date", formData.date);
      payload.append("booking_time", formData.time);
      payload.append("adults", formData.adults);
      payload.append("children", formData.children);
      payload.append("location_id", locationId);
      payload.append("special_requests", formData.specialRequests || formData.captain);
      
      // Handle benefits
      if (formData.selectedBenefit) {
        const benefit = benefits.find(b => b.name === formData.selectedBenefit);
        if (benefit) {
          payload.append("benefit_ids[0]", benefit.id);
        }
      }

      // Handle addons as array keys
      if (selectedAddOns.length > 0) {
        selectedAddOns.forEach((addon, index) => {
          payload.append(`addons[${index}][id]`, addon.id);
          payload.append(`addons[${index}][quantity]`, addon.quantity);
        });
      }

      const response = await ApiService.post("/createBooking", payload);

      if (response.data.status) {
        setShowBookingSuccess(true);
      } else {
        toast.error(response.data.message || "Failed to create booking");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("An error occurred while creating booking");
    }
  };

  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        const response = await ApiService.get("/getBookingBenefits", {
          type: "boat",
        });
        const list = response?.data?.data?.booking_benefits || [];
        setBenefits(list);
        if (list.length > 0) {
          setFormData((prev) => ({
            ...prev,
            selectedBenefit: list[0].name || "",
          }));
        }
      } catch (error) {
        // handled globally by ApiService
      }
    };

    const fetchAddons = async () => {
      try {
        const response = await ApiService.get("/getAddons");
        const list = response?.data?.data?.addons || [];
        setAddOns(
          list.map((a) => ({
            id: a.id,
            name: a.name,
            price: Number(a.default_price) || 0,
            quantity: 0,
            selected: false,
          })),
        );
      } catch (error) {
        // handled globally by ApiService
      }
    };
    
    const fetchLocations = async () => {
      try {
        const response = await ApiService.get("/getLocations", {
          type: "orientation",
        });
        const list = response?.data?.data?.locations || [];
        setLocations(list);
      } catch (error) {
        // handled globally by ApiService
      }
    };

    fetchBenefits();
    fetchAddons();
    fetchLocations();
  }, []);

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
          <i 
            className={`bi ${isFavourite ? 'bi-heart-fill' : 'bi-heart'} ship-details-heart-icon`}
            onClick={toggleFavourite}
            style={{ cursor: 'pointer', color: isFavourite ? 'red' : 'inherit' }}
          ></i>

          <div className="ship-details-header">
            <div className="ship-details-title-section">
              <h1 className="ship-details-title">{boatData?.title || "TENDER 9 (T9)"}</h1>
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
                  <Dropdown
                    value={formData.marinaLocation}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        marinaLocation: e.value,
                      }))
                    }
                    options={locations.map((l) => ({
                      label: l.name,
                      value: l.name,
                    }))}
                    placeholder="Select Marina"
                    className="marina-dropdown-prime"
                    appendTo={typeof document !== "undefined" ? document.body : undefined}
                    style={{ width: "100%" }}
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
                  {benefits.map((b) => (
                    <label className="sd-benefit-item" key={b.id}>
                      <input
                        type="radio"
                        name="selectedBenefit"
                        value={b.name}
                        checked={formData.selectedBenefit === b.name}
                        onChange={handleInputChange}
                      />
                      {b.name}
                    </label>
                  ))}
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
                navigate("/dashboard/bookings/boat");
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
