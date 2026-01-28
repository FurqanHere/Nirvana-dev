import "../../../assets/css/base.css";
import React, { useEffect, useState } from 'react';
import ApiService from "../../../services/ApiService";

const PenaltyReports = () => {
  const [penalties, setPenalties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPenalties();
  }, []);

  const fetchPenalties = async () => {
    try {
      const response = await ApiService.get('/getPenalities');
      console.log("Penalty API Response:", response.data);
      
      if (response.data.status) {
        const penaltyList = response.data.data?.penalities || response.data.data?.penalties || [];
        console.log("Parsed Penalty List:", penaltyList);
        setPenalties(penaltyList);
      }
    } catch (error) {
      console.error("Error fetching penalties:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatPenaltyDetail = (item) => {
    const parts = [];
    if (parseFloat(item.amount) > 0) {
        parts.push(`Penalty: ${item.amount} AED`);
    }
    if (item.days_to_deduct) {
        parts.push(`Deduct ${item.days_to_deduct} days`);
    }
    
    if (parts.length === 0) return "No penalty amount/deduction specified";
    return parts.join(", ");
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

  return (
    <div className="penalty-reports-view">
      <div className="penalty-reports-header">
        <i className="bi bi-arrow-left"></i>
        <h2>Penalty Reports</h2>
      </div>
      {penalties.length > 0 ? (
        <div className="penalty-reports-grid">
            {penalties.map((item, index) => (
            <div key={item.id || index} className="penalty-card">
                <div className="d-flex justify-content-between align-items-start mb-2">
                     <h3 className="penalty-card-title">Penalty : ({item.category})</h3>
                     <span className={`badge ${item.status === 'pending' ? 'bg-warning text-dark' : 'bg-success'}`} style={{fontSize: '0.8rem'}}>
                        {item.status}
                     </span>
                </div>
                
                <p className="penalty-card-subtitle">{formatPenaltyDetail(item)}</p>
                <div className="penalty-card-date">
                <i className="bi bi-calendar4"></i>
                <span>{formatDate(item.date)}</span>
                </div>
                <div className="penalty-card-reason">
                <span className="reason-label">Reason:</span>
                <p className="reason-text">{item.reason}</p>
                </div>
            </div>
            ))}
        </div>
      ) : (
        <div className="text-center text-white w-100 mt-5">
            <h4>No Penalty Reports Found</h4>
        </div>
      )}
    </div>
  );
};

export default PenaltyReports;
