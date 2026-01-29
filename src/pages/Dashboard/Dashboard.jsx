import "../../assets/css/base.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import ApiService from "../../services/ApiService";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Sidebar from "./Sidebar";
import BoatBookingDetail from "../../components/Dashboard/Bookings/BoatBookingDetail";
import ExperienceBookings from "../../components/Dashboard/Bookings/ExperienceBookings";
import BookingDetail from "../../components/Dashboard/Bookings/BookingDetail";
import ViewExperienceBookingDetail from "../../components/Dashboard/Bookings/ViewExperienceBookingDetail";
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
import bookingShips from "../../assets/images/bookingShips.png";
import profilePic from "../../assets/images/profile-pic.png";

const sampleCards = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  title: "Calma Suite 1",
  ref: "#3265",
  date: "Dec 31, 2025 - 10 AM - 12 PM",
  image: bookingShips,
}));

const BookingDetailRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;
  
  if (!booking) {
      return <Navigate to="/dashboard/bookings/boat" replace />;
  }
  
  return <BookingDetail booking={booking} onBack={() => navigate(-1)} />;
};

const ExperienceBookingDetailRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;
  
  if (!booking) {
      return <Navigate to="/dashboard/bookings/experience" replace />;
  }
  
  return <ViewExperienceBookingDetail booking={booking} onBack={() => navigate(-1)} />;
};

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState("bookings");
  const [selectedMarina, setSelectedMarina] = useState("");
  const [search, setSearch] = useState("");
  const [userName, setUserName] = useState("User");
  const [userImage, setUserImage] = useState(profilePic);
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
        if (parsedUser.picture) {
          setUserImage(parsedUser.picture);
        }
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    }
  }, []);

  // Update selectedTab based on URL for Boats/Experiences views
  useEffect(() => {
    if (location.pathname.includes("/dashboard/experiences")) {
      setSelectedTab("experiences");
    } else if (location.pathname.includes("/dashboard/boats")) {
      setSelectedTab("bookings");
    }
  }, [location.pathname]);

  const getActiveSection = (pathname) => {
    if (pathname.includes("/dashboard/experiences")) return "experiences";
    if (pathname.includes("/dashboard/bookings/boat")) return "boat-bookings";
    if (pathname.includes("/dashboard/bookings/experience")) return "experience-bookings";
    if (pathname.includes("/dashboard/bookings/experience-detail")) return "experience-bookings";
    if (pathname.includes("/dashboard/bookings/detail")) return "boat-bookings"; // Fallback parent
    if (pathname.includes("/dashboard/payments/upcoming")) return "upcoming";
    if (pathname.includes("/dashboard/payments/past")) return "past";
    if (pathname.includes("/dashboard/profile/membership")) return "membership";
    if (pathname.includes("/dashboard/profile/personal")) return "personal";
    if (pathname.includes("/dashboard/profile/favorites")) return "favorites";
    if (pathname.includes("/dashboard/profile/documents")) return "documents";
    if (pathname.includes("/dashboard/profile/penalty")) return "penalty";
    if (pathname.includes("/dashboard/profile/briefing")) return "briefing";
    if (pathname.includes("/dashboard/profile/orientation")) return "orientation";
    if (pathname.includes("/dashboard/notifications")) return "notifications";
    if (pathname.includes("/dashboard/boat/boat-detail")) return "boats";
    if (pathname.includes("/dashboard/boats")) return "boats";
    return "boats";
  };

  const selectedSection = getActiveSection(location.pathname);

  const handleSelectSection = (key) => {
    if (key === "logout") {
      localStorage.removeItem("user");
      navigate("/login");
      return;
    }

    let path = "/dashboard/boats";
    switch(key) {
        case "boats": path = "/dashboard/boats"; break;
        case "experiences": path = "/dashboard/experiences"; break;
        case "boat-bookings": path = "/dashboard/bookings/boat"; break;
        case "experience-bookings": path = "/dashboard/bookings/experience"; break;
        case "upcoming": path = "/dashboard/payments/upcoming"; break;
        case "past": path = "/dashboard/payments/past"; break;
        case "membership": path = "/dashboard/profile/membership"; break;
        case "personal": path = "/dashboard/profile/personal"; break;
        case "favorites": path = "/dashboard/profile/favorites"; break;
        case "documents": path = "/dashboard/profile/documents"; break;
        case "penalty": path = "/dashboard/profile/penalty"; break;
        case "briefing": path = "/dashboard/profile/briefing"; break;
        case "orientation": path = "/dashboard/profile/orientation"; break;
        case "notifications": path = "/dashboard/notifications"; break;
        case "boat-detail": path = "/dashboard/boat/boat-detail"; break;
        default: path = "/dashboard/boats";
    }
    navigate(path);
  };

  const handleSetSelectedTab = (tab) => {
    setSelectedTab(tab);
    if (tab === "experiences") {
        navigate("/dashboard/experiences");
    } else if (tab === "bookings") {
        navigate("/dashboard/boats");
    }
  };

  const marinaOptions = locations.map(loc => ({
    label: loc.name,
    value: loc.id
  }));

  // Filter logic remains the same, used by Boats/Experiences components
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
        return matchesSearch;
      })
      .map(exp => ({
        ...exp,
        id: exp.id,
        title: exp.title,
        ref: exp.boat || "Subject to Availability",
        date: `${exp.max_passengers} Passengers`,
        image: exp.images && exp.images.length > 0 ? exp.images[0] : bookingShips
      }));
  }

  const profileComponent = (
    <div className="dashboard-user">
      <div className="dashboard-avatar">
        <img src={ userImage } alt="" className="w-100" />
      </div>
      <div className="dashboard-user-text">
        <p className="dashboard-welcome">Welcome</p>
        <h5 className="dashboard-user-name">{userName} !</h5>
      </div>
    </div>
  );

  return (
    <div className="dashboard-page">
      <Header profile={profileComponent} onNotificationClick={() => handleSelectSection("notifications")} />
      <section className="dashboard-section">
        <div className="dashboard-layout">
          <Sidebar
            selectedSection={selectedSection}
            setSelectedSection={handleSelectSection}
          />

          <main className="dashboard-content">
            <Routes>
                <Route path="/" element={<Navigate to="boats" replace />} />
                <Route path="boats" element={
                    <Boats
                        selectedTab={selectedTab}
                        setSelectedTab={handleSetSelectedTab}
                        setSelectedSection={handleSelectSection}
                        selectedMarina={selectedMarina}
                        setSelectedMarina={setSelectedMarina}
                        filteredCards={filteredCards}
                        marinaOptions={marinaOptions}
                        search={search}
                        setSearch={setSearch}
                    />
                } />
                <Route path="experiences" element={
                    <Experiences
                        selectedTab={selectedTab}
                        setSelectedTab={handleSetSelectedTab}
                        setSelectedSection={handleSelectSection}
                        selectedMarina={selectedMarina}
                        setSelectedMarina={setSelectedMarina}
                        filteredCards={filteredCards}
                        search={search}
                        setSearch={setSearch}
                        marinaOptions={marinaOptions}
                    />
                } />
                <Route path="bookings/boat" element={
                    <BoatBookingDetail 
                        onViewBooking={(booking) => navigate('/dashboard/bookings/detail', { state: { booking } })} 
                    />
                } />
                <Route path="bookings/experience" element={
                    <ExperienceBookings 
                        onViewBooking={(booking) => navigate('/dashboard/bookings/experience-detail', { state: { booking } })} 
                    />
                } />
                <Route path="bookings/detail" element={<BookingDetailRoute />} />
                <Route path="bookings/experience-detail" element={<ExperienceBookingDetailRoute />} />
                <Route path="payments/upcoming" element={<Upcoming />} />
                <Route path="payments/past" element={<Previous />} />
                <Route path="profile/membership" element={<ProfileMembership />} />
                <Route path="profile/personal" element={<PersonalInformation />} />
                <Route path="profile/favorites" element={<FavouriteYacts />} />
                <Route path="profile/documents" element={<PersonalDocuments />} />
                <Route path="profile/penalty" element={<PenaltyReports />} />
                <Route path="profile/briefing" element={<ClubBriefing />} />
                <Route path="profile/orientation" element={<OrientationSessions />} />
                <Route path="notifications" element={<Notifications />} />
            </Routes>
          </main>
        </div>
      </section>
    </div>
  );
}
