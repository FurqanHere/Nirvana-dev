import "../assets/css/style.base.css";
import React from "react";
import { Dropdown } from "primereact/dropdown";
import "../assets/css/club-briefing.css";

const ClubBriefing = ({
  selectedDay,
  selectedSlot,
  onChangeDay,
  onChangeSlot,
  onBook,
  selectedMarina,
  onChangeMarina
}) => {
  const marinaOptions = [
    { label: "Marina 1", value: "marina1" },
    { label: "Marina 2", value: "marina2" },
    { label: "Marina 3", value: "marina3" },
  ];

  return (
    <div className="schedule-view club-briefing-page">
      <h2 className="schedule-title">Club Briefing</h2>
      
      <div className="club-briefing-body">
        <div className="club-briefing-select-marina">
          <h4 style={{ color: "white", marginBottom: "10px" }}>Select Marina</h4>
          <Dropdown
            value={selectedMarina}
            onChange={(e) => onChangeMarina(e.value)}
            options={marinaOptions}
            optionLabel="label"
            placeholder="Select Marina"
            className="marina-dropdown-prime"
            style={{ width: "100%", marginBottom: "20px" }}
          />
        </div>

        <div className="schedule-columns">
        <div className="schedule-card">
          <div className="schedule-card-header">
            <span role="img" aria-label="calendar">
              <i className="bi bi-calendar-month"></i>
            </span>
            <span>Select date of briefing</span>
          </div>
          <div className="schedule-month">November 2025</div>
          <div className="schedule-weekdays">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <div key={d} className="schedule-weekday">
                {d}
              </div>
            ))}
          </div>
          <div className="schedule-days">
            {[...Array(30)].map((_, idx) => {
              const day = idx + 1;
              const isSelected = day === selectedDay;
              return (
                <button
                  type="button"
                  key={day}
                  className={`schedule-day ${isSelected ? "selected" : ""}`}
                  onClick={() => onChangeDay(day)}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        <div className="schedule-card">
          <div className="schedule-card-header">
            <span role="img" aria-label="time">
              ⏱️
            </span>
            <span>Select date of briefing</span>
          </div>
          <div className="schedule-date">Dec 31, 2025</div>
          <div className="schedule-slot-label">Choose a slot</div>
          {[
            "8 AM - 10 AM",
            "10 AM - 12 PM",
            "12 PM - 2 PM",
            "8 AM - 10 AM",
            "12 PM - 2 PM",
            "8 AM - 10 AM",
          ].map((slot, idx) => {
            const isSelected = idx === selectedSlot;
            return (
              <button
                type="button"
                key={slot + idx}
                className={`schedule-slot ${isSelected ? "selected" : ""}`}
                onClick={() => onChangeSlot(idx)}
              >
                <span className="schedule-slot-text">{slot}</span>
                <span
                  className={`schedule-slot-check ${
                    isSelected ? "selected" : ""
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="schedule-submit-wrap">
        <button className="schedule-submit-btn" onClick={onBook}>
          Book
        </button>
      </div>
    </div>
  </div>
);
};

export default ClubBriefing;
