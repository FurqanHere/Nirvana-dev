import "../../../assets/css/base.css";
import React, { useState, useEffect, useRef } from "react";
import ApiService from "../../../services/ApiService";
import profilePic from "../../../assets/images/profile-pic.png";
import { toast } from "react-toastify";

const PersonalInformation = () => {
  const [currentView, setCurrentView] = useState("details"); // details | edit
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);

  // Edit Profile Form State
  const [editProfile, setEditProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    profileImage: profilePic,
    profileImageFile: null
  });
  const [editProfileErrors, setEditProfileErrors] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await ApiService.get("/getProfile");
      if (response.data.status) {
        const user = response.data.data.user;
        
        // Fix phone formatting logic to avoid duplication
        let formattedPhone = user.phone || "";
        if (user.phone_code) {
            const cleanCode = user.phone_code.toString().replace(/^\+/, '');
            const cleanPhone = formattedPhone.toString().replace(/^\+/, '');
            
            // If phone already starts with code (e.g. 971123456), just add +
            if (cleanPhone.startsWith(cleanCode)) {
                formattedPhone = `+${cleanPhone}`;
            } else {
                // Otherwise prepend code
                formattedPhone = `+${cleanCode} ${cleanPhone}`;
            }
        } else if (formattedPhone && !formattedPhone.startsWith('+')) {
            // If no code but phone exists and has no +, assume it might need one or leave as is?
            // Better to leave as is if no code is provided, or let user edit.
        }

        setEditProfile({
            fullName: user.name || "",
            email: user.email || "",
            phone: formattedPhone || "",
            country: user.nationality || user.country || "", // Prefer nationality as it seems to hold the country name
            profileImage: user.picture || profilePic,
            profileImageFile: null
        });
      }
    } catch (error) {
        console.error("Error fetching profile:", error);
    } finally {
        setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditProfile({
        ...editProfile,
        profileImage: URL.createObjectURL(file),
        profileImageFile: file
      });
    }
  };

  const handleSaveProfile = async () => {
    if (validateEditProfile()) {
      try {
        const formData = new FormData();
        formData.append("name", editProfile.fullName);
        formData.append("email", editProfile.email);
        
        // Backend seems to use 'nationality' for the country name string based on response analysis
        formData.append("nationality", editProfile.country); 
        formData.append("country", editProfile.country); // Send both to be safe, or maybe country is ignored if not ID

        // Handle phone number
        formData.append("phone", editProfile.phone);

        if (editProfile.profileImageFile) {
          formData.append("picture", editProfile.profileImageFile);
        }

        const response = await ApiService.post("/updateProfile", formData);
        
        if (response.data.status) {
            toast.success(response.data.message || "Profile updated successfully.");
            // Update local state with response data to ensure consistency
            const user = response.data.data.user;
            
            // Fix phone formatting logic to avoid duplication (same as fetch)
            let formattedPhone = user.phone || "";
            if (user.phone_code) {
                const cleanCode = user.phone_code.toString().replace(/^\+/, '');
                const cleanPhone = formattedPhone.toString().replace(/^\+/, '');
                
                if (cleanPhone.startsWith(cleanCode)) {
                    formattedPhone = `+${cleanPhone}`;
                } else {
                    formattedPhone = `+${cleanCode} ${cleanPhone}`;
                }
            }

            setEditProfile({
                fullName: user.name || "",
                email: user.email || "",
                phone: formattedPhone || "",
                country: user.nationality || user.country || "",
                profileImage: user.picture || profilePic,
                profileImageFile: null
            });
            setCurrentView("details");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        // ApiService likely handles error toasts
      }
    }
  };

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
      {loading ? (
        <div style={{ color: "white", textAlign: "center", padding: "40px" }}>Loading...</div>
      ) : currentView === "details" ? (
        <div className="profile-detail-view">
          <div className="profile-detail-header">
            <div className="profile-detail-user">
              <div className="profile-detail-avatar">
                <img src={editProfile.profileImage} alt="" onError={(e) => { e.target.onerror = null; e.target.src = profilePic; }} />
              </div>
              <div className="profile-detail-text">
                <h3 className="profile-detail-name">{editProfile.fullName}</h3>
                <p className="profile-detail-email">
                  {editProfile.email}
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
                {editProfile.email}
              </div>
            </div>
            <div className="profile-detail-field">
              <div className="profile-detail-label">Phone Number</div>
              <div className="profile-detail-value">{editProfile.phone}</div>
            </div>
            <div className="profile-detail-field">
              <div className="profile-detail-label">Country</div>
              <div className="profile-detail-value">
                {editProfile.country}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="edit-profile-view">
          <div className="edit-profile-header">
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept="image/*"
              onChange={handleImageChange}
            />
            <div className="edit-profile-avatar-wrapper">
              <img
                src={editProfile.profileImage}
                alt="Profile"
                className="edit-profile-avatar"
                onError={(e) => { e.target.onerror = null; e.target.src = profilePic; }}
              />
              <div 
                className="edit-profile-camera" 
                onClick={() => fileInputRef.current.click()}
                style={{ cursor: 'pointer' }}
              >
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
                onClick={handleSaveProfile}
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
