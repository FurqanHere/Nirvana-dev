import "../../../assets/css/base.css";
import React from "react";
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router-dom";
import bdShipImg from "../../../assets/images/bs-ship.png";
import blueShip from "../../../assets/images/blue-ship.png";
import whiteThumb from "../../../assets/images/experiences.png";

const Boats = ({
  selectedTab,
  setSelectedTab,
  setSelectedSection,
  selectedMarina,
  setSelectedMarina,
  filteredCards,
  marinaOptions,
  search,
  setSearch,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bookings-home-view boat-dashboard-screen">
      <div className="bookings-hero-section">
        <img
          src={bdShipImg}
          alt="Luxury Yacht"
          className="bookings-hero-image"
        />
      </div>

      <div className="bookings-interactive-section">
        <div className="bookings-type-buttons">
          <button
            type="button"
            className={`bookings-type-btn ${
              selectedTab === "bookings" ? "active" : ""
            }`}
            onClick={() => {
              setSelectedTab("bookings");
              setSelectedSection("boats");
            }}
          >
            <img
              src={blueShip}
              className="bookings-type-btn-img icon-white"
              alt=""
            />
            <span>Bookings</span>
          </button>
          <button
            type="button"
            className={`bookings-type-btn ${
              selectedTab === "experiences" ? "active" : ""
            }`}
            onClick={() => {
              setSelectedTab("experiences");
              setSelectedSection("experiences");
            }}
          >
            <img
              src={whiteThumb}
              className="bookings-type-experiences-img icon-white"
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

      <div className="bookings-listings-grid">
        {filteredCards.map((card) => (
          <div
            key={card.id}
            className="bookings-listing-card"
            onClick={() => navigate("/dashboard/boat/boat-detail", { state: { boatData: card } })}
          >
            <div className="bookings-listing-image">
              <img src={card.image} alt="Boat" />
            </div>
            <div className="bookings-listing-content">
              <h3 className="bookings-listing-title">{card.title}</h3>
              <p className="bookings-listing-ref">Registration: {card.ref}</p>
              <p className="bookings-listing-date">{card.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Boats;
