import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import landingBg from "../assets/images/landing-page-bg-img.png";
import logoBlue from "../assets/images/logo-blue.png";
import thumbnail1 from "../assets/images/thumbnail1.png";
import thumbnail2 from "../assets/images/thumbnail2.png";
import thumbnail3 from "../assets/images/thumbnail3.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import LandingPageHeader from "../components/Header";
import LandingPageFooter from "../components/Footer";
import wheels from "../assets/images/wheel-img.png";

import leftBlueDeco from "../assets/images/left-blue-deco-img.png";
import yellowStrap from "../assets/images/yellow-strap.png";
import whiteStrap from "../assets/images/white-strap.png";
import blueStrap from "../assets/images/blue-strap.png";
import yellowStar from "../assets/images/yellow-star.png";
import whiteStar from "../assets/images/white-star.png";
import grayStar from "../assets/images/gray-star.png";

import appBg from "../assets/images/app-bg-img.png";
import appSS2 from "../assets/images/app-ss/app-ss2.png";
import appSS3 from "../assets/images/app-ss/app-ss3.png";
import appSS4 from "../assets/images/app-ss/app-ss4.png";
import appSS5 from "../assets/images/app-ss/app-ss5.png";
import appSS6 from "../assets/images/app-ss/app-ss6.png";
import appSS10 from "../assets/images/app-ss/app-ss10.png";

import scrollTopIcon from "../assets/images/arrow-up.png";
import leftDecoPiece from "../assets/images/left-deco-piece.png";
import googleBtn from "../assets/images/googleBtn.png";
import appleBtn from "../assets/images/appleBtn.png";

import downloadAppSS from "../assets/images/downloadAppSS.png";

const HomePage = () => {
  const [showTop, setShowTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const appSlides = [appSS2, appSS3, appSS4, appSS5, appSS6, appSS10].filter(Boolean);
  const slidesTablet = Math.min(2, appSlides.length);
  const slidesDesktop = Math.min(3, appSlides.length);
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);
  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.pageYOffset > 400);
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? doc.scrollTop / max : 0;
      setScrollProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  return (
    <div className="landing-page">
      <LandingPageHeader />
      <section
        className="landing-hero"
        style={{ backgroundImage: `url(${landingBg})` }}
      >
        <div className="landing-overlay mt-5">
          <div
            className="landing-hero-content"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h1 className="text-white">Nirvana Yachts &amp; Boats</h1>
            <p className="landing-hero-subtitle">
              Your gateway to a new marine world of premium boats, luxury <br />
              yachts, and a full range of water sports and activities
            </p>
            <span className="landing-hero-divider"></span>
          </div>
        </div>
      </section>

      {/* Services Spacer */}

      <section className="about-section position-relative">
        <div className="about-grid">
          <div
            className="about-left"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <div className="about-kicker">
              <span className="about-kicker-text">About Us</span>
              <img src={logoBlue} alt="" className="about-kicker-logo" />
            </div>
            <h2 className="about-heading">
              Bespoke services focused <br /> on luxury, safety, comfort, <br />
              and sustainability
            </h2>
            <p className="about-subtext">
              Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit,
              sed do eiusmod temporju <br /> incididunt ut.
            </p>
          </div>
          <div
            className="about-right"
            data-aos="fade-left"
            data-aos-delay="100"
          >
            <div className="about-images" data-aos="zoom-in">
              <div className="about-image about-image-large">
                <Swiper
                  modules={[Pagination, Autoplay]}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  allowTouchMove={false}
                  simulateTouch={false}
                  touchStartPreventDefault={false}
                >
                  <SwiperSlide>
                    <img src={thumbnail1} alt="" className="hoverable" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={thumbnail2} alt="" className="hoverable" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={thumbnail3} alt="" className="hoverable" />
                  </SwiperSlide>
                </Swiper>
              </div>
              <div className="about-image">
                <img src={thumbnail2} alt="" className="hoverable" />
              </div>
              <div className="about-image">
                <img src={thumbnail3} alt="" className="hoverable" />
              </div>
            </div>
          </div>
        </div>
        <p className="about-body">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt.
        </p>
        <div className="wheels-img">
          <img src={wheels} className="w-100 h-100" alt="" />
        </div>
        <div className="left-blue-deco-img">
          <img src={leftBlueDeco} className="w-100 h-100" alt="" />
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

      {/* Screenshots of App */}
      <section
        className="app-section"
        id="screenshots"
        style={{
          backgroundImage: `url(${appBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="app-overlay">
          <div className="app-header" data-aos="fade-up">
            <h2 className="app-title">Our Smart Mobile App Screenshorts</h2>
            <p className="app-subtitle">
              Sed ut perspiciatis unde omnis iste natus error sit <br />
              voluptatem accusantium doloremque.
            </p>
          </div>
          <div className="app-slider" data-aos="fade-up">
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              loop
              allowTouchMove={false}
              simulateTouch={false}
              touchStartPreventDefault={false}
              centeredSlides
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: slidesTablet },
                1024: { slidesPerView: slidesDesktop },
              }}
            >
              {appSlides.map((ss, idx) => (
                <SwiperSlide key={idx}>
                  <img src={ss} alt={`App Screenshot ${idx + 1}`} className="app-ss hoverable" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Download App */}
      <section className="download-App-main" id="download">
        <div className="container-fluid">
          <div className="downloadApp" data-aos="fade-up">
            <img src={leftDecoPiece} alt="" className="download-left-deco" />
            <div className="row align-items-center">
              <div className="col-12 col-lg-6" data-aos="fade-right">
                <div className="download-left-slot">
                  <h1>Download Our App</h1>
                <span className="downloadApp-copy">
                  Sed ut perspiciatis unde omnis iste lorem prefect <br /> natus error sit
                  voluptatem accusan generated an <br /> tium doloremque text provider.
                </span>
                <div className="download-badges" data-aos="zoom-in" data-aos-delay="150">
                  <img src={googleBtn} alt="Get it on Google Play" className="download-badge hoverable" />
                  <img src={appleBtn} alt="Download on the App Store" className="download-badge hoverable" />
                </div>
                </div>
              </div>
              <div className="col-12 col-lg-6" data-aos="fade-left">
                <div className="download-right-slot">
                  <img src={downloadAppSS} alt="" className="w-100 hoverable" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LandingPageFooter />
      {showTop && (
        <button
          type="button"
          className="scroll-top-btn btn-hover"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          style={{ "--progress": `${Math.round(scrollProgress * 100)}%` }}
        >
          <img
            src={scrollTopIcon}
            alt=""
            style={{ width: "18px", height: "16px" }}
          />
        </button>
      )}
    </div>
  );
};

export default HomePage;
