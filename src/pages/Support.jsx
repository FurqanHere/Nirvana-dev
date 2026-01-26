import "../assets/css/base.css";
import React from "react";
// import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
// import { useTranslation } from "react-i18next";

const Support = () => {
  // const { t, i18n } = useTranslation();
  // const { pathname } = useLocation();

  // useEffect(() => {
  // //   window.scrollTo(0, 0);
  // // }, [pathname]);
  
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
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-7 d-flex flex-column justify-content-center">
            <div className="position-relative">
              <h2 className="fw-bold">Contact Support</h2>
            </div>

            <p>Contact us by phone or email</p>
            <div className="d-flex">
              <p>+971 54 792 2842 | </p>
              <p className="ms-1"> sales@nirvanayachts.ae</p>
            </div>
          </div>
          <div className="col-md-4">
            <div style={{ width: "300px" }}>
            </div>
          </div>

          <div className="d-flex justify-content-center mt-5">
            <div style={{ width: "100%", maxWidth: "500px" }}>
              <h5 className="fw-bold mb-4">
                Get instant help from our experienced support team
              </h5>
              <form>
                <div className="mb-3">
                  <label className="form-label text-muted">
                    What is your name?
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
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
                    style={{ backgroundColor: "#f5f5f5", border: "none" }}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label text-muted">
                    Tell us more about your issue?
                  </label>
                  <textarea
                    className="form-control"
                    rows="4"
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
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Support;
