import "../../../assets/css/base.css";
import React, { useState, useEffect } from "react";
import ApiService from "../../../services/ApiService";
import moment from "moment";
import { toast } from "react-toastify";

const Notifications = ({ onBack }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await ApiService.get("/getNotifications");
      if (response.data.status) {
        setNotifications(response.data.data.notifications);
      } else {
        console.error("Failed to fetch notifications:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearAll = async () => {
    try {
      const response = await ApiService.post("/clearAllNotifications");
      if (response.data.status) {
        toast.success(response.data.message);
        setNotifications([]);
      } else {
        toast.error(response.data.message || "Failed to clear notifications");
      }
    } catch (error) {
      console.error("Error clearing notifications:", error);
      toast.error("An error occurred while clearing notifications");
    }
  };

  return (
    <div className="notifications-view">
        <div className="notifications-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px', color: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                {onBack && (
                  <i 
                    className="bi bi-arrow-left" 
                    style={{ fontSize: '28px', cursor: 'pointer' }}
                    onClick={onBack}
                  ></i>
                )}
                <h2 className="notifications-title" style={{ fontSize: '24px', fontWeight: '500', margin: 0 }}>Notifications</h2>
            </div>
            {notifications.length > 0 && (
                <button 
                    onClick={handleClearAll}
                    className="btn btn-outline-light btn-sm"
                    style={{ borderRadius: '20px', padding: '5px 15px' }}
                >
                    Clear All
                </button>
            )}
        </div>
        
        <div className="notifications-list">
          {loading ? (
             <div style={{color: 'white', textAlign: 'center', padding: '20px'}}>Loading...</div>
          ) : notifications.length === 0 ? (
             <div style={{color: 'white', textAlign: 'center', padding: '20px'}}>No notifications found.</div>
          ) : (
             notifications.map((notification, index) => (
            <div key={notification.id || index} className="notification-item">
              <div className="notification-header">
                <h3 className="notification-headline">
                  {notification.title}
                  {!notification.is_read && <span className="notification-indicator" style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: '#2ecc71', borderRadius: '50%', marginLeft: '10px' }}></span>}
                </h3>
              </div>
              <p className="notification-description">
                {notification.message}
              </p>
              <p className="notification-timestamp">
                {moment(notification.created_at).format("DD MMM - hh:mm A")}
              </p>
            </div>
          )))}
        </div>
    </div>
  );
};

export default Notifications;
