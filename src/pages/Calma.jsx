import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import landingBg from "../assets/images/calma/calma-mainBg.png";

import Header from "../components/Header";
import Footer from "../components/Footer";

import calmaBg from "../assets/images/calma/calma-bg.jpg";

import loc1 from "../assets/images/calma/calma1.png";
import loc2 from "../assets/images/calma/calma2.png";
import loc3 from "../assets/images/calma/calma3.png";
import loc4 from "../assets/images/calma/calma4.png";
import loc5 from "../assets/images/calma/calma5.png";
import loc6 from "../assets/images/calma/calma6.png";

import calmaBg2 from "../assets/images/calma/calma-bg2.png";

import calmaBg3 from "../assets/images/calma/calma-bg3.jpg";

const Calma = () => {
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

  const [activeIndex, setActiveIndex] = useState(0);
  const boats = [
    {
      id: "calma1",
      tab: "calma 1",
      name: "Best Marine Houseboat",
      hero: calmaBg,
      thumbs: [loc1, loc2, loc4, loc5, loc6],
      specs: [
        { label: "Length", value: "52 ft 6 in (16 m)" },
        { label: "Engines", value: "Twin Mercury V10" },
        { label: "Engine Power", value: "2 × 350 hp" },
        { label: "No. of Passengers", value: "20" },
      ],
    },
    {
      id: "calma2",
      tab: "calma 2",
      name: "Best Marine Houseboat",
      hero: calmaBg2,
      thumbs: [loc3, loc4, loc5, loc6, loc1],
      specs: [
        { label: "Length", value: "52 ft 6 in (16 m)" },
        { label: "Engines", value: "Twin Mercury V10" },
        { label: "Engine Power", value: "2 × 350 hp" },
        { label: "No. of Passengers", value: "20" },
      ],
    },
    {
      id: "calma3",
      tab: "calma 3",
      name: "Best Marine Houseboat",
      hero: calmaBg3,
      thumbs: [loc2, loc3, loc4, loc5, loc6],
      specs: [
        { label: "Length", value: "52 ft 6 in (16 m)" },
        { label: "Engines", value: "Twin Mercury V10" },
        { label: "Engine Power", value: "2 × 350 hp" },
        { label: "No. of Passengers", value: "20" },
      ],
    },
  ];

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
            <h1 className="text-white">Floating Suites</h1>
            <p className="landing-hero-subtitle">
              3 luxury suites with 1–2 bedrooms, lounge, and <br /> kitchenette... an unforgettable sea escape.
            </p>
          </div>
        </div>
      </section>

      <section className="calma-section">
        <div className="container" data-aos="fade-up">
          <div className="calma-tabs">
            {boats.map((b, i) => (
              <button
                key={b.id}
                type="button"
                className={`calma-tab btn-hover ${activeIndex === i ? "active" : ""}`}
                onClick={() => setActiveIndex(i)}
                aria-label={b.tab}
                // data-aos="fade-up"
                // data-aos-delay={i * 60}
              >
                {b.tab}
              </button>
            ))}
          </div>

          <div className="calma-card" data-aos="zoom-in">
            <img src={boats[activeIndex].hero} alt="" className="calma-hero hoverable rounded-0" />
            <div className="calma-thumbs" data-aos="fade-up" data-aos-delay="120">
              {boats[activeIndex].thumbs.map((t, idx) => (
                <div key={idx} className="calma-thumb hoverable">
                  <img src={t} alt="" />
                </div>
              ))}
            </div>
            <div className="calma-info" data-aos="fade-up" data-aos-delay="160">
              <h3 className="calma-title hover-scale">{boats[activeIndex].name}</h3>
              <div className="calma-specs">
                {boats[activeIndex].specs.map((s, idx) => (
                  <div key={idx} className="calma-spec hover-text">
                    <span className="calma-spec-label">{s.label}:</span>
                    <span className="calma-spec-value">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Calma;
