import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import landingBg from "../assets/images/experiences/experience-bg.png";
import Header from "../components/Header";
import Footer from "../components/Footer";
import wheel from "../assets/images/wheel-img.png";
import deco from "../assets/images/boat/deco.png";
import ApiService from "../services/ApiService";

const Boat = () => {
  const [boats, setBoats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBoats();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: false,
      offset: 120,
    });
  }, []);

  const fetchBoats = async () => {
    try {
      const response = await ApiService.get('/getBoats');
      if (response.data.status) {
        setBoats(response.data.data.boats);
      } else {
        console.error("Failed to fetch boats:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching boats:", error);
    } finally {
      setLoading(false);
    }
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
            <h1 className="text-white">SIGNATURE FLEET</h1>
          </div>
        </div>
      </section>
      <section className="boats-section">
        <div className="container" data-aos="fade-up">
          <div className="boats-header">
            <span className="boats-kicker">Boats & Yachts</span>
            <h2 className="boats-heading">Top Luxurious Boat</h2>
          </div>
          <div className="boats-grid">
            {loading ? (
                <div style={{gridColumn: "1/-1", textAlign: "center", padding: "40px"}}>
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
            ) : (
                boats.map((b, idx) => (
                  <div key={b.id || idx} className="boat-card hoverable" data-aos="zoom-in" data-aos-delay={(idx % 3) * 60}>
                    <div 
                      className="boat-card-image"
                      style={{ backgroundImage: `url(${b.main_image})` }}
                    />
                    <div className="boat-card-body">
                      <h3 className="boat-card-title hover-text">{b.name}</h3>
                      <div className="boat-card-meta">
                        <span>Capacity: {b.max_persons}</span>
                        <span>Length: {b.length_meters}m</span>
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
        <div className="wheel">
          <img src={ wheel } alt="" />
        </div>
        <div className="deco">
          <img src={ deco } alt="" />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Boat;
