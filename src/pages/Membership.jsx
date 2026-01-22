import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "../components/Header";
import LandingPageFooter from "../components/Footer";
import landingBg from "../assets/images/membership/membership-bg.png";

import calender from "../assets/images/membership/calender.png";
import sail from "../assets/images/membership/sail.png";
import chooseMembership from "../assets/images/membership/chooseMembership.png";

// import leftBlueDeco from "../assets/images/left-blue-deco-img.png";
import yellowStrap from "../assets/images/yellow-strap.png";
import whiteStrap from "../assets/images/white-strap.png";
import blueStrap from "../assets/images/blue-strap.png";
import yellowStar from "../assets/images/yellow-star.png";
import whiteStar from "../assets/images/white-star.png";

import wheel from "../assets/images/wheel-img.png";

import grayStar from "../assets/images/gray-star.png";


const Membership = () => {
  const packages = [
    {
      name: "SEALUX",
      price: "AED 1,499/mo",
      theme: "pkg-dark",
      strap: whiteStrap,
      star: grayStar,
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
      price: "AED 1,700/mo",
      theme: "pkg-brown",
      strap: whiteStrap,
      star: yellowStar,
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
      name: "SEALUX",
      price: "AED 1,499/mo",
      theme: "pkg-blue",
      strap: yellowStrap,
      star: whiteStar,
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
      price: "AED 2,500/mo",
      theme: "pkg-navy",
      strap: blueStrap,
      star: whiteStar,
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div className="landing-page">
      <Header />
      <section
        className="landing-hero"
        style={{ backgroundImage: `url(${landingBg})` }}
      >
        <div className="landing-overlay">
          <div
            className="landing-hero-content"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h1 className="text-white">MEMBERSHIPS</h1>
            <p className="landing-hero-subtitle">Where Time Floats Free</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works-section position-relative">
        <div className="container">
          <h2 data-aos="fade-up">How It Works !</h2>
          <p data-aos="fade-up" data-aos-delay="100">
            Easy step follow and get membership and enjoy our services
          </p>

          <div className="how-it-works-cards">
            {/* Card 1 */}
            <div className="how-card" data-aos="fade-up" data-aos-delay="200">
              <div className="icon-box">
                <img src={chooseMembership} alt="" />
              </div>
              <h3>Choose a Membership:</h3>
              <p>
                Pick a plan that matches <br /> your lifestyle.
              </p>
            </div>

            {/* Card 2 */}
            <div className="how-card" data-aos="fade-up" data-aos-delay="300">
              <div className="icon-box">
                <img src={calender} alt="" />
              </div>
              <h3>Book Your Slot:</h3>
              <p>
                Reserve your boat in <br /> seconds.
              </p>
            </div>

            {/* Card 3 */}
            <div className="how-card" data-aos="fade-up" data-aos-delay="400">
              <div className="icon-box">
                <img src={sail} alt="" />
              </div>
              <h3>Sail & Enjoy:</h3>
              <p>
                We handle fuel, cleaning, <br /> and support.
              </p>
            </div>
          </div>
        </div>
        <div className="wheel">
          <img src={wheel} alt="" />
        </div>
      </section>

      <section className="packages-section" id="packages">
        <div className="packages-header" data-aos="fade-up">
          <h2 className="packages-title">Packages</h2>
          <p className="packages-subtitle">Our Simple 3 Membership package</p>
        </div>
        <div className="packages-grid">
          {packages.map((pkg) => (
            <div
              className={`pkg-card ${pkg.theme}`}
              key={pkg.name}
              data-aos="fade-up"
            >
              <div className="pkg-corner">
                <img className="pkg-strap" src={pkg.strap} alt="" />
                <img className="pkg-star" src={pkg.star} alt="" />
              </div>
              <div className="pkg-header">
                <h3 className="pkg-name">{pkg.name}</h3>
                <p className="pkg-price">{pkg.price}</p>
              </div>
              <ul className="pkg-benefits">
                {pkg.benefits.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
              <div className="d-flex justify-content-center">
                <button type="button" className="pkg-button">
                  Select Package
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <LandingPageFooter />
    </div>
  );
};

export default Membership;
