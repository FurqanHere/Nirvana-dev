import "../../../assets/css/base.css";
import React, { useEffect, useState } from "react";
import ApiService from "../../../services/ApiService";
import sidebarMembership from "../../../assets/images/sidebar-membership.png";
import calendarIcon from "../../../assets/images/calender-date.png";
import boatIcon from "../../../assets/images/sidebar-ship.png";

const ProfileMembership = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await ApiService.get('/getProfile');
      if (response.data.status) {
        setProfileData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching profile data", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatCurrency = (amount) => {
    if (!amount) return "0 AED";
    return `${parseFloat(amount).toLocaleString()} AED`;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const subscription = profileData?.subscription_status?.subscription;
  const user = profileData?.user;
  const benefits = profileData?.benefits || subscription?.benefits || [];

  const getCardStyle = () => {
    const bgColor = subscription?.package?.bg_color;
    if (!bgColor) return {};

    if (bgColor.includes(',')) {
      return { background: `linear-gradient(to right, ${bgColor})` };
    }
    return { backgroundColor: bgColor };
  };

  return (
    <div className="profile-membership-view">
      {/* Header Back Button */}
      <div className="profile-membership-header">
        <button className="back-btn">
          <i className="bi bi-arrow-left"></i>
        </button>
      </div>

      {/* Royal Card */}
      <div className="membership-info-card" style={getCardStyle()}>
        <div className="info-card-header">
          <div className="info-card-icon">
             <i className="bi bi-person-vcard-fill"></i>
          </div>
          <div className="info-card-title-group">
            <h2>{subscription?.package?.name || "Membership"}</h2>
            <span className="id-badge">
              <i className="bi bi-person-badge"></i> ID: {user?.membership_id || "N/A"}
            </span>
          </div>
        </div>

        <div className="info-card-grid">
          {/* Price */}
          <div className="info-grid-item blue-bg">
            <div className="item-icon">
              <i className="bi bi-tag-fill"></i>
            </div>
            <div className="item-content row-layout">
              <span className="label">Price</span>
              <span className="value">{formatCurrency(subscription?.total_amount)}</span>
            </div>
          </div>

          {/* Status */}
          <div className="info-grid-item blue-bg">
            <div className="item-icon">
              <i className="bi bi-check-circle-fill"></i>
            </div>
            <div className="item-content row-layout">
              <span className="label">Status</span>
              <span className="value green-text" style={{ textTransform: 'capitalize' }}>
                {profileData?.subscription_status?.status || "Inactive"}
              </span>
            </div>
          </div>

          {/* Boat Access */}
          <div className="info-grid-item blue-bg">
            <div className="item-icon">
              <img src={boatIcon} alt="Boat" style={{ width: '24px', filter: 'brightness(0) invert(1)' }} />
            </div>
            <div className="item-content">
              <span className="label">Boat Access</span>
              <span className="value">{subscription?.allowed_categories || "None"}</span>
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
                {formatDate(subscription?.start_date)} <br /> to {formatDate(subscription?.end_date)}
              </span>
            </div>
            <div className="days-badge">
              {subscription?.days_remaining || 0} <small>days</small>
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
          {benefits.map((benefit, index) => {
            const progress = benefit.progress;
            return (
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
                    <span>{progress}%</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${progress === '--' ? 0 : parseFloat(progress)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="benefit-stats">
                  <div className="stat-row used">
                    <div className="stat-label">
                      <div className="icon-box">
                        <i className="bi bi-check-lg"></i>
                      </div>
                      Used
                    </div>
                    <div className="stat-value">{benefit.used}</div>
                  </div>
                  <div className="stat-row remaining">
                    <div className="stat-label">
                      <div className="icon-box">
                        <i className="bi bi-pie-chart-fill"></i>
                      </div>
                      Remaining
                    </div>
                    <div className="stat-value">{benefit.remaining}</div>
                  </div>
                  <div className="stat-row total">
                    <div className="stat-label">
                      <div className="icon-box">
                        <i className="bi bi-grid-fill"></i>
                      </div>
                      Total
                    </div>
                    <div className="stat-value">{benefit.total}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfileMembership;
