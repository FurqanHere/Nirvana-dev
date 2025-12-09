import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // useEffect(() => {
  //   const currentLang = i18n.language;
  //   const direction = currentLang === "ar" ? "rtl" : "ltr";
  //   document.documentElement.setAttribute("dir", direction);
  //   document.documentElement.setAttribute("lang", currentLang);
  // }, [i18n.language]);

  return (
    <>
      <div className="privacy-bg from-top">
        <Header background="bg-white" />

        <div className="heading-policy flex-column">
          <h1>Privacy Policy</h1>
        </div>
      </div>

      <div className="container data-info">
        <div className="text-center">
          <p>Effective Date: [June 17, 2025]</p>
          <p>
            Website: <a href="https://gearapp.ae"> https://gearapp.ae </a>
          </p>
        </div>
        <div className="privacy-heading">
          <h3>1. Introduction</h3>
          <p>
            Welcome to Gear, a mobile application operated by FIRST GEAR AUTO
            USING ELECTRONIC MEDIA RENTING VEHICLES L.L.C, a company
            incorporated in Dubai, United Arab Emirates (“we”, “our”, or “us”).
            This Privacy Policy outlines how we collect, use, disclose, and
            protect your information when you use our mobile app and services.
          </p>
          <p className="mt-4 mb-5">
            By using Gear (the “App”), you agree to the terms of this Privacy
            Policy.
          </p>
          <h3 className="mt-5">2. Information We Collect</h3>
          <p>
            To provide our car rental services through the Gear app, we may
            collect the following information:
          </p>
          <label>Personal Information:</label>
          <ul>
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>
              Government-issued ID (Emirates ID, driving license, or passport
              for tourists)
            </li>
          </ul>
          <label>Usage Data:</label>
          <ul>
            <li>App interaction and usage logs</li>
            <li>IP address</li>
            <li>Device type, OS version, and other diagnostic data</li>
          </ul>
          <label>Location Information:</label>
          <ul>
            <li>
              With your permission, we may collect your device’s location to
              provide relevant rental services and listings.
            </li>
          </ul>
          <h3 className="mt-5">3. How We Use Your Information</h3>
          <label>We use your personal information to:</label>
          <ul>
            <li>Create and manage your Gear account</li>
            <li>Facilitate car rental bookings with third-party providers</li>
            <li>Verify your identity and eligibility to rent a vehicle</li>
            <li>
              Communicate with you regarding bookings, account activity, and
              customer support
            </li>
            <li>Improve and personalize the app experience</li>
            <li>
              Comply with legal obligations and law enforcement requirements
            </li>
          </ul>
          <h3 className="mt-5">4. Sharing Your Information</h3>
          <label>We may share your information with:</label>
          <ul>
            <li>
              <strong>Third-Party Car Rental Companies:</strong> To facilitate
              your rental booking.
            </li>
            <li>
              <strong>Service Providers:</strong> Who assist with identity
              verification, cloud storage, analytics, or customer support.
            </li>
            <li>
              <strong>Regulatory Authorities:</strong>
              If required by law or legal proceedings in the UAE.
            </li>
          </ul>
          <h3 className="mt-5">5. Data Security</h3>
          <p>
            We take appropriate technical and organizational measures to secure
            your personal data. While we strive to use commercially acceptable
            means to protect your information, no method of transmission over
            the Internet is 100% secure.
          </p>
          <h3 className="mt-5">6. Data Retention</h3>
          <p>
            We retain your personal data only for as long as necessary to
            fulfill the purposes outlined in this policy, comply with legal
            obligations, resolve disputes, and enforce our agreements.
          </p>
          <h3 className="mt-5">7. Your Rights</h3>
          <label>
            Depending on the laws applicable in the UAE, you may have the right
            to:
          </label>
          <ul>
            <li>Access, update, or delete your personal information</li>
            <li>Withdraw consent (where processing is based on consent)</li>
            <li>Request a copy of your data</li>
            <p>
              To exercise these rights, please contact us at
              business@gearapp.ae.
            </p>
          </ul>
          <h3 className="mt-5">8. Children’s Privacy</h3>
          <p>
            Our services are not intended for use by individuals under the age
            of 18. We do not knowingly collect personal data from children under
            18 years of age.
          </p>
          <h3 className="mt-5">9. Changes to This Privacy Policy</h3>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with a revised “Effective Date.” We
            encourage you to review this policy periodically.
          </p>
          <h3 className="mt-5">10. Contact Us</h3>
          <p>
            If you have any questions or concerns about this Privacy Policy or
            our data practices, please contact us at:
          </p>
          <strong style={{ color: "#6b6b6b" }}>
            FIRST GEAR AUTO USING ELECTRONIC MEDIA RENTING VEHICLES L.L.C
          </strong>
          <p>
            Email: <strong> business@gearapp.ae</strong>
          </p>
          <p>Location: Dubai, United Arab Emirates</p>
          <span>Website:</span><a href="https://gearapp.ae"> https://gearapp.ae </a>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default PrivacyPolicy;