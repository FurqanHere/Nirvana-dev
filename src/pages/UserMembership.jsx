import "../assets/css/style.base.css";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Lottie from "lottie-react";
import successLottie from "../assets/images/Succes.json";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import ApiService from "../services/ApiService";
import { toast } from "react-toastify";

import landingBg from "../assets/images/landingPageBg.png";
import membershipBgImg from "../assets/images/main-yact-bg.png";

import yartImg from "../assets/images/yart.png";
import summaryImg from "../assets/images/summary.png";

import whiteStrap from "../assets/images/white-strap.png";
import yellowStrap from "../assets/images/yellow-strap.png";
import grayStar from "../assets/images/gray-star.png";
import whiteStarIcon from "../assets/images/white-star.png";
import yellowStar from "../assets/images/yellow-star.png";

import boatDetailBg from "../assets/images/boat3.png";
import boatCard1 from "../assets/images/boat1.png";
import boatCard2 from "../assets/images/boat2.png";
import boatCard3 from "../assets/images/boat3.png";

import engineImg from "../assets/images/engine.png";
import powerImg from "../assets/images/power-fan.png";
import passengerImg from "../assets/images/passenger.png";
import calendarImg from "../assets/images/calender-date.png";

import qrCodeImg from "../assets/images/qr-code-scan.png";
import yartShipImg from "../assets/images/yart-img.png";
import bdShipImg from "../assets/images/bs-ship.png";
import profilePic from "../assets/images/profile-pic.png";
import whiteStar from "../assets/images/whiteStar.png";
import blueShip from "../assets/images/blue-ship.png";
import experiences from "../assets/images/experiences.png";
import bookingShips from "../assets/images/bookingShips.png";
import whiteBlueShip from "../assets/images/white-blue-ship.png";
import blueThumbsUp from "../assets/images/blueThumbsUp.png";
import tenderShip from "../assets/images/tenderShip.png";

import PersonalDetail from "../components/personalDetail";
import SelectPaymentOptions from "../components/selectPaymentOptions";
import FinalReview from "../components/FinalReview";
import Payment from "../components/Payment";
import InsertCardDetails from "../components/InsertCardDetails";
import Document from "../components/Document";
import OrientationScreen from "../components/OrientationScreen";
import ClubBriefing from "../components/ClubBriefing";
import Notifications from "../components/Dashboard/Profile/Notifications";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});


const boatsData = [
  {
    title: "250 DAUNTLESS #2",
    engine: "Twin Mercury V6 (2 X 225 hp)",
    length: "",
    image: boatCard1,
  },
  {
    title: "250 DAUNTLESS #3",
    engine: "Mercury V8 (300 hp)",
    length: "",
    image: boatCard2,
  },
  {
    title: "250 DAUNTLESS #1",
    engine: "Mercury F115 (115 hp)",
    length: "",
    image: boatCard3,
  },
];

const Membership = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await ApiService.get("/getPackages");
        if (response.data.status) {
          setPackages(response.data.data.packages);
        }
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchPackages();
  }, []);

  const handleBuyPackage = (pkg) => {
    const user = localStorage.getItem("user");
    if (!user) {
      toast.info("Please login to purchase a package");
      navigate("/login", {
        state: {
          from: "/membership",
          selectedPackage: pkg.name,
        },
      });
      return;
    }

    setSelectedPackage(pkg.name);
    setCurrentView("selectPayment");
  };

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
  const [showOrientationSuccess, setShowOrientationSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [logoutLoading, setLogoutLoading] = useState(false);

  // Personal Details Form State
  const [personalDetails, setPersonalDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    nationality: "",
    emiratesId: "",
    passport: "",
  });
  const [personalDetailsErrors, setPersonalDetailsErrors] = useState({});

  useEffect(() => {
    if (location.state?.showFinalReview) {
      if (location.state.personalDetails) {
        setPersonalDetails(location.state.personalDetails);
      }
      if (location.state.package) {
        setSelectedPackage(location.state.package.name || location.state.package);
      }
      setCurrentView("finalReview");
    }
  }, [location.state]);

  // Card Information Form State
  const [cardInfo, setCardInfo] = useState({
    fullName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [cardInfoErrors, setCardInfoErrors] = useState({});

  const handleLogout = async (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setLogoutLoading(true);
    try {
      const response = await ApiService.post("/logout");
      if (response.data.status) {
        toast.success(response.data.message || "Logged out successfully");
      }
    } catch (error) {
      console.error("Logout Error:", error);
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
      setIsLoggedIn(false);
      navigate("/login", { replace: true });
      setLogoutLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setIsLoggedIn(true);
        try {
          const parsedUser = JSON.parse(storedUser);
          setUserInfo(parsedUser);
        } catch (e) {
          console.error("Error parsing user data", e);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (location.state?.selectedPackage) {
      setIsLoggedIn(true);
      setSelectedPackage(location.state.selectedPackage);
      setCurrentView("schedule");
      navigate(location.pathname, { replace: true, state: {} });
    } else if (location.state?.fromAuth) {
      setIsLoggedIn(true);
      navigate(location.pathname, { replace: true, state: {} });
    } else if (location.state?.showFinalReview) {
      setIsLoggedIn(true);
      setCurrentView("finalReview");
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentView]);

  const handleButtonClick = (view) => {
    setCurrentView(view);
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
    if (!personalDetails.email || !personalDetails.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalDetails.email)) {
      errors.email = "Please enter a valid email address";
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
      errors.emiratesId =
        "Please enter a valid Emirates ID (format: 784-xxxx-xxxxxxx-x)";
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

  const handleCardFullNameChange = (e) => {
    setCardInfo({ ...cardInfo, fullName: e.target.value });
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\s/g, "").replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    value = value.match(/.{1,4}/g)?.join(" ") || value;
    setCardInfo({ ...cardInfo, cardNumber: value });
  };

  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }
    setCardInfo({ ...cardInfo, expiryDate: value });
  };

  const handleCvvChange = (e) => {
    setCardInfo({
      ...cardInfo,
      cvv: e.target.value.replace(/\D/g, ""),
    });
  };

  const handleCardPayClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (validateCardInfo()) {
       setShowPaymentSuccess(true);
    }
  };

  const handlePaymentProceed = async () => {
    const pkg = packages.find((p) => p.name === selectedPackage);
    if (!pkg) {
      toast.error("Package not found");
      return;
    }

    try {
      const payload = {
        package_id: pkg.id,
        term: selectedFrequency.toLowerCase().replace("-", "_"),
        payment_method: selectedPaymentMethod === "online" ? "card" : "cash",
      };
      
      const response = await ApiService.post("/buyPackage", payload);
      if (response.data.status) {
        toast.success(response.data.message || "Package subscription created successfully.");
        if (selectedPaymentMethod === "online") {
          setCurrentView("cardInfo");
        } else {
          setShowPaymentSuccess(true);
        }
      } else {
        toast.error(response.data.message || "Failed to create subscription");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Error creating subscription"
      );
    }
  };

  const profileComponent = isLoggedIn ? (
    <div className="d-flex align-items-center gap-3">
      <div 
        className="dashboard-user" 
        onClick={() => setCurrentView("userProfile")}
        style={{ cursor: "pointer" }}
        title="View Profile"
      >
        <div className="dashboard-avatar">
          <img src={profilePic} alt="" className="w-100" />
        </div>
        <div className="dashboard-user-text">
          <p className="dashboard-welcome">Welcome</p>
          <h5 className="dashboard-user-name">
            {userInfo?.first_name ? `${userInfo.first_name} !` : (userInfo?.name ? `${userInfo.name} !` : "Member !")}
          </h5>
        </div>
      </div>
      <button 
        className="btn btn-link p-0 text-white d-flex align-items-center justify-content-center"
        onClick={handleLogout}
        title="Logout"
        disabled={logoutLoading}
        style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', textDecoration: 'none' }}
      >
        {logoutLoading ? (
            <div className="spinner-border spinner-border-sm text-white" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        ) : (
            <i className="bi bi-box-arrow-right" style={{ fontSize: '1.2rem' }}></i>
        )}
      </button>
    </div>
  ) : null;

  return (
    <div className="membership-page">
      <Header profile={profileComponent} />
      <section
        className="membership-hero d-none"
        style={{
          backgroundImage:
            currentView === "detailPage"
              ? `url(${tenderShip}), url(${membershipBgImg})`
              : currentView === "bookingManagement" ||
                currentView === "bookingDetail" ||
                currentView === "userProfile" ||
                currentView === "profileDetails" ||
                currentView === "editProfile" ||
                currentView === "feedback" ||
                currentView === "bookingsHome" ||
                currentView === "experiencesHome" ||
                currentView === "experienceDetail"
              ? "none"
              : `url(${landingBg})`,
          backgroundSize:
            currentView === "detailPage" ? "contain, cover" : undefined,
          backgroundPosition:
            currentView === "detailPage" ? "top center, top center" : undefined,
          backgroundRepeat:
            currentView === "detailPage" ? "no-repeat, no-repeat" : undefined,
        }}
      ></section>

      <section
        className="membership-packages-section"
        style={{
          // Layer tenderShip over the existing membership background only for experienceDetail
          backgroundImage:
            currentView === "detailPage"
              ? "none"
              : `url(${membershipBgImg})`,
          // Ship sits up top; blue gradient anchors at the bottom to stay visible
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          marginTop:
            currentView === "detailPage"
              ? "-580px"
              : currentView === "bookingManagement" ||
                currentView === "bookingDetail" ||
                currentView === "userProfile" ||
                currentView === "profileDetails" ||
                currentView === "editProfile" ||
                currentView === "feedback" ||
                currentView === "bookingsHome" ||
                currentView === "experiencesHome"
              ? "-945px"
              : undefined,
          paddingTop:
            currentView === "notifications"
              ? "170px"
              : undefined,
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
          currentView !== "finalReview" &&
          currentView !== "paymentMethod" && (
            <div className="membership-hero-content" data-aos="fade-up">
              <p className="membership-kicker">
                {currentView === "orientationSession"
                  ? "Orientation Session"
                  : "Membership"}
              </p>
              {currentView !== "orientationSession" && (
                <h1 className="membership-heading">
                  {currentView === "packages"
                    ? "Select Best Package"
                    : "Select Payment Options"}
                </h1>
              )}
            </div>
          )}
        <div className="membership-packages-container">
          {currentView === "packages" ? (
            <>
              <div className="membership-cards-grid">
                {packages.map((pkg, index) => (
                  <div
                    key={pkg.id || index}
                    className={`membership-card membership-card-${index}`}
                    data-aos="fade-up"
                    data-aos-delay={index * 150}
                  >
                    <div className="membership-card-star">
                      {/* Strap Image */}
                      <img 
                        src={index === 1 ? yellowStrap : whiteStrap} 
                        alt="Strap" 
                        className="strap-img"
                      />
                      {/* Star Icon */}
                      <img 
                        src={
                          index === 0 ? grayStar : 
                          index === 1 ? whiteStarIcon : 
                          index === 3 ? yellowStar : 
                          grayStar // Use grayStar for index 2 (Elite)
                        } 
                        alt="Star" 
                        className="star-icon"
                      />
                    </div>
                    <h3 className="membership-card-title">{pkg.name}</h3>
                    <div className="membership-card-price">
                      AED {pkg.monthly_price}/Monthly
                      {/* <span className="duration-text">{pkg.duration}</span> */}
                    </div>
                    <ul className="membership-card-benefits">
                      {pkg.features && pkg.features.map((benefit, idx) => (
                        <li key={idx}>{benefit}</li>
                      ))}
                    </ul>
                    <button
                      className="membership-card-button"
                      onClick={() => handleBuyPackage(pkg)}
                    >
                      Select Package
                    </button>
                  </div>
                ))}
              </div>

              {isLoggedIn && (
                <div className="membership-bottom-buttons">
                  <button
                    className="membership-bottom-btn"
                    data-aos="fade-up"
                    onClick={() => handleButtonClick("schedule")}
                  >
                    <img src={yartImg} alt="Club Briefing" />
                    <span>Club Briefing</span>
                  </button>
                  <button
                    className="membership-bottom-btn"
                    data-aos="fade-up"
                    onClick={() => handleButtonClick("summary")}
                  >
                    <img src={summaryImg} alt="Club Summary" />
                    <span>Club Summary</span>
                  </button>
                </div>
              )}
            </>
          ) : currentView === "schedule" ? (
            <ClubBriefing
              selectedMarina={selectedMarina}
              onChangeMarina={setSelectedMarina}
              selectedDay={selectedDay}
              selectedSlot={selectedSlot}
              onChangeDay={setSelectedDay}
              onChangeSlot={setSelectedSlot}
              onBook={() => setShowSuccess(true)}
            />
          ) : currentView === "details" ? (
            <PersonalDetail
              personalDetails={personalDetails}
              personalDetailsErrors={personalDetailsErrors}
              onChangePersonalDetails={setPersonalDetails}
              onOpenAgreement={() => {
                if (validatePersonalDetails()) {
                  navigate("/review-contract", { 
                    state: { 
                      personalDetails,
                      package: selectedPackage
                    } 
                  });
                }
              }}
              onContinue={(e) => {
                if (e && e.preventDefault) {
                  e.preventDefault();
                  e.stopPropagation();
                }
                if (validatePersonalDetails()) {
                  setCurrentView("finalReview");
                }
              }}
            />
          ) : currentView === "finalReview" ? (
            <FinalReview 
              personalDetails={personalDetails}
              pkg={packages.find((p) => p.name === selectedPackage)}
              onProceed={() => setCurrentView("paymentMethod")} 
            />
          ) : currentView === "paymentMethod" ? (
            <Payment
              selectedPaymentMethod={selectedPaymentMethod}
              onChangeMethod={setSelectedPaymentMethod}
              onProceed={handlePaymentProceed}
            />
          ) : currentView === "cardInfo" ? (
            <InsertCardDetails
              cardInfo={cardInfo}
              cardInfoErrors={cardInfoErrors}
              onFullNameChange={handleCardFullNameChange}
              onCardNumberChange={handleCardNumberChange}
              onExpiryDateChange={handleExpiryDateChange}
              onCvvChange={handleCvvChange}
              onPayClick={handleCardPayClick}
              showPaymentSuccess={showPaymentSuccess}
              onClosePaymentSuccess={() => setShowPaymentSuccess(false)}
              onViewInvoice={() => {
                setShowPaymentSuccess(false);
                setCurrentView("documentUpload");
              }}
              onBackToPackages={() => {
                setShowPaymentSuccess(false);
                setCurrentView("packages");
              }}
            />
          ) : currentView === "documentUpload" ? (
            <Document
              selectedDocType={selectedDocType}
              onChangeDocType={setSelectedDocType}
              onClickDetail={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentView("detailPage");
              }}
              onClickSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentView("orientationSession");
              }}
            />
          ) : currentView === "orientationSession" ? (
            <OrientationScreen
              selectedMarina={selectedMarina}
              onChangeMarina={setSelectedMarina}
              selectedDay={selectedDay}
              onChangeDay={setSelectedDay}
              selectedSlot={selectedSlot}
              onChangeSlot={setSelectedSlot}
              onBook={() => setShowOrientationSuccess(true)}
              showOrientationSuccess={showOrientationSuccess}
              onCloseOrientationSuccess={() => setShowOrientationSuccess(false)}
              onContinueOrientation={() => {
                setShowOrientationSuccess(false);
                setCurrentView("packages");
              }}
            />
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
                      <h3 className="booking-card-titl3265e">250 DAUNTLESS #2</h3>
                      <p className="booking-card-ref">Registration: NYB-0040</p>
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
                <h3 className="booking-detail-name">250 DAUNTLESS #2</h3>
                <p className="booking-detail-ref ms-5">Registration: #NYB-0040</p>
              </div>

              <div className="booking-detail-specs">
                <div className="booking-detail-spec-item">
                  <img src={engineImg} alt="Engine" />
                  <div className="booking-detail-spec-text">
                    <span className="booking-detail-spec-label">Engine</span>
                    <span className="booking-detail-spec-value">
                      Mercury V8 (300hp)
                    </span>
                  </div>
                </div>
                <div className="booking-detail-spec-item booking-detail-spec-item-ii">
                  <img src={yartShipImg} alt="Length" />
                  <div className="booking-detail-spec-text">
                    <span className="booking-detail-spec-label">Modal</span>
                    <span className="booking-detail-spec-value">250 DAUNTLESS</span>
                  </div>
                </div>
                <div className="booking-detail-spec-item booking-detail-spec-item-iii">
                  <img src={powerImg} alt="Power" />
                  <div className="booking-detail-spec-text">
                    <span className="booking-detail-spec-label">Year</span>
                    <span className="booking-detail-spec-value">
                      2021
                    </span>
                  </div>
                </div>
                <div className="booking-detail-spec-item booking-detail-spec-item-iv">
                  <img src={passengerImg} alt="Passengers" />
                  <div className="booking-detail-spec-text">
                    <span className="booking-detail-spec-label">
                      Engine Hours
                    </span>
                    <span className="booking-detail-spec-value">237 Hours</span>
                  </div>
                </div>
              </div>

              {/* 2nd Row */}
              <div className="booking-detail-specs">
                <div className="booking-detail-spec-item">
                  <img src={engineImg} alt="Engine" />
                  <div className="booking-detail-spec-text">
                    <span className="booking-detail-spec-label">Condition</span>
                    <span className="booking-detail-spec-value">
                      Fair
                    </span>
                  </div>
                </div>
                <div className="booking-detail-spec-item booking-detail-spec-item-ii">
                  <img src={yartShipImg} alt="Length" />
                  <div className="booking-detail-spec-text">
                    <span className="booking-detail-spec-label">Slot</span>
                    <span className="booking-detail-spec-value">40</span>
                  </div>
                </div>
                <div className="booking-detail-spec-item booking-detail-spec-item-iii">
                  <img src={powerImg} alt="Power" />
                  <div className="booking-detail-spec-text">
                    <span className="booking-detail-spec-label">Category</span>
                    <span className="booking-detail-spec-value">
                      B
                    </span>
                  </div>
                </div>
                <div className="booking-detail-spec-item booking-detail-spec-item-iv">
                  <img src={passengerImg} alt="Passengers" />
                  <div className="booking-detail-spec-text">
                    <span className="booking-detail-spec-label">
                      Location
                    </span>
                    <span className="booking-detail-spec-value">Royal M Marina</span>
                  </div>
                </div>
              </div>

              <div className="booking-detail-section">
                <h4 className="booking-detail-section-title">
                  Maintanance
                </h4>
                <div className="booking-detail-info-grid">
                  <div className="booking-detail-info-fields">
                    <div className="booking-detail-info-fields-row">
                      <div className="booking-detail-info-field">
                        <img src={calendarImg} alt="Date" />
                        <div>
                          <label>Last Maintanance</label>
                          <p>Jan 04, 2026</p>
                        </div>
                      </div>
                      {/* <div className="booking-detail-info-field">
                        <img src={clockImg} alt="Time" />
                        <div>
                          <label>Date</label>
                          <p>Dec 31, 2025</p>
                        </div>
                      </div> */}
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
                    onClick={!logoutLoading ? handleLogout : undefined}
                    style={{ cursor: logoutLoading ? 'wait' : 'pointer', opacity: logoutLoading ? 0.7 : 1 }}
                  >
                    <span>{logoutLoading ? "Logging out..." : "Logout"}</span>
                    {!logoutLoading && <i className="bi bi-chevron-right"></i>}
                  </div>
                </div>
              </div>
            </div>
          ) : currentView === "notifications" ? (
        <Notifications onBack={() => setCurrentView("userProfile")} />
      ) : currentView === "feedback" ? (
            <div className="feedback-view">
              <h2 className="feedback-title">Reviews &amp; Feedback</h2>
              <p className="feedback-question">
                How would you rate the overall experience of our App?
              </p>
              <div className="feedback-stars">
                <span className="star active">
                  {/* <img src={yellowStar} alt="" /> */}
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
                      <h3 className="bookings-listing-title">250 DAUNTLESS #2</h3>
                      <p className="bookings-listing-ref">Registration: NYB-0040</p>
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
                    <div
                      key={index}
                      className="experiences-listing-card"
                      onClick={() => setCurrentView("bookingRequest")}
                    >
                      <div className="experiences-listing-image">
                        <img src={boat.image} alt={boat.title} />
                        <div className="experiences-listing-content">
                          <div className="experiences-listing-content-left">
                            <h3 className="experiences-listing-title">
                              {boat.title}
                            </h3>
                            <p className="experiences-listing-engine">
                              {boat.engine}
                            </p>
                          </div>
                          <p className="experiences-listing-length">
                            {boat.length}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <SelectPaymentOptions
              selectedPackage={selectedPackage}
              selectedPackageData={packages.find((p) => p.name === selectedPackage)}
              selectedFrequency={selectedFrequency}
              onFrequencyChange={setSelectedFrequency}
              onContinue={(e) => {
                if (e && e.preventDefault) {
                  e.preventDefault();
                  e.stopPropagation();
                }
                setCurrentView("details");
              }}
            />
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
                <Lottie
                  animationData={successLottie}
                  loop={false}
                  style={{ width: "142px", height: "142px" }}
                />
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
              Continue
            </button>
          </div>
        </div>
      )}

      {showPaymentSuccess && null}

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
                <Lottie
                  animationData={successLottie}
                  loop={false}
                  style={{ width: "142px", height: "142px" }}
                />
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



      <Footer />
    </div>
  );
};

export default Membership;
