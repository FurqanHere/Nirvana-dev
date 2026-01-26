import "../../../assets/css/base.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import bdShipImg from "../../../assets/images/bs-ship.png";
import whiteBlueShip from "../../../assets/images/white-blue-ship.png";
import blueThumbsUp from "../../../assets/images/blueThumbsUp.png";
import boat1 from "../../../assets/images/boat1.png";
import boat2 from "../../../assets/images/boat2.png";

const Experiences = ({
  selectedTab,
  setSelectedTab,
  setSelectedSection,
  selectedMarina,
  setSelectedMarina,
  filteredCards,
  search,
  setSearch,
  marinaOptions,
}) => {
  const navigate = useNavigate();

  return (
    <div className="experiences-home-view boat-dashboard-screen">
      <div className="experiences-hero-section">
        <img
          src={bdShipImg}
          alt="Luxury Yacht"
          className="experiences-hero-image"
        />
      </div>

      <div className="experiences-interactive-section">
        <div className="experiences-type-buttons">
          <button
            type="button"
            className={`experiences-type-btn ${
              selectedTab === "bookings" ? "active" : ""
            }`}
            onClick={() => {
              setSelectedTab("bookings");
              setSelectedSection("boats");
            }}
          >
            <img
              src={whiteBlueShip}
              className="bookings-type-experiences-img bookings-type-experiences-img-ii"
              alt=""
            />
            <span>Bookings</span>
          </button>
          <button
            type="button"
            className={`experiences-type-btn ${
              selectedTab === "experiences" ? "active" : ""
            }`}
            onClick={() => {
              setSelectedTab("experiences");
              setSelectedSection("experiences");
            }}
          >
            <img
              src={blueThumbsUp}
              className="bookings-type-experiences-img"
              alt=""
            />
            <span>Experiences</span>
          </button>
        </div>
        <div className="bookings-marina-select">
          <Dropdown
            value={selectedMarina}
            onChange={(e) => setSelectedMarina(e.value)}
            options={marinaOptions}
            optionLabel="label"
            placeholder="Select Marina"
            className="marina-dropdown-prime"
          />
          <input
            type="text"
            placeholder="Search"
            className="bookings-search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="experiences-listings-grid">
        {filteredCards.map((card, index) => (
          <div
            key={card.id}
            className="experiences-listing-card"
            onClick={() => navigate("/yacht-details")}
          >
            <div className="experiences-listing-image">
              <img src={card.image} alt={card.title} />
              <div className="experiences-listing-content">
                <div className="experiences-listing-content-left">
                  <h3 className="experiences-listing-title">
                    {card.title}
                  </h3>
                  <p className="experiences-listing-engine">
                    {card.ref}
                  </p>
                </div>
                <p className="experiences-listing-length">
                  {card.date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experiences;
