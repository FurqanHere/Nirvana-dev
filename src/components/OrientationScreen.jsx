import "../assets/css/style.base.css";
import React from "react";
import Lottie from "lottie-react";
import successLottie from "../assets/images/Succes.json";
import { Dropdown } from "primereact/dropdown";

const OrientationScreen = ({
  selectedMarina,
  onChangeMarina,
  selectedDay,
  onChangeDay,
  selectedSlot,
  onChangeSlot,
  onBook,
  showOrientationSuccess,
  onCloseOrientationSuccess,
  onContinueOrientation,
}) => {
  const marinaOptions = [
    { label: "Marina 1", value: "marina1" },
    { label: "Marina 2", value: "marina2" },
    { label: "Marina 3", value: "marina3" },
  ];

  return (
    <>
      <div className="schedule-view">

        <div className="container bookings-marina-select">
          <Dropdown
            value={selectedMarina}
            onChange={(e) => onChangeMarina(e.value)}
            options={marinaOptions}
            optionLabel="label"
            placeholder="Select Marina"
            className="marina-dropdown-prime"
          />
        </div>

        <div className="schedule-columns">
          <div className="schedule-card">
            <div className="schedule-card-header">
              <span role="img" aria-label="calendar">
                <i className="bi bi-calendar-month"></i>
              </span>
              <span>Select date of Orientation</span>
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
              <span>Select time of Orientation</span>
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

      {showOrientationSuccess && (
        <div className="success-overlay">
          <div className="success-modal">
            <button
              className="success-close"
              onClick={onCloseOrientationSuccess}
              aria-label="Close"
            >
              ×
            </button>
            <div className="success-icon">
              <div className="success-icon-circle">
                <Lottie
                  animationData={successLottie}
                  loop={false}
                  style={{ width: "142px", height: "142px" }}
                />
              </div>
            </div>
            <h3 className="success-title">Successful!</h3>
            <p className="success-subtitle">
              You have scheduled your Orientation Session successfully
            </p>
            <div className="success-details">
              <div className="success-detail-title">Date &amp; Time</div>
              <div className="success-detail-value">
                Dec 31, 2025 – 10 AM – 12 PM
              </div>
              <div className="success-detail-ref">Ref #: 3265</div>
            </div>
            <button
              className="success-primary"
              onClick={onContinueOrientation}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default OrientationScreen;
