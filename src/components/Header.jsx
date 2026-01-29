import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import logo from "../assets/images/logo.png";
import profilePic from "../assets/images/profile-pic.png";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AOS from "aos";
import "aos/dist/aos.css";

const leftLinks = [
  { name: "Home", path: "home", type: "section" },
  { name: "About Us", path: "/about-us", type: "route" },
  { name: "Boats", path: "/boats", type: "route" },
  { name: "Experiences", path: "/experience", type: "route" },
];

const rightLinks = [
  { name: "Calma", path: "/calma", type: "route" },
  { name: "Membership", path: "/member-ship", type: "route" },
  { name: "Locations", path: "/locations", type: "route" },
  { name: "Contact Us", path: "/contact-us", type: "route" },
];

export default function Navbar({ background = "", profile = null, showAuthButtons = true }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const user = typeof window !== "undefined" ? localStorage.getItem("user") : null;

  useEffect(() => {
    if (user) {
      try {
        setUserInfo(JSON.parse(user));
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    } else {
      setUserInfo(null);
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserInfo(null);
    navigate("/");
  };

  useEffect(() => {
    // Set active link based on current route
    if (location.pathname === "/member-ship") {
      setActiveLink("/member-ship");
    } else if (location.pathname === "/experience") {
      setActiveLink("/experience");
    } else if (location.pathname === "/locations") {
      setActiveLink("/locations");
    } else if (location.pathname === "/calma") {
      setActiveLink("/calma");
    } else if (location.pathname === "/boat") {
      setActiveLink("/boat");
    } else if (location.pathname === "/") {
      setActiveLink("home");
    } else if (location.pathname === "/contact-us") {
      setActiveLink("/contact-us");
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
    <div className="header-wrapper" style={{ position: 'fixed', top: 0, left: 0, right: 0, width: '100%', zIndex: 1100 }}>
      {/* Top Bar - Desktop Only */}
      {!profile && showAuthButtons && !user && (
        <div className="d-none d-lg-flex justify-content-end align-items-center px-5 py-2" style={{ background: isScrolled ? 'rgba(6, 15, 24, 0.98)' : 'rgba(0,0,0,0.2)', transition: 'background 0.3s ease' }}>
           <div className="d-flex align-items-center gap-3">
                <Link to="/login" className="text-decoration-none">
                  <button className="btn bg-white text-dark px-3 py-1 fw-bold rounded-3 border-0" style={{ fontSize: '14px', minWidth: '93px', height: "41px" }}>
                    Login
                  </button>
                </Link>
                <Link to="/signup" className="text-decoration-none">
                  <button className="btn px-3 py-1 fw-bold rounded-3 border-0" style={{ backgroundColor: '#FAD090', color: '#1A1A1A', fontSize: '14px', minWidth: '93px', height: "41px" }}>
                    Sign Up
                  </button>
                </Link>
           </div>
        </div>
      )}

      <nav className={`navbar-custom ${background} ${isScrolled ? 'navbar-fixed' : ''}`} data-aos="fade-down" style={{ position: 'relative', top: 'auto' }}>
        <div className="navbar-container">
          {/* Left Group */}
          <div className="d-flex align-items-center justify-content-start w-100" data-aos="fade-right">
            {(profile || userInfo) && (
              <div className="navbar-profile-section me-2 d-flex align-items-center">
                {profile ? profile : (
                  <>
                    <Link to="/dashboard/boats" className="text-decoration-none">
                      <div className="dashboard-user">
                        <div className="dashboard-avatar">
                          <img src={userInfo?.picture || profilePic} alt="" className="w-100" />
                        </div>
                        <div className="dashboard-user-text">
                          <p className="dashboard-welcome" style={{ color: isScrolled ? '#888' : '#ddd' }}>Welcome</p>
                          <h5 className="dashboard-user-name" style={{ color: isScrolled ? '#000' : '#fff' }}>{userInfo?.full_name || userInfo?.name || "User"} !</h5>
                        </div>
                      </div>
                    </Link>
                    <button 
                      onClick={handleLogout} 
                      className="btn btn-link p-0 ms-2" 
                      title="Logout"
                    >
                      <i className="bi bi-box-arrow-right" style={{ fontSize: '1.3rem', color: isScrolled ? '#fff' : '#fff' }}></i>
                    </button>
                  </>
                )}
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
            
            {(profile || userInfo) && (
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

          {!profile && !userInfo && showAuthButtons && (
            <div className="d-flex flex-column gap-3 mt-4">
              <Link to="/login" className="text-decoration-none w-100" data-bs-dismiss="offcanvas">
                <button className="btn bg-white text-dark w-100 py-2 fw-bold rounded-3 border-0">
                  Login
                </button>
              </Link>
              <Link to="/signup" className="text-decoration-none w-100" data-bs-dismiss="offcanvas">
                <button className="btn w-100 py-2 fw-bold rounded-3 border-0" style={{ backgroundColor: '#FAD090', color: '#1A1A1A' }}>
                  Sign Up
                </button>
              </Link>
            </div>
          )}

          {userInfo && !profile && (
            <div className="d-flex flex-column gap-3 mt-4">
              <Link to="/dashboard/boats" className="text-decoration-none w-100" data-bs-dismiss="offcanvas">
                <button className="btn bg-white text-dark w-100 py-2 fw-bold rounded-3 border-0">
                  Dashboard
                </button>
              </Link>
              <button onClick={handleLogout} className="btn w-100 py-2 fw-bold rounded-3 border-0" style={{ backgroundColor: '#FAD090', color: '#1A1A1A' }}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
