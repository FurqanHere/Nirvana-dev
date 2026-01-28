import "../assets/css/base.css";
import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import moment from "moment";
import ApiService from "../services/ApiService";
import { toast } from "react-toastify";
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
  const [locations, setLocations] = useState([]);
  const [timeslots, setTimeslots] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [loadingLocations, setLoadingLocations] = useState(false);
  const [loadingTimeslots, setLoadingTimeslots] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Fetch Locations
  useEffect(() => {
    const fetchLocations = async () => {
      setLoadingLocations(true);
      try {
        const response = await ApiService.get("/getLocations?type=orientation");
        if (response.data.status) {
          setLocations(response.data.data.locations);
        } else {
          toast.error(response.data.message || "Failed to fetch locations");
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
        toast.error("Error fetching locations");
      } finally {
        setLoadingLocations(false);
      }
    };
    fetchLocations();
  }, []);

  // Fetch Timeslots when date or marina changes
  useEffect(() => {
    const fetchTimeslots = async () => {
      if (!selectedDay || !selectedMarina) {
        setTimeslots([]);
        return;
      }

      setLoadingTimeslots(true);
      // Format date as YYYY-MM-DD
      const formattedDate = moment(selectedDay).format("YYYY-MM-DD");
      
      try {
        const response = await ApiService.get(
          `/getClubBriefingTimeslots?date=${formattedDate}&location_id=${selectedMarina}`
        );
        if (response.data.status) {
          setTimeslots(response.data.data.timeslots || []);
        } else {
          setTimeslots([]);
        }
      } catch (error) {
        console.error("Error fetching timeslots:", error);
        setTimeslots([]);
      } finally {
        setLoadingTimeslots(false);
      }
    };

    fetchTimeslots();
  }, [selectedDay, selectedMarina]);

  // Calendar Helpers
  const startOfMonth = currentMonth.clone().startOf("month");
  const daysInMonth = currentMonth.daysInMonth();
  // Standard day(): Sun=0, Mon=1, ..., Sat=6.
  // To shift to Mon-start: (day() + 6) % 7
  const startDayOfWeek = (startOfMonth.day() + 6) % 7;

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.clone().subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.clone().add(1, "month"));
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty slots for previous month days
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="schedule-day empty" />);
    }

    // Days of current month
    for (let d = 1; d <= daysInMonth; d++) {
      const date = startOfMonth.clone().date(d);
      const isSelected = selectedDay && moment(selectedDay).isSame(date, "day");
      const isPast = date.isBefore(moment(), "day");

      days.push(
        <button
          type="button"
          key={d}
          className={`schedule-day ${isSelected ? "selected" : ""} ${isPast ? "disabled" : ""}`}
          onClick={() => !isPast && onChangeDay(date.toDate())}
          disabled={isPast}
        >
          {d}
        </button>
      );
    }
    return days;
  };

  const marinaOptions = locations.map(loc => ({
    label: loc.name,
    value: loc.id
  }));

  const handleBook = async () => {
    if (!selectedMarina || !selectedDay || !selectedSlot) {
      toast.error("Please select marina, date and time slot");
      return;
    }
    // Validate date must be today or future
    if (moment(selectedDay).isBefore(moment(), "day")) {
      toast.error("Please select a date that is today or in the future");
      return;
    }
    try {
      setBookingLoading(true);
      const formattedDate = moment(selectedDay).format("YYYY-MM-DD");
      // Resolve selected slot label (backend expects text like "10 AM - 12 PM")
      const slotObj = timeslots.find(
        (s) =>
          s?.id === selectedSlot ||
          s?.time_slot === selectedSlot ||
          s?.time === selectedSlot ||
          s?.label === selectedSlot
      );
      const resolvedSlot =
        (slotObj && (slotObj.time_slot || slotObj.time || slotObj.label || (slotObj.start_time && slotObj.end_time && `${slotObj.start_time} - ${slotObj.end_time}`))) ||
        selectedSlot;
      const formData = new FormData();
      formData.append("briefing_date", formattedDate);
      formData.append("time_slot", resolvedSlot);
      formData.append("location_id", selectedMarina);
      // Correct endpoint: POST /clubBriefing
      const response = await ApiService.post("/clubBriefing", formData);
      if (response.data?.status) {
        toast.success(response.data.message || "Club briefing booked successfully");
        if (typeof onBook === "function") onBook();
      } else {
        toast.error(response.data?.message || "Failed to book club briefing");
      }
    } catch (error) {
      toast.error("Error booking club briefing");
    } finally {
      setBookingLoading(false);
    }
  };

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
            placeholder={loadingLocations ? "Loading..." : "Select Marina"}
            className="marina-dropdown-prime"
            style={{ width: "100%", marginBottom: "20px" }}
            disabled={loadingLocations}
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
          <div className="schedule-month-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <button type="button" onClick={handlePrevMonth} className="nav-btn">&lt;</button>
              <div className="schedule-month">{currentMonth.format("MMMM YYYY")}</div>
              <button type="button" onClick={handleNextMonth} className="nav-btn">&gt;</button>
          </div>
          <div className="schedule-weekdays">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <div key={d} className="schedule-weekday">
                {d}
              </div>
            ))}
          </div>
          <div className="schedule-days">
            {renderCalendarDays()}
          </div>
        </div>

        <div className="schedule-card">
          <div className="schedule-card-header">
            <span role="img" aria-label="time">
              ⏱️
            </span>
            <span>Select time of briefing</span>
          </div>
          <div className="schedule-date">
            {selectedDay ? moment(selectedDay).format("MMM D, YYYY") : "Select a date"}
          </div>
          <div className="schedule-slot-label">
            {loadingTimeslots ? "Loading slots..." : (timeslots.length > 0 ? "Choose a slot" : "No slots available")}
          </div>
          <div className="schedule-slots-grid">
            {timeslots.map((slot, idx) => {
              const slotLabel = typeof slot === 'string' ? slot : (slot.time_slot || slot.time || slot.label || `${slot.start_time} - ${slot.end_time}`);
              const slotValue = typeof slot === 'string' ? slot : (slot.id || slot.time_slot || slot.time || slotLabel);
              const isSelected = selectedSlot === slotValue;
              
              return (
                <button
                  type="button"
                  key={idx}
                  className={`schedule-slot ${isSelected ? "selected" : ""}`}
                  onClick={() => onChangeSlot(slotValue)}
                >
                  <span className="schedule-slot-text">{slotLabel}</span>
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
      </div>

      <div className="schedule-submit-wrap">
        <button className="schedule-submit-btn" onClick={handleBook} disabled={bookingLoading}>
          {bookingLoading ? "Booking..." : "Book"}
        </button>
      </div>
    </div>
  </div>
);
};

export default ClubBriefing;
