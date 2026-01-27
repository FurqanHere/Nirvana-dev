import "../assets/css/base.css";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import logo from "../assets/images/contract-logo.png";
import membershipBgImg from "../assets/images/main-yact-bg.png";
import ApiService from "../services/ApiService";
import { toast } from "react-toastify";

const ReviewContract = () => {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const docRef = useRef(null);
  const thumbRef = useRef(null);
  
  const personalDetails = location.state?.personalDetails || {};
  const contractDocUrl = location.state?.contractDocUrl;
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleScroll = () => {
    if (docRef.current && thumbRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = docRef.current;
      const trackHeight = 360; // Matches CSS height
      const thumbHeight = 72; // Matches CSS height
      const padding = 8; // 4px top + 4px bottom

      const scrollableContentHeight = scrollHeight - clientHeight;
      const availableTrackHeight = trackHeight - thumbHeight - padding;

      if (scrollableContentHeight > 0) {
        const ratio = scrollTop / scrollableContentHeight;
        const newTop = ratio * availableTrackHeight;
        thumbRef.current.style.transform = `translateY(${newTop}px)`;
      }
    }
  };

  return (
    <div className="review-contract-page">
      <Header />
      <section
        className="review-contract-hero"
        style={{ backgroundImage: `url(${membershipBgImg})` }}
      >
        <div className="review-contract-overlay">
          <div className="review-contract-card">
            <h2 className="review-contract-title">Review Contract</h2>

            <div className="review-contract-document-wrapper">
              <div 
                className="review-contract-document"
                ref={docRef}
                onScroll={handleScroll}
                style={contractDocUrl ? { overflow: 'hidden', padding: 0 } : {}}
              >
                {contractDocUrl ? (
                  <iframe 
                    src={contractDocUrl} 
                    title="Contract Document"
                    width="100%" 
                    height="100%" 
                    style={{ border: 'none', minHeight: '400px' }}
                  />
                ) : (
                  <div className="review-contract-doc-inner">
                  <div className="review-contract-doc-logo">
                    <img 
                      src={logo} 
                      alt="Nirvana Yachts & Boats" 
                      className="review-contract-doc-logo-img"
                    />
                  </div>

                  <h3 className="review-contract-doc-heading">
                    BOAT CLUB MEMBERSHIP AGREEMENT
                  </h3>

                  <p className="review-contract-doc-paragraph">
                    This Boat Club Membership Agreement (the “Agreement”) was signed on {currentDate} between:
                  </p>

                  <p className="review-contract-doc-paragraph">
                    1) Nirvana Marine Services LLC, a limited liability company duly registered in Abu Dhabi, UAE under commercial license number CN-5077359, having its address at Breakwater in Abu Dhabi and phone number +971 2 6679791 (herein after referred to as the “Nirvana Yachts and Boats “Club”) or First Party, and
                  </p>

                  <p className="review-contract-doc-paragraph">
                    2) {personalDetails.fullName || "(Full Name)"}, a national of {personalDetails.nationality || "(Nationality)"}, with ID No. {personalDetails.emiratesId || personalDetails.passport || "(Passport ID or EID)"}, email address {personalDetails.email || "(Email Address)"} and mobile number {personalDetails.phone || "(Mobile Number)"}, (herein after referred to as the “Member”) or Second Party,
                  </p>

                  <p className="review-contract-doc-paragraph">
                    The Club and the Member are hereinafter referred to individually as the “Party” and jointly as the “Parties“.
                  </p>

                  <h4 className="review-contract-doc-subheading">WHEREAS</h4>

                  <p className="review-contract-doc-paragraph">
                    The Club owns, operates, and manages a fleet of leisure boats (the “Boats”) of various sizes to be provided to its members for use in specific locations according to the terms and conditions of this Agreement
                  </p>
                  
                  <p className="review-contract-doc-paragraph">and</p>

                  <p className="review-contract-doc-paragraph">
                    The Member, who has selected the “Plan” membership, is entering into this Agreement for the use of the Boats according to the terms and conditions of this Agreement.
                  </p>

                  <p className="review-contract-doc-paragraph review-contract-doc-footer-text">
                    IT IS HEREBY AGREED AS FOLLOWS:
                  </p>
                </div>
                )}
              </div>
              {!contractDocUrl && (
                <div className="review-contract-scrollbar">
                  <span className="review-contract-scroll-thumb" ref={thumbRef} />
                </div>
              )}
            </div>

            <label className="agreement-toggle-row review-contract-toggle-row">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              <span className="agreement-toggle-slider" aria-hidden="true" />
              <span className="agreement-toggle-text">
                I <span className="review-contract-member-name">{personalDetails.fullName || "Member"}</span>{" "}
                agree with membership terms
              </span>
            </label>

            <button
              type="button"
              className="agreement-save review-contract-sign-btn"
              disabled={!agreeTerms || loading}
              onClick={async () => {
                if (!agreeTerms) return;
                
                setLoading(true);
                try {
                  const payload = {
                    email: personalDetails.email,
                    phone: personalDetails.phone
                  };
                  
                  const response = await ApiService.post("/sendContractPhoneOtp", payload);
                  
                  if (response.data.status) {
                    toast.success(response.data.message || "OTP sent successfully");
                    navigate("/phone-otp", { 
                      state: { 
                        flow: "contract",
                        personalDetails: personalDetails,
                        phone: personalDetails.phone,
                        email: personalDetails.email,
                        package: location.state?.package
                      } 
                    });
                  } else {
                    toast.error(response.data.message || "Failed to send OTP");
                  }
                } catch (error) {
                  console.error("Send OTP Error:", error);
                  toast.error(error.response?.data?.message || "An error occurred while sending OTP");
                } finally {
                  setLoading(false);
                }
              }}
            >
              {loading ? "Sending OTP..." : "Sign Contract"}
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ReviewContract;
