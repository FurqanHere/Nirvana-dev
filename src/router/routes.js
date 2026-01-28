import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import TermsCondition from '../pages/TermsAndConditions';
import Privacy from '../pages/PrivacyPolicy';
import CancellationPolicy from "../pages/CancellationPolicy";
import Support from "../pages/Support";
import ContactUs from "../pages/ContactUs";
import BecomeAPartner from "../pages/Become-a-Partner";
import Aboutus from "../pages/AboutUs";
import Membership from "../pages/Membership";
import Experience from "../pages/Experience";
import Locations from "../pages/Locations.jsx";
import Calma from "../pages/Calma.jsx";
import Boats from "../pages/Boats.jsx";

// CMS Imports
import Login from "../pages/Login";
import CreateAccount from "../pages/CreateAccount";
import UserMembership from "../pages/UserMembership";
import YactDetails from "../pages/YactDetails";
import BookExperience from "../pages/BookExperience";
import ShipDetails from "../pages/BoatDetails.jsx";
import Dashboard from "../pages/Dashboard/Dashboard";
import ReviewContract from "../components/ReviewContract";
import PhoneOTP from "../components/phoneOTP";

const AppRouter = () => {
    const basePath = process.env.REACT_APP_BASE_PATH;

    return (
      <Router basename={basePath}>
        <Routes>
          {/* Website Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/terms" element={<TermsCondition />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/support" element={<Support />} />
          <Route path="/become-a-partner" element={<BecomeAPartner />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/cancellation-policy" element={<CancellationPolicy />} />
          <Route path="/member-ship" element={<Membership />} />
          <Route path="/about-us" element={<Aboutus />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/calma" element={<Calma />} />
          <Route path="/boats" element={<Boats />} />

          {/* CMS/Dashboard Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="/membership" element={<UserMembership />} />
          <Route path="/membership/packages" element={<UserMembership view="packages" />} />
          <Route path="/membership/payment-options" element={<UserMembership view="paymentOptions" />} />
          <Route path="/membership/personal-details" element={<UserMembership view="details" />} />
          <Route path="/membership/final-review" element={<UserMembership view="finalReview" />} />
          <Route path="/membership/payment-method" element={<UserMembership view="paymentMethod" />} />
          <Route path="/membership/payment" element={<UserMembership view="cardInfo" />} />
          <Route path="/membership/document-upload" element={<UserMembership view="documentUpload" />} />
          <Route path="/membership/orientation" element={<UserMembership view="orientationSession" />} />
          <Route path="/membership/club-briefing" element={<UserMembership view="clubBriefing" />} />
          <Route path="/yacht-details" element={<YactDetails />} />
          <Route path="/book-experience" element={<BookExperience />} />
          <Route path="/boat-details" element={<ShipDetails />} />
          <Route path="/dashboard/boat/boat-detail" element={<ShipDetails />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/review-contract" element={<ReviewContract />} />
          <Route path="/phone-otp" element={<PhoneOTP />} />
        </Routes>
      </Router>
    );
};

export default AppRouter;
