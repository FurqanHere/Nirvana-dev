import "../../../assets/css/style.base.css";
import React from "react";
import bookingShips from "../../../assets/images/bookingShips.png";

const FavouriteYacts = () => {
  const favorites = [
    {
      id: 1,
      title: "Calma Suite 1",
      model: "2025",
      capacity: 11,
      image: bookingShips,
    },
    {
      id: 2,
      title: "Calma Suite 1",
      model: "2025",
      capacity: 11,
      image: bookingShips,
    },
    {
      id: 3,
      title: "Calma Suite 1",
      model: "2025",
      capacity: 11,
      image: bookingShips,
    },
    {
      id: 4,
      title: "Calma Suite 1",
      model: "2025",
      capacity: 11,
      image: bookingShips,
    },
    {
      id: 5,
      title: "Calma Suite 1",
      model: "2025",
      capacity: 11,
      image: bookingShips,
    },
    {
      id: 6,
      title: "Calma Suite 1",
      model: "2025",
      capacity: 11,
      image: bookingShips,
    },
  ];

  return (
    <div className="favourite-yachts-view">
      <div className="favourite-yachts-header">
        <i className="bi bi-arrow-left"></i>
        <h2>Favorite Yachts & Boats</h2>
      </div>
      <div className="favourite-yachts-grid">
        {favorites.map((boat) => (
          <div key={boat.id} className="favourite-card">
            <div className="favourite-card-image-wrapper">
              <img src={boat.image} alt={boat.title} className="favourite-card-image" />
              <div className="favourite-heart-icon">
                <i className="bi bi-heart-fill"></i>
              </div>
            </div>
            <div className="favourite-card-details">
              <h3 className="favourite-card-title">{boat.title}</h3>
              <p className="favourite-card-info">Model : {boat.model}</p>
              <p className="favourite-card-info">Capacity: {boat.capacity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavouriteYacts;
