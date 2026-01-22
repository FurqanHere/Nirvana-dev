import "../../../assets/css/style.base.css";
import React from 'react';

const PenaltyReports = () => {
  const reports = Array(6).fill({
    title: "Penalty Title : (penalty Category)",
    penalty: "Penalty: 500 AED, Freeze Account or deduct 50 days",
    date: "Date",
    reason: "hgjtug jguhgug fiuhdndokdp dijdhdijdo odkodijidjid okdojidjid ojdijdijdid dokdodjidjk ddojdijd dldjojdiud dkdjidjhdid ."
  });

  return (
    <div className="penalty-reports-view">
      <div className="penalty-reports-header">
        <i className="bi bi-arrow-left"></i>
        <h2>Penalty Reports</h2>
      </div>
      <div className="penalty-reports-grid">
        {reports.map((report, index) => (
          <div key={index} className="penalty-card">
            <h3 className="penalty-card-title">{report.title}</h3>
            <p className="penalty-card-subtitle">{report.penalty}</p>
            <div className="penalty-card-date">
              <i className="bi bi-calendar4"></i>
              <span>{report.date}</span>
            </div>
            <div className="penalty-card-reason">
              <span className="reason-label">Reason:</span>
              <p className="reason-text">{report.reason}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PenaltyReports;
