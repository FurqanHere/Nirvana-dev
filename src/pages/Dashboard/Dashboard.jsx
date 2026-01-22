import "../../assets/css/style.base.css";
import React, { useEffect, useState } from "react";
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
  const [search] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
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

  const filteredCards = sampleCards.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.ref.toLowerCase().includes(search.toLowerCase())
  );

  const profileComponent = (
    <div className="dashboard-user">
      <div className="dashboard-avatar">
        <img src={ profilePic } alt="" className="w-100" />
      </div>
      <div className="dashboard-user-text">
        <p className="dashboard-welcome">Welcome</p>
        <h5 className="dashboard-user-name">Saher !</h5>
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
              />
            ) : (
              <Experiences
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                setSelectedSection={setSelectedSection}
                selectedMarina={selectedMarina}
                setSelectedMarina={setSelectedMarina}
                filteredCards={filteredCards}
              />
            )}
          </main>
        </div>
      </section>
      <Footer />
    </div>
  );
}
