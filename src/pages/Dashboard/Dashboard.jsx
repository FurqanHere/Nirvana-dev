import "../../assets/css/base.css";
import React, { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Sidebar from "./Sidebar";
import BoatBookingDetail from "../../components/Dashboard/Bookings/BoatBookingDetail";
import ExperienceBookings from "../../components/Dashboard/Bookings/ExperienceBookings";
import BookingDetail from "../../components/Dashboard/Bookings/BookingDetail";
import Upcoming from "../../components/Dashboard/Payments/Upcoming";
import Previous from "../../components/Dashboard/Payments/Previous";
import ProfileMembership from "../../components/Dashboard/Profile/Profile-Membership";
import PersonalInformation from "../../components/Dashboard/Profile/PersonalInformation";
import FavouriteYacts from "../../components/Dashboard/Profile/FavouriteYacts";
import PersonalDocuments from "../../components/Dashboard/Profile/PersonalDocuments";
import PenaltyReports from "../../components/Dashboard/Profile/PenaltyReports";
import ClubBriefing from "../../components/Dashboard/Profile/ClubBriefing";
import OrientationSessions from "../../components/Dashboard/Profile/OrientationSessions";
import Notifications from "../../components/Dashboard/Profile/Notifications";
import Boats from "../../components/Dashboard/HomePage/Boats";
import Experiences from "../../components/Dashboard/HomePage/Experiences";
import HomeBoatsDetail from "../HomeBoatsDetail";
import bookingShips from "../../assets/images/bookingShips.png";
import profilePic from "../../assets/images/profile-pic.png";

const sampleCards = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  title: "Calma Suite 1",
  ref: "#3265",
  date: "Dec 31, 2025 - 10 AM - 12 PM",
  image: bookingShips,
}));

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("bookings");
  const [selectedSection, setSelectedSection] = useState("boats");
  const [selectedMarina, setSelectedMarina] = useState("");
  const [search, setSearch] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [userName, setUserName] = useState("User");
  const [boats, setBoats] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [locations, setLocations] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [boatsRes, locationsRes, experiencesRes] = await Promise.all([
          ApiService.get('/getBoats'),
          ApiService.get('/getLocations?type=orientation'),
          ApiService.get('/getExperiences')
        ]);
        if (boatsRes.data.status) {
          setBoats(boatsRes.data.data.boats);
        }
        if (locationsRes.data.status) {
          setLocations(locationsRes.data.data.locations);
        }
        if (experiencesRes.data.status) {
          setExperiences(experiencesRes.data.data.experiences);
        }
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const name = parsedUser.full_name || parsedUser.fullName || parsedUser.name || "User";
        setUserName(name);
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    }
  }, []);

  const handleSelectSection = (sectionKey) => {
    setSelectedSection(sectionKey);
    if (sectionKey === "experiences") {
      setSelectedTab("experiences");
    }
    if (sectionKey === "boats" && selectedTab === "experiences") {
      setSelectedTab("bookings");
    }
  };

  const marinaOptions = locations.map(loc => ({
    label: loc.name,
    value: loc.id
  }));

  let filteredCards;
  if (selectedTab === "bookings") {
    filteredCards = boats
      .filter(boat => {
        const matchesSearch = boat.name.toLowerCase().includes(search.toLowerCase());
        const matchesMarina = selectedMarina ? boat.location_id === selectedMarina : true;
        return matchesSearch && matchesMarina;
      })
      .map(boat => ({
        ...boat,
        id: boat.id,
        title: boat.name,
        ref: boat.ac_number || `#${boat.id}`,
        date: boat.working_hours,
        image: boat.main_image
      }));
  } else {
    filteredCards = experiences
      .filter(exp => {
        const matchesSearch = exp.title.toLowerCase().includes(search.toLowerCase());
        // For experiences, we might not have location_id in the same way, but if needed:
        // const matchesMarina = selectedMarina ? exp.location_id === selectedMarina : true;
        return matchesSearch;
      })
      .map(exp => ({
        id: exp.id,
        title: exp.title,
        ref: exp.boat || "Subject to Availability",
        date: `${exp.max_passengers} Passengers`, // Mapping max_passengers to date field for display reuse
        image: exp.images && exp.images.length > 0 ? exp.images[0] : bookingShips, // Use first image or fallback
        // Additional fields if needed by Experiences component
        engine: exp.description ? exp.description.substring(0, 30) + "..." : "", // Mapping description to engine for display reuse
        length: "" 
      }));
  }

  const profileComponent = (
    <div className="dashboard-user">
      <div className="dashboard-avatar">
        <img src={ profilePic } alt="" className="w-100" />
      </div>
      <div className="dashboard-user-text">
        <p className="dashboard-welcome">Welcome</p>
        <h5 className="dashboard-user-name">{userName} !</h5>
      </div>
    </div>
  );

  return (
    <div className="dashboard-page">
      <Header profile={profileComponent} onNotificationClick={() => setSelectedSection("notifications")} />
      <section className="dashboard-section">
        <div className="dashboard-layout">
          <Sidebar
            selectedSection={selectedSection}
            setSelectedSection={handleSelectSection}
          />

          <main className="dashboard-content">
            {selectedSection === "boat-bookings" ? (
              selectedBooking ? (
                <BookingDetail booking={selectedBooking} onBack={() => setSelectedBooking(null)} />
              ) : (
                <BoatBookingDetail onViewBooking={(booking) => setSelectedBooking(booking)} />
              )
            ) : selectedSection === "experience-bookings" ? (
              selectedBooking ? (
                <BookingDetail booking={selectedBooking} onBack={() => setSelectedBooking(null)} />
              ) : (
                <ExperienceBookings onViewBooking={(booking) => setSelectedBooking(booking)} />
              )
            ) : selectedSection === "upcoming" ? (
              <Upcoming />
            ) : selectedSection === "past" ? (
              <Previous />
            ) : selectedSection === "membership" ? (
              <ProfileMembership />
            ) : selectedSection === "personal" ? (
              <PersonalInformation />
            ) : selectedSection === "favorites" ? (
              <FavouriteYacts />
            ) : selectedSection === "documents" ? (
              <PersonalDocuments />
            ) : selectedSection === "penalty" ? (
              <PenaltyReports />
            ) : selectedSection === "briefing" ? (
              <ClubBriefing />
            ) : selectedSection === "orientation" ? (
              <OrientationSessions />
            ) : selectedSection === "notifications" ? (
              <Notifications />
            ) : selectedSection === "boat-detail" ? (
              <HomeBoatsDetail />
            ) : selectedTab === "bookings" ? (
              <Boats
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                setSelectedSection={setSelectedSection}
                selectedMarina={selectedMarina}
                setSelectedMarina={setSelectedMarina}
                filteredCards={filteredCards}
                marinaOptions={marinaOptions}
                search={search}
                setSearch={setSearch}
              />
            ) : (
              <Experiences
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                setSelectedSection={setSelectedSection}
                selectedMarina={selectedMarina}
                setSelectedMarina={setSelectedMarina}
                filteredCards={filteredCards}
                search={search}
                setSearch={setSearch}
                marinaOptions={marinaOptions}
              />
            )}
          </main>
        </div>
      </section>
      <Footer />
    </div>
  );
}
