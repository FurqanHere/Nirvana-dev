import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import TermsCondition from '../pages/TermsAndConditions';
import Privacy from '../pages/PrivacyPolicy';
import CancellationPolicy from "../pages/CancellationPolicy";
import Support from "../pages/Support";
import ContactUs from "../pages/ContactUs";
import Become_a_Partner from "../pages/Become-a-Partner";
import Aboutus from "../pages/AboutUs";
import Membership from "../pages/Membership";
import Experience from "../pages/Experience";
import Locations from "../pages/Locations.jsx";

const AppRouter = () => {
    const basePath = process.env.REACT_APP_BASE_PATH;

    return (
      <Router basename={basePath}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/terms" element={<TermsCondition />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/support" element={<Support />} />
          <Route path="/become-a-partner" element={<Become_a_Partner />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/cancellation-policy" element={<CancellationPolicy />} />
          <Route path="/member-ship" element={<Membership />} />
          <Route path="/about-us" element={<Aboutus />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/locations" element={<Locations />} />
        </Routes>
      </Router>
    );
};

export default AppRouter;
