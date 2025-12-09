import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import ApiService from "../services/ApiService";
// import ReCAPTCHA from "react-google-recaptcha";
// import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const ContactUs = () => {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();

  // const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // useEffect(() => {
  //   const currentLang = i18n.language;
  //   const direction = currentLang === "ar" ? "rtl" : "ltr";
  //   document.documentElement.setAttribute("dir", direction);
  //   document.documentElement.setAttribute("lang", currentLang);
  // }, [i18n.language]);

  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  // const [recaptchaValue, setRecaptchaValue] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone) return;
    
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
        setForm({ name: "", phone: "", message: "" });
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
    <>
      <div className="privacy-bg from-top">
        <Header background="bg-white" />
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-7 d-flex flex-column justify-content-center">
            <div className="position-relative">
              <h2 className="fw-bold">Contact Gear</h2>
              {/* <img src={yellow_line} className="yellow_line" /> */}
            </div>
            <p>Contact Gear by phone or email</p>
            <p>
              <a
                href="mailto:business@gearapp.ae"
                className="text-dark underline me-2"
              >
                business@gearapp.ae
              </a>
            </p>
            <p>
              <a href="tel:+971561145454" className="text-dark underline ms-2">
                +971 56 114 5454
              </a>
            </p>
          </div>
          <div className="col-md-4">
            <div style={{ width: "300px" }}>
              {/* <img src={car_summer} className="w-100" /> */}
            </div>
          </div>

          <div className="d-flex justify-content-center mt-5">
            <div style={{ width: "100%", maxWidth: "500px" }}>
              <h5 className="fw-bold mb-4">
                Get instant help from our experienced support team
              </h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label text-muted">
                    What is your name?
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={{ backgroundColor: "#f5f5f5", border: "none" }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-muted">
                    What is your contact number?
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder=""
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    style={{ backgroundColor: "#f5f5f5", border: "none" }}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label text-muted">
                    Tell us more about your issue?
                  </label>
                  <textarea
                    className="form-control textarea-lg"
                    rows="8"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ backgroundColor: "#f5f5f5", border: "none" }}
                  ></textarea>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn fw-bold"
                    style={{
                      backgroundColor: "#3F85DE",
                      color: "black",
                      borderRadius: "10px",
                      width: "120px",
                    }}
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default ContactUs;
