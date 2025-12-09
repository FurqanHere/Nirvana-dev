import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import autoLiftLogo from "../assets/images/AutoLift.png";
import { Link, useLocation } from "react-router-dom";

import googlePlay from "../assets/images/googleBtn.png";
import applePlay from "../assets/images/appleBtn.png";

import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");

  // Function to handle navigation to homepage sections
  const handleSectionNavigation = (sectionId) => {
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <div className="footer footer-main-container">
      <div className="container pb-4">
        <div className="row">
          {/* Left Section*/}
          <div className="col-md-4 col-sm-12 mb-4 mb-md-0" data-scroll-animation="fade-right" data-scroll-delay="100">
            <div className="d-flex flex-column align-items-center mb-3 footer-logo-wrapper">
              <img src={logo} alt="Logo" className="logo" />
              <img src={autoLiftLogo} alt="AUTOLIFT" className="auto-lift-logo mt-1" />
            </div>
            <p className="text-white mb-4 footer-description-text">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
            </p>
            <div className="d-flex flex-column flex-sm-row gap-2">
              <a
                // href="https://apps.apple.com/ae/app/gear-hire-car/id6747331842"
                // target="_blank"
                // rel="noopener noreferrer"
              >
                <img
                  src={applePlay}
                  alt="Download on the App Store"
                  className="footer-app-store-image"
                />
              </a>
              <a
                // href="https://play.google.com/store/apps/details?id=com.devicebee.gear"
                // target="_blank"
                // rel="noopener noreferrer"
              >
                <img
                  src={googlePlay}
                  alt="Download from Google Play"
                  className="footer-app-store-image"
                />
              </a>
            </div>
            </div>

          {/* Middle Sections */}
          <div className="col-md-4 col-sm-12 mb-4 mb-md-0" data-scroll-animation="fade-up" data-scroll-delay="200">
            <div className="row">
              <div className="col-6">
                <h5 className="text-white fw-bold mb-3">Top Links</h5>
                <nav className="nav flex-column">
                  <button 
                    className="nav-link text-white p-0 mb-2 btn btn-link text-start footer-nav-button"
                    onClick={() => handleSectionNavigation('home')}
                  >
                    Home
                  </button>
                  <button 
                    className="nav-link text-white p-0 mb-2 btn btn-link text-start footer-nav-button"
                    onClick={() => handleSectionNavigation('aboutus')}
                  >
                    About Us
                  </button>
                  <button 
                    className="nav-link text-white p-0 mb-2 btn btn-link text-start footer-nav-button"
                    onClick={() => handleSectionNavigation('features')}
                  >
                    How It Works
                  </button>
                  <button 
                    className="nav-link text-white p-0 mb-2 btn btn-link text-start footer-nav-button"
                    onClick={() => handleSectionNavigation('screenshot')}
                  >
                    App Screenshots
                  </button>
                  <button 
                    className="nav-link text-white p-0 mb-2 btn btn-link text-start footer-nav-button"
                    onClick={() => handleSectionNavigation('downloadApp')}
                  >
                    Download App
                  </button>
                  <Link to="/Contact-us" className="nav-link text-white p-0 mb-2 footer-nav-link">
                    Contact Us
                  </Link>
                </nav>
              </div>
              <div className="col-6">
                <h5 className="text-white fw-bold mb-3">Our Terms</h5>
                <nav className="nav flex-column">
                  <Link to="/privacy" className="nav-link text-white p-0 mb-2 footer-nav-link">
                    Privacy policy
                  </Link>
                  <Link to="/terms" className="nav-link text-white p-0 mb-2 footer-nav-link">
                    Terms & Conditions
                  </Link>
                </nav>
          </div>
        </div>
      </div>

          {/* Right Section - Stay Up To Date */}
          <div className="col-md-4 col-sm-12" data-scroll-animation="fade-left" data-scroll-delay="300">
            <h5 className="text-white fw-bold mb-3">Stay Up To Date</h5>
            <p className="text-white mb-3 footer-description-text">
              Get updates about new features, job trends, and early access offers from Shiftly.
            </p>
            <p className="text-white mb-3 footer-email-text fw-bold">
              <a 
              // href="mailto:contact@shiftly.ae"
               className="text-white text-decoration-none">
                contact@shiftly.ae
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar with Copyright */}
      <div className="footer-bottom-bar">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 col-12 text-center text-md-start mb-2 mb-md-0">
              <p className="footer-copyright-text mb-0">
                © {new Date().getFullYear()} Autolift. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 col-12 text-center text-md-end">
              <ul className="footer-icons list-unstyled mb-0 d-flex justify-content-center justify-content-md-end gap-3">
                <li>
                  <a href="#" aria-label="Facebook" className="text-white">
                    <FaFacebook />
                  </a>
                </li>
                <li>
                  <a href="#" aria-label="Instagram" className="text-white">
                    <FaInstagram />
                  </a>
                </li>
                <li>
                  <a href="#" aria-label="Twitter" className="text-white">
                    <FaXTwitter />
                  </a>
                </li>
                <li>
                  <a href="#" aria-label="YouTube" className="text-white">
                    <FaYoutube />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
