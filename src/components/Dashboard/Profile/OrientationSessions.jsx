import "../../../assets/css/style.base.css";
import React, { useState } from 'react';
import qrCodeImg from '../../../assets/images/qr-code-image.png';

const OrientationSessions = () => {
  const [activeTab, setActiveTab] = useState('active');

  const activeSessions = Array(5).fill({
    title: "Orientation Session",
    duration: "",
    date: "Dec 20, 2025 - 10 AM - 12 PM",
    location: "Albateen Marina",
    status: "Pending",
    statusColor: "#fff"
  });

  const pastSessions = Array(5).fill({
    title: "Orientation Session",
    duration: "",
    date: "Dec 19, 2025 - 10 AM - 12 PM",
    location: "Albateen Marina",
    status: "Cancelled",
    statusColor: "#fff"
  }).map((item, index) => ({
    ...item,
    status: "Cancelled" // Based on the screenshot where all past items seem to be Cancelled or similar
  }));

  const renderSessionCard = (session, type) => (
    <div className="orientation-card">
      <div className="orientation-info">
        <h3 className="orientation-title">{session.title}</h3>
        <p className="orientation-duration">Duration:</p>
        
        <div className="orientation-detail-row">
          <i className="bi bi-calendar4"></i>
          <span>{session.date}</span>
        </div>
        
        <div className="orientation-detail-row">
          <i className="bi bi-geo-alt"></i>
          <span>Location: {session.location}</span>
        </div>
        
        <div className="orientation-detail-row">
          <span className="status-label">Status:</span>
          <span className="status-value">{session.status}</span>
        </div>
      </div>
      
      <div className="orientation-actions">
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
    <div className="orientation-sessions-view">
      <div className="orientation-sessions-header">
        <div className="header-top">
          <i className="bi bi-arrow-left"></i>
          <h2>Orientation Sessions</h2>
        </div>
        
        <div className="orientation-tabs">
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

      <div className="orientation-grid">
        {activeTab === 'active' 
          ? activeSessions.map((session, index) => (
              <React.Fragment key={index}>
                {renderSessionCard(session, 'active')}
              </React.Fragment>
            ))
          : pastSessions.map((session, index) => (
              <React.Fragment key={index}>
                {renderSessionCard(session, 'past')}
              </React.Fragment>
            ))
        }
      </div>
    </div>
  );
};

export default OrientationSessions;
