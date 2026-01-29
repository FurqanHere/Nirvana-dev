import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import ApiService from "../services/ApiService";

import landingBg from "../assets/images/experiences/experience-bg.png";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "../assets/css/base.css"

const Experiences = () => {
  const navigate = useNavigate();

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

  const [experienceData, setExperienceData] = useState({
    romantic: {
      title: "",
      description: "",
      mainImage: "",
      thumbs: [],
    },
    adventure: {
      title: "",
      description: "",
      mainImage: "",
      thumbs: [],
    },
    celebration: {
      title: "",
      description: "",
      mainImage: "",
      thumbs: [],
    },
    food: {
      title: "",
      description: "",
      mainImage: "",
      thumbs: [],
    },
  });

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await ApiService.get("/getExperiences");
        if (response.data.status) {
          const apiExperiences = response.data.data.experiences;
          const cleanUrl = (url) => (url ? url.replace(/[`\s]/g, "") : "");

          const getExp = (keywords) =>
            apiExperiences.find((e) =>
              keywords.some((k) => e.title.toLowerCase().includes(k))
            );

          const romantic = getExp(["romantic"]);
          const adventure = getExp(["adventure", "wildlife"]);
          const celebration = getExp(["celebrate", "birthday", "party"]);
          const food = getExp(["food", "beverage", "dining", "emirates"]);

          setExperienceData((prev) => ({
            ...prev,
            romantic: romantic
              ? {
                  title: romantic.title,
                  description: romantic.description,
                  mainImage: cleanUrl(romantic.images[0]),
                  thumbs: romantic.images.slice(0, 2).map(cleanUrl),
                }
              : prev.romantic,
            adventure: adventure
              ? {
                  title: adventure.title,
                  description: adventure.description,
                  mainImage: cleanUrl(adventure.images[0]),
                  thumbs: adventure.images.slice(0, 2).map(cleanUrl),
                }
              : prev.adventure,
            celebration: celebration
              ? {
                  title: celebration.title,
                  description: celebration.description,
                  mainImage: cleanUrl(celebration.images[0]),
                  thumbs: celebration.images.slice(0, 2).map(cleanUrl),
                }
              : prev.celebration,
            food: food
              ? {
                  title: food.title,
                  description: food.description,
                  mainImage: cleanUrl(food.images[0]),
                  thumbs: food.images.slice(0, 2).map(cleanUrl),
                }
              : prev.food,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch experiences", error);
      }
    };

    fetchExperiences();
  }, []);
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
              borderRadius: "0px",
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
              <button className="btn bg-white" onClick={() => navigate("/contact-us")}>Contact Us</button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Experiences;
