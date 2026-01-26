import "../../../assets/css/base.css";
import React from "react";
import sidebarMembership from "../../../assets/images/sidebar-membership.png";
import calendarIcon from "../../../assets/images/calender-date.png";
import boatIcon from "../../../assets/images/sidebar-ship.png";

const ProfileMembership = () => {
  const benefits = [
    {
      title: "Boat Bookings",
      progress: 20.0,
      used: 10,
      remaining: 5,
      total: 15,
    },
    {
      title: "Rolling Bookings",
      progress: 20.0,
      used: 10,
      remaining: 5,
      total: 15,
    },
    {
      title: "Freezing Days",
      progress: 20.0,
      used: 10,
      remaining: 5,
      total: 15,
    },
    {
      title: "In-House Captain",
      progress: 20.0,
      used: 10,
      remaining: 5,
      total: 15,
    },
    {
      title: "Weekends Access",
      progress: 20.0,
      used: 10,
      remaining: 5,
      total: 15,
    },
    {
      title: "Houseboat Access",
      progress: 20.0,
      used: 10,
      remaining: 5,
      total: 15,
    },
    {
      title: "Session Merging",
      progress: 20.0,
      used: 10,
      remaining: 5,
      total: 15,
    },
    {
      title: "Weekday Access",
      progress: 20.0,
      used: 10,
      remaining: 5,
      total: 15,
    },
    {
      title: "Boat Bookings",
      progress: 20.0,
      used: 10,
      remaining: 5,
      total: 15,
    },
  ];

  return (
    <div className="profile-membership-view">
      {/* Header Back Button */}
      <div className="profile-membership-header">
        <button className="back-btn">
          <i className="bi bi-arrow-left"></i>
        </button>
      </div>

      {/* Royal Card */}
      <div className="membership-info-card">
        <div className="info-card-header">
          <div className="info-card-icon">
            <img src={sidebarMembership} alt="Membership" />
          </div>
          <div className="info-card-title-group">
            <h2>Royal</h2>
            <span className="id-badge">
              <i className="bi bi-person-badge"></i> ID: NBC-00051
            </span>
          </div>
        </div>

        <div className="info-card-grid">
          {/* Price */}
          <div className="info-grid-item blue-bg">
            <div className="item-icon">
              <i className="bi bi-tag-fill"></i>
            </div>
            <div className="item-content">
              <span className="label">Price</span>
              <span className="value">10,000 AED</span>
            </div>
          </div>

          {/* Status */}
          <div className="info-grid-item blue-bg">
            <div className="item-icon">
              <i className="bi bi-check-circle-fill"></i>
            </div>
            <div className="item-content">
              <span className="label">Status</span>
              <span className="value green-text">Active</span>
            </div>
          </div>

          {/* Boat Access */}
          <div className="info-grid-item blue-bg">
            <div className="item-icon">
              <img src={boatIcon} alt="Boat" style={{ width: '24px', filter: 'brightness(0) invert(1)' }} />
            </div>
            <div className="item-content">
              <span className="label">Boat Access</span>
              <span className="value">A,B</span>
            </div>
          </div>

          {/* Current Period */}
          <div className="info-grid-item blue-bg">
            <div className="item-icon">
              <img src={calendarIcon} alt="Calendar" style={{ width: '24px' }} />
            </div>
            <div className="item-content">
              <span className="label">Current period</span>
              <span className="value date-range">
                Nov 20, 2025 <br /> to Nov 2, 2025
              </span>
            </div>
            <div className="days-badge">
              348 <small>days</small>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="benefits-section">
        <h3 className="benefits-title">
            <div className="benefit-title-icon">
                <i className="bi bi-star-fill"></i> 
            </div>
            Benefits
        </h3>
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div className="benefit-card" key={index}>
              <div className="benefit-header">
                <div className="benefit-icon-box">
                    <i className="bi bi-star-fill"></i>
                </div>
                <span className="benefit-name">{benefit.title}</span>
              </div>
              <div className="benefit-progress">
                <div className="progress-labels">
                  <span>Progress</span>
                  <span>{benefit.progress}%</span>
                </div>
                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${benefit.progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="benefit-stats">
                <div className="stat-row used">
                  <div className="stat-label">
                    <div className="icon-box">
                      <i className="bi bi-check-lg"></i>
                    </div>{" "}
                    Used
                  </div>
                  <div className="stat-value">{benefit.used}</div>
                </div>
                <div className="stat-row remaining">
                  <div className="stat-label">
                    <div className="icon-box">
                      <i className="bi bi-pie-chart-fill"></i>
                    </div>{" "}
                    Remaining
                  </div>
                  <div className="stat-value">{benefit.remaining}</div>
                </div>
                <div className="stat-row total">
                  <div className="stat-label">
                    <div className="icon-box">
                      <i className="bi bi-grid-fill"></i>
                    </div>{" "}
                    Total
                  </div>
                  <div className="stat-value">{benefit.total}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileMembership;
