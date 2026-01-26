import "../../assets/css/base.css";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";
import { toast } from "react-toastify";

// Import Sidebar Images
import homeIcon from '../../assets/images/sidebar-home.png';
import shipIcon from '../../assets/images/sidebar-ship.png';
import experienceIcon from '../../assets/images/sidebar-experience.png';
import bookingsIcon from '../../assets/images/sidebar-bookings.png';
import paymentsIcon from '../../assets/images/sidebar-payments.png';
import upcomingIcon from '../../assets/images/sidebar-upcoming.png';
import previousIcon from '../../assets/images/sidebar-previous.png';
import profileIcon from '../../assets/images/sidebar-profile.png';
import membershipIcon from '../../assets/images/sidebar-membership.png';
import personalIcon from '../../assets/images/sidebar-personal.png';
import favouriteIcon from '../../assets/images/sidebar-favourite.png';
import documentIcon from '../../assets/images/sidebar-document.png';
import penaltyIcon from '../../assets/images/sidebar-panlty.png';
import briefingIcon from '../../assets/images/sidebar-club-briefing.png';
import notificationIcon from '../../assets/images/sidebar-club-briefing.png'; // Placeholder
import settingsIcon from '../../assets/images/sidebar-settings.png';
import logoutIcon from '../../assets/images/sidebar-logout.png';

const sidebarStructure = [
  {
    type: "group",
    key: "home",
    label: "Home Page",
    icon: homeIcon,
    className: "sidebar-home-img",
    children: [
      { key: "boats", label: "Boats", icon: shipIcon, className: "sidebar-ship-img" },
      { key: "experiences", label: "Experiences", icon: experienceIcon, className: "sidebar-experience-img" },
    ],
  },
  {
    type: "group",
    key: "bookings",
    label: "Bookings",
    icon: bookingsIcon,
    className: "sidebar-bookings-img",
    children: [
      { key: "boat-bookings", label: "Boat Bookings", icon: shipIcon, className: "sidebar-ship-img" },
      { key: "experience-bookings", label: "Experience Bookings", icon: experienceIcon, className: "sidebar-experience-img" },
    ],
  },
  {
    type: "group",
    key: "payments",
    label: "Payments",
    icon: paymentsIcon,
    className: "sidebar-payments-img",
    children: [
      { key: "upcoming", label: "Upcoming", icon: upcomingIcon, className: "sidebar-upcoming-img" },
      { key: "past", label: "Previous", icon: previousIcon, className: "sidebar-previous-img" },
    ],
  },
  {
    type: "group",
    key: "profile",
    label: "Profile",
    icon: profileIcon,
    className: "sidebar-profile-img",
    children: [
      { key: "membership", label: "Membership", icon: membershipIcon, className: "sidebar-membership-img" },
      { key: "personal", label: "Personal Information", icon: personalIcon, className: "sidebar-personal-img" },
      { key: "favorites", label: "Favorite Yacht & Boat", icon: favouriteIcon, className: "sidebar-favourite-img" },
      { key: "documents", label: "Documents", icon: documentIcon, className: "sidebar-document-img" },
      { key: "penalty", label: "Penalty reports", icon: penaltyIcon, className: "sidebar-panlty-img" },
      { key: "briefing", label: "Club Briefing", icon: briefingIcon, className: "sidebar-club-briefing-img" },
      { key: "orientation", label: "Orientation Sessions", icon: briefingIcon, className: "sidebar-club-briefing-img" },
    ],
  },
  { type: "spacer" },
  {
    type: "bottom-group",
    key: "bottom-group",
    children: [
      { key: "notifications", label: "Notifications", icon: notificationIcon, className: "sidebar-notification-img" },
      { key: "settings", label: "Settings", icon: settingsIcon, className: "sidebar-settings-img" },
      { key: "logout", label: "Log Out", icon: logoutIcon, className: "sidebar-logout-img" },
    ]
  },
];

const Sidebar = ({ selectedSection, setSelectedSection }) => {
  const navigate = useNavigate();
  const [openGroups, setOpenGroups] = useState(() => new Set(
    sidebarStructure.filter(i => i.type === 'group').map(i => i.key)
  ));

  const handleLogout = async () => {
    try {
      const response = await ApiService.post("/logout");
      if (response.data.status) {
        toast.success(response.data.message || "Logged out successfully");
      }
    } catch (error) {
      console.error("Logout Error:", error);
      // Even if API fails, we should clear local state
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
      navigate("/login", { replace: true });
    }
  };

  const toggleGroup = (key) => {
    setOpenGroups(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <aside className="dashboard-sidebar">
      {sidebarStructure.map((item, index) => {
        
        if (item.type === "group") {
          const isOpen = openGroups.has(item.key);
          return (
            <div key={item.key} className={`sidebar-group-container ${isOpen ? "" : "collapsed"}`}>
              <div className="sidebar-group-header-static" onClick={() => toggleGroup(item.key)}>
                <img src={item.icon} alt="" className={item.className} />
                <span>{item.label}</span>
                <i className="bi bi-chevron-down ms-auto" style={{ fontSize: '12px' }} />
              </div>
              <div className="sidebar-group-children">
                {item.children.map((child) => (
                  <button
                    key={child.key}
                    type="button"
                    className={`sidebar-child-item ${
                      selectedSection === child.key ? "active" : ""
                    }`}
                    onClick={() => setSelectedSection(child.key)}
                  >
                    <img src={child.icon} alt="" className={child.className} />
                    <span>{child.label}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        }
        if (item.type === "bottom-group") {
          return (
            <div key={item.key} className="sidebar-bottom-group">
              {item.children.map((child) => {
                const isLogout = child.key === 'logout';
                return (
                  <button
                    key={child.key}
                    type="button"
                    className={`sidebar-bottom-item ${selectedSection === child.key ? "active" : ""}`}
                    onClick={() => {
                      if (isLogout) {
                        handleLogout();
                      } else {
                        setSelectedSection(child.key);
                      }
                    }}
                  >
                    {child.key === 'notifications' ? (
                      <i className="bi bi-bell-fill" style={{ fontSize: '20px', color: '#fff' }}></i>
                    ) : (
                      <img src={child.icon} alt="" className={child.className} />
                    )}
                    <span>{child.label}</span>
                  </button>
                );
              })}
            </div>
          );
        }
        if (item.type === "item") {
          const isLogout = item.key === 'logout';
          return (
            <button
              key={item.key}
              type="button"
              className={isLogout ? "sidebar-logout-item" : `sidebar-direct-item ${selectedSection === item.key ? "active" : ""}`}
              onClick={() => {
                if (isLogout) {
                } else {
                  setSelectedSection(item.key);
                }
              }}
            >
              <img src={item.icon} alt="" className={item.className} />
              <span>{item.label}</span>
            </button>
          );
        }
        if (item.type === "spacer") {
          return <div key={index} className="sidebar-spacer" />;
        }
        return null;
      })}
    </aside>
  );
};

export default Sidebar;
