import "../../../assets/css/base.css";
import React, { useEffect, useState } from 'react';
import qrCodeImg from '../../../assets/images/qr-code-image.png';
import ApiService from "../../../services/ApiService";
import { toast } from "react-toastify";

const ClubBriefing = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [activeBriefings, setActiveBriefings] = useState([]);
  const [pastBriefings, setPastBriefings] = useState([]);
  const [loadingActive, setLoadingActive] = useState(true);
  const [loadingPast, setLoadingPast] = useState(false);

  const formatDate = (dateString, timeSlot) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    const ds = d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    return timeSlot ? `${ds} - ${timeSlot}` : ds;
  };

  const mapBriefings = (list) =>
    (list || []).map((item) => ({
      id: item.id,
      title: "Club Briefing",
      duration: "",
      date: formatDate(item.briefing_date, item.time_slot),
      location: item.location?.name || "",
      status: item.status,
      qr_code: item.qr_code,
    }));

  const fetchBriefings = async (status) => {
    const setLoading = status === "upcoming" ? setLoadingActive : setLoadingPast;
    setLoading(true);
    try {
      console.log(`Fetching briefings for status: ${status}`); // Debug log
      const response = await ApiService.get("/getMyClubBriefings", { status });
      console.log(`API Response for ${status}:`, response.data); // Debug log

      if (response.data.status) {
        const list = response.data.data?.briefings || [];
        console.log(`Parsed list for ${status}:`, list); // Debug log
        const mapped = mapBriefings(list);
        if (status === "upcoming") setActiveBriefings(mapped);
        else setPastBriefings(mapped);
      } else {
        toast.error(response.data.message || "Failed to fetch club briefings");
      }
    } catch (e) {
      console.error(`Error fetching ${status} briefings:`, e); // Debug log
      toast.error("Error fetching club briefings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    try {
      const response = await ApiService.delete(`/cancelClubBriefing/${id}`);
      if (response.data.status) {
        toast.success(response.data.message || "Briefing cancelled");
        fetchBriefings("upcoming");
        fetchBriefings("past");
      } else {
        toast.error(response.data.message || "Unable to cancel briefing");
      }
    } catch (e) {
      toast.error("Error cancelling briefing");
    }
  };

  useEffect(() => {
    fetchBriefings("upcoming");
    fetchBriefings("past");
  }, []);

  // useEffect(() => {
  //   if (activeTab === "past" && pastBriefings.length === 0) {
  //     fetchBriefings("past");
  //   }
  // }, [activeTab]);

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
          <img src={briefing.qr_code || qrCodeImg} alt="QR Code" />
        </div>
        {type === 'active' && (
          <button className="cancel-btn" onClick={() => handleCancel(briefing.id)}>Cancel</button>
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
        {activeTab === 'active' ? (
          loadingActive ? (
            <div className="text-center text-white w-100 mt-5">Loading...</div>
          ) : activeBriefings.length > 0 ? (
            activeBriefings.map((briefing) => (
              <React.Fragment key={briefing.id}>
                {renderBriefingCard(briefing, 'active')}
              </React.Fragment>
            ))
          ) : (
            <div className="text-center text-white w-100 mt-5">No Active Briefings Found</div>
          )
        ) : (
          loadingPast ? (
            <div className="text-center text-white w-100 mt-5">Loading...</div>
          ) : pastBriefings.length > 0 ? (
            pastBriefings.map((briefing) => (
              <React.Fragment key={briefing.id}>
                {renderBriefingCard(briefing, 'past')}
              </React.Fragment>
            ))
          ) : (
            <div className="text-center text-white w-100 mt-5">No Past Briefings Found</div>
          )
        )}
      </div>
    </div>
  );
};

export default ClubBriefing;
