import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/LandingPageLogo.png";
import footerBg from "../assets/images/landingPageFooterBg.png";
import fb from "../assets/images/landingPagefb.png";
import x from "../assets/images/landingPageX.png";
import insta from "../assets/images/landingPageInstagram.png";
import tiktok from "../assets/images/landingPageTikTok.png";
import whatsApp from "../assets/images/landingPageWhatsApp.png";
import callIcon from "../assets/images/landingPageCall.png";
import emailIcon from "../assets/images/landingPageEmail.png";
import locationIcon from "../assets/images/landingPageLocation.png";
import footerWheel from "../assets/images/footer-wheel.png"

export default function LandingPageFooter() {
  return (
    <footer
      className="landing-footer position-relative"
      style={{ backgroundImage: `url(${footerBg})` }}
    >
      <div className="container">
        <div className="landing-footer-grid">
          <div className="landing-footer-col" data-aos="fade-up">
            <h4 className="landing-footer-title">Quick Links</h4>
            <ul className="landing-footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about-us">About Us</Link></li>
              <li><Link to="/membership">Membership</Link></li>
              <li><a href="/#screenshots">Screenshots</a></li>
              <li><a href="/#download">Download App</a></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="landing-footer-center" data-aos="fade-up" data-aos-delay="100">
            <img src={logo} alt="" className="landing-footer-logo" />
            <h3 className="landing-footer-heading">Your New Adventure Starts Here!</h3>
            <p className="landing-footer-sub">
              Bespoke services focused on luxury, safety, comfort, and sustainability
            </p>
            <div className="landing-footer-social" data-aos="zoom-in" data-aos-delay="200">
              <button type="button" aria-label="Facebook"><img src={fb} alt="" /></button>
              <button type="button" aria-label="X"><img src={x} alt="" /></button>
              <button type="button" aria-label="WhatsApp"><img src={whatsApp} alt="" /></button>
              <button type="button" aria-label="Instagram"><img src={insta} alt="" /></button>
              <button type="button" aria-label="TikTok"><img src={tiktok} alt="" /></button>
            </div>
          </div>

          <div className="landing-footer-col" data-aos="fade-up" data-aos-delay="150">
            <h4 className="landing-footer-title">Company</h4>
            <div className="landing-footer-contact">
              <div className="landing-footer-contact-row">
                <img src={callIcon} alt="" />
                <span>+971 54 792 2842</span>
              </div>
              <div className="landing-footer-contact-row">
                <img src={callIcon} alt="" />
                <span>800MARINE</span>
              </div>
              <div className="landing-footer-contact-row">
                <img src={emailIcon} alt="" />
                <span>sales@nirvanayachts.ae</span>
              </div>
              <div className="landing-footer-contact-row">
                <img src={locationIcon} alt="" />
                <span>Abu Dhabi, UAE</span>
              </div>
            </div>
          </div>
        </div>
        <div className="landing-footer-copy text-start">
          Copyright © 2025 Nirvana, All rights reserved.
        </div>
      </div>
      <div className="footerWheel">
        <img src={footerWheel} alt="" />
      </div>
    </footer>
  );
}
