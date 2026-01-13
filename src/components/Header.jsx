import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import logo from "../assets/images/logo.png";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AOS from "aos";
import "aos/dist/aos.css";

const leftLinks = [
  { name: "Home", path: "home", type: "section" },
  { name: "About Us", path: "/about-us", type: "route" },
  { name: "Boats", path: "features", type: "section" },
  { name: "Experiences", path: "/experience", type: "route" },
];

const rightLinks = [
  { name: "Calma", path: "/calma", type: "route" },
  { name: "Membership", path: "/member-ship", type: "route" },
  { name: "Locations", path: "/locations", type: "route" },
  { name: "Contacts", path: "contacts", type: "section" },
];

export default function Navbar({ background = "", profile = null }) {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Set active link based on current route
    if (location.pathname === "/member-ship") {
      setActiveLink("/member-ship");
    } else if (location.pathname === "/experience") {
      setActiveLink("/experience");
    } else if (location.pathname === "/locations") {
      setActiveLink("/locations");
    } else if (location.pathname === "/") {
      setActiveLink("home");
    } else {
      setActiveLink(location.pathname);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 80, easing: "ease-out" });
  }, []);

  return (
    <>
      <nav className={`navbar-custom ${background} ${isScrolled ? 'navbar-fixed' : ''}`} data-aos="fade-down">
        <div className="navbar-container">
          {/* Left Group */}
          <div className="d-flex align-items-center justify-content-start w-100" data-aos="fade-right">
            {profile && (
              <div className="navbar-profile-section me-2">
                {profile}
              </div>
            )}
            
            {/* Left Navigation Links */}
            <div className="navbar-left flex-grow-1">
              {leftLinks.map((link) => (
                link.type === "route" ? (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`navbar-link hover-text ${activeLink === link.path ? "active" : ""}`}
                    onClick={() => setActiveLink(link.path)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <Link
                    key={link.path}
                    to={`/#${link.path}`}
                    className={`navbar-link hover-text ${activeLink === link.path ? "active" : ""}`}
                    onClick={() => setActiveLink(link.path)}
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* Center Logo */}
          <Link className="navbar-logo-container hoverable" to="/" data-aos="zoom-in">
            <img 
              src={logo} 
              alt="Nirvana Yachts & Boats" 
              className="navbar-logo-img"
            />
          </Link>

          {/* Right Group */}
          <div className="d-flex align-items-center justify-content-end w-100" data-aos="fade-left">
            {/* Right Navigation Links */}
            <div className="navbar-right flex-grow-1">
              {rightLinks.map((link) => (
                link.type === "route" ? (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`navbar-link hover-text ${activeLink === link.path ? "active" : ""}`}
                    onClick={() => setActiveLink(link.path)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <Link
                    key={link.path}
                    to={`/#${link.path}`}
                    className={`navbar-link hover-text ${activeLink === link.path ? "active" : ""}`}
                    onClick={() => setActiveLink(link.path)}
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>
            
            {profile && (
              <div className="navbar-bell ms-3 d-none d-lg-flex align-items-center justify-content-center hoverable">
                <i className="bi bi-bell-fill" style={{ fontSize: '1.2rem', color: '#fff', cursor: 'pointer' }}></i>
              </div>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="navbar-toggle d-lg-none btn-hover"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Off-canvas Menu */}
      <div
        className="offcanvas offcanvas-start d-lg-none"
        id="offcanvasNavbar"
        tabIndex="-1"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title mb-0 d-flex flex-column">
            <img src={logo} alt="Logo" className="logo hoverable" />
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white btn-hover"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>

        <div className="offcanvas-body">
          <ul className="navbar-nav gap-3">
            {[...leftLinks, ...rightLinks].map((link) => (
              <li
                className="nav-item d-flex flex-column align-items-start"
                key={link.path}
              >
                {link.type === "route" ? (
                  <Link
                    style={{ fontSize: "1.125rem" }}
                    to={link.path}
                    className={`nav-link hover-text ${
                      activeLink === link.path ? "active" : ""
                    }`}
                    onClick={() => setActiveLink(link.path)}
                    data-bs-dismiss="offcanvas"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <ScrollLink
                    style={{ fontSize: "1.125rem" }}
                    to={link.path}
                    smooth
                    duration={200}
                    spy
                    className={`nav-link hover-text ${
                      activeLink === link.path ? "active" : ""
                    }`}
                    onClick={() => setActiveLink(link.path)}
                    data-bs-dismiss="offcanvas"
                  >
                    {link.name}
                  </ScrollLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
