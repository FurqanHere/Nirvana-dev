import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import landingBg from "../assets/images/about-us/aboutUs-bgImg.png";
import promiseBg from "../assets/images/about-us/aboutUs-promiseBgImg.png";
import rightArrow from "../assets/images/about-us/aboutUsRightArrow.png";
import featureShip from "../assets/images/about-us/ship.png";
import featureLiscence from "../assets/images/about-us/liscence.png";
import featureUaeClub from "../assets/images/about-us/uae-club.png";
import featureMobApp from "../assets/images/about-us/mob-app.png";
import featureVersatileBoat from "../assets/images/about-us/versatile-boat.png";
import featureAddOns from "../assets/images/about-us/add-ons.png";
import featureSixPrime from "../assets/images/about-us/six-prime.png";
import featureClub from "../assets/images/about-us/club.png";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LandingPageAboutus = () => {
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
            <h1 className="text-white hover-text" data-aos="fade-up" data-aos-delay="250">Nirvana Yachts &amp; Boats</h1>
            <p className="landing-hero-subtitle hover-text" data-aos="fade-up" data-aos-delay="300">
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
              <h2 className="aboutus-promise-title hover-text" data-aos="fade-up">OUR PROMISE</h2>
              <p className="aboutus-promise-text hover-text" data-aos="fade-up" data-aos-delay="80">
                Bespoke services focused on luxury, safety, comfort, and
                sustainability
              </p>
              <div className="aboutus-promise-action">
                <button
                  type="button"
                  className="aboutus-promise-button btn-hover"
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
              <div className="aboutus-sets-stat-number hover-text" data-aos="fade-up" data-aos-delay="50">8+</div>
              <div className="aboutus-sets-stat-label hover-text" data-aos="fade-up" data-aos-delay="80">Years Experience</div>
            </div>
            <div className="aboutus-sets-stat" data-aos="fade-up" data-aos-delay="50">
              <div className="aboutus-sets-stat-number hover-text" data-aos="fade-up" data-aos-delay="100">1000+</div>
              <div className="aboutus-sets-stat-label hover-text" data-aos="fade-up" data-aos-delay="130">Happy Members</div>
            </div>
            <div className="aboutus-sets-stat" data-aos="fade-up" data-aos-delay="100">
              <div className="aboutus-sets-stat-number hover-text" data-aos="fade-up" data-aos-delay="150">50+</div>
              <div className="aboutus-sets-stat-label hover-text" data-aos="fade-up" data-aos-delay="180">Premium Boats</div>
            </div>
            <div className="aboutus-sets-stat" data-aos="fade-up" data-aos-delay="150">
              <div className="aboutus-sets-stat-number hover-text" data-aos="fade-up" data-aos-delay="200">24/7</div>
              <div className="aboutus-sets-stat-label hover-text" data-aos="fade-up" data-aos-delay="230">Support</div>
            </div>
          </div>
        </div>

        <div className="aboutus-sets-content">
          <h2 className="aboutus-sets-title" data-aos="fade-up">
            WHAT SETS US APART?
          </h2>
          <p className="aboutus-sets-subtitle hover-text" data-aos="fade-up" data-aos-delay="80">
            Your gateway to a new marine world of premium boats
          </p>

          <div className="aboutus-sets-grid">
            <div className="aboutus-sets-item" data-aos="fade-up">
              <div className="aboutus-sets-icon">
                <img src={featureShip} alt="" className="hoverable" data-aos="zoom-in" />
              </div>
              <p className="aboutus-sets-text hover-text" data-aos="fade-up" data-aos-delay="60">
                A fleet of leading international <br />
                yacht &amp; boat brands.
              </p>
            </div>
            <div className="aboutus-sets-item" data-aos="fade-up" data-aos-delay="50">
              <div className="aboutus-sets-icon">
                <img src={featureLiscence} alt="" className="hoverable" data-aos="zoom-in" />
              </div>
              <p className="aboutus-sets-text hover-text" data-aos="fade-up" data-aos-delay="110">
                Boat license training <br />
                programme
              </p>
            </div>
            <div className="aboutus-sets-item" data-aos="fade-up" data-aos-delay="100">
              <div className="aboutus-sets-icon">
                <img src={featureUaeClub} alt="" className="hoverable" data-aos="zoom-in" />
              </div>
              <p className="aboutus-sets-text hover-text" data-aos="fade-up" data-aos-delay="160">
                UAE’s only club with <br />
                luxury houseboats.
              </p>
            </div>

            <div className="aboutus-sets-item" data-aos="fade-up">
              <div className="aboutus-sets-icon">
                <img src={featureMobApp} alt="" className="hoverable" data-aos="zoom-in" />
              </div>
              <p className="aboutus-sets-text hover-text" data-aos="fade-up" data-aos-delay="60">
                Mobile app for easy <br />
                booking
              </p>
            </div>
            <div className="aboutus-sets-item" data-aos="fade-up" data-aos-delay="50">
              <div className="aboutus-sets-icon">
                <img src={featureVersatileBoat} alt="" className="hoverable" data-aos="zoom-in" />
              </div>
              <p className="aboutus-sets-text hover-text" data-aos="fade-up" data-aos-delay="110">
                Versatile boats for cruising, <br />
                fishing, and water sports
              </p>
            </div>
            <div className="aboutus-sets-item" data-aos="fade-up" data-aos-delay="100">
              <div className="aboutus-sets-icon">
                <img src={featureAddOns} alt="" className="hoverable" data-aos="zoom-in" />
              </div>
              <p className="aboutus-sets-text hover-text" data-aos="fade-up" data-aos-delay="160">
                Add-ons: catering, décor, <br />
                water sports gear
              </p>
            </div>
          </div>

          <div className="aboutus-sets-bottom">
            <div className="aboutus-sets-item" data-aos="fade-up">
              <div className="aboutus-sets-icon">
                <img src={featureSixPrime} alt="" className="hoverable" data-aos="zoom-in" />
              </div>
              <p className="aboutus-sets-text hover-text" data-aos="fade-up" data-aos-delay="60">
                Six prime Abu Dhabi <br />
                marinas
              </p>
            </div>
            <div className="aboutus-sets-item" data-aos="fade-up" data-aos-delay="50">
              <div className="aboutus-sets-icon">
                <img src={featureClub} alt="" className="hoverable" data-aos="zoom-in" />
              </div>
              <p className="aboutus-sets-text hover-text" data-aos="fade-up" data-aos-delay="110">
                Club lounge with <br />
                premium hospitality
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default LandingPageAboutus;
