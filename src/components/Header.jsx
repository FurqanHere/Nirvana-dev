import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import logo from "../assets/images/logo.png";
import autoLiftLogo from "../assets/images/AutoLift.png";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const links = [
  { name: "Home", path: "home", type: "section" },
  { name: "About Us", path: "aboutus", type: "section" },
  { name: "Services", path: "features", type: "section" },
  { name: "Screenshot", path: "screenshot", type: "section" },
  { name: "Download App", path: "downloadApp", type: "section" },
  { name: "Contact Us", path: "/", type: "section" },
];

export default function Navbar({ background = "" }) {
  const [activeLink, setActiveLink] = useState("/");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar navbar-expand-lg ${background} ${isScrolled ? 'navbar-fixed' : ''}`}>
        <div className="container d-flex align-items-center">
          <Link className="navbar-brand d-flex flex-column" to="/" data-scroll-animation="fade-down" data-scroll-delay="100">
          <img src={logo} alt="Logo" className="logo" />
            <img src={autoLiftLogo} alt="AUTOLIFT" className="auto-lift-logo mt-1" />
        </Link>

        <button
            className="navbar-toggler d-lg-none ms-auto"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
        >
          <span className="navbar-toggler-icon" />
        </button>

          {/* desktop nav */}
          <div className="d-none d-lg-flex align-items-center ms-auto gap-4" data-scroll-animation="fade-down" data-scroll-delay="200">
            <ul className="navbar-nav navbar-pill">
              {links.map((l, index) => (
              <li
                className="nav-item d-flex flex-column align-items-center"
                key={l.path}
                  data-scroll-animation="fade-down"
                  data-scroll-delay={300 + (index * 50)}
              >
                  {l.type === "route" ? (
                    <Link
                      to={l.path}
                      className={`nav-link ${
                        activeLink === l.path ? "active" : ""
                      }`}
                      onClick={() => setActiveLink(l.path)}
                    >
                      {l.name}
                    </Link>
                  ) : (
                    <Link
                      to={`/#${l.path}`}
                      className={`nav-link ${
                        activeLink === l.path ? "active" : ""
                      }`}
                      onClick={() => setActiveLink(l.path)}
                    >
                      {l.name}
                    </Link>
                  )}
                  
              </li>
            ))}
          </ul>
            {/* <Link className="btn partner-btn shadow" to="/become-a-partner">
              <i className="fas fa-user-circle me-2"></i>
            Become a Partner
            </Link> */}
          </div>
        </div>
      </nav>

      {/* ───── OFF‑CANVAS (mobile only) ───── */}
      <div
        className="offcanvas offcanvas-start d-lg-none"
        id="offcanvasNavbar"
        tabIndex="-1"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title mb-0 d-flex flex-column">
            <img src={logo} alt="Logo" className="logo" />
            <img src={autoLiftLogo} alt="AUTOLIFT" className="auto-lift-logo mt-1" />
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>

        <div className="offcanvas-body">
          <ul className="navbar-nav gap-3">
            {links.map((l) => (
              <li
                className="nav-item d-flex flex-column align-items-start"
                key={l.path}
              >
                {l.type === "route" ? (
                  <Link
                    style={{ fontSize: "1.125rem" }}
                    to={l.path}
                    className={`nav-link ${
                      activeLink === l.path ? "active" : ""
                    }`}
                    onClick={() => setActiveLink(l.path)}
                    data-bs-dismiss="offcanvas"
                  >
                    {l.name}
                  </Link>
                ) : (
                  <ScrollLink
                    style={{ fontSize: "1.125rem" }}
                    to={l.path}
                    smooth
                    duration={200}
                    spy
                    className={`nav-link ${
                      activeLink === l.path ? "active" : ""
                    }`}
                    onClick={() => setActiveLink(l.path)}
                    data-bs-dismiss="offcanvas"
                  >
                    {l.name}
                  </ScrollLink>
                )}
                
              </li>
            ))}
          </ul>
          {/* <Link
            className="btn partner-btn w-100 justify-content-center mt-4"
            to="/become-a-partner"
          >
            <i className="fas fa-user-circle me-2"></i>
            Become a Partner
          </Link> */}
        </div>
      </div>
    </>
  );
}
