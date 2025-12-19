import React from "react";
import footerImg from "../assets/images/footer-img.png";
import callImg from "../assets/images/call-img.png";
import fbIcon from "../assets/images/fb.png";
import xIcon from "../assets/images/x.png";
import instaIcon from "../assets/images/insta.png";
import tiktokIcon from "../assets/images/tiktok.png";
import whatsAppIcon from "../assets/images/whatsApp.png";

const Footer = () => {
  return (
    <section
      className="cta-footer"
      style={{
        backgroundImage: `url(${footerImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="cta-footer-grid">
        <div className="cta-column">
          <h4>Help Desk</h4>
          <p className="cta-copy">
            Do you have questions or want more information? Call now.
          </p>
          <a className="cta-phone" href="tel:+971542631798">
            <img src={ callImg } className="call-img" alt="" /> +971 54 263 1798
          </a>
        </div>

        <div className="cta-column links">
          <div>
            <a href="/">Home</a>
            <a href="/#aboutus">About Us</a>
            <a href="/#features">Boats</a>
            <a href="/#membership">Memberships</a>
            <a href="/#location">Locations</a>
            <a href="/#contacts">Contact Us</a>
          </div>
        </div>

        <div className="cta-column links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms &amp; Conditions</a>
          <a href="/support">Support</a>
          <a href="/download">Download App</a>
        </div>

        <div className="cta-column newsletter">
          <h4>Sign up for newsletter and <br className="" /> get latest news &amp; update</h4>
          <div className="newsletter-row">
            <input type="email" placeholder="Your Email" />
            <button type="button">Subscribe</button>
          </div>
        </div>
      </div>

      <div className="cta-footer-bottom">
        <span className="copyright-text" >Copyright © {new Date().getFullYear()} Nirvana. All rights reserved.</span>
        <div className="social-row">
          <a href="https://facebook.com" aria-label="Facebook">
            <img src={fbIcon} className="fb" alt="Facebook" />
          </a>
          <a href="https://x.com" aria-label="X">
            <img src={xIcon} className="x" alt="X" />
          </a>
          <a href="https://x.com" aria-label="X">
            <img src={whatsAppIcon} className="whatsApp" alt="X" />
          </a>
          <a href="https://instagram.com" aria-label="Instagram">
            <img src={instaIcon} className="insta" alt="Instagram" />
          </a>
          <a href="https://tiktok.com" aria-label="TikTok">
            <img src={tiktokIcon} className="tiktok" alt="TikTok" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Footer;
