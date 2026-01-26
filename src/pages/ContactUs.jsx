import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import ApiService from "../services/ApiService";
import landingBg from "../assets/images/experiences/experience-bg.png";
import { useTranslation } from "react-i18next";
// import "../assets/css/base.css";

const ContactUs = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (i18n && i18n.language) {
      const currentLang = i18n.language;
      const direction = currentLang === "ar" ? "rtl" : "ltr";
      document.documentElement.setAttribute("dir", direction);
      document.documentElement.setAttribute("lang", currentLang);
    }
  }, [i18n, i18n?.language]);

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: false,
      offset: 120,
    });
  }, []);

  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  // const [recaptchaValue, setRecaptchaValue] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.email) return;
    
    // Validate reCAPTCHA
    // if (!recaptchaValue) {
    //   Swal.fire({
    //     icon: "warning",
    //     title: "reCAPTCHA Required",
    //     text: "Please complete the reCAPTCHA verification",
    //     confirmButtonText: "OK",
    //     confirmButtonColor: "#3F85DE",
    //     confirmButtonAriaLabel: "OK",
    //     customClass: {
    //       confirmButton: "swal-confirm-btn"
    //     }
    //   });
    //   return;
    // }
    
    try {
      setSubmitting(true);
      // const formDataWithRecaptcha = { ...form, recaptcha: recaptchaValue };
      const response = await ApiService.request({ method: "POST", url: "/contactUs", data: form });
      if (response.data.status) {
        Swal.fire({ 
          icon: "success", 
          title: "Submitted", 
          text: response.data.message, 
          confirmButtonText: "OK",
          confirmButtonColor: "#3F85DE",
          confirmButtonAriaLabel: "OK",
          customClass: {
            confirmButton: "swal-confirm-btn"
          }
        });
        setForm({ name: "", phone: "", email: "", message: "" });
      } else {
        Swal.fire({ 
          icon: "error", 
          title: "Error", 
          text: response.data.message || "Failed to submit",
          confirmButtonText: "OK",
          confirmButtonColor: "#3F85DE",
          confirmButtonAriaLabel: "OK",
          customClass: {
            confirmButton: "swal-confirm-btn"
          }
        });
      }
    } catch (err) {
      Swal.fire({ 
        icon: "error", 
        title: "Error", 
        text: "Failed to submit",
        confirmButtonText: "OK",
        confirmButtonColor: "#3F85DE",
        confirmButtonAriaLabel: "OK",
        customClass: {
          confirmButton: "swal-confirm-btn"
        }
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="landing-page">
      <Header />
      <section
        className="landing-hero"
        style={{ backgroundImage: `url(${landingBg})` }}
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className="landing-overlay">
          <div
            className="landing-hero-content"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h1 className="text-white">Contact Us</h1>
            <p className="landing-hero-subtitle">
              Reach out for bookings, questions, or bespoke experiences.
            </p>
          </div>
        </div>
      </section>

      <section className="contact-heading-section">
        <div className="container" data-aos="fade-up">
          <h2 className="contact-heading-title">Contact Us</h2>
          <p className="contact-heading-desc">
            On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and
            demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee
            the pain &amp; trouble that are bound to ensue.
          </p>
          <div className="contact-chips">
            <a href="tel:+971253469187" className="contact-chip btn-hover" aria-label="Call us">
              <span className="contact-chip-icon"><i className="bi bi-telephone"></i></span>
              <span>+971 25 346 9187</span>
            </a>
            <a href="mailto:sales@nirvanaychts.ae" className="contact-chip btn-hover" aria-label="Email us">
              <span className="contact-chip-icon"><i className="bi bi-envelope"></i></span>
              <span>sales@nirvanaychts.ae</span>
            </a>
          </div>
        </div>
      </section>

      <section className="contact-form-section">
        <div className="container">
          <div className="contact-form-card" data-aos="fade-up">
            <h3 className="contact-form-title">Get in touch</h3>
            <form onSubmit={handleSubmit}>
              <div className="contact-form-grid">
                <div className="contact-field">
                  <label>Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                  />
                </div>
                <div className="contact-field">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+971 24 153 6987"
                  />
                </div>
                <div className="contact-field">
                  <label>Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                  />
                </div>
                <div className="contact-field">
                  <label>Message</label>
                  <textarea
                    rows="5"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us how we can help"
                    style={{ height: "199px" }}
                  ></textarea>
                </div>
              </div>
              <div className="contact-form-actions">
                <button type="submit" className="btn-hover" disabled={submitting}>
                  {submitting ? "Submitting..." : "Send a Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUs;
