import "../assets/css/style.base.css";
import React from "react";
import Header from "../components/Header";
import tenderShip from "../assets/images/experiences-bg.png";
// import membershipBgImg from "../assets/images/main-yact-bg.png";
import yartShipImg from "../assets/images/yart-img.png";
import passengerImg from "../assets/images/passenger.png";
import yartShipImg1 from "../assets/images/ship-thumbnails1.png";
import yartShipImg2 from "../assets/images/ship-thumbnails2.png";
import yartShipImg3 from "../assets/images/ship-thumbnails3.png";
import { useNavigate } from "react-router-dom";

const YactDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="membership-page">
      <Header />
      <section
        className="membership-packages-section position-relative"
        style={{
          backgroundImage: `url(${tenderShip})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
        }}
      >
        <div className="membership-packages-container">
          <div className="experience-detail-view">
            <div className="experience-hero-section">
              <div className="experience-hero-bg"></div>
              <div className="experience-info-card">
                <h1 className="experience-info-title">TENDER 9 (T9)</h1>
                <p
                  className="experience-info-subtitle"
                  style={{
                    color: "#fff",
                    fontSize: "18px",
                    marginBottom: "20px",
                  }}
                >
                  Twin Mercury Verado V6 (2 x 225 hp)
                </p>
                <p className="experience-info-description">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                  quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores eos qui ratione voluptatem sequi
                  nesciunt.
                </p>
                <div className="experience-details">
                  <div className="experience-detail-item">
                    <div className="experience-detail-text">
                      <img
                        src={yartShipImg}
                        className="experience-detail-icon-img"
                        alt="Boat"
                      />
                    </div>
                    <div className="experience-detail-text">
                      <span className="experience-detail-label">Boat</span>
                      <span className="experience-detail-sub">
                        Subject to availability
                      </span>
                    </div>
                  </div>
                  <div className="experience-detail-item">
                    <div className="experience-detail-text">
                      <img
                        src={passengerImg}
                        className="experience-detail-icon-img"
                        alt="Passengers"
                      />
                    </div>

                    <div className="experience-detail-text">
                      <span className="experience-detail-label">10</span>
                      <span className="experience-detail-sub">
                        Max Passengers
                      </span>
                    </div>
                  </div>
                </div>
                <div className="experience-book-btn-wrapper">
                  <button
                    type="button"
                    className="experience-book-btn"
                    onClick={() => navigate("/book-experience")} // Placeholder
                  >
                    Book Experience
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            className="experience-header-row"
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <button
              className="back-button"
              onClick={() => navigate(-1)}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: "50px",
                cursor: "pointer",
                marginRight: "15px",
              }}
            >
              <i className="bi bi-arrow-left"></i>
            </button>
            {/* Title is below */}
          </div>
          <div className="ship-thumbnails">
            <img src={yartShipImg1} alt="" style={{ width: '89px', height: "89px", border: "3px solid white", borderRadius: "10px" }} />
            <img src={yartShipImg2} alt="" style={{ width: '89px', height: "89px", border: "3px solid white", borderRadius: "10px" }} />
            <img src={yartShipImg3} alt="" style={{ width: '89px', height: "89px", border: "3px solid white", borderRadius: "10px" }} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default YactDetails;
