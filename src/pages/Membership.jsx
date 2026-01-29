import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "../components/Header";
import landingBg from "../assets/images/membership/membership-bg.png";
import ApiService from "../services/ApiService";
import Swal from "sweetalert2";

import calender from "../assets/images/membership/calender.png";
import sail from "../assets/images/membership/sail.png";
import chooseMembership from "../assets/images/membership/chooseMembership.png";

// import leftBlueDeco from "../assets/images/left-blue-deco-img.png";
import yellowStrap from "../assets/images/yellow-strap.png";
import whiteStrap from "../assets/images/white-strap.png";
import blueStrap from "../assets/images/blue-strap.png";
import yellowStar from "../assets/images/yellow-star.png";
import whiteStar from "../assets/images/white-star.png";

import wheel from "../assets/images/wheel-img.png";

import grayStar from "../assets/images/gray-star.png";

import "../assets/css/base.css";


const Membership = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const styles = [
    { theme: "pkg-dark", strap: whiteStrap, star: grayStar },
    { theme: "pkg-brown", strap: whiteStrap, star: yellowStar },
    { theme: "pkg-blue", strap: yellowStrap, star: whiteStar },
    { theme: "pkg-navy", strap: blueStrap, star: whiteStar },
  ];

  useEffect(() => {
    fetchPackages();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await ApiService.get("/getPackages");
      if (response.data.status) {
        setPackages(response.data.data.packages);
      } else {
        console.error("Failed to fetch packages");
      }
    } catch (error) {
      console.error("Error fetching packages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyPackage = async (pkg) => {
    const token = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).auth_token
      : null;

    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to purchase a package.",
        confirmButtonColor: "#3F85DE",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
      return;
    }

    try {
      // Assuming 'monthly' is the default term as per the requirement or UI context
      // If user selection is needed, we would need a modal or dropdown.
      // For now, proceeding with 'monthly' and the package id.
      const payload = {
        package_id: pkg.id,
        term: "monthly" 
      };

      const response = await ApiService.post("/buyPackage", payload);

      if (response.data.status) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.message || "Package purchased successfully!",
          confirmButtonColor: "#3F85DE",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message || "Failed to purchase package.",
          confirmButtonColor: "#3F85DE",
        });
      }
    } catch (error) {
      console.error("Error buying package:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "An error occurred while purchasing the package.",
        confirmButtonColor: "#3F85DE",
      });
    }
  };

  return (
    <div className="landing-page" style={{ overflowX: "hidden", overflowY: "hidden" }}>
      <Header />
      <section
        className="landing-hero"
        style={{ backgroundImage: `url(${landingBg})` }}
      >
        <div className="landing-overlay">
          <div
            className="landing-hero-content"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h1 className="text-white">MEMBERSHIPS</h1>
            <p className="landing-hero-subtitle">Where Time Floats Free</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works-section position-relative">
        <div className="container">
          <h2 data-aos="fade-up">How It Works !</h2>
          <p data-aos="fade-up" data-aos-delay="100">
            Easy step follow and get membership and enjoy our services
          </p>

          <div className="how-it-works-cards">
            {/* Card 1 */}
            <div className="how-card" data-aos="fade-up" data-aos-delay="200">
              <div className="icon-box">
                <img src={chooseMembership} alt="" />
              </div>
              <h3>Choose a Membership:</h3>
              <p>
                Pick a plan that matches <br /> your lifestyle.
              </p>
            </div>

            {/* Card 2 */}
            <div className="how-card" data-aos="fade-up" data-aos-delay="300">
              <div className="icon-box">
                <img src={calender} alt="" />
              </div>
              <h3>Book Your Slot:</h3>
              <p>
                Reserve your boat in <br /> seconds.
              </p>
            </div>

            {/* Card 3 */}
            <div className="how-card" data-aos="fade-up" data-aos-delay="400">
              <div className="icon-box">
                <img src={sail} alt="" />
              </div>
              <h3>Sail & Enjoy:</h3>
              <p>
                We handle fuel, cleaning, <br /> and support.
              </p>
            </div>
          </div>
        </div>
        <div className="wheel">
          <img src={wheel} alt="" />
        </div>
      </section>

      <section className="packages-section" id="packages">
        <div className="packages-header" data-aos="fade-up">
          <h2 className="packages-title">Packages</h2>
          <p className="packages-subtitle">Our Simple 3 Membership package</p>
        </div>
        <div className="packages-grid">
          {loading ? (
             <div style={{ width: "100%", textAlign: "center", padding: "40px" }}>
               <div className="spinner-border text-primary" role="status">
                 <span className="visually-hidden">Loading...</span>
               </div>
             </div>
          ) : (
            packages.map((pkg, idx) => {
              const style = styles[idx % styles.length];
              
              let backgroundStyle = {};
              if (pkg.bg_color) {
                const colors = pkg.bg_color.split(/[\s,]+/).filter(c => c);
                if (colors.length > 1) {
                  backgroundStyle = { background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` };
                } else if (colors.length === 1) {
                  backgroundStyle = { background: colors[0] };
                }
              }

              return (
                <div
                  className={`pkg-card ${style.theme}`}
                  key={pkg.id || idx}
                  data-aos="fade-up"
                  style={backgroundStyle}
                >
                  <div className="pkg-corner">
                    <img className="pkg-strap" src={style.strap} alt="" />
                    <img className="pkg-star" src={style.star} alt="" />
                  </div>
                  <div className="pkg-header">
                    <h3 className="pkg-name">{pkg.name}</h3>
                    <p className="pkg-price">AED {pkg.monthly_price}/mo</p>
                  </div>
                  <ul className="pkg-benefits">
                    {pkg.features && pkg.features.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                  <div className="d-flex justify-content-center">
                    <button 
                      type="button" 
                      className="pkg-button"
                      onClick={() => handleBuyPackage(pkg)}
                    >
                      Select Package
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
};

export default Membership;
