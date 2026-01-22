import "../assets/css/style.base.css";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
// import { useTranslation } from "react-i18next";

const CancellationPolicy = () => {
  // const { t, i18n } = useTranslation();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Update document title
    document.title = "Nirvana | Cancellation Policy";
    
    // Update or create OG URL meta tag
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', 'https://nirvanayachts.ae/cancellation-policy');
    } else {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      ogUrl.setAttribute('content', 'https://nirvanayachts.ae/cancellation-policy');
      document.head.appendChild(ogUrl);
    }

    // Update or create OG type meta tag
    let ogType = document.querySelector('meta[property="og:type"]');
    if (ogType) {
      ogType.setAttribute('content', 'website');
    } else {
      ogType = document.createElement('meta');
      ogType.setAttribute('property', 'og:type');
      ogType.setAttribute('content', 'website');
      document.head.appendChild(ogType);
    }
    
    // Update or create OG title meta tag
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Nirvana | Cancellation Policy');
    } else {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      ogTitle.setAttribute('content', 'Nirvana | Cancellation Policy');
      document.head.appendChild(ogTitle);
    }

    // Update or create description meta tag
    let description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute('content', 'Nirvana Yachts & Boats L.L.C - Luxury Yacht Rentals');
    } else {
      description = document.createElement('meta');
      description.setAttribute('name', 'description');
      description.setAttribute('content', 'Nirvana Yachts & Boats L.L.C - Luxury Yacht Rentals');
      document.head.appendChild(description);
    }

    // Update or create OG description meta tag
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Nirvana Yachts & Boats L.L.C - Luxury Yacht Rentals');
    } else {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      ogDescription.setAttribute('content', 'Nirvana Yachts & Boats L.L.C - Luxury Yacht Rentals');
      document.head.appendChild(ogDescription);
    }

    // Update or create OG image meta tag
    let ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      // ogImage.setAttribute('content', 'https://gearapp.ae/static/media/Gear-Benner.93214bc2aa960fc498eb.jpg');
    } else {
      // ogImage = document.createElement('meta');
      // ogImage.setAttribute('property', 'og:image');
      // ogImage.setAttribute('content', 'https://gearapp.ae/static/media/Gear-Benner.93214bc2aa960fc498eb.jpg');
      // document.head.appendChild(ogImage);
    }

    // Add OG image dimensions and type
    let ogImageWidth = document.querySelector('meta[property="og:image:width"]');
    if (!ogImageWidth) {
      ogImageWidth = document.createElement('meta');
      ogImageWidth.setAttribute('property', 'og:image:width');
      ogImageWidth.setAttribute('content', '1200');
      document.head.appendChild(ogImageWidth);
    }

    let ogImageHeight = document.querySelector('meta[property="og:image:height"]');
    if (!ogImageHeight) {
      ogImageHeight = document.createElement('meta');
      ogImageHeight.setAttribute('property', 'og:image:height');
      ogImageHeight.setAttribute('content', '630');
      document.head.appendChild(ogImageHeight);
    }

    let ogImageType = document.querySelector('meta[property="og:image:type"]');
    if (!ogImageType) {
      ogImageType = document.createElement('meta');
      ogImageType.setAttribute('property', 'og:image:type');
      ogImageType.setAttribute('content', 'image/jpeg');
      document.head.appendChild(ogImageType);
    }
  }, [pathname]);

  return (
    <>
      <div className="privacy-bg from-top">
        <Header background="bg-white" />

        <div className="heading-policy flex-column">
          <h1>Cancellation Policy</h1>
        </div>
      </div>

      <div className="container">
        <div className="text-center">
          <p>Effective Date: [June 17, 2025]</p>
          <p>Website: https://nirvanayachts.ae</p>
          <p>
            At
            <b className="ms-1">
              Nirvana Yachts & Boats L.L.C
            </b>
            , we aim to make your rental experience smooth and transparent.
            The following cancellation policy applies:
          </p>
          <p>
            By accessing or using the Nirvana website, you agree to be
            bound by these Terms. If you do not agree, please do not use the
            Website.
          </p>
        </div>
        <div className="privacy-heading">
          <h3>1. General Cancellation Terms</h3>
          <ul>
            <li>
              Users may cancel their booking directly through the Nirvana website.
            </li>
            <li>
              Each <b> booking </b> may have its
              <b> own cancellation rules</b>, including applicable fees,
              refundable deposits, and notice periods.
            </li>
            <li>
              Cancellation <b>before the scheduled time</b> may be
              eligible for a full or partial refund depending on the
              policy.
            </li>
          </ul>

          <h3 className="mt-4">2. Same-Day or Last-Minute Cancellations</h3>
          <ul>
            <li>
              Cancellations made <b>within 24 hours</b> of the scheduled rental
              time may <b>not be eligible for a refund.</b>
            </li>
            <li>
              Any charges or fees retained are determined by the specific terms.
            </li>
          </ul>

          <h3 className="mt-4">3. No-Show Policy</h3>

          <ul>
            <li>
              Failure to arrive at the scheduled time without prior
              cancellation will be considered a <b> no-show.</b>
            </li>
            <li>
              In case of a no-show, <b> no refund </b> will be issued, and the
              booking will be marked as forfeited.
            </li>
          </ul>

          <h3 className="mt-4">4. Refund Process</h3>
          <ul>
            <li>
              Refunds, if applicable, will be initiated within
              <b>7–10 business days</b> after cancellation confirmation.
            </li>
            <li>
              The refund will be processed to the <b>original payment method</b>
              used at the time of booking.
            </li>
          </ul>

          <h3 className="mt-4">5. How to Cancel</h3>
          <label>You can cancel a booking by: </label>
          <ol>
            <li>Logging into your Nirvana account</li>
            <li>
              Going to <b> My Bookings </b>
            </li>
            <li>Selecting the booking you wish to cancel</li>
            <li>Following the on-screen cancellation steps</li>
          </ol>

          <span>
            For assistance, you may also email us at <b>sales@nirvanayachts.ae.</b>
          </span>

          <h3 className="mt-4">6. Disputes or Special Cases</h3>
          <span>
            For disputes, emergencies, or cancellation due to uncontrollable
            events (e.g., medical, travel restrictions), you may contact our
            support team. We will review each case, but
            we cannot guarantee exceptions.
          </span>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CancellationPolicy;
