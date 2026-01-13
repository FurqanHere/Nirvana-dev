import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "../components/Header";
import LandingPageFooter from "../components/Footer";
import landingBg from "../assets/images/membership/membership-bg.png";

import calender from "../assets/images/membership/calender.png";
import sail from "../assets/images/membership/sail.png";
import chooseMembership from "../assets/images/membership/chooseMembership.png";

import leftBlueDeco from "../assets/images/left-blue-deco-img.png";
import yellowStrap from "../assets/images/yellow-strap.png";
import whiteStrap from "../assets/images/white-strap.png";
import blueStrap from "../assets/images/blue-strap.png";
import yellowStar from "../assets/images/yellow-star.png";
import whiteStar from "../assets/images/white-star.png";

import wheel from "../assets/images/wheel-img.png";
import deco from "../assets/images/left-deco-piece.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const LandingPageMembership = () => {
  const packages = [
    {
      name: "SEALUX",
      price: "AED 1,499/mo",
      theme: "pkg-brown",
      strap: whiteStrap,
      star: yellowStar,
      benefits: [
        "10 Bookings Per Month",
        "Category B Boat Access",
        "Weekdays Access",
        "Session Merging – Once Per Month",
        "3 Free In-House Captains Per Year",
        "60 Freeze Days (Membership Pause)",
      ],
    },
    {
      name: "SEA DWELLER",
      price: "AED 1,700/mo",
      theme: "pkg-blue",
      strap: whiteStrap,
      star: yellowStar,
      benefits: [
        "10 Bookings Per Month",
        "Category B Boat Access",
        "Weekdays Access",
        "1 Weekend Access Per Month",
        "Session Merging (Once a Month)",
        "3 Rolling Bookings",
        "3 Free In-House Captains Per Year",
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
        "10 Bookings Per Month",
        "Category B Boat Access",
        "Weekdays Access",
        "Free Weekends Access Per Month",
        "Session Merging (Twice a Month)",
        "Three Rolling Bookings",
        "Houseboat Access Once Every Two Months",
        "Three Free In-House Captains Per Year",
        "80 Freeze Days (Membership Pause)",
      ],
    },
    {
      name: "SEA DWELLER PLUS",
      price: "AED 1,700/mo",
      theme: "pkg-yellow",
      strap: yellowStrap,
      star: whiteStar,
      benefits: [
        "10 Bookings Per Month",
        "Category A & B Boat Access",
        "Weekdays And Weekend Access",
        "Session Merging (Twice A Month)",
        "Three Rolling Bookings",
        "Houseboat Access Once A Month",
        "Free In-House Captains",
        "75 Freeze Days (Membership Pause)",
        "Dual Membership",
        "Gift Trips",
        "Dubai Boat Usage",
      ],
    },
    {
      name: "ROYAL",
      price: "AED 8,000/mo",
      theme: "pkg-dark",
      strap: blueStrap,
      star: whiteStar,
      benefits: [
        "10 Bookings Per Month",
        "Category A & B Boat Access",
        "Weekdays And Weekend Access",
        "Session Merging (Twice A Month)",
        "Three Rolling Bookings",
        "Houseboat Access Once A Month",
        "Free In-House Captains",
        "75 Freeze Days (Membership Pause)",
        "Dual Membership",
        "Gift Trips",
        "Dubai Boat Usage",
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
            <h1 className="text-white hover-text" data-aos="fade-up" data-aos-delay="250">MEMBERSHIPS</h1>
            <p className="landing-hero-subtitle hover-text" data-aos="fade-up" data-aos-delay="300">Where Time Floats Free</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works-section position-relative">
        <div className="container">
          <h2 className="hover-text" data-aos="fade-up">How It Works !</h2>
          <p className="hover-text" data-aos="fade-up" data-aos-delay="100">
            Easy step follow and get membership and enjoy our services
          </p>

          <div className="how-it-works-cards">
            {/* Card 1 */}
            <div className="how-card" data-aos="fade-up" data-aos-delay="200">
              <div className="icon-box">
                <img src={chooseMembership} alt="" className="hoverable" data-aos="zoom-in" />
              </div>
              <h3 className="hover-text" data-aos="fade-up" data-aos-delay="220">Choose a Membership:</h3>
              <p className="hover-text" data-aos="fade-up" data-aos-delay="240">
                Pick a plan that matches <br /> your lifestyle.
              </p>
            </div>

            {/* Card 2 */}
            <div className="how-card" data-aos="fade-up" data-aos-delay="300">
              <div className="icon-box">
                <img src={calender} alt="" className="hoverable" data-aos="zoom-in" />
              </div>
              <h3 className="hover-text" data-aos="fade-up" data-aos-delay="320">Book Your Slot:</h3>
              <p className="hover-text" data-aos="fade-up" data-aos-delay="340">
                Reserve your boat in <br /> seconds.
              </p>
            </div>

            {/* Card 3 */}
            <div className="how-card" data-aos="fade-up" data-aos-delay="400">
              <div className="icon-box">
                <img src={sail} alt="" className="hoverable" data-aos="zoom-in" />
              </div>
              <h3 className="hover-text" data-aos="fade-up" data-aos-delay="420">Sail & Enjoy:</h3>
              <p className="hover-text" data-aos="fade-up" data-aos-delay="440">
                We handle fuel, cleaning, <br /> and support.
              </p>
            </div>
          </div>
        </div>
        <div className="wheel">
          <img src={wheel} alt="" className="hoverable" data-aos="zoom-in" />
        </div>
      </section>

      <section className="packages-section position-relative">
        <div className="text-center mb-5">
          <h2 className="hover-text" data-aos="fade-up">Packges</h2>
          <p className="hover-text" style={{ color: "#989898" }} data-aos="fade-up" data-aos-delay="80">FREE ACCESS TO 42 BOATS</p>
        </div>
        <div className="app-slider" data-aos="fade-up">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop
            centeredSlides
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 3 },
            }}
          >
            {packages.map((pkg, index) => (
              <SwiperSlide key={index}>
                <div className="packages-grid single-slide">
                  <div className={`pkg-card ${pkg.theme}`}>
                    <div className="pkg-corner">
                      <img className="pkg-strap hoverable" src={pkg.strap} alt="" data-aos="zoom-in" />
                      <img className="pkg-star hoverable" src={pkg.star} alt="" data-aos="zoom-in" data-aos-delay="50" />
                    </div>

                    <div className="pkg-header">
                      <h3 className="pkg-name hover-text" data-aos="fade-up">{pkg.name}</h3>
                      <p className="pkg-price hover-text" data-aos="fade-up" data-aos-delay="60">{pkg.price}</p>
                    </div>

                    <ul className="pkg-benefits">
                      {pkg.benefits.map((b, idx) => (
                        <li key={idx} className="hover-text" data-aos="fade-up" data-aos-delay={60 + idx * 40}>{b}</li>
                      ))}
                    </ul>

                    <div className="d-flex justify-content-center">
                      <button type="button" className="pkg-button btn-hover" data-aos="zoom-in" data-aos-delay="120">
                        Select Package
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="deco">
          <img src={deco} alt="" className="hoverable" data-aos="zoom-in" />
        </div>
      </section>

      <LandingPageFooter />
    </div>
  );
};

export default LandingPageMembership;
