import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Lottie from "lottie-react";
import successLottie from "../assets/images/Succes.json";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Header from "../components/Header";
import Footer from "../components/Footer";
import landingBg from "../assets/images/landingPageBg.png";
import membershipBgImg from "../assets/images/membership-bg-img.png";
import paymentBgImg from "../assets/images/payment-bg.png";
import starImg from "../assets/images/star.png";
import yartImg from "../assets/images/yart.png";
import summaryImg from "../assets/images/summary.png";
import blueTickImg from "../assets/images/blue-tick.png";
import whiteTickImg from "../assets/images/white-tick-img.png";
import whiteBgTick from "../assets/images/white-bg-tick.png";
import documentFrontImg from "../assets/images/document-front.png";
import documentBackImg from "../assets/images/document-back.png";
import uploadImg from "../assets/images/upload.png";
import personImg from "../assets/images/person-img.png";
import cameraImg from "../assets/images/camera-img.png";
import boatDetailBg from "../assets/images/boat3.png";
import boatCard1 from "../assets/images/boat1.png";
import boatCard2 from "../assets/images/boat2.png";
import boatCard3 from "../assets/images/boat3.png";
import lengthImg from "../assets/images/length.png";
import bedImg from "../assets/images/bed.png";
import personIcon from "../assets/images/person.png";
import engineImg from "../assets/images/engine.png";
import powerImg from "../assets/images/power-fan.png";
import passengerImg from "../assets/images/passenger.png";
import calendarImg from "../assets/images/calender-date.png";
import clockImg from "../assets/images/date.png";
import qrCodeImg from "../assets/images/qr-code-scan.png";
import yartShipImg from "../assets/images/yart-img.png";
import bdShipImg from "../assets/images/bs-ship.png";
import profilePic from "../assets/images/profile-pic.png";
import yellowStar from "../assets/images/yellowStar.png";
import whiteStar from "../assets/images/whiteStar.png";
import blueShip from "../assets/images/blue-ship.png";
import experiences from "../assets/images/experiences.png";
import bookingShips from "../assets/images/bookingShips.png";
import whiteBlueShip from "../assets/images/white-blue-ship.png";
import blueThumbsUp from "../assets/images/blueThumbsUp.png";
import whiteTransparentTick from "../assets/images/whiteTransparentTick-img.png";
import tenderShip from "../assets/images/tenderShip.png";
import thumbnail1 from "../assets/images/thumbnail1.png";
import thumbnail2 from "../assets/images/thumbnail2.png";
import thumbnail3 from "../assets/images/thumbnail3.png";

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

const membershipPackages = [
  {
    name: "SEALUX",
    price: "AED 1,499/",
    duration: "mo",
    benefits: [
      "10 Bookings per Month",
      "Category B Boat Access",
      "Weekdays Access",
      "1 Weekend Access per Month",
      "Session Merging (Once a Month)",
      "3 Rolling Bookings",
      "3 Free In-House Captains per Year",
      "60 Freezing Days",
    ],
  },
  {
    name: "SEA DWELLER",
    price: "AED 1,700/",
    duration: "mo",
    benefits: [
      "10 Bookings per Month",
      "Category B Boat Access",
      "Weekdays Access",
      "1 Weekend Access per Month",
      "Session Merging (Once a Month)",
      "3 Rolling Bookings",
      "3 Free In-House Captains per Year",
      "60 Freezing Days",
    ],
  },
  {
    name: "ELITE",
    price: "AED 2,500/",
    duration: "mo",
    benefits: [
      "10 Bookings per Month",
      "Category B Boat Access",
      "Weekdays Access",
      "1 Weekend Access per Month",
      "Session Merging (Once a Month)",
      "3 Rolling Bookings",
      "3 Free In-House Captains per Year",
      "60 Freezing Days",
    ],
  },
];

const boatsData = [
  {
    title: "Calma Suite 1",
    engine: "Engine: Twin Mercury V1",
    length: "Length:16m",
    image: boatCard1,
  },
  {
    title: "TENDER 9 (T9)",
    engine: "Twin Mercury Verado V6 (2 x 225 hp)",
    length: "Length:16m",
    image: boatCard2,
  },
  {
    title: "Calma Suite 3",
    engine: "Engine: Twin Mercury V1",
    length: "Length:16m",
    image: boatCard3,
  },
];

const Membership = () => {
  const [currentView, setCurrentView] = useState("packages");
  const [selectedPackage, setSelectedPackage] = useState("SEALUX");
  const [selectedFrequency, setSelectedFrequency] = useState("Annual");
  const [selectedDay, setSelectedDay] = useState(18);
  const [selectedSlot, setSelectedSlot] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAgreement, setShowAgreement] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [showUploadSuccess, setShowUploadSuccess] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("online");
  const [selectedDocType, setSelectedDocType] = useState("emiratesId");
  const [bookingTab, setBookingTab] = useState("upcoming");
  const [selectedBookingType, setSelectedBookingType] = useState("bookings");
  const [selectedMarina, setSelectedMarina] = useState("");
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  
  // Personal Details Form State
  const [personalDetails, setPersonalDetails] = useState({
    fullName: "",
    phone: "",
    nationality: "",
    emiratesId: "",
    passport: "",
  });
  const [personalDetailsErrors, setPersonalDetailsErrors] = useState({});

  // Card Information Form State
  const [cardInfo, setCardInfo] = useState({
    fullName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [cardInfoErrors, setCardInfoErrors] = useState({});

  // Booking Request Form State
  const [bookingRequest, setBookingRequest] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    emiratesId: "",
    promoCode: "",
    specialRequests: "",
  });
  const [bookingRequestErrors, setBookingRequestErrors] = useState({});

  // Edit Profile Form State
  const [editProfile, setEditProfile] = useState({
    fullName: "Baki Phillinder",
    email: "baki@phillinderzen.com",
    phone: "+971 25 146 3987",
    country: "United Arab Emirates",
  });
  const [editProfileErrors, setEditProfileErrors] = useState({});

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentView]);

  const handleButtonClick = (view) => {
    setCurrentView(view);
  };

  const handleBackToPackages = () => {
    setCurrentView("packages");
  };

  // Validation Functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const validateCardNumber = (cardNumber) => {
    const cardRegex = /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/;
    return cardRegex.test(cardNumber.replace(/\s/g, ""));
  };

  const validateExpiryDate = (expiryDate) => {
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(expiryDate)) return false;
    const [month, year] = expiryDate.split("/");
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    const expYear = parseInt(year);
    const expMonth = parseInt(month);
    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;
    return true;
  };

  const validateCVV = (cvv) => {
    return /^\d{3,4}$/.test(cvv);
  };

  const validateEmiratesID = (id) => {
    const idRegex = /^\d{3}-\d{4}-\d{7}-\d{1}$/;
    return idRegex.test(id);
  };

  // Personal Details Validation
  const validatePersonalDetails = () => {
    const errors = {};
    if (!personalDetails.fullName.trim()) {
      errors.fullName = "Full Name is required";
    }
    if (!personalDetails.phone.trim()) {
      errors.phone = "Phone Number is required";
    } else if (!validatePhone(personalDetails.phone)) {
      errors.phone = "Please enter a valid phone number";
    }
    if (!personalDetails.nationality.trim()) {
      errors.nationality = "Nationality is required";
    }
    if (!personalDetails.emiratesId.trim()) {
      errors.emiratesId = "Emirates ID is required";
    } else if (!validateEmiratesID(personalDetails.emiratesId)) {
      errors.emiratesId = "Please enter a valid Emirates ID (format: 784-xxxx-xxxxxxx-x)";
    }
    if (!personalDetails.passport.trim()) {
      errors.passport = "Passport is required";
    }
    setPersonalDetailsErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Card Information Validation
  const validateCardInfo = () => {
    const errors = {};
    if (!cardInfo.fullName.trim()) {
      errors.fullName = "Full Name is required";
    }
    if (!cardInfo.cardNumber.trim()) {
      errors.cardNumber = "Card Number is required";
    } else if (!validateCardNumber(cardInfo.cardNumber)) {
      errors.cardNumber = "Please enter a valid 16-digit card number";
    }
    if (!cardInfo.expiryDate.trim()) {
      errors.expiryDate = "Expiry Date is required";
    } else if (!validateExpiryDate(cardInfo.expiryDate)) {
      errors.expiryDate = "Please enter a valid expiry date (MM/YY)";
    }
    if (!cardInfo.cvv.trim()) {
      errors.cvv = "CVV is required";
    } else if (!validateCVV(cardInfo.cvv)) {
      errors.cvv = "Please enter a valid CVV (3-4 digits)";
    }
    setCardInfoErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Booking Request Validation
  const validateBookingRequest = () => {
    const errors = {};
    if (!bookingRequest.fullName.trim()) {
      errors.fullName = "Full Name is required";
    }
    if (!bookingRequest.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(bookingRequest.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!bookingRequest.phone.trim()) {
      errors.phone = "Phone Number is required";
    } else if (!validatePhone(bookingRequest.phone)) {
      errors.phone = "Please enter a valid phone number";
    }
    if (!bookingRequest.date.trim()) {
      errors.date = "Date is required";
    }
    if (!bookingRequest.time.trim()) {
      errors.time = "Time is required";
    }
    if (bookingRequest.emiratesId && !validateEmiratesID(bookingRequest.emiratesId)) {
      errors.emiratesId = "Please enter a valid Emirates ID (format: 784-xxxx-xxxxxxx-x)";
    }
    setBookingRequestErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Edit Profile Validation
  const validateEditProfile = () => {
    const errors = {};
    if (!editProfile.fullName.trim()) {
      errors.fullName = "Full Name is required";
    }
    if (!editProfile.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(editProfile.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!editProfile.phone.trim()) {
      errors.phone = "Phone Number is required";
    } else if (!validatePhone(editProfile.phone)) {
      errors.phone = "Please enter a valid phone number";
    }
    if (!editProfile.country.trim()) {
      errors.country = "Country is required";
    }
    setEditProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div className="membership-page">
      <Header />
      <section
        className="membership-hero"
        style={{ 
          backgroundImage: currentView === "bookingManagement" || 
                          currentView === "bookingDetail" ||
                          currentView === "userProfile" ||
                          currentView === "profileDetails" ||
                          currentView === "editProfile" ||
                          currentView === "feedback" ||
                          currentView === "notifications" ||
                          currentView === "bookingsHome" ||
                          currentView === "experiencesHome" ||
                          currentView === "bookingRequest" ||
                          currentView === "experienceDetail"
            ? "none" 
            : `url(${landingBg})` 
        }}
      ></section>

      <section
        className="membership-packages-section"
        style={{ 
          backgroundImage: currentView === "detailPage" 
            ? `url(${tenderShip})` 
            : `url(${membershipBgImg})`,
          backgroundSize: currentView === "detailPage" 
            ? "contain" 
            : "cover",
          marginTop: currentView === "bookingManagement" ||
                    currentView === "bookingDetail" ||
                    currentView === "userProfile" ||
                    currentView === "profileDetails" ||
                    currentView === "editProfile" ||
                    currentView === "feedback" ||
                    currentView === "notifications" ||
                    currentView === "bookingsHome" ||
                    currentView === "experiencesHome" ||
                    currentView === "bookingRequest" ||
                    currentView === "experienceDetail"
            ? "-916px" 
            : undefined,
          paddingTop: currentView === "experienceDetail" ? "0" : undefined
        }}
      >
        {currentView !== "schedule" &&
          currentView !== "details" &&
          currentView !== "cardInfo" &&
          currentView !== "documentUpload" &&
          currentView !== "detailPage" &&
          currentView !== "bookingManagement" &&
          currentView !== "bookingDetail" &&
          currentView !== "userProfile" &&
          currentView !== "profileDetails" &&
          currentView !== "editProfile" &&
          currentView !== "feedback" &&
          currentView !== "notifications" &&
          currentView !== "bookingsHome" &&
          currentView !== "experiencesHome" &&
          currentView !== "bookingRequest" &&
          currentView !== "experienceDetail" &&
          currentView !== "finalReview" &&
          currentView !== "paymentMethod" && (
            <div className="membership-hero-content" data-aos="fade-up">
              <p className="membership-kicker">Membership</p>
              <h1 className="membership-heading">
                {currentView === "packages"
                  ? "Select Best Package"
                  : "Select Payment Options"}
              </h1>
            </div>
          )}
        <div className="membership-packages-container">
          {currentView === "packages" ? (
            <>
              <div className="membership-cards-grid">
                {membershipPackages.map((pkg, index) => (
                  <div
                    key={pkg.name}
                    className="membership-card"
                    data-aos="fade-up"
                    data-aos-delay={index * 150}
                  >
                    <div className="membership-card-star">
                      <img src={starImg} alt="Star" />
                    </div>
                    <h3 className="membership-card-title">{pkg.name}</h3>
                    <div className="membership-card-price">
                      {pkg.price}
                      <span className="duration-text">{pkg.duration}</span>
                    </div>
                    <ul className="membership-card-benefits">
                      {pkg.benefits.map((benefit, idx) => (
                        <li key={idx}>{benefit}</li>
                      ))}
                    </ul>
                    <button
                      className="membership-card-button"
                      onClick={() => {
                        setSelectedPackage(pkg.name);
                        setCurrentView("briefing");
                      }}
                    >
                      Select Package
                    </button>
                  </div>
                ))}
              </div>

              <div className="membership-bottom-buttons">
                <button
                  className="membership-bottom-btn"
                  data-aos="fade-up"
                  data-aos-delay="450"
                  onClick={() => handleButtonClick("briefing")}
                >
                  <img src={yartImg} alt="Club Briefing" />
                  <span>Club Briefing</span>
                </button>
                <button
                  className="membership-bottom-btn"
                  data-aos="fade-up"
                  data-aos-delay="500"
                  onClick={() => handleButtonClick("summary")}
                >
                  <img src={summaryImg} alt="Club Summary" />
                  <span>Club Summary</span>
                </button>
              </div>
            </>
          ) : currentView === "schedule" ? (
            <div className="schedule-view">
              <h2 className="schedule-title">Club Briefing</h2>
              <div className="schedule-columns">
                <div className="schedule-card">
                  <div className="schedule-card-header">
                    <span role="img" aria-label="calendar">
                      <i className="bi bi-calendar-month"></i>
                    </span>
                    <span>Select date of briefing</span>
                  </div>
                  <div className="schedule-month">November 2025</div>
                  <div className="schedule-weekdays">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                      (d) => (
                        <div key={d} className="schedule-weekday">
                          {d}
                        </div>
                      )
                    )}
                  </div>
                  <div className="schedule-days">
                    {[...Array(30)].map((_, idx) => {
                      const day = idx + 1;
                      const isSelected = day === selectedDay;
                      return (
                        <button
                          type="button"
                          key={day}
                          className={`schedule-day ${
                            isSelected ? "selected" : ""
                          }`}
                          onClick={() => setSelectedDay(day)}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="schedule-card">
                  <div className="schedule-card-header">
                    <span role="img" aria-label="time">
                      ⏱️
                    </span>
                    <span>Select date of briefing</span>
                  </div>
                  <div className="schedule-date">Dec 31, 2025</div>
                  <div className="schedule-slot-label">Choose a slot</div>
                  {[
                    "8 AM - 10 AM",
                    "10 AM - 12 PM",
                    "12 PM - 2 PM",
                    "8 AM - 10 AM",
                    "12 PM - 2 PM",
                    "8 AM - 10 AM",
                  ].map((slot, idx) => {
                    const isSelected = idx === selectedSlot;
                    return (
                      <button
                        type="button"
                        key={slot + idx}
                        className={`schedule-slot ${
                          isSelected ? "selected" : ""
                        }`}
                        onClick={() => setSelectedSlot(idx)}
                      >
                        <span className="schedule-slot-text">{slot}</span>
                        <span
                          className={`schedule-slot-check ${
                            isSelected ? "selected" : ""
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="schedule-submit-wrap">
                <button
                  className="schedule-submit-btn"
                  onClick={() => setShowSuccess(true)}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="details-nav-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentView("details");
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          ) : currentView === "details" ? (
            <div className="details-section">
              <h2 className="details-heading">
                Personal Details &amp; Agreement
              </h2>
              <div className="details-card">
                <div className="details-row">
                  <div className="details-field">
                    <label>Full Name <span className="required-asterisk">*</span></label>
                    <input 
                      value={personalDetails.fullName}
                      onChange={(e) => setPersonalDetails({...personalDetails, fullName: e.target.value})}
                      className={personalDetailsErrors.fullName ? "error" : ""}
                    />
                    {personalDetailsErrors.fullName && (
                      <span className="error-message">{personalDetailsErrors.fullName}</span>
                    )}
                  </div>
                  <div className="details-field">
                    <label>Phone Number <span className="required-asterisk">*</span></label>
                    <input 
                      value={personalDetails.phone}
                      onChange={(e) => setPersonalDetails({...personalDetails, phone: e.target.value})}
                      className={personalDetailsErrors.phone ? "error" : ""}
                    />
                    {personalDetailsErrors.phone && (
                      <span className="error-message">{personalDetailsErrors.phone}</span>
                    )}
                  </div>
                </div>
                <div className="details-row">
                  <div className="details-field">
                    <label>Nationality <span className="required-asterisk">*</span></label>
                    <input 
                      value={personalDetails.nationality}
                      onChange={(e) => setPersonalDetails({...personalDetails, nationality: e.target.value})}
                      className={personalDetailsErrors.nationality ? "error" : ""}
                    />
                    {personalDetailsErrors.nationality && (
                      <span className="error-message">{personalDetailsErrors.nationality}</span>
                    )}
                  </div>
                  <div className="details-field">
                    <label>Emirates ID <span className="required-asterisk">*</span></label>
                    <input 
                      value={personalDetails.emiratesId}
                      onChange={(e) => setPersonalDetails({...personalDetails, emiratesId: e.target.value})}
                      className={personalDetailsErrors.emiratesId ? "error" : ""}
                      placeholder="784-xxxx-xxxxxxx-x"
                    />
                    {personalDetailsErrors.emiratesId && (
                      <span className="error-message">{personalDetailsErrors.emiratesId}</span>
                    )}
                  </div>
                </div>
                <div className="details-row">
                  <div className="details-field">
                    <label>Passport <span className="required-asterisk">*</span></label>
                    <input 
                      value={personalDetails.passport}
                      onChange={(e) => setPersonalDetails({...personalDetails, passport: e.target.value})}
                      className={personalDetailsErrors.passport ? "error" : ""}
                    />
                    {personalDetailsErrors.passport && (
                      <span className="error-message">{personalDetailsErrors.passport}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="details-actions">
                <button
                  className="details-btn primary"
                  onClick={() => setShowAgreement(true)}
                >
                  Sign Agreement
                </button>
                <button
                  type="button"
                  className="details-btn secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (validatePersonalDetails()) {
                      setCurrentView("finalReview");
                    }
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          ) : currentView === "finalReview" ? (
            <div className="final-review">
              <h2 className="details-heading">Final Review</h2>

              <div className="final-review-top">
                <div className="final-card primary">
                  <div className="final-primary-content">
                    <p className="final-plan-name">SEALUX</p>
                    <p className="final-plan-price">AED 1,499/mo</p>
                    <p className="final-plan-desc">
                      Primary Best Package buy for easy.
                    </p>
                  </div>
                  <div className="final-plan-check">
                    <img
                      src={whiteBgTick}
                      alt="Selected"
                      className="final-check-img"
                    />
                  </div>
                </div>

                <div className="final-right-section">
                  <div className="final-card secondary">
                    <div className="final-secondary-top">
                      <span className="final-term">Monthly</span>
                      <span className="final-secondary-price">
                        AED 2,500/mo
                      </span>
                    </div>
                    <p className="final-secondary-sub">
                      Package price × 12 (paid monthly)
                    </p>
                    <p className="final-secondary-note">
                      Refundable, One-Time 5% VAT.
                    </p>
                  </div>
                </div>
              </div>

              <div className="final-details-card">
                <div className="final-row">
                  <div className="border-bottom">
                    <p className="final-label">Full Name</p>
                    <p className="final-value">Baki Phililnder</p>
                  </div>
                  <div className="border-bottom">
                    <p className="final-label">Email</p>
                    <p className="final-value">baki@phililnderzen.com</p>
                  </div>
                </div>
                <div className="final-row">
                  <div className="border-bottom">
                    <p className="final-label">Email</p>
                    <p className="final-value">baki@phililnderzen.com</p>
                  </div>
                  <div className="border-bottom">
                    <p className="final-label">Country</p>
                    <p className="final-value">United Arab Emirates</p>
                  </div>
                </div>
                <div className="final-row">
                  <div className="border-bottom">
                    <p className="final-label">Phone Number</p>
                    <p className="final-value">+971 26 078 7961</p>
                  </div>
                  <div className="border-bottom">
                    <p className="final-label">Emirates ID</p>
                    <p className="final-value">784-2654-2578169-4</p>
                  </div>
                </div>
                <div className="final-row status-row">
                  <div className="final-status">
                    <span className="final-label">Contract Status</span>
                    <span className="final-value">Agreed</span>
                  </div>
                  <button
                    className="details-btn secondary"
                    onClick={() => setCurrentView("paymentMethod")}
                  >
                    Review Contract
                  </button>
                </div>
              </div>
            </div>
          ) : currentView === "paymentMethod" ? (
            <div className="payment-method-view">
              <h2 className="details-heading">Payment</h2>
              <div className="payment-method-card">
                <div className="payment-grid">
                  <div className="promo-block">
                    <p className="payment-label">Do you have a promocode?</p>
                    <div className="promo-input-wrapper">
                      <input
                        className="promo-input"
                        placeholder="AXHUY2"
                        defaultValue="AXHUY2"
                      />
                      <button type="button" className="promo-apply">
                        Apply
                      </button>
                    </div>
                  </div>

                  <div className="payment-method-block">
                    <p className="payment-label">Select a payment method</p>
                    <div
                      className={`pay-option ${
                        selectedPaymentMethod === "online" ? "pay-selected" : ""
                      }`}
                      onClick={() => setSelectedPaymentMethod("online")}
                    >
                      <div
                        className={`pay-radio ${
                          selectedPaymentMethod !== "online" ? "pay-off" : ""
                        }`}
                      >
                        <svg
                          className="pay-radio-check"
                          width="12"
                          height="9"
                          viewBox="0 0 12 9"
                          fill="none"
                        >
                          <path
                            d="M1 4.5L4.5 8L11 1"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="pay-label">Pay Online</span>
                      <div className="pay-icons">
                        <span className="pay-icon mastercard">MC</span>
                        <span className="pay-icon visa">VISA</span>
                        <span className="pay-icon apple">AP</span>
                        <span className="pay-icon gpay">GP</span>
                      </div>
                    </div>
                  </div>

                  <div className="payment-method-block">
                    <p className="payment-label">Select a payment method</p>
                    <div
                      className={`pay-option ${
                        selectedPaymentMethod === "cash" ? "pay-selected" : ""
                      }`}
                      onClick={() => setSelectedPaymentMethod("cash")}
                    >
                      <div
                        className={`pay-radio ${
                          selectedPaymentMethod !== "cash" ? "pay-off" : ""
                        }`}
                      >
                        <svg
                          className="pay-radio-check"
                          width="12"
                          height="9"
                          viewBox="0 0 12 9"
                          fill="none"
                        >
                          <path
                            d="M1 4.5L4.5 8L11 1"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="pay-label">
                        Cash / Cheques / Card
                        <span className="pay-sub">(at office)</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="schedule-submit-btn payment-cta"
                onClick={() => setCurrentView("cardInfo")}
              >
                Proceed to Pay
              </button>
            </div>
          ) : currentView === "cardInfo" ? (
            <div className="card-info-view">
              <h2 className="details-heading mb-5">Card Information</h2>
              <div className="details-card">
                <div className="details-row">
                  <div className="details-field">
                    <label>Full Name <span className="required-asterisk">*</span></label>
                    <input 
                      value={cardInfo.fullName}
                      onChange={(e) => setCardInfo({...cardInfo, fullName: e.target.value})}
                      className={cardInfoErrors.fullName ? "error" : ""}
                    />
                    {cardInfoErrors.fullName && (
                      <span className="error-message">{cardInfoErrors.fullName}</span>
                    )}
                  </div>
                  <div className="details-field">
                    <label>Card Number <span className="required-asterisk">*</span></label>
                    <input 
                      value={cardInfo.cardNumber}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\s/g, "").replace(/\D/g, "");
                        if (value.length > 16) value = value.slice(0, 16);
                        value = value.match(/.{1,4}/g)?.join(" ") || value;
                        setCardInfo({...cardInfo, cardNumber: value});
                      }}
                      className={cardInfoErrors.cardNumber ? "error" : ""}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                    />
                    {cardInfoErrors.cardNumber && (
                      <span className="error-message">{cardInfoErrors.cardNumber}</span>
                    )}
                  </div>
                </div>
                <div className="details-row">
                  <div className="details-field">
                    <label>Expiry Date <span className="required-asterisk">*</span></label>
                    <input 
                      value={cardInfo.expiryDate}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, "");
                        if (value.length >= 2) {
                          value = value.slice(0, 2) + "/" + value.slice(2, 4);
                        }
                        setCardInfo({...cardInfo, expiryDate: value});
                      }}
                      className={cardInfoErrors.expiryDate ? "error" : ""}
                      placeholder="MM/YY"
                      maxLength="5"
                    />
                    {cardInfoErrors.expiryDate && (
                      <span className="error-message">{cardInfoErrors.expiryDate}</span>
                    )}
                  </div>
                  <div className="details-field">
                    <label>CVV <span className="required-asterisk">*</span></label>
                    <input 
                      value={cardInfo.cvv}
                      onChange={(e) => setCardInfo({...cardInfo, cvv: e.target.value.replace(/\D/g, "")})}
                      className={cardInfoErrors.cvv ? "error" : ""}
                      placeholder="123"
                      maxLength="4"
                      type="password"
                    />
                    {cardInfoErrors.cvv && (
                      <span className="error-message">{cardInfoErrors.cvv}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="card-info-pay-container">
                <button
                  type="button"
                  className="schedule-submit-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (validateCardInfo()) {
                      setShowPaymentSuccess(true);
                    }
                  }}
                >
                  Pay
                </button>
              </div>
            </div>
          ) : currentView === "documentUpload" ? (
            <div className="document-upload-view">
              <h2 className="document-upload-title text-white">
                Document Upload
              </h2>
              <div className="document-upload-card">
                {/* Profile Image Upload */}
                <div className="profile-upload-section">
                  <div className="profile-upload-icon">
                    <img
                      src={personImg}
                      alt="Person"
                      className="profile-person-img"
                    />
                    <img
                      src={cameraImg}
                      alt="Camera"
                      className="profile-camera-img"
                    />
                  </div>
                  <p className="profile-upload-text">Upload Profile Image</p>
                </div>

                {/* Document Type Selection */}
                <div className="doc-radio-row">
                  <label className="doc-radio-label">
                    <input
                      type="radio"
                      name="docType"
                      checked={selectedDocType === "emiratesId"}
                      onChange={() => setSelectedDocType("emiratesId")}
                    />
                    <span className="doc-radio-custom"></span>
                    <span className="doc-radio-text">Emirates ID</span>
                  </label>
                  <label className="doc-radio-label">
                    <input
                      type="radio"
                      name="docType"
                      checked={selectedDocType === "passport"}
                      onChange={() => setSelectedDocType("passport")}
                    />
                    <span className="doc-radio-custom"></span>
                    <span className="doc-radio-text">Passport</span>
                  </label>
                </div>

                {/* Document Upload Grid */}
                <div className="doc-grid">
                  <div className="doc-emirates-section shadow p-4">
                    <h3 className="doc-section-title">Emirates ID</h3>
                    <div className="doc-sides-container">
                      <div className="doc-side-box">
                        <p className="doc-side-label">Front Side</p>
                        <div className="doc-image-preview">
                          <img src={documentFrontImg} alt="Front Side" />
                        </div>
                      </div>
                      <div className="doc-side-box">
                        <p className="doc-side-label">Back Side</p>
                        <div className="doc-image-preview">
                          <img src={documentBackImg} alt="Back Side" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="doc-license-section shadow p-4">
                    <h3 className="doc-section-title">Boat License</h3>
                    <div className="doc-upload-placeholder">
                      <img
                        src={uploadImg}
                        alt="Upload"
                        className="doc-upload-icon"
                      />
                      <p className="doc-upload-text">Upload License</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Submit / Detail Buttons */}
              <div className="doc-submit-container">
                <div className="doc-submit-actions">
                  <button
                    type="button"
                    className="doc-submit-btn outline"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentView("detailPage");
                    }}
                  >
                    Detail
                  </button>
                  <button
                    type="button"
                    className="doc-submit-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowUploadSuccess(true);
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          ) : currentView === "detailPage" ? (
            <div className="detail-view">
              <div className="detail-hero">
                <div className="detail-hero-blue-bg"></div>
                <div className="detail-hero-overlay" />
                <div className="detail-hero-thumbnails">
                  <img src={thumbnail1} alt="Bedroom" className="detail-thumbnail" />
                  <img src={thumbnail2} alt="Living Space" className="detail-thumbnail" />
                  <img src={thumbnail3} alt="Lounge Area" className="detail-thumbnail" />
                </div>
              </div>

              <div className="detail-card">
                <div className="detail-header">
                  <div>
                    <p className="detail-kicker">TENDER 9 (T9)</p>
                    <p className="detail-subtitle">
                      Twin Mercury Verado V6 (2 x 225 hp)
                    </p>
                  </div>
                  <div className="detail-specs">
                    {[
                      { img: lengthImg, label: "Length:16m" },
                      { img: personIcon, label: "10 Person" },
                      { img: bedImg, label: "2 Bed" },
                    ].map((item) => (
                      <div key={item.label} className="detail-spec-card">
                        <img src={item.img} alt={item.label} />
                        <p>{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="detail-description">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                  quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores eos qui ratione voluptatem sequi
                  nesciunt.
                </p>

                <div className="detail-form">
                  <div className="detail-row date-time-row">
                    <label className="detail-section-label">
                      Select date &amp; Time
                    </label>
                    <div className="detail-date-time-fields">
                      <div className="detail-input-wrapper">
                        <input placeholder="Date" className="detail-input" />
                        <img src={calendarImg} alt="Calendar" className="detail-input-icon" />
                      </div>
                      <div className="detail-input-wrapper">
                        <input placeholder="Time" className="detail-input" />
                        <img src={clockImg} alt="Clock" className="detail-input-icon" />
                      </div>
                    </div>
                  </div>

                  <div className="detail-row two">
                    <div className="detail-field">
                      <label className="detail-field-label">Adults</label>
                      <div className="detail-input-wrapper">
                        <input placeholder="MM/YY" className="detail-input" />
                        <img src={personIcon} alt="Person" className="detail-input-icon" />
                      </div>
                    </div>
                    <div className="detail-field">
                      <label className="detail-field-label">Children</label>
                      <div className="detail-input-wrapper">
                        <input placeholder="Children" className="detail-input" />
                        <img src={personIcon} alt="Person" className="detail-input-icon" />
                      </div>
                    </div>
                  </div>

                  <div className="detail-row two">
                    <div className="detail-field">
                      <label className="detail-field-label">Add Location</label>
                      <div className="detail-input-wrapper">
                        <input
                          placeholder="Enter location"
                          className="detail-input"
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
                          placeholder="Select Captain"
                          className="detail-input"
                        />
                        <i className="bi bi-person-badge detail-input-icon"></i>
                      </div>
                    </div>
                  </div>

                  <div className="detail-row options">
                    <div className="detail-options-card">
                      <label className="detail-options-title">
                        Select date &amp; Time
                      </label>
                      <div className="detail-radio-group">
                        <label className="detail-radio-label">
                          <input
                            type="radio"
                            name="captain"
                            defaultChecked
                            className="detail-radio"
                          />
                          <span>In-House Captain</span>
                        </label>
                        <label className="detail-radio-label">
                          <input
                            type="radio"
                            name="captain"
                            className="detail-radio"
                          />
                          <span>Camping</span>
                        </label>
                        <label className="detail-radio-label">
                          <input
                            type="radio"
                            name="captain"
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
                      onClick={() => setCurrentView("bookingManagement")}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : currentView === "bookingManagement" ? (
            <div className="booking-management-view">
              <h2 className="booking-management-title">Booking Management</h2>

              <div className="booking-management-header">
                <div className="booking-tabs">
                  <button
                    type="button"
                    className={`booking-tab ${
                      bookingTab === "upcoming" ? "active" : ""
                    }`}
                    onClick={() => setBookingTab("upcoming")}
                  >
                    Upcoming Booking
                  </button>
                  <button
                    type="button"
                    className={`booking-tab ${
                      bookingTab === "previous" ? "active" : ""
                    }`}
                    onClick={() => setBookingTab("previous")}
                  >
                    Previous Trip
                  </button>
                </div>
                <div className="booking-search">
                  <input
                    type="text"
                    placeholder="Search here..."
                    className="booking-search-input"
                  />
                  <span className="booking-search-icon">
                    <i class="bi bi-search"></i>
                  </span>
                </div>
              </div>

              <div className="booking-cards-grid">
                {[...Array(8)].map((_, index) => (
                  <div
                    key={index}
                    className="booking-card"
                    onClick={() => setCurrentView("bookingDetail")}
                  >
                    <div className="booking-card-image">
                      <img src={boatDetailBg} alt="Boat" />
                    </div>
                    <div className="booking-card-content">
                      <h3 className="booking-card-titl3265e">Calma Suite 1</h3>
                      <p className="booking-card-ref">Ref #:3265</p>
                      <p className="booking-card-date">
                        Dec 31, 2025 - 10 AM - 12 PM
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : currentView === "bookingDetail" ? (
            <div className="booking-detail-view">
              <h2 className="booking-detail-title">Booking Detail</h2>

              <div className="booking-detail-image-card">
                <img
                  src={bdShipImg}
                  alt="Boat"
                  className="booking-detail-image"
                />
              </div>

              <div className="booking-detail-yacht-info d-flex">
                <h3 className="booking-detail-name">Calma Suite 1</h3>
                <p className="booking-detail-ref ms-5">Ref #:3265</p>
              </div>

              <div className="booking-detail-specs">
                <div className="booking-detail-spec-item">
                  <img src={engineImg} alt="Engine" />
                  <div className="booking-detail-spec-text">
                    <span className="booking-detail-spec-label">Engine</span>
                    <span className="booking-detail-spec-value">
                      Twin Mercury V10
                    </span>
                  </div>
                </div>
                <div className="booking-detail-spec-item booking-detail-spec-item-ii">
                  <img src={yartShipImg} alt="Length" />
                  <div className="booking-detail-spec-text">
                    <span className="booking-detail-spec-label">Length</span>
                    <span className="booking-detail-spec-value">16 m</span>
                  </div>
                </div>
                <div className="booking-detail-spec-item booking-detail-spec-item-iii">
                  <img src={powerImg} alt="Power" />
                  <div className="booking-detail-spec-text">
                    <span className="booking-detail-spec-label">Power</span>
                    <span className="booking-detail-spec-value">
                      2 x 350 hp
                    </span>
                  </div>
                </div>
                <div className="booking-detail-spec-item booking-detail-spec-item-iv">
                  <img src={passengerImg} alt="Passengers" />
                  <div className="booking-detail-spec-text">
                    <span className="booking-detail-spec-label">
                      Max Passengers
                    </span>
                    <span className="booking-detail-spec-value">10 Person</span>
                  </div>
                </div>
              </div>

              <div className="booking-detail-section">
                <h4 className="booking-detail-section-title">
                  Booking Information
                </h4>
                <div className="booking-detail-info-grid">
                  <div className="booking-detail-info-fields">
                    <div className="booking-detail-info-fields-row">
                      <div className="booking-detail-info-field">
                        <img src={calendarImg} alt="Date" />
                        <div>
                          <label>Date</label>
                          <p>Dec 31, 2025</p>
                        </div>
                      </div>
                      <div className="booking-detail-info-field">
                        <img src={clockImg} alt="Time" />
                        <div>
                          <label>Date</label>
                          <p>Dec 31, 2025</p>
                        </div>
                      </div>
                    </div>
                    <div className="booking-detail-actions">
                      {/* <button 
                          type="button" 
                          className="booking-detail-btn cancel"
                          onClick={() => setCurrentView("bookingManagement")}
                        >
                        </button> */}
                      <button
                        type="button"
                        className="booking-detail-btn reschedule"
                        onClick={() => setCurrentView("userProfile")}
                      >
                        Reschedule
                      </button>
                    </div>
                  </div>
                  <div className="booking-detail-qr">
                    <img src={qrCodeImg} alt="QR Code" />
                  </div>
                </div>
              </div>
            </div>
          ) : currentView === "userProfile" ? (
            <div className="user-profile-view">
              <div className="user-profile-top">
                <div
                  className="user-profile-info"
                  onClick={() => setCurrentView("profileDetails")}
                >
                  <div className="user-profile-avatar">
                    <img src={profilePic} alt="" />
                  </div>
                  <div className="user-profile-text">
                    <h3 className="user-profile-name">Baki Phillinder</h3>
                    <p className="user-profile-email">baki@phillinderzen.com</p>
                  </div>
                </div>

                <div className="user-membership-card">
                  <div className="membership-card-content">
                    <div>
                      <h3 className="membership-card-title">ELITE</h3>
                      <p className="membership-card-desc">
                        Primary Best package
                      </p>
                    </div>
                    <div className="membership-card-right">
                      <p className="membership-card-price">AED 2,500/mo</p>
                      <button className="membership-active-btn">Active</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="user-manage-account">
                <div className="d-flex justify-content-between">
                  <h4 className="manage-account-title">Manage Account</h4>
                  <button
                    type="button"
                    className="membership-notification-btn"
                    onClick={() => setCurrentView("notifications")}
                  >
                    <i className="bi bi-bell"></i>
                  </button>
                </div>
                <div className="manage-account-menu">
                  <div className="account-menu-item">
                    <div className="account-menu-icon">
                      <i className="bi bi-person"></i>
                    </div>
                    <span>Personal Information</span>
                    <i className="bi bi-chevron-right"></i>
                  </div>
                  <div className="account-menu-item">
                    <div className="account-menu-icon">
                      <i className="bi bi-heart"></i>
                    </div>
                    <span>Favorite Yacht & Boat</span>
                    <i className="bi bi-chevron-right"></i>
                  </div>
                  <div
                    className="account-menu-item"
                    onClick={() => setCurrentView("notifications")}
                  >
                    <div className="account-menu-icon">
                      <i className="bi bi-bell"></i>
                    </div>
                    <span>Notifications</span>
                    <i className="bi bi-chevron-right"></i>
                  </div>
                  <div className="account-menu-item">
                    <div className="account-menu-icon">
                      <i className="bi bi-headset"></i>
                    </div>
                    <span>Help Center</span>
                    <i className="bi bi-chevron-right"></i>
                  </div>
                  <div className="account-menu-item">
                    <div className="account-menu-icon">
                      <i className="bi bi-lock"></i>
                    </div>
                    <span>Change Password</span>
                    <i className="bi bi-chevron-right"></i>
                  </div>
                  <div
                    className="account-menu-item"
                    onClick={() => setCurrentView("packages")}
                  >
                    <span>Logout</span>
                    <i className="bi bi-chevron-right"></i>
                  </div>
                </div>
              </div>
            </div>
          ) : currentView === "profileDetails" ? (
            <div className="profile-detail-view">
              <div className="profile-detail-header">
                <div className="profile-detail-user">
                  <div className="profile-detail-avatar">
                    <img src={profilePic} alt="" />
                  </div>
                  <div className="profile-detail-text">
                    <h3 className="profile-detail-name">Baki Phillinder</h3>
                    <p className="profile-detail-email">
                      baki@phillinderzen.com
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="profile-detail-edit-btn"
                  onClick={() => setCurrentView("editProfile")}
                >
                  <i className="bi bi-pencil"></i>
                  <span>Edit Profile</span>
                </button>
              </div>

              <div className="profile-detail-fields">
                <div className="profile-detail-field">
                  <div className="profile-detail-label">Email</div>
                  <div className="profile-detail-value">
                    baki@phillinderzen.com
                  </div>
                </div>
                <div className="profile-detail-field">
                  <div className="profile-detail-label">Phone Number</div>
                  <div className="profile-detail-value">+971 26 078 7961</div>
                </div>
                <div className="profile-detail-field">
                  <div className="profile-detail-label">Country</div>
                  <div className="profile-detail-value">
                    United Arab Emirates
                  </div>
                </div>
                <div className="profile-detail-field">
                  <div className="profile-detail-label">Gender</div>
                  <div className="profile-detail-value">Female</div>
                </div>
              </div>
            </div>
          ) : currentView === "editProfile" ? (
            <div className="edit-profile-view">
              <div className="edit-profile-header">
                <div className="edit-profile-avatar-wrapper">
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="edit-profile-avatar"
                  />
                  <div className="edit-profile-camera">
                    <i className="bi bi-camera-fill"></i>
                  </div>
                </div>
                <div className="edit-profile-text">
                  <h3 className="edit-profile-title">Edit Profile</h3>
                  <p className="edit-profile-subtitle">Change Profile Image</p>
                </div>
              </div>

              <div className="edit-profile-form">
                <div className="edit-profile-row">
                  <div className="edit-profile-field">
                    <label className="edit-profile-label">Full Name <span className="required-asterisk">*</span></label>
                    <input
                      className={`edit-profile-input ${editProfileErrors.fullName ? "error" : ""}`}
                      value={editProfile.fullName}
                      onChange={(e) => setEditProfile({...editProfile, fullName: e.target.value})}
                    />
                    {editProfileErrors.fullName && (
                      <span className="error-message">{editProfileErrors.fullName}</span>
                    )}
                  </div>
                  <div className="edit-profile-field">
                    <label className="edit-profile-label">Email <span className="required-asterisk">*</span></label>
                    <input
                      className={`edit-profile-input ${editProfileErrors.email ? "error" : ""}`}
                      value={editProfile.email}
                      onChange={(e) => setEditProfile({...editProfile, email: e.target.value})}
                    />
                    {editProfileErrors.email && (
                      <span className="error-message">{editProfileErrors.email}</span>
                    )}
                  </div>
                </div>

                <div className="edit-profile-row">
                  <div className="edit-profile-field">
                    <label className="edit-profile-label">Phone Number <span className="required-asterisk">*</span></label>
                    <input
                      className={`edit-profile-input ${editProfileErrors.phone ? "error" : ""}`}
                      value={editProfile.phone}
                      onChange={(e) => setEditProfile({...editProfile, phone: e.target.value})}
                    />
                    {editProfileErrors.phone && (
                      <span className="error-message">{editProfileErrors.phone}</span>
                    )}
                  </div>
                  <div className="edit-profile-field">
                    <label className="edit-profile-label">Country <span className="required-asterisk">*</span></label>
                    <input
                      className={`edit-profile-input ${editProfileErrors.country ? "error" : ""}`}
                      value={editProfile.country}
                      onChange={(e) => setEditProfile({...editProfile, country: e.target.value})}
                    />
                    {editProfileErrors.country && (
                      <span className="error-message">{editProfileErrors.country}</span>
                    )}
                  </div>
                </div>

                <div className="edit-profile-actions">
                  <button
                    type="button"
                    className="edit-profile-save-btn"
                    onClick={() => {
                      if (validateEditProfile()) {
                        setCurrentView("feedback");
                      }
                    }}
                  >
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
          ) : currentView === "feedback" ? (
            <div className="feedback-view">
              <h2 className="feedback-title">Reviews &amp; Feedback</h2>
              <p className="feedback-question">
                How would you rate the overall experience of our App?
              </p>
              <div className="feedback-stars">
                <span className="star active">
                  <img src={yellowStar} alt="" />
                </span>
                <span className="star">
                  <img src={whiteStar} alt="" />
                </span>
                <span className="star">
                  <img src={whiteStar} alt="" />
                </span>
                <span className="star">
                  <img src={whiteStar} alt="" />
                </span>
                <span className="star">
                  <img src={whiteStar} alt="" />
                </span>
              </div>
              <div className="feedback-form">
                <label className="feedback-label">Can you tell us more?</label>
                <textarea
                  className="feedback-textarea"
                  defaultValue="We’d love to hear more!"
                />
              </div>
              <div className="feedback-actions">
                <button
                  type="button"
                  className="feedback-btn primary"
                  onClick={() => setCurrentView("bookingsHome")}
                >
                  Submit
                </button>
                <button type="button" className="feedback-btn outline">
                  Cancel
                </button>
              </div>
            </div>
          ) : currentView === "notifications" ? (
            <div className="notifications-view">
              <div className="notifications-card">
                <h2 className="notifications-title">Notifications</h2>
                <div className="notifications-list">
                  {[
                    {
                      headline: "Package Successful",
                      description:
                        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo invent veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
                      timestamp: "21 Feb - 08:53 AM",
                    },
                    {
                      headline: "Package Successful",
                      description:
                        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo invent veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
                      timestamp: "21 Feb - 08:53 AM",
                    },
                    {
                      headline: "Package Successful",
                      description:
                        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo invent veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
                      timestamp: "21 Feb - 08:53 AM",
                    },
                    {
                      headline: "Package Successful",
                      description:
                        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo invent veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
                      timestamp: "21 Feb - 08:53 AM",
                    },
                  ].map((notification, index) => (
                    <div key={index} className="notification-item">
                      <div className="notification-header">
                        <h3 className="notification-headline">
                          {notification.headline}
                        </h3>
                        <span className="notification-indicator"></span>
                      </div>
                      <p className="notification-description">
                        {notification.description}
                      </p>
                      <p className="notification-timestamp">
                        {notification.timestamp}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : currentView === "bookingsHome" ? (
            <div className="bookings-home-view">
              {/* Hero Image Section */}
              <div className="bookings-hero-section">
                <img
                  src={bdShipImg}
                  alt="Luxury Yacht"
                  className="bookings-hero-image"
                />
              </div>

              {/* Interactive Elements Section */}
              <div className="bookings-interactive-section">
                <div className="bookings-type-buttons">
                  <button
                    type="button"
                    className={`bookings-type-btn ${
                      selectedBookingType === "bookings" ? "active" : ""
                    }`}
                    onClick={() => {
                      setSelectedBookingType("bookings");
                      setCurrentView("bookingsHome");
                    }}
                  >
                    <img
                      src={blueShip}
                      className="bookings-type-btn-img"
                      alt=""
                    />
                    <span>Bookings</span>
                  </button>
                  <button
                    type="button"
                    className={`bookings-type-btn ${
                      selectedBookingType === "experiences" ? "active" : ""
                    }`}
                    onClick={() => {
                      setSelectedBookingType("experiences");
                      setCurrentView("experiencesHome");
                    }}
                  >
                    <img
                      src={experiences}
                      className="bookings-type-experiences-img "
                      alt=""
                    />
                    <span>Experiences</span>
                  </button>
                </div>
                <div className="bookings-marina-select">
                  <select
                    className="marina-dropdown"
                    value={selectedMarina}
                    onChange={(e) => setSelectedMarina(e.target.value)}
                  >
                    <option value="">Select Marina</option>
                    <option value="marina1">Marina 1</option>
                    <option value="marina2">Marina 2</option>
                    <option value="marina3">Marina 3</option>
                  </select>
                </div>
              </div>

              {/* Boat Listings Grid */}
              <div className="bookings-listings-grid">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="bookings-listing-card">
                    <div className="bookings-listing-image">
                      <img src={bookingShips} alt="Boat" />
                    </div>
                    <div className="bookings-listing-content">
                      <h3 className="bookings-listing-title">Calma Suite 1</h3>
                      <p className="bookings-listing-ref">Ref #:3265</p>
                      <p className="bookings-listing-date">
                        Dec 31, 2025 - 10 AM - 12 PM
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : currentView === "experiencesHome" ? (
            <div className="experiences-home-view">
              {/* Hero Image Section */}
              <div className="experiences-hero-section">
                <img
                  src={bdShipImg}
                  alt="Luxury Yacht"
                  className="experiences-hero-image"
                />
              </div>

              {/* Interactive Elements Section */}
              <div className="experiences-interactive-section">
                <div className="experiences-type-buttons">
                  <button
                    type="button"
                    className={`experiences-type-btn gap-0 ${
                      selectedBookingType === "bookings" ? "active" : ""
                    }`}
                    onClick={() => {
                      setSelectedBookingType("bookings");
                      setCurrentView("bookingsHome");
                    }}
                  >
                    <img
                      src={whiteBlueShip}
                      className="bookings-type-experiences-img bookings-type-experiences-img-ii"
                      alt=""
                    />
                    <span>Bookings</span>
                  </button>
                  <button
                    type="button"
                    className={`experiences-type-btn ${
                      selectedBookingType === "experiences" ? "active" : ""
                    }`}
                    onClick={() => {
                      setSelectedBookingType("experiences");
                      setCurrentView("experiencesHome");
                    }}
                  >
                    <img
                      src={blueThumbsUp}
                      className="bookings-type-experiences-img"
                      alt=""
                    />
                    <span>Experiences</span>
                  </button>
                </div>
                <div className="experiences-marina-select">
                  <select
                    className="marina-dropdown"
                    value={selectedMarina}
                    onChange={(e) => setSelectedMarina(e.target.value)}
                  >
                    <option value="">Select Marina</option>
                    <option value="marina1">Marina 1</option>
                    <option value="marina2">Marina 2</option>
                    <option value="marina3">Marina 3</option>
                  </select>
                </div>
              </div>

              {/* Boat Listings */}
              <div className="experiences-listings-grid">
                {[...Array(6)].map((_, index) => {
                  const boat = boatsData[index % boatsData.length];
                  return (
                    <div key={index} className="experiences-listing-card">
                      <div className="experiences-listing-image">
                        <img src={boat.image} alt={boat.title} />
                        <div className="experiences-listing-content">
                          <h3 className="experiences-listing-title">
                            {boat.title}
                          </h3>
                          <p className="experiences-listing-engine">
                            {boat.engine}
                          </p>
                          <p className="experiences-listing-length">
                            {boat.length}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="experiences-book-btn"
                        onClick={() => setCurrentView("bookingRequest")}
                      >
                        Book Now
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : currentView === "bookingRequest" ? (
            <div className="booking-request-view">
              <div className="booking-request-card">
                <h2 className="booking-request-title">Booking Request</h2>

                <form
                  className="booking-request-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (validateBookingRequest()) {
                      setShowBookingSuccess(true);
                    }
                  }}
                >
                  <div className="booking-form-columns">
                    {/* Left Column */}
                    <div className="booking-form-column">
                      <div className="booking-form-field">
                        <label className="booking-form-label">Full Name <span className="required-asterisk">*</span></label>
                        <input
                          type="text"
                          className={`booking-form-input ${bookingRequestErrors.fullName ? "error" : ""}`}
                          placeholder="Sheikh Bin Tamim"
                          value={bookingRequest.fullName}
                          onChange={(e) => setBookingRequest({...bookingRequest, fullName: e.target.value})}
                        />
                        {bookingRequestErrors.fullName && (
                          <span className="error-message">{bookingRequestErrors.fullName}</span>
                        )}
                      </div>

                      <div className="booking-form-field">
                        <label className="booking-form-label">Email <span className="required-asterisk">*</span></label>
                        <input
                          type="email"
                          className={`booking-form-input ${bookingRequestErrors.email ? "error" : ""}`}
                          placeholder="sheikh@bintamim.com"
                          value={bookingRequest.email}
                          onChange={(e) => setBookingRequest({...bookingRequest, email: e.target.value})}
                        />
                        {bookingRequestErrors.email && (
                          <span className="error-message">{bookingRequestErrors.email}</span>
                        )}
                      </div>

                      <div className="booking-form-field">
                        <label className="booking-form-label">Date <span className="required-asterisk">*</span></label>
                        <input
                          type="text"
                          className={`booking-form-input ${bookingRequestErrors.date ? "error" : ""}`}
                          placeholder="Select Date"
                          value={bookingRequest.date}
                          onChange={(e) => setBookingRequest({...bookingRequest, date: e.target.value})}
                        />
                        {bookingRequestErrors.date && (
                          <span className="error-message">{bookingRequestErrors.date}</span>
                        )}
                      </div>

                      <div className="booking-form-field">
                        <label className="booking-form-label">
                          Promo code (optional)
                        </label>
                        <div className="booking-promo-wrapper">
                          <input
                            type="text"
                            className="booking-form-input booking-promo-input"
                            placeholder="Enter Code"
                            value={bookingRequest.promoCode}
                            onChange={(e) => setBookingRequest({...bookingRequest, promoCode: e.target.value})}
                          />
                          <button
                            type="button"
                            className="booking-promo-apply-btn"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="booking-form-column">
                      <div className="booking-form-field">
                        <label className="booking-form-label">Phone Number <span className="required-asterisk">*</span></label>
                        <input
                          type="tel"
                          className={`booking-form-input ${bookingRequestErrors.phone ? "error" : ""}`}
                          placeholder="+971 24 153 6987"
                          value={bookingRequest.phone}
                          onChange={(e) => setBookingRequest({...bookingRequest, phone: e.target.value})}
                        />
                        {bookingRequestErrors.phone && (
                          <span className="error-message">{bookingRequestErrors.phone}</span>
                        )}
                      </div>

                      <div className="booking-form-field">
                        <label className="booking-form-label">
                          Emirates Id (optional)
                        </label>
                        <input
                          type="text"
                          className={`booking-form-input ${bookingRequestErrors.emiratesId ? "error" : ""}`}
                          placeholder="784-xxxx-xxxxxxx-x"
                          value={bookingRequest.emiratesId}
                          onChange={(e) => setBookingRequest({...bookingRequest, emiratesId: e.target.value})}
                        />
                        {bookingRequestErrors.emiratesId && (
                          <span className="error-message">{bookingRequestErrors.emiratesId}</span>
                        )}
                      </div>

                      <div className="booking-form-field">
                        <label className="booking-form-label">Time <span className="required-asterisk">*</span></label>
                        <input
                          type="text"
                          className={`booking-form-input ${bookingRequestErrors.time ? "error" : ""}`}
                          placeholder="Select Time"
                          value={bookingRequest.time}
                          onChange={(e) => setBookingRequest({...bookingRequest, time: e.target.value})}
                        />
                        {bookingRequestErrors.time && (
                          <span className="error-message">{bookingRequestErrors.time}</span>
                        )}
                      </div>

                      <div className="booking-form-field">
                        <label className="booking-form-label">
                          Special Requests
                        </label>
                        <textarea
                          className="booking-form-textarea"
                          placeholder="Enter Text"
                          rows="4"
                          value={bookingRequest.specialRequests}
                          onChange={(e) => setBookingRequest({...bookingRequest, specialRequests: e.target.value})}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="booking-form-submit-container">
                    <button type="submit" className="booking-form-submit-btn">
                      Submit
                    </button>
                    <button
                      type="button"
                      className="booking-form-view-experience-btn"
                      onClick={() => setCurrentView("experienceDetail")}
                    >
                      View Experience
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : currentView === "experienceDetail" ? (
            <div className="experience-detail-view">
              {/* Hero Section */}
              <div className="experience-hero-section">
                <div className="experience-hero-bg"></div>

                {/* Information Card Overlay */}
                <div className="experience-info-card">
                  <h1 className="experience-info-title">
                    Enjoy Birthday Party for group of 10
                  </h1>
                  <p className="experience-info-description">
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo. Nemo
                    enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                    aut fugit, sed quia consequuntur magni dolores eos qui
                    ratione voluptatem sequi nesciunt. Neque porro quisquam est,
                    qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
                    velit, sed quia non numquam eius modi tempora incidunt ut
                    labore et dolore magnam aliquam quaerat voluptatem. Ut enim
                    ad minima veniam, quis nostrum exercitationem ullam corporis
                    suscipit laboriosam, nisi ut aliquid ex ea commodi
                    consequatur? Quis autem vel eum iure reprehenderit qui in ea
                    voluptate velit esse quam nihil molestiae consequatur, vel
                    illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                  </p>

                  <div className="experience-details">
                    <div className="experience-detail-item">
                      <img src={ yartShipImg } className="enjoyYart" alt="" />
                      <div className="experience-detail-text">
                        <span className="experience-detail-label">Boat</span>
                        <span className="experience-detail-sub">
                          Subject to availability
                        </span>
                      </div>
                    </div>
                    <div className="experience-detail-item">
                      <img src={ passengerImg } className="passengerImg" alt="" />
                      <div className="experience-detail-text">
                        <span className="experience-detail-label">10</span>
                        <span className="experience-detail-sub">
                          Max Passengers
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="w-100 d-flex justify-content-center align-items-center">
                  <button
                    type="button"
                    className="experience-book-btn"
                    onClick={() => setCurrentView("bookingRequest")}
                  >
                    Book Experience
                  </button>
                  </div>
                </div>

                {/* Thumbnail Images */}
                {/* <div className="experience-thumbnails">
                  <div className="experience-thumbnail">
                    <img src={boatCard1} alt="Bedroom" />
                  </div>
                  <div className="experience-thumbnail">
                    <img src={boatCard2} alt="Kitchen" />
                  </div>
                  <div className="experience-thumbnail">
                    <img src={boatCard3} alt="Lounge" />
                  </div>
                </div> */}
              </div>
            </div>
          ) : (
            <div className="payment-options-container">
              {/* Selected Package Card */}
              <div
                className="selected-package-card"
                style={{ backgroundImage: `url(${paymentBgImg})` }}
              >
                <div className="selected-package-info">
                  <div>
                    <h3 className="selected-package-name">{selectedPackage}</h3>
                    <p className="selected-package-label">
                      Primary Best package
                    </p>
                  </div>
                  <div className="selected-package-price">AED 1,499/mo</div>
                  <div className="selected-package-checkmark">
                    <img src={blueTickImg} alt="" />
                  </div>
                </div>
              </div>

              {/* Payment Frequency Options */}
              <div className="payment-frequency-grid">
                <div
                  className={`payment-frequency-card ${
                    selectedFrequency === "Monthly" ? "selected" : ""
                  }`}
                  onClick={() => setSelectedFrequency("Monthly")}
                >
                  <div className="frequency-info">
                    <div className="frequency-header">
                      <h4 className="frequency-name">Monthly</h4>
                      <p className="frequency-price">AED 2,500/mo</p>
                    </div>
                    <p className="frequency-details">
                      Package price × 12 (paid monthly)
                    </p>
                    <div className="frequency-footer">
                      <p className="frequency-note">
                        Refundable, One-Time 5% VAT.
                      </p>
                      <div className="frequency-radio">
                        <input
                          type="radio"
                          name="frequency"
                          checked={selectedFrequency === "Monthly"}
                          onChange={() => setSelectedFrequency("Monthly")}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`payment-frequency-card ${
                    selectedFrequency === "Semi-Annual" ? "selected" : ""
                  }`}
                  onClick={() => setSelectedFrequency("Semi-Annual")}
                >
                  <div className="frequency-info">
                    <div className="frequency-header">
                      <h4 className="frequency-name">Semi-Annual</h4>
                      <p className="frequency-price">AED 2,500/mo</p>
                    </div>
                    <p className="frequency-details">Two payments</p>
                    <div className="frequency-footer">
                      <p className="frequency-note">
                        Refundable, One-Time 5% VAT.
                      </p>
                      <div className="frequency-radio">
                        <input
                          type="radio"
                          name="frequency"
                          checked={selectedFrequency === "Semi-Annual"}
                          onChange={() => setSelectedFrequency("Semi-Annual")}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`payment-frequency-card ${
                    selectedFrequency === "Annual" ? "selected" : ""
                  }`}
                  onClick={() => setSelectedFrequency("Annual")}
                >
                  <div className="frequency-info">
                    <div className="frequency-header">
                      <h4 className="frequency-name">Annual</h4>
                      <p className="frequency-price">AED 2,500/mo</p>
                    </div>
                    <p className="frequency-details">One full payment</p>
                    <div className="frequency-footer">
                      <p className="frequency-note">
                        Refundable, One-Time 5% VAT.
                      </p>
                      <div className="frequency-radio">
                        <input
                          type="radio"
                          name="frequency"
                          checked={selectedFrequency === "Annual"}
                          onChange={() => setSelectedFrequency("Annual")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Continue Button */}
              <div className="payment-continue-container">
                <button
                  type="button"
                  className="payment-continue-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentView("schedule");
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {showSuccess && (
        <div className="success-overlay">
          <div className="success-modal">
            <button
              className="success-close"
              onClick={() => setShowSuccess(false)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="success-icon">
              <div className="success-icon-circle">
                <Lottie animationData={successLottie} loop={false} style={{ width: '142px', height: '142px' }} />
              </div>
            </div>
            <h3 className="success-title">Successful!</h3>
            <p className="success-subtitle">
              You have scheduled your club briefing successfully
            </p>
            <div className="success-details">
              <div className="success-detail-title">Date &amp; Time</div>
              <div className="success-detail-value">
                Dec 31, 2025 – 10 AM – 12 PM
              </div>
              <div className="success-detail-ref">Ref #: 3265</div>
            </div>
            <button
              className="success-primary"
              onClick={() => {
                setShowSuccess(false);
                setCurrentView("packages");
              }}
            >
              Back to Packages
            </button>
          </div>
        </div>
      )}

      {showPaymentSuccess && (
        <div className="success-overlay">
          <div className="success-modal">
            <button
              className="success-close"
              onClick={() => setShowPaymentSuccess(false)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="success-icon">
              <div className="success-icon-circle">
                <Lottie animationData={successLottie} loop={false} style={{ width: '142px', height: '142px' }} />
              </div>
            </div>
            <h3 className="success-title">Payment Successful</h3>
            <p className="success-subtitle">SEALUX ฿ 1,499</p>
            <div className="success-details">
              <div className="success-detail-title">Date &amp; Time</div>
              <div className="success-detail-value">
                Dec 31, 2025 – 10 AM – 12 PM
              </div>
              <div className="success-detail-ref">Payment Ref #:3265</div>
            </div>
            <div className="success-actions">
              <button
                className="success-secondary"
                onClick={() => {
                  setShowPaymentSuccess(false);
                  setCurrentView("documentUpload");
                }}
              >
                View Invoice
              </button>
              <button
                className="success-primary"
                onClick={() => {
                  setShowPaymentSuccess(false);
                  setCurrentView("packages");
                }}
              >
                Back to Packages
              </button>
            </div>
          </div>
        </div>
      )}

      {showUploadSuccess && (
        <div className="success-overlay">
          <div className="success-modal">
            <button
              className="success-close"
              onClick={() => setShowUploadSuccess(false)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="success-icon">
              <div className="success-icon-circle">
                <Lottie animationData={successLottie} loop={false} style={{ width: '142px', height: '142px' }} />
              </div>
            </div>
            <h3 className="success-title">Successful</h3>
            <p className="success-subtitle">
              Your payment has been done successfully to <br /> check this you
              can visit the order page
            </p>
            <button
              className="success-primary"
              onClick={() => {
                setShowUploadSuccess(false);
                setCurrentView("packages");
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}

      {showAgreement && (
        <div className="agreement-overlay">
          <div className="agreement-modal">
            <button
              className="agreement-close"
              onClick={() => setShowAgreement(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="agreement-title">Review Contract</h3>
            <ul className="agreement-list">
              <li>
                Membership is valid for personal use only &amp; cannot be
                transferred or shared.
              </li>
              <li>All payments are non-refundable once processed.</li>
              <li>
                Members must maintain accurate account and payment information.
              </li>
              <li>
                The company reserves the right to modify or discontinue services
                with prior notice.
              </li>
              <li>
                Misuse, abuse, or fraudulent activity may result in suspension
                or termination.
              </li>
              <li>
                Renewal is automatic unless cancelled before the next billing
                cycle.
              </li>
              <li>
                By joining, you agree to our Privacy Policy and Terms of
                Service.
              </li>
            </ul>
            <label className="agreement-toggle-row">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              <span className="agreement-toggle-slider" aria-hidden="true" />
              <span className="agreement-toggle-text">
                John Cary agree with membership terms
              </span>
            </label>
            <button
              className="agreement-save"
              onClick={() => {
                setShowAgreement(false);
                setShowSuccess(true);
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}

      {showBookingSuccess && (
        <div className="booking-success-overlay">
          <div className="booking-success-modal">
            <button
              className="booking-success-close"
              onClick={() => setShowBookingSuccess(false)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="booking-success-icon">
              <div className="booking-success-icon-circle">
                <Lottie animationData={successLottie} loop={false} style={{ width: '142px', height: '142px' }} />
              </div>
            </div>
            <h3 className="booking-success-title">Submitted Successful!</h3>
            <p className="booking-success-message">
              We have received your request, our team <br /> will contact with
              you soon.
            </p>
            <button
              className="booking-success-ok-btn"
              onClick={() => setShowBookingSuccess(false)}
            >
              Ok
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Membership;
