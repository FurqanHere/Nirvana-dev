import React, { useEffect, useRef, useState } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ApiService from "../services/ApiService";

import featureShip from "../assets/images/about-us/ship.png";
import featureLiscence from "../assets/images/about-us/liscence.png";
import featureUaeClub from "../assets/images/about-us/uae-club.png";
import featureMobApp from "../assets/images/about-us/mob-app.png";
import featureVersatileBoat from "../assets/images/about-us/versatile-boat.png";
import featureAddOns from "../assets/images/about-us/add-ons.png";
import featureSixPrime from "../assets/images/about-us/six-prime.png";
import featureClub from "../assets/images/about-us/club.png";

import landingBg from "../assets/images/about-us/aboutUs-bgImg.png";
import promiseBg from "../assets/images/about-us/aboutUs-promiseBgImg.png";
import rightArrow from "../assets/images/about-us/aboutUsRightArrow.png";

// Imported from CMS
import membershipImg from "../assets/images/membership-img.png";
import orientationImg from "../assets/images/orientation-img.png";
import paymentImg from "../assets/images/payment-img.png";
import bookingImg from "../assets/images/booking-img.png";
import memberBg from "../assets/images/member-bg.png";
import orientationBg from "../assets/images/orientation-bg.png";

const services = [
  {
    title: "Exclusive Membership",
    description:
      "Gain access to a curated fleet of luxury yachts and premium lifestyle privileges.",
    image: membershipImg,
    bgImage: memberBg,
  },
  {
    title: "Personalized Orientation",
    description:
      "A guided onboarding experience to help you explore your membership benefits with ease.",
    image: orientationImg,
    bgImage: orientationBg,
  },
  {
    title: "Secure Payments",
    description:
      "Transparent and secure payment options designed for a smooth and trusted experience.",
    image: paymentImg,
    bgImage: memberBg,
  },
  {
    title: "Effortless Bookings",
    description:
      "Book your yacht experiences effortlessly with flexible scheduling and premium support.",
    image: bookingImg,
    bgImage: orientationBg,
  },
];

const LandingPageAboutus = () => {
  const [boats, setBoats] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchBoats = async () => {
      try {
        const response = await ApiService.get("/getBoats");
        if (response.data.status) {
          setBoats(response.data.data.boats);
        }
      } catch (error) {
        console.error("Error fetching boats:", error);
      }
    };
    fetchBoats();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  const CountUp = ({ end, duration = 1500, suffix = "" }) => {
    const [value, setValue] = useState(0);
    const ref = useRef(null);
    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      let started = false;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !started) {
              started = true;
              const start = performance.now();
              const animate = (t) => {
                const p = Math.min((t - start) / duration, 1);
                const current = Math.floor(p * end);
                setValue(current);
                if (p < 1) requestAnimationFrame(animate);
              };
              requestAnimationFrame(animate);
            }
          });
        },
        { threshold: 0.4 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }, [end, duration]);
    return (
      <span ref={ref} className="aboutus-sets-stat-number hover-text" data-aos="fade-up">
        {value}
        {suffix}
      </span>
    );
  };

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
            <h1 className="text-white hover-scale" data-aos="fade-up" data-aos-delay="250">Nirvana Yachts &amp; Boats</h1>
            <p className="landing-hero-subtitle hover-scale" data-aos="fade-up" data-aos-delay="300">
              Your gateway to a new marine world of premium boats, luxury <br />
              yachts, and a full range of water sports and activities
            </p>
          </div>
        </div>
      </section>

      <section className="aboutus-promise-section mt-5">
        <div className="aboutus-promise-wrapper" data-aos="fade-up">
          <div
            className="aboutus-promise-card"
            style={{ backgroundImage: `url(${promiseBg})` }}
          >
            <div className="aboutus-promise-panel">
              <h2 className="aboutus-promise-title" data-aos="fade-up">OUR PROMISE</h2>
              <p className="aboutus-promise-text" data-aos="fade-up" data-aos-delay="80">
                Bespoke services focused on luxury, safety, comfort, and
                sustainability
              </p>
              <div className="aboutus-promise-action">
                <button
                  type="button"
                  className="aboutus-promise-button btn-hover hoverable"
                  aria-label="Our promise"
                  data-aos="zoom-in"
                >
                  <img src={rightArrow} alt="" className="hoverable" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="aboutus-sets-section">
        <div className="aboutus-sets-stats">
          <div className="aboutus-sets-stats-grid">
            <div className="aboutus-sets-stat" data-aos="fade-up">
              <CountUp end={8} duration={1200} suffix="+" />
              <div className="aboutus-sets-stat-label hover-text" data-aos="fade-up" data-aos-delay="80">Years Experience</div>
            </div>
            <div className="aboutus-sets-stat" data-aos="fade-up" data-aos-delay="50">
              <CountUp end={1000} duration={1400} suffix="+" />
              <div className="aboutus-sets-stat-label hover-text" data-aos="fade-up" data-aos-delay="130">Happy Members</div>
            </div>
            <div className="aboutus-sets-stat" data-aos="fade-up" data-aos-delay="100">
              <CountUp end={50} duration={1200} suffix="+" />
              <div className="aboutus-sets-stat-label hover-text" data-aos="fade-up" data-aos-delay="180">Premium Boats</div>
            </div>
            <div className="aboutus-sets-stat" data-aos="fade-up" data-aos-delay="150">
              <div className="aboutus-sets-stat-number hover-text" data-aos="fade-up" data-aos-delay="200">24/7</div>
              <div className="aboutus-sets-stat-label hover-text" data-aos="fade-up" data-aos-delay="230">Support</div>
            </div>
          </div>
        </div>

        <div className="aboutus-sets-content">
          <h2 className="aboutus-sets-title hover-text" data-aos="fade-up">
            WHAT SETS US APART?
          </h2>
          <p className="aboutus-sets-subtitle hover-text" data-aos="fade-up" data-aos-delay="80">
            Your gateway to a new marine world of premium boats
          </p>

          <div className="aboutus-sets-grid">
            <div className="aboutus-sets-item" data-aos="fade-up">
              <div className="aboutus-sets-icon">
                <img src={featureShip} alt="" className="hoverable featureShip" data-aos="zoom-in" />
              </div>
              <p className="aboutus-sets-text hover-text" data-aos="fade-up" data-aos-delay="60">
                A fleet of leading international <br />
                yacht &amp; boat brands.
              </p>
            </div>
            <div className="aboutus-sets-item" data-aos="fade-up" data-aos-delay="50">
              <div className="aboutus-sets-icon">
                <img src={featureLiscence} alt="" className="hoverable featureLiscence" data-aos="zoom-in" />
              </div>
              <p className="aboutus-sets-text hover-text" data-aos="fade-up" data-aos-delay="110">
                Boat license training <br />
                programme
              </p>
            </div>
            <div className="aboutus-sets-item" data-aos="fade-up" data-aos-delay="100">
              <div className="aboutus-sets-icon">
                <img src={featureUaeClub} alt="" className="hoverable featureUaeClub" data-aos="zoom-in" />
              </div>
              <p className="aboutus-sets-text hover-text" data-aos="fade-up" data-aos-delay="160">
                UAE’s only club with <br />
                luxury houseboats.
              </p>
            </div>

            <div className="aboutus-sets-item" data-aos="fade-up">
              <div className="aboutus-sets-icon">
                <img src={featureMobApp} alt="" className="hoverable featureMobApp" data-aos="zoom-in" />
              </div>
              <p className="aboutus-sets-text hover-text" data-aos="fade-up" data-aos-delay="60">
                Mobile app for easy <br />
                booking
              </p>
            </div>
            <div className="aboutus-sets-item" data-aos="fade-up" data-aos-delay="50">
              <div className="aboutus-sets-icon">
                <img src={featureVersatileBoat} alt="" className="hoverable featureVersatileBoat" data-aos="zoom-in" />
              </div>
              <p className="aboutus-sets-text hover-text" data-aos="fade-up" data-aos-delay="110">
                Versatile boats for cruising, <br />
                fishing, and water sports
              </p>
            </div>
            <div className="aboutus-sets-item" data-aos="fade-up" data-aos-delay="100">
              <div className="aboutus-sets-icon">
                <img src={featureAddOns} alt="" className="hoverable featureAddOns" data-aos="zoom-in" />
              </div>
              <p className="aboutus-sets-text hover-text" data-aos="fade-up" data-aos-delay="160">
                Add-ons: catering, décor, <br />
                water sports gear
              </p>
            </div>
            <div className="aboutus-sets-item" data-aos="fade-up">
              <div className="aboutus-sets-icon">
                <img src={featureSixPrime} alt="" className="hoverable featureSixPrime" data-aos="zoom-in" />
              </div>
              <p className="aboutus-sets-text hover-text" data-aos="fade-up" data-aos-delay="60">
                Six prime Abu Dhabi <br />
                marinas
              </p>
            </div>
            <div className="aboutus-sets-item" data-aos="fade-up" data-aos-delay="50">
              <div className="aboutus-sets-icon">
                <img src={featureClub} alt="" className="hoverable featureClub" data-aos="zoom-in" />
              </div>
              <p className="aboutus-sets-text hover-text" data-aos="fade-up" data-aos-delay="110">
                Club lounge with <br />
                premium hospitality
              </p>
            </div>
          </div>

        </div>
      </section>
      
      <section className="boats-section">
        <div className="boats-header" data-aos="fade-up">
          <p className="boats-kicker">Boats &amp; Yachts</p>
          <h2 className="boats-heading">Our Premium Fleet</h2>
          <p className="text-black mt-3">
            Discover our collection of luxury boats, perfect for your next
            adventure on the water
          </p>
        </div>
        <div className="boats-grid">
          {boats.map((boat, index) => (
            <div
              className="boat-card"
              key={boat.id || index}
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              <div
                className="boat-card-image"
                style={{ backgroundImage: `url(${boat.main_image})` }}
              />
              <div className="boat-card-body">
                <div className="boat-card-title">{boat.name}</div>
                <div className="boat-card-meta">
                  <span>Location: {boat.location?.name || "N/A"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default LandingPageAboutus;
