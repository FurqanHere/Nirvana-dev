import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";

const TermsAndConditions = () => {
  const { i18n } = useTranslation();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (i18n && i18n.language) {
      const currentLang = i18n.language;
      const direction = currentLang === "ar" ? "rtl" : "ltr";
      document.documentElement.setAttribute("dir", direction);
      document.documentElement.setAttribute("lang", currentLang);
    }
  }, [i18n, i18n?.language]);

  return (
    <>
      <div className="from-top">
        <Header background="bg-white" />

        <div className="heading-policy flex-column">
          <h1>Terms & Conditions</h1>
        </div>
      </div>

      <div className="container">
        <div className="text-center">
          <p>Effective Date: [June 17, 2025]</p>
          <p>
            Website: <a href="https://nirvanaychts.ae"> https://nirvanaychts.ae </a>
          </p>
          <p>
            These Terms & Conditions ("Terms") govern your use of the Nirvana
            mobile application ("App") operated by Nirvana Yachts & Boats L.L.C, a company incorporated in
            Dubai, United Arab Emirates (“we”, “us”, “our”).
          </p>
          <p>
            By downloading, accessing, or using the Nirvana App, you agree to be
            bound by these Terms. If you do not agree, please do not use the
            App.
          </p>
        </div>
        <div className="privacy-heading">
          <h3>1. Service Description</h3>
          <p className="my-0">
            Nirvana is a yacht rental aggregator platform that allows users to book
            yachts/boats on a rental basis through third-party yacht rental companies
            (“Rental Partners”).
          </p>
          <p className="">
            We do <b>not</b> own or operate any of the yachts listed in the
            app. Our role is to facilitate your booking with our partnered
            rental providers.
          </p>

          <h3 className="mt-4">2. Eligibility</h3>
          <label>To use the Nirvana App, you must:</label>
          <ul>
            <li>Be at least 18 years of age</li>
            <li>
              Possess a valid government-issued ID (or
              passport for tourists)
            </li>
            <li>Provide accurate and complete personal information</li>
          </ul>

          <h3 className="mt-4">3. Account Registration</h3>
          <label>
            To make a booking, users must register an account and provide:
          </label>
          <ul>
            <li>Full name</li>
            <li>Valid email address and mobile number</li>
            <li>
              Scans or photos of Emirates ID, passport (if tourist)
            </li>
          </ul>
          <p>
            You are responsible for maintaining the confidentiality of your
            account credentials. You agree to notify us immediately of any
            unauthorized use of your account.
          </p>

          <h3 className="mt-4">4. Booking Process</h3>
          <label>Once a booking is made through the App:</label>
          <ul>
            <li>
              The rental agreement is formed directly between you and the
              <strong>Rental Partner.</strong>
            </li>
            <li>
              Yacht availability, pricing, rental terms, and delivery options
              are set by the Rental Partner.
            </li>
            <li>
              You agree to comply with the specific rental terms provided by the
              Rental Partner.
            </li>
          </ul>

          <h3 className="mt-4">5. Payments & Fees</h3>
          <ul>
            <li>
              All rental charges are displayed before confirming your booking.
            </li>
            <li>Payments are processed through secure third-party gateways.</li>
            <li>
              You may be required to pay a security deposit based on the terms
              set by the Rental Partner.
            </li>
          </ul>
          <p>
            We are not responsible for disputes or refunds related to services
            rendered by third-party rental companies.
          </p>

          <h3 className="mt-4">6. Cancellations & Refunds</h3>
          <p>
            Cancellation and refund policies are governed by the individual
            Rental Partner. You are advised to review their specific terms
            before completing a booking. In case of disputes, we may assist in
            communication but we do not guarantee refunds.
          </p>

          <h3 className="mt-4">7. User Conduct</h3>
          <label>You agree not to:</label>
          <ul>
            <li>Misuse or hack the App</li>
            <li>Use false documents or impersonate another person</li>
            <li>
              Violate any laws or third-party rights during a rental period
            </li>
          </ul>
          <p>
            We reserve the right to suspend or terminate your account for
            violations.
          </p>

          <h3 className="mt-4">8. Liability Disclaimer</h3>
          <label>We are not liable for:</label>
          <ul>
            <li>Any damages or losses caused by third-party rental services</li>
            <li>Yacht breakdowns, or accidents</li>
            <li>Delays or service failures caused by Rental Partners</li>
          </ul>
          <p>
            Your interaction with any Rental Partner is solely between you and
            them.
          </p>

          <h3 className="mt-4">9. Intellectual Property</h3>
          <p>
            All content and trademarks in the App are owned by or licensed to
            <b>
              {" "}
              Nirvana Yachts & Boats L.L.C.
            </b>
            Unauthorized use of the App’s content is strictly prohibited.
          </p>

          <h3 className="mt-4">10. Governing Law & Jurisdiction</h3>
          <p>
            These Terms are governed by the laws of the
            <b> United Arab Emirates</b>, and any disputes shall be subject to
            the exclusive jurisdiction of the courts of <b> Dubai, UAE.</b>
          </p>

          <h3 className="mt-4">11. Modifications to Terms</h3>
          <p>
            We may update these Terms at any time. Continued use of the App
            after such changes constitutes your acceptance of the revised Terms.
          </p>
          <strong>
            Nirvana Yachts & Boats L.L.C
          </strong>
          <p>
            Email: <strong>sales@nirvanaychts.ae</strong>
          </p>
          <p>Location: Dubai, United Arab Emirates</p>
          <p>Website: https://nirvanaychts.ae</p>

          <h3 className="mt-4">12. Contact Us</h3>
          <p>If you have any questions about these Terms, please contact:</p>
          <strong>
            Nirvana Yachts & Boats L.L.C
          </strong>
          <p>
            Email: <strong>sales@nirvanaychts.ae</strong>
          </p>
          <p>Location: Dubai, United Arab Emirates</p>
          <p>
            Website: <a href="https://nirvanaychts.ae"> https://nirvanaychts.ae </a>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default TermsAndConditions;
