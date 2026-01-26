import "../../../assets/css/base.css";
import React, { useState } from "react";
import profilePic from "../../../assets/images/profile-pic.png";

const PersonalInformation = () => {
  const [currentView, setCurrentView] = useState("details"); // details | edit

  // Edit Profile Form State
  const [editProfile, setEditProfile] = useState({
    fullName: "Baki Phillinder",
    email: "baki@phillinderzen.com",
    phone: "+971 25 146 3987",
    country: "United Arab Emirates",
  });
  const [editProfileErrors, setEditProfileErrors] = useState({});

  // Validation Functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  // Edit Profile Validation
  const validateEditProfile = () => {
    const errors = {};
    if (!editProfile.fullName.trim()) {
      errors.fullName = "Full Name is required";
    }
    if (!editProfile.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(editProfile.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!editProfile.phone.trim()) {
      errors.phone = "Phone Number is required";
    } else if (!validatePhone(editProfile.phone)) {
      errors.phone = "Please enter a valid phone number";
    }
    if (!editProfile.country.trim()) {
      errors.country = "Country is required";
    }
    setEditProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <>
      {currentView === "details" ? (
        <div className="profile-detail-view">
          <div className="profile-detail-header">
            <div className="profile-detail-user">
              <div className="profile-detail-avatar">
                <img src={profilePic} alt="" />
              </div>
              <div className="profile-detail-text">
                <h3 className="profile-detail-name">Baki Phillinder</h3>
                <p className="profile-detail-email">
                  baki@phillinderzen.com
                </p>
              </div>
            </div>
            <button
              type="button"
              className="profile-detail-edit-btn"
              onClick={() => setCurrentView("edit")}
            >
              <i className="bi bi-pencil"></i>
              <span>Edit Profile</span>
            </button>
          </div>

          <div className="profile-detail-fields">
            <div className="profile-detail-field">
              <div className="profile-detail-label">Email</div>
              <div className="profile-detail-value">
                baki@phillinderzen.com
              </div>
            </div>
            <div className="profile-detail-field">
              <div className="profile-detail-label">Phone Number</div>
              <div className="profile-detail-value">+971 26 078 7961</div>
            </div>
            <div className="profile-detail-field">
              <div className="profile-detail-label">Country</div>
              <div className="profile-detail-value">
                United Arab Emirates
              </div>
            </div>
            <div className="profile-detail-field">
              <div className="profile-detail-label">Gender</div>
              <div className="profile-detail-value">Female</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="edit-profile-view">
          <div className="edit-profile-header">
            <div className="edit-profile-avatar-wrapper">
              <img
                src={profilePic}
                alt="Profile"
                className="edit-profile-avatar"
              />
              <div className="edit-profile-camera">
                <i className="bi bi-camera-fill"></i>
              </div>
            </div>
            <div className="edit-profile-text">
              <h3 className="edit-profile-title">Edit Profile</h3>
              <p className="edit-profile-subtitle">Change Profile Image</p>
            </div>
          </div>

          <div className="edit-profile-form">
            <div className="edit-profile-row">
              <div className="edit-profile-field">
                <label className="edit-profile-label">
                  Full Name <span className="required-asterisk">*</span>
                </label>
                <input
                  className={`edit-profile-input ${
                    editProfileErrors.fullName ? "error" : ""
                  }`}
                  value={editProfile.fullName}
                  onChange={(e) =>
                    setEditProfile({
                      ...editProfile,
                      fullName: e.target.value,
                    })
                  }
                />
                {editProfileErrors.fullName && (
                  <span className="error-message">
                    {editProfileErrors.fullName}
                  </span>
                )}
              </div>
              <div className="edit-profile-field">
                <label className="edit-profile-label">
                  Email <span className="required-asterisk">*</span>
                </label>
                <input
                  className={`edit-profile-input ${
                    editProfileErrors.email ? "error" : ""
                  }`}
                  value={editProfile.email}
                  onChange={(e) =>
                    setEditProfile({
                      ...editProfile,
                      email: e.target.value,
                    })
                  }
                />
                {editProfileErrors.email && (
                  <span className="error-message">
                    {editProfileErrors.email}
                  </span>
                )}
              </div>
            </div>

            <div className="edit-profile-row">
              <div className="edit-profile-field">
                <label className="edit-profile-label">
                  Phone Number <span className="required-asterisk">*</span>
                </label>
                <input
                  className={`edit-profile-input ${
                    editProfileErrors.phone ? "error" : ""
                  }`}
                  value={editProfile.phone}
                  onChange={(e) =>
                    setEditProfile({
                      ...editProfile,
                      phone: e.target.value,
                    })
                  }
                />
                {editProfileErrors.phone && (
                  <span className="error-message">
                    {editProfileErrors.phone}
                  </span>
                )}
              </div>
              <div className="edit-profile-field">
                <label className="edit-profile-label">
                  Country <span className="required-asterisk">*</span>
                </label>
                <input
                  className={`edit-profile-input ${
                    editProfileErrors.country ? "error" : ""
                  }`}
                  value={editProfile.country}
                  onChange={(e) =>
                    setEditProfile({
                      ...editProfile,
                      country: e.target.value,
                    })
                  }
                />
                {editProfileErrors.country && (
                  <span className="error-message">
                    {editProfileErrors.country}
                  </span>
                )}
              </div>
            </div>

            <div className="edit-profile-actions">
              <button
                type="button"
                className="edit-profile-save-btn"
                onClick={() => {
                  if (validateEditProfile()) {
                    setCurrentView("details"); // Go back to details
                  }
                }}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PersonalInformation;
