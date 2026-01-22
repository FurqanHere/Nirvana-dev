import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import landingBg from "../assets/images/experiences/experience-bg.png";

import Header from "../components/Header";
import Footer from "../components/Footer";

import romanticMain from "../assets/images/experiences/romantic-bg.png";
import romanticThumb1 from "../assets/images/experiences/romantic-img1.png";
import romanticThumb2 from "../assets/images/experiences/romantic-img2.png";

import adventureMain from "../assets/images/experiences/sun-cruise.png";
import adventureThumb1 from "../assets/images/experiences/romantic-img1.png";
import adventureThumb2 from "../assets/images/experiences/romantic-img2.png";

import celebrationMain from "../assets/images/experiences/photography.png";
import celebrationThumb1 from "../assets/images/experiences/romantic-img1.png";
import celebrationThumb2 from "../assets/images/experiences/romantic-img2.png";

import foodMain from "../assets/images/experiences/enjoyment.png";
import foodThumb1 from "../assets/images/experiences/romantic-img1.png";
import foodThumb2 from "../assets/images/experiences/romantic-img2.png";

import "../assets/css/base.css"

const Experiences = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // useEffect(() => {
  //   AOS.init({
  //     duration: 1000,
  //     once: true,
  //     offset: 100,
  //   });
  // }, []);

  const [activeTab, setActiveTab] = useState("romantic");

  const experienceData = {
    romantic: {
      title: "ROMANTIC JOURNEY AT SEA",
      description: "Embark on a romantic sea voyage with unforgettable views",
      mainImage: romanticMain,
      thumbs: [romanticThumb1, romanticThumb2],
    },
    adventure: {
      title: "ADVENTURE AT SEA",
      description:
        "Experience thrilling adventures and adrenaline-filled moments",
      mainImage: adventureMain,
      thumbs: [adventureThumb1, adventureThumb2],
    },
    celebration: {
      title: "CELEBRATE IN STYLE",
      description: "Make your celebrations extraordinary on luxury yachts",
      mainImage: celebrationMain,
      thumbs: [celebrationThumb1, celebrationThumb2],
    },
    food: {
      title: "FOOD & BEVERAGE EXPERIENCE",
      description: "Indulge in premium dining and curated beverage selections",
      mainImage: foodMain,
      thumbs: [foodThumb1, foodThumb2],
    },
  };
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: false,
      offset: 120,
    });
  }, []);
  useEffect(() => {
  AOS.refresh();
}, [activeTab]);


  return (
    <div className="landing-page">
      <Header />
      <section
        className="landing-hero"
        style={{ backgroundImage: `url(${landingBg})` }}
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className="landing-overlay">
          <div
            className="landing-hero-content"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h1 className="text-white">Experiences</h1>
            <p className="landing-hero-subtitle">
              Discover our curated selection of luxury yacht <br /> experiences
              designed to create unforgettable memories.
            </p>
          </div>
        </div>
      </section>

      <section className="experience-tabs-section">
        <div className="container" style={{ maxWidth: "1220px", width: "100%" }}>
          {/* Tabs */}
          <div
            className="experience-tabs"
            data-aos="fade-down"
            data-aos-delay="100"
          >
            <button
              className={activeTab === "romantic" ? "active" : ""}
              onClick={() => setActiveTab("romantic")}
            >
              Romantic
            </button>

            <button
              className={activeTab === "adventure" ? "active" : ""}
              onClick={() => setActiveTab("adventure")}
            >
              Adventure
            </button>

            <button
              className={activeTab === "celebration" ? "active" : ""}
              onClick={() => setActiveTab("celebration")}
            >
              Celebration
            </button>

            <button
              className={activeTab === "food" ? "active" : ""}
              onClick={() => setActiveTab("food")}
            >
              Food & Beverage Selection
            </button>
          </div>

          {/* Background Section */}
          <div
            className="experience-bg"
            style={{
              backgroundImage: `url(${experienceData[activeTab].mainImage})`,
            }}
            data-aos="zoom-in"
          >
            <div className="experience-overlay">
              <div className="experience-content">
                <h2 data-aos="fade-right">{experienceData[activeTab].title}</h2>
                <p data-aos="fade-right" data-aos-delay="100">
                  {experienceData[activeTab].description}
                </p>
              </div>
            </div>
            <div className="experience-thumbs">
              {experienceData[activeTab].thumbs.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="experience"
                  data-aos="fade-up"
                  data-aos-delay={index * 120}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="experiences-sets-stats">
          <div className="experience-sets-stats-grid" data-aos="fade-up">
            <h3 className="text-center text-white">
              Looking for Something Custom? Can't find what you're looking for?
            </h3>
            <p className="text-white text-center">
              Contact us to create a personalized yacht experience tailored to
              your needs.
            </p>
            <div className="experince-contactus-btn d-flex justify-content-center align-items-center">
              <button className="btn bg-white">Contact Us</button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Experiences;
