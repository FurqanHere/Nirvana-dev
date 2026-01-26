import "../../../assets/css/base.css";
import React, { useState } from 'react';
import qrCodeImg from '../../../assets/images/qr-code-image.png';

const ClubBriefing = () => {
  const [activeTab, setActiveTab] = useState('active');

  const activeBriefings = Array(5).fill({
    title: "Club Briefing",
    duration: "",
    date: "Dec 20, 2025 - 10 AM - 12 PM",
    location: "Albateen Marina",
    status: "Pending",
    statusColor: "#fff"
  });

  const pastBriefings = Array(5).fill({
    title: "Club Briefing",
    duration: "",
    date: "Dec 19, 2025 - 10 AM - 12 PM",
    location: "Albateen Marina",
    status: "Completed", // or Canceled, No Show based on screenshot
    statusColor: "#fff"
  }).map((item, index) => ({
    ...item,
    status: index % 3 === 0 ? "Cancelled" : index % 3 === 1 ? "Completed" : "No Show"
  }));

  const renderBriefingCard = (briefing, type) => (
    <div className="briefing-card">
      <div className="briefing-info">
        <h3 className="briefing-title">{briefing.title}</h3>
        <p className="briefing-duration">Duration:</p>
        
        <div className="briefing-detail-row">
          <i className="bi bi-calendar4"></i>
          <span>{briefing.date}</span>
        </div>
        
        <div className="briefing-detail-row">
          <i className="bi bi-geo-alt"></i>
          <span>Location: {briefing.location}</span>
        </div>
        
        <div className="briefing-detail-row">
          <span className="status-label">Status:</span>
          <span className="status-value">{briefing.status}</span>
        </div>
      </div>
      
      <div className="briefing-actions">
        <div className="qr-code-container">
          <img src={qrCodeImg} alt="QR Code" />
        </div>
        {type === 'active' && (
          <button className="cancel-btn">Cancel</button>
        )}
      </div>
    </div>
  );

  return (
    <div className="club-briefing-view">
      <div className="club-briefing-header">
        <div className="header-top">
          <i className="bi bi-arrow-left"></i>
          <h2>Club Briefing</h2>
        </div>
        
        <div className="briefing-tabs">
          <button 
            className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
            onClick={() => setActiveTab('active')}
          >
            Active
          </button>
          <button 
            className={`tab-btn ${activeTab === 'past' ? 'active' : ''}`}
            onClick={() => setActiveTab('past')}
          >
            Past
          </button>
        </div>
      </div>

      <div className="briefing-grid">
        {activeTab === 'active' 
          ? activeBriefings.map((briefing, index) => (
              <React.Fragment key={index}>
                {renderBriefingCard(briefing, 'active')}
              </React.Fragment>
            ))
          : pastBriefings.map((briefing, index) => (
              <React.Fragment key={index}>
                {renderBriefingCard(briefing, 'past')}
              </React.Fragment>
            ))
        }
      </div>
    </div>
  );
};

export default ClubBriefing;
