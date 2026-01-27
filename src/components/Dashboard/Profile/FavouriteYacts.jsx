import "../../../assets/css/base.css";
import React, { useEffect, useState } from "react";
import ApiService from "../../../services/ApiService";
import { useNavigate } from "react-router-dom";

const FavouriteYacts = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await ApiService.get("/getFavouriteBoats");
      if (response.data.status) {
        setFavorites(response.data.data.boats || []);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavourite = async (e, boatId) => {
    e.stopPropagation();
    try {
      const response = await ApiService.post("/toggleBoatFavourite", { boat_id: boatId });
      if (response.data.status) {
        setFavorites((prev) => prev.filter((boat) => boat.id !== boatId));
      }
    } catch (error) {
      console.error("Error toggling favourite:", error);
    }
  };

  return (
    <div className="favourite-yachts-view">
      <div className="favourite-yachts-header">
        <i 
          className="bi bi-arrow-left" 
          onClick={() => navigate(-1)} 
          style={{ cursor: "pointer" }}
        ></i>
        <h2>Favorite Yachts & Boats</h2>
      </div>
      
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : favorites.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px" }}>No favorite boats found.</div>
      ) : (
        <div className="favourite-yachts-grid">
          {favorites.map((boat) => (
            <div 
              key={boat.id} 
              className="favourite-card"
              onClick={() => navigate("/boat-details", { state: { boatData: boat } })}
              style={{ cursor: "pointer" }}
            >
              <div className="favourite-card-image-wrapper">
                <img 
                  src={boat.main_image || boat.image} 
                  alt={boat.title || boat.name} 
                  className="favourite-card-image" 
                />
                <div 
                  className="favourite-heart-icon"
                  onClick={(e) => toggleFavourite(e, boat.id)}
                >
                  <i className="bi bi-heart-fill" style={{ color: "red" }}></i>
                </div>
              </div>
              <div className="favourite-card-details">
                <h3 className="favourite-card-title">{boat.title || boat.name}</h3>
                <p className="favourite-card-info">Model : {boat.model || boat.year || "2025"}</p>
                <p className="favourite-card-info">Capacity: {boat.capacity || boat.max_passengers}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavouriteYacts;
