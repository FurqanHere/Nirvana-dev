import React, { useState, useEffect, useRef } from "react";
import car1 from "../assets/images/truck.png";

import googlePlay from "../assets/images/googleBtn.png";
import applePlay from "../assets/images/appleBtn.png";

import screenshot1 from "../assets/images/screenshot1.jpg";
import screenshot2 from "../assets/images/screenshot2.jpg";
import screenshot3 from "../assets/images/screenshot3.jpg";
import screenshot4 from "../assets/images/screenshot4.jpg";
import screenshot5 from "../assets/images/screenshot5.jpg";

import loadedCar from "../assets/images/loadedCar.png";

import downloadApp from "../assets/images/downloadApp.png";

import functional from "../assets/images/functional.png";
import liveChat from "../assets/images/liveChat.png";
import secureData from "../assets/images/secureData.png";
import locationTracking from "../assets/images/location.png";
import settings from "../assets/images/settings.png";
import multipleLanguages from "../assets/images/multipleLanguages.png";

import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "bootstrap/dist/css/bootstrap.min.css";

import { useLocation } from "react-router-dom";
import { scroller } from "react-scroll";

import ApiService from "../services/ApiService";

const HomePage = () => {
  const navigate = useNavigate();
  const [scrollX, setScrollX] = useState(0);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Counter animation states
  const [counters, setCounters] = useState({
    serviceCoverage: 0,
    towTrucks: 0,
    recoveries: 0,
    years: 0,
  });
  const [countersStarted, setCountersStarted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const moveX = scrollPosition * 0.5;
      setScrollX(moveX);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const svgRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    const path = pathRef.current;

    if (!svg || !path) return;

    const scroll = () => {
      const distance = window.scrollY;
      const totalDistance = svg.clientHeight - window.innerHeight;
      console.log(totalDistance);
      const percentage = distance / totalDistance;
      const pathLength = path.getTotalLength();

      path.style.strokeDasharray = `${pathLength}`;
      path.style.strokeDashoffset = `${pathLength * (1 - percentage)}`;
    };

    scroll();
    window.addEventListener("scroll", scroll);

    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, []);

  // Fetch cars data from API
  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ApiService.get("/getCars?page=1");

      if (response.data.status && response.data.data.cars) {
        setCars(response.data.data.cars);
      } else {
        setError("Failed to fetch cars data");
      }
    } catch (err) {
      console.error("Error fetching cars:", err);
      setError("Failed to load cars. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Counter animation effect
  useEffect(() => {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: "0px",
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !countersStarted) {
          setCountersStarted(true);

          // Animate counters
          const duration = 2000; // 2 seconds
          const steps = 60;
          const interval = duration / steps;

          const targets = {
            serviceCoverage: 10,
            towTrucks: 40,
            recoveries: 15820,
            years: 13,
          };

          let currentStep = 0;
          const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;

            setCounters({
              serviceCoverage: Math.floor(targets.serviceCoverage * progress),
              towTrucks: Math.floor(targets.towTrucks * progress),
              recoveries: Math.floor(targets.recoveries * progress),
              years: Math.floor(targets.years * progress),
            });

            if (currentStep >= steps) {
              clearInterval(timer);
              // Ensure final values
              setCounters({
                serviceCoverage: targets.serviceCoverage,
                towTrucks: targets.towTrucks,
                recoveries: targets.recoveries,
                years: targets.years,
              });
            }
          }, interval);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    const aboutSection = document.getElementById("aboutus");

    if (aboutSection) {
      observer.observe(aboutSection);
    }

    return () => {
      if (aboutSection) {
        observer.unobserve(aboutSection);
      }
    };
  }, [countersStarted]);

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const section = location.hash.replace("#", "");
      scroller.scrollTo(section, {
        duration: 500,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    }
  }, [location]);

  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="img1">
        <Header />
        {/* Banner Sec */}
        <div className="header-banner" id="home">
          <div className="container">
            <div className="row">
              <div className="col-md-5 col-12">
                <div className="header-txt1">
                  <div
                    className="position-relative"
                    data-aos="fade-right"
                    data-aos-delay="100"
                  >
                    <h2 className="text-white homepage-hero-heading">
                      Reliable Towing Services Anytime, Anywhere, Keeping You
                      Safe on Every Journey
                    </h2>
                  </div>
                  <p
                    className="text-white homepage-hero-description"
                    data-aos="fade-right"
                    data-aos-delay="200"
                  >
                    Present your app in a unique and engaging manner with App,
                    designed to highlight its features & attract potential users
                    effectively.
                  </p>
                </div>
                <div
                  className="d-flex flex-row flex-sm-row gap-3"
                  data-aos="fade-right"
                  data-aos-delay="300"
                >
                  <a
                    // href="https://play.google.com/store/apps/details?id=com.devicebee.gear"
                    // target="_blank"
                    // rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    <img
                      src={googlePlay}
                      alt="Download on Google Play"
                      className="homepage-download-button"
                    />
                  </a>
                  <a
                    // href="https://apps.apple.com/ae/app/gear-hire-car/id6747331842"
                    // target="_blank"
                    // rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    <img
                      src={applePlay}
                      alt="Download on the App Store"
                      className="homepage-download-button"
                    />
                  </a>
                </div>
              </div>
              {/* Right Side */}
              <div className="col-md-7 col-12">
                <div className="bg-clr">
                  <div className="bg-1"></div>
                  <div className="bg-2"></div>
                  <div className="bg-3"></div>
                  <div className="bg-4"></div>
                </div>
                <div
                  className="carImg"
                  data-aos="fade-left"
                  data-aos-delay="400"
                >
                  <img src={car1} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Us */}
      <div className="container my-5" id="aboutus">
        <div className="row align-items-start mb-5">
          <div className="col-md-5" data-aos="fade-right" data-aos-delay="100">
            <h2 className="fw-bold mb-4 homepage-about-heading">
              About Autolift
            </h2>
            <img
              src={loadedCar}
              alt="Tow truck with loaded car"
              className="img-fluid homepage-about-image"
            />
          </div>
          <div className="col-md-7" data-aos="fade-left" data-aos-delay="200">
            <div className="homepage-about-text-wrapper">
              <p className="mb-3 homepage-about-paragraph-bold">
                Dedicated to delivering reliable towing solutions with honesty,
                speed, & professionalism, we ensure every driver receives the
                care, safety, and support they truly deserve.
              </p>
              <p className="mb-0 homepage-about-paragraph-regular">
                Backed by years of expertise, our committed team offers
                trustworthy towing, emergency roadside support, & recovery
                solutions designed to keep drivers safe, secure, & confident on
                every journey, anytime and anywhere.
              </p>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div
            className="col-md-3 col-sm-6 mb-4"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="text-center">
              <p className="text-secondary mb-0 homepage-about-stat-label">
                SERVICE COVERAGE
              </p>
              <h3 className="fw-bold mb-2 homepage-about-stat-number">
                {counters.serviceCoverage}+
              </h3>
            </div>
          </div>
          <div
            className="col-md-3 col-sm-6 mb-4"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="text-center">
              <p className="text-secondary mb-0 homepage-about-stat-label">
                Tow Trucks
              </p>
              <h3 className="fw-bold mb-2 homepage-about-stat-number">
                {counters.towTrucks}+
              </h3>
            </div>
          </div>
          <div
            className="col-md-3 col-sm-6 mb-4"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="text-center">
              <p className="text-secondary mb-0 homepage-about-stat-label">
                Successful Recoveries
              </p>
              <h3 className="fw-bold mb-2 homepage-about-stat-number">
                {counters.recoveries.toLocaleString()}+
              </h3>
            </div>
          </div>
          <div
            className="col-md-3 col-sm-6 mb-4"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="text-center">
              <p className="text-secondary mb-0 homepage-about-stat-label">
                Years
              </p>
              <h3 className="fw-bold mb-2 homepage-about-stat-number">
                {counters.years}+
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Explore Premium Features */}
      <div
        className="container-fluid homepage-features-section"
        id="features"
      >
        <div className="container">
          <div
            className="text-center mb-5"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h2 className="fw-bold mb-3 homepage-features-heading">
              Explore Premium Features
            </h2>
            <p className="text-secondary homepage-features-description">
              Discover the unique features of sApp that set it apart from the
              competition, designed to deliver unmatched performance and
              seamless user experiences.
            </p>
          </div>
          <div className="row g-4">
            {/* Row 1 */}
            <div
              className="col-md-4 col-sm-6"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="text-center p-4">
                <div className="mb-3">
                  <img
                    src={functional}
                    className="homepage-features-icon homepage-features-icon-1"
                    alt=""
                  />
                </div>
                <h5 className="fw-bold mb-3">Fully Functional</h5>
                <p className="text-secondary">
                  Enjoy a complete suite of features designed for seamless user
                  experiences.
                </p>
              </div>
            </div>
            <div
              className="col-md-4 col-sm-6"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="text-center p-4">
                <div className="mb-3">
                  <img
                    src={liveChat}
                    className="homepage-features-icon homepage-features-icon-2"
                    alt=""
                  />
                </div>
                <h5 className="fw-bold mb-3">Live Chat</h5>
                <p className="text-secondary">
                  Connect with your audience in real-time for instant support
                  and engagement.
                </p>
              </div>
            </div>
            <div
              className="col-md-4 col-sm-6"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="text-center p-4">
                <div className="mb-3">
                  <img
                    src={secureData}
                    className="homepage-features-icon homepage-features-icon-3"
                    alt=""
                  />
                </div>
                <h5 className="fw-bold mb-3">Secure Data</h5>
                <p className="text-secondary">
                  Protect your information with industry-leading security
                  measures and encryption.
                </p>
              </div>
            </div>
            {/* Row 2 */}
            <div
              className="col-md-4 col-sm-6"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="text-center p-4">
                <div className="mb-3">
                  <img
                    src={locationTracking}
                    className="homepage-features-icon homepage-features-icon-4"
                    alt=""
                  />
                </div>
                <h5 className="fw-bold mb-3">Location Tracking</h5>
                <p className="text-secondary">
                  Gain insights into user behavior with advanced location
                  tracking capabilities.
                </p>
              </div>
            </div>
            <div
              className="col-md-4 col-sm-6"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="text-center p-4">
                <div className="mb-3">
                  <img
                    src={settings}
                    className="homepage-features-icon homepage-features-icon-5"
                    alt=""
                  />
                </div>
                <h5 className="fw-bold mb-3">Powerful Settings</h5>
                <p className="text-secondary">
                  Take control with robust settings that allow for personalized
                  app configurations.
                </p>
              </div>
            </div>
            <div
              className="col-md-4 col-sm-6"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <div className="text-center p-4">
                <div className="mb-3">
                  <img
                    src={multipleLanguages}
                    className="homepage-features-icon homepage-features-icon-6"
                    alt=""
                  />
                </div>
                <h5 className="fw-bold mb-3">Multiple Language</h5>
                <p className="text-secondary">
                  Reach a wider audience with support for multiple languages and
                  localization options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile App Screenshots */}
      <div
        id="screenshot"
        className="screenshots-hero homepage-screenshots-section"
      >
        <div className="container homepage-screenshots-container">
          <div
            className="text-center mb-5"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h2 className="fw-bold mb-3 homepage-screenshots-heading">
              Mobile App Screenshots
            </h2>
            <p className="text-white homepage-screenshots-description">
              Clean and elegant interface with sApp that combines simplicity
              with beauty, ensuring a smooth and enjoyable user journey.
            </p>
          </div>

          {/* Desktop/Tablet Grid Layout - Hidden on Mobile */}
          <div className="row justify-content-center align-items-center g-3 mt-4 homepage-screenshots-grid d-none d-md-flex flex-nowrap">
            <div className="col-auto" data-aos="zoom-in" data-aos-delay="100">
              <img
                src={screenshot1}
                alt="Mobile App Screenshot 1"
                className="img-fluid homepage-screenshots-image"
              />
            </div>
            <div className="col-auto" data-aos="zoom-in" data-aos-delay="200">
              <img
                src={screenshot2}
                alt="Mobile App Screenshot 2"
                className="img-fluid homepage-screenshots-image"
              />
            </div>
            <div className="col-auto" data-aos="zoom-in" data-aos-delay="300">
              <img
                src={screenshot3}
                alt="Mobile App Screenshot 3"
                className="img-fluid homepage-screenshots-image"
              />
            </div>
            <div className="col-auto" data-aos="zoom-in" data-aos-delay="400">
              <img
                src={screenshot4}
                alt="Mobile App Screenshot 4"
                className="img-fluid homepage-screenshots-image"
              />
            </div>
            <div className="col-auto" data-aos="zoom-in" data-aos-delay="500">
              <img
                src={screenshot5}
                alt="Mobile App Screenshot 5"
                className="img-fluid homepage-screenshots-image"
              />
            </div>
          </div>

          {/* Mobile Swiper Slider - Only Visible on Mobile */}
          <div className="homepage-screenshots-swiper d-md-none mt-4">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={1.5}
              centeredSlides={true}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={false}
              breakpoints={{
                320: {
                  slidesPerView: 1.2,
                  spaceBetween: 15,
                },
                480: {
                  slidesPerView: 1.5,
                  spaceBetween: 20,
                },
              }}
              className="screenshots-swiper"
            >
              <SwiperSlide>
                <div className="d-flex justify-content-center">
                  <img
                    src={screenshot1}
                    alt="Mobile App Screenshot 1"
                    className="img-fluid homepage-screenshots-image"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="d-flex justify-content-center">
                  <img
                    src={screenshot2}
                    alt="Mobile App Screenshot 2"
                    className="img-fluid homepage-screenshots-image"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="d-flex justify-content-center">
                  <img
                    src={screenshot3}
                    alt="Mobile App Screenshot 3"
                    className="img-fluid homepage-screenshots-image"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="d-flex justify-content-center">
                  <img
                    src={screenshot4}
                    alt="Mobile App Screenshot 4"
                    className="img-fluid homepage-screenshots-image"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="d-flex justify-content-center">
                  <img
                    src={screenshot5}
                    alt="Mobile App Screenshot 5"
                    className="img-fluid homepage-screenshots-image"
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>

      {/* Download Our App */}
      <div
        className="container py-5 homepage-download-section"
        id="downloadApp"
      >
        <div className="row align-items-center">
          <div
            className="col-md-6 mb-4 mb-md-0"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <div className="position-relative homepage-download-image-wrapper">
              <img
                src={downloadApp}
                alt="Download App"
                className="img-fluid homepage-download-image"
              />
            </div>
          </div>
          <div className="col-md-6" data-aos="fade-left" data-aos-delay="200">
            <h2 className="fw-bold mb-4">Download Our App</h2>
            <p className="text-secondary mb-4 homepage-download-description">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3">
              <a
                // href="https://play.google.com/store/apps/details?id=com.devicebee.gear"
                // target="_blank"
                // rel="noopener noreferrer"
                className="text-decoration-none"
              >
                <img
                  src={googlePlay}
                  alt="Download on Google Play"
                  className="download-button"
                />
              </a>
              <a
                // href="https://apps.apple.com/ae/app/gear-hire-car/id6747331842"
                // target="_blank"
                // rel="noopener noreferrer"
                className="text-decoration-none"
              >
                <img
                  src={applePlay}
                  alt="Download on the App Store"
                  className="download-button"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          className="scroll-to-top-btn"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      )}
    </>
  );
};

export default HomePage;
