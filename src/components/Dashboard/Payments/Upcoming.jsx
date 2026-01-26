import "../../../assets/css/base.css";
import React, { useState, useMemo } from "react";

const Upcoming = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [search, setSearch] = useState("");

  const payments = useMemo(
    () =>
      Array.from({ length: 11 }).map((_, index) => ({
        id: index + 2,
        title: `Installment #${index + 2}`,
        amount: "AED 8400.00",
        dueDate: ["Jan 19, 2026", "Feb 19, 2026", "Mar 22, 2026", "Apr 19, 2026", "May 19, 2026", "Jun 19, 2026", "Jul 20, 2026", "Aug 20, 2026", "Sep 19, 2026", "Oct 20, 2026", "Nov 20, 2026"][index],
        daysLeft: ["43 days left", "74 days left", "105 days left", "133 days left", "164 days left", "194 days left", "225 days left", "225 days left", "286 days left", "317 days left", "347 days left"][index],
        isPayable: index === 0,
        availableDays: [null, 64, 95, 123, 154, 184, 225, 245, 276, 307, 337][index],
        status: "Upcoming",
      })),
    []
  );

  return (
    <div className="upcoming-payments-view">
      <div className="upcoming-header">
        <div className="header-left">
          <button className="back-btn">
            <i className="bi bi-arrow-left"></i>
          </button>
          <h2 className="page-title">Upcoming Payments</h2>
        </div>
      </div>

      <div className="payments-controls">
        <div className="payments-tabs">
          <button
            className={`tab-btn ${activeTab === "upcoming" ? "active" : ""}`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming Payments
          </button>
          <button
            className={`tab-btn ${activeTab === "previous" ? "active" : ""}`}
            onClick={() => setActiveTab("previous")}
          >
            Previous Payments
          </button>
        </div>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <i className="bi bi-search"></i>
        </div>
      </div>

      <div className="pending-alert-box">
        <div className="alert-icon-box">
          <i className="bi bi-cash-coin"></i>
        </div>
        <div className="alert-content">
          <h3>Pending Payments</h3>
          <p>Please settle all pending payments before making bookings.</p>
        </div>
      </div>

      <div className="payments-grid">
        {payments.map((payment) => (
          <div className="payment-card" key={payment.id}>
            <div className="card-top">
              <div className="card-header-row">
                <h3 className="installment-title">{payment.title}</h3>
                <span className="status-badge">{payment.status}</span>
              </div>
              <p className="code-text">Code: N/A</p>

              <div className="amount-date-row">
                <div className="amount-col">
                  <span className="label">Amount</span>
                  <span className="value-large">{payment.amount}</span>
                </div>
                <div className="date-col">
                  <span className="label">Due Date</span>
                  <span className="value-blue">{payment.dueDate}</span>
                  <span className="days-left">{payment.daysLeft}</span>
                </div>
              </div>
            </div>

            <div className="card-footer-row">
              <div className="calendar-icon-wrapper">
                <i className="bi bi-calendar4-week"></i>
                <span className="notification-dot">!</span>
              </div>
              
              {payment.isPayable ? (
                <button className="pay-now-btn">Pay Now</button>
              ) : (
                <span className="availability-text">
                  Payment available {payment.availableDays} days before due date
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upcoming;
