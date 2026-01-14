import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import landingBg from "../assets/images/experiences/experience-bg.png";
import Header from "../components/Header";
import Footer from "../components/Footer";
import boat1 from "../assets/images/boat/boat1.png";
import boat2 from "../assets/images/boat/boat2.png";
import boat3 from "../assets/images/boat/boat3.png";
import wheel from "../assets/images/wheel-img.png";
import deco from "../assets/images/boat/deco.png";

const Boat = () => {
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
            <h1 className="text-white">SIGNATURE FLEET</h1>
          </div>
        </div>
      </section>
      <section className="boat-catalog-section">
        <div className="container" data-aos="fade-up">
          <div className="boat-catalog-header">
            <span className="boat-catalog-eyebrow">Boats & Yachts</span>
            <h2 className="boat-catalog-title">Top Luxurious Boat</h2>
          </div>
          <div className="boat-grid">
            {[
              { name: "Calma Suite 1", engine: "Engine: Twin Mercury V10", length: "Length: 16m", image: boat1 },
              { name: "Tender 9 (7.9m)", engine: "Twin Mercury V10 • 2 × 225 HP", length: "Length: 7.9m", image: boat2 },
              { name: "Calma Suite 3", engine: "Engine: Twin Mercury V10", length: "Length: 16m", image: boat3 },
              { name: "Calma Suite 1", engine: "Engine: Twin Mercury V10", length: "Length: 16m", image: boat1 },
              { name: "Tender 9 (7.9m)", engine: "Twin Mercury V10 • 2 × 225 HP", length: "Length: 7.9m", image: boat2 },
              { name: "Calma Suite 3", engine: "Engine: Twin Mercury V10", length: "Length: 16m", image: boat3 },
              { name: "Calma Suite 1", engine: "Engine: Twin Mercury V10", length: "Length: 16m", image: boat1 },
              { name: "Tender 9 (7.9m)", engine: "Twin Mercury V10 • 2 × 225 HP", length: "Length: 7.9m", image: boat2 },
              { name: "Calma Suite 3", engine: "Engine: Twin Mercury V10", length: "Length: 16m", image: boat3 },
              { name: "Calma Suite 1", engine: "Engine: Twin Mercury V10", length: "Length: 16m", image: boat1 },
              { name: "Tender 9 (7.9m)", engine: "Twin Mercury V10 • 2 × 225 HP", length: "Length: 7.9m", image: boat2 },
              { name: "Calma Suite 3", engine: "Engine: Twin Mercury V10", length: "Length: 16m", image: boat3 },
              { name: "Calma Suite 1", engine: "Engine: Twin Mercury V10", length: "Length: 16m", image: boat1 },
              { name: "Tender 9 (7.9m)", engine: "Twin Mercury V10 • 2 × 225 HP", length: "Length: 7.9m", image: boat2 },
              { name: "Calma Suite 3", engine: "Engine: Twin Mercury V10", length: "Length: 16m", image: boat3 },
              { name: "Calma Suite 1", engine: "Engine: Twin Mercury V10", length: "Length: 16m", image: boat1 },
              { name: "Tender 9 (7.9m)", engine: "Twin Mercury V10 • 2 × 225 HP", length: "Length: 7.9m", image: boat2 },
              { name: "Calma Suite 3", engine: "Engine: Twin Mercury V10", length: "Length: 16m", image: boat3 },
              { name: "Calma Suite 1", engine: "Engine: Twin Mercury V10", length: "Length: 16m", image: boat1 },
              { name: "Tender 9 (7.9m)", engine: "Twin Mercury V10 • 2 × 225 HP", length: "Length: 7.9m", image: boat2 },
              { name: "Calma Suite 3", engine: "Engine: Twin Mercury V10", length: "Length: 16m", image: boat3 },
              { name: "Calma Suite 1", engine: "Engine: Twin Mercury V10", length: "Length: 16m", image: boat1 },
              { name: "Tender 9 (7.9m)", engine: "Twin Mercury V10 • 2 × 225 HP", length: "Length: 7.9m", image: boat2 },
              { name: "Calma Suite 3", engine: "Engine: Twin Mercury V10", length: "Length: 16m", image: boat3 },
            ].map((b, idx) => (
              <div key={idx} className="boat-card hoverable" data-aos="zoom-in" data-aos-delay={(idx % 3) * 60}>
                <div className="boat-img">
                  <img src={b.image} alt={b.name} />
                </div>
                <div className="boat-info">
                  <h3 className="boat-name hover-text">{b.name}</h3>
                  <div className="boat-specs">
                    <span className="boat-spec">{b.engine}</span>
                    <span className="boat-spec">{b.length}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="boat-wheel">
          <img src={ wheel } className="boat-wheel-img" alt="" />
        </div>
        <div className="boat-deco">
          <img src={ deco } className="boat-deco-img" alt="" />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Boat;
