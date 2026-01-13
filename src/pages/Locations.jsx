import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import landingBg from "../assets/images/experiences/experience-bg.png";

import Header from "../components/Header";
import Footer from "../components/Footer";

import locationMap from "../assets/images/location-map.png";
import loc1 from "../assets/images/loc1.png";
import loc2 from "../assets/images/loc2.png";
import loc3 from "../assets/images/loc3.png";
import loc4 from "../assets/images/loc4.png";
import loc5 from "../assets/images/loc5.png";
import loc6 from "../assets/images/loc6.png";

const Locations = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: false,
      offset: 120,
    });
  }, []);

  const [activePin, setActivePin] = useState(null);
  const locationsData = [
    { id: "yas", title: "YAS MARINA", image: loc1, style: { left: "5%", top: "50%" } },
    { id: "saadiyat", title: "SAADIYAT MARINA", image: loc2, style: { left: "50%", top: "53%", transform: "translateX(-50%)" } },
    { id: "emirates", title: "EMIRATES PALACE MANDARIN ORIENTAL", image: loc3, style: { right: "1%", top: "9%" } },
    { id: "erth", title: "ERTH HOTEL", image: loc4, style: { right: "7%", top: "55%" } },
    { id: "royal", title: "ROYAL M MARINA", image: loc5, style: { left: "15%", top: "80%" } },
    { id: "best", title: "BEST MARINE BAY MARINA", image: loc6, style: { right: "24%", top: "85%" } },
  ];

  const activeLocation = locationsData.find((loc) => loc.id === activePin);

  const getPreviewStyle = () => {
    if (!activeLocation) return {};
    const { style } = activeLocation;
    const baseTransform = "translateY(-100%) translateY(-20px)"; // Shift up above pin + gap
    
    // Determine horizontal shift based on positioning
    let xShift = "";
    if (style.left) {
      xShift = "translateX(-15%)"; // Shift left to center (approx)
      if (activeLocation.id === "saadiyat") xShift = "translateX(-50%)"; // Saadiyat is centered
    } else if (style.right) {
      xShift = "translateX(15%)"; // Shift right to center (approx)
    }

    return {
      ...style,
      transform: `${xShift} ${baseTransform}`,
      zIndex: 10,
    };
  };

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
            <h1 className="text-white">Mariana Locations</h1>
            
          </div>
        </div>
      </section>

      <section className="locations-map-section" id="locations-map">
        <div className="container">
          <div className="location-map-wrap" data-aos="fade-up" onMouseLeave={() => setActivePin(null)}>
            <img src={locationMap} alt="" className="location-map-bg" />
            {activeLocation && (
              <div 
                className="location-preview" 
                style={getPreviewStyle()}
                data-aos="zoom-in" 
                data-aos-delay="120"
              >
                <img src={activeLocation.image} alt="" className="location-preview-img hoverable" />
              </div>
            )}

            {locationsData.map((loc) => (
              <button
                key={loc.id}
                type="button"
                className={`location-pin hoverable`}
                style={loc.style}
                aria-label={loc.title}
                onMouseEnter={() => setActivePin(loc.id)}
                onMouseLeave={() => setActivePin(null)}
              >
                <span className="pin-label">{loc.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Locations;
