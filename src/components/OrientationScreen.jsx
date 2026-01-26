import "../assets/css/base.css";
import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import successLottie from "../assets/images/Succes.json";
import { Dropdown } from "primereact/dropdown";
import moment from "moment";
import ApiService from "../services/ApiService";
import { toast } from "react-toastify";

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
  const [locations, setLocations] = useState([]);
  const [timeslots, setTimeslots] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [loadingLocations, setLoadingLocations] = useState(false);
  const [loadingTimeslots, setLoadingTimeslots] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

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
          `/getOrientationTimeslots?date=${formattedDate}&location_id=${selectedMarina}`
        );
        if (response.data.status) {
          setTimeslots(response.data.data.timeslots || []);
        } else {
           // If no timeslots or error, just empty list
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

  const handleBook = async () => {
    if (!selectedMarina) {
      toast.error("Please select a marina");
      return;
    }
    if (!selectedDay) {
      toast.error("Please select a date");
      return;
    }
    if (!selectedSlot) {
      toast.error("Please select a time slot");
      return;
    }

    setIsBooking(true);
    try {
      // Find the selected slot object to get the time string if selectedSlot is an ID
      let timeSlotToSend = selectedSlot;
      const selectedSlotObj = timeslots.find(t => {
          const val = typeof t === 'string' ? t : (t.id || t.time || (t.start_time ? `${t.start_time} - ${t.end_time}` : null));
          return val === selectedSlot;
      });

      if (selectedSlotObj) {
          // If we found the object, prioritize sending the time string
          timeSlotToSend = typeof selectedSlotObj === 'string' ? selectedSlotObj : (selectedSlotObj.time || selectedSlotObj.label || `${selectedSlotObj.start_time} - ${selectedSlotObj.end_time}`);
      } else {
          // Fallback: ensure it is a string
          timeSlotToSend = String(selectedSlot);
      }

      const payload = {
        location_id: selectedMarina,
        orientation_date: moment(selectedDay).format("YYYY-MM-DD"),
        time_slot: timeSlotToSend, 
      };

      const response = await ApiService.post("/saveOrientation", payload);

      if (response.data.status) {
        onBook(); // Trigger success popup in parent
      } else {
        toast.error(response.data.message || "Failed to book orientation");
      }
    } catch (error) {
      console.error("Error booking orientation:", error);
      toast.error(
        error.response?.data?.message || "An error occurred while booking"
      );
    } finally {
      setIsBooking(false);
    }
  };

  // Calendar Helpers
  const startOfMonth = currentMonth.clone().startOf("month");
  const endOfMonth = currentMonth.clone().endOf("month");
  const daysInMonth = currentMonth.daysInMonth();
  
  // Design shows Mon-Sun. moment().day() gives 0 for Sun.
  // We need Mon=0, ..., Sun=6 for grid alignment if using Mon-Sun header.
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

  return (
    <>
      <div className="schedule-view">
        <div className="container bookings-marina-select">
          <Dropdown
            value={selectedMarina}
            onChange={(e) => onChangeMarina(e.value)}
            options={marinaOptions}
            optionLabel="label"
            placeholder={loadingLocations ? "Loading..." : "Select Marina"}
            className="marina-dropdown-prime"
            disabled={loadingLocations}
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
              <span>Select time of Orientation</span>
            </div>
            <div className="schedule-date">
              {selectedDay ? moment(selectedDay).format("MMM D, YYYY") : "Select a date"}
            </div>
            <div className="schedule-slot-label">
                {loadingTimeslots ? "Loading slots..." : (timeslots.length > 0 ? "Choose a slot" : "No slots available")}
            </div>
            <div className="schedule-slots-grid">
            {timeslots.map((slot, idx) => {
              // API likely returns slot object or string. Adjust based on actual response.
              // Assuming slot might have { id, time } or just be a string.
              // The screenshot showed empty array, so structure is unknown.
              // I'll assume it's an object with `id` and `time` or `start_time` - `end_time`.
              // Or just a string "10:00 - 12:00".
              // Let's handle both string and object cases safely.
              
              const slotLabel = typeof slot === 'string' ? slot : (slot.time || slot.label || `${slot.start_time} - ${slot.end_time}`);
              const slotValue = typeof slot === 'string' ? slot : (slot.id || slot.time || slotLabel);
              
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
          <button 
            className="schedule-submit-btn" 
            onClick={handleBook}
            disabled={isBooking}
          >
            {isBooking ? "Booking..." : "Book"}
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
                {selectedDay ? moment(selectedDay).format("MMM D, YYYY") : ""} 
                {/* We need to display time slot too. Since selectedSlot is a value, we might need to find the label. */}
                {/* For simplicity, if selectedSlot is string, show it. If ID, we can't easily show label without looking up in timeslots. */}
                 – {timeslots.find(t => (t.id || t) === selectedSlot)?.time || selectedSlot}
              </div>
              {/* <div className="success-detail-ref">Ref #: 3265</div> */}
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
