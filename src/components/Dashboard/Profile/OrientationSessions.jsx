import "../../../assets/css/base.css";
import React, { useEffect, useState } from 'react';
import qrCodeImg from '../../../assets/images/qr-code-image.png';
import ApiService from "../../../services/ApiService";
import { toast } from "react-toastify";

const OrientationSessions = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [activeSessions, setActiveSessions] = useState([]);
  const [pastSessions, setPastSessions] = useState([]);
  const [loadingActive, setLoadingActive] = useState(true);
  const [loadingPast, setLoadingPast] = useState(false);

  const formatDate = (dateString, timeSlot) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    const ds = d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    return timeSlot ? `${ds} - ${timeSlot}` : ds;
  };

  const mapOrientations = (list) =>
    (list || []).map((item) => ({
      id: item.id,
      title: "Orientation Session",
      duration: "",
      date: formatDate(item.orientation_date, item.time_slot),
      location: item.location?.name || "",
      status: item.status,
      qr_code: item.qr_code,
    }));

  const fetchOrientations = async (status) => {
    const setLoading = status === "upcoming" ? setLoadingActive : setLoadingPast;
    setLoading(true);
    try {
      const response = await ApiService.get("/getMyOrientations", { status });
      if (response.data.status) {
        const list = response.data.data?.orientations || [];
        const mapped = mapOrientations(list);
        if (status === "upcoming") setActiveSessions(mapped);
        else setPastSessions(mapped);
      } else {
        toast.error(response.data.message || "Failed to fetch orientations");
      }
    } catch (e) {
      toast.error("Error fetching orientations");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    try {
      const response = await ApiService.delete(`/cancelOrientation/${id}`);
      if (response.data.status) {
        toast.success(response.data.message || "Orientation cancelled");
        fetchOrientations("upcoming");
        fetchOrientations("past");
      } else {
        toast.error(response.data.message || "Unable to cancel orientation");
      }
    } catch (e) {
      toast.error("Error cancelling orientation");
    }
  };

  useEffect(() => {
    fetchOrientations("upcoming");
    fetchOrientations("past");
  }, []);

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
          <img src={session.qr_code || qrCodeImg} alt="QR Code" />
        </div>
        {type === 'active' && (
          <button className="cancel-btn" onClick={() => handleCancel(session.id)}>Cancel</button>
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
        {activeTab === 'active' ? (
          loadingActive ? (
            <div className="text-center text-white w-100 mt-5">Loading...</div>
          ) : activeSessions.length > 0 ? (
            activeSessions.map((session) => (
              <React.Fragment key={session.id}>
                {renderSessionCard(session, 'active')}
              </React.Fragment>
            ))
          ) : (
            <div className="text-center text-white w-100 mt-5">No Active Orientations Found</div>
          )
        ) : (
          loadingPast ? (
            <div className="text-center text-white w-100 mt-5">Loading...</div>
          ) : pastSessions.length > 0 ? (
            pastSessions.map((session) => (
              <React.Fragment key={session.id}>
                {renderSessionCard(session, 'past')}
              </React.Fragment>
            ))
          ) : (
            <div className="text-center text-white w-100 mt-5">No Past Orientations Found</div>
          )
        )}
      </div>
    </div>
  );
};

export default OrientationSessions;
