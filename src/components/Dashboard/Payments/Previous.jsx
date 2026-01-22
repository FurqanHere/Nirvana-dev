import "../../../assets/css/style.base.css";
import React, { useState, useMemo } from "react";

const Previous = () => {
  const [activeTab, setActiveTab] = useState("previous");
  const [search, setSearch] = useState("");

  const payments = useMemo(
    () =>
      Array.from({ length: 11 }).map((_, index) => ({
        id: index + 2,
        title: `Installment #${index + 2}`,
        amount: "AED 8400.00",
        paymentDate: ["Jan 19, 2026", "Feb 19, 2026", "Mar 22, 2026", "Apr 19, 2026", "May 19, 2026", "Jun 19, 2026", "Jul 20, 2026", "Aug 20, 2026", "Sep 19, 2026", "Oct 20, 2026", "Nov 20, 2026"][index],
        status: "Upcoming", // Keeping "Upcoming" as per the design image badge, though "Paid" would be more logical.
        code: "N/A"
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
          <h2 className="page-title">Previous Payments</h2>
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

      {/* No Alert Box for Previous Payments */}

      <div className="payments-grid">
        {payments.map((payment) => (
          <div className="payment-card" key={payment.id}>
            <div className="card-top">
              <div className="card-header-row">
                <h3 className="installment-title">{payment.title}</h3>
                <span className="status-badge">{payment.status}</span>
              </div>
              <p className="code-text">Code: {payment.code}</p>

              <div className="amount-date-row">
                <div className="amount-col">
                  <span className="label">Amount</span>
                  <span className="value-large">{payment.amount}</span>
                </div>
                <div className="date-col">
                  <span className="label">Payment Date</span>
                  <span className="value-blue">{payment.paymentDate}</span>
                </div>
              </div>
            </div>

            <div className="card-footer-row previous-footer">
              <button className="paid-btn">
                Paid <i className="bi bi-check-lg"></i>
              </button>
              
              <button className="download-btn">
                <i className="bi bi-download"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Previous;
