import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import landingBg from "../assets/images/landingPageBg.png";
import membershipImg from "../assets/images/membership-img.png";
import orientationImg from "../assets/images/orientation-img.png";
import paymentImg from "../assets/images/payment-img.png";
import bookingImg from "../assets/images/booking-img.png";
import memberBg from "../assets/images/member-bg.png";
import orientationBg from "../assets/images/orientation-bg.png";
import boatCard1 from "../assets/images/boat1.png";
import boatCard2 from "../assets/images/boat2.png";
import boatCard3 from "../assets/images/boat3.png";
import Header from "../components/Header";
import Footer from "../components/Footer";

const services = [
  {
    title: "Membership",
    description:
      "Neque porro quisquam est qui dolorem ipsum",
    image: membershipImg,
    bgImage: memberBg,
  },
  {
    title: "Orientation",
    description:
      "Neque porro quisquam est qui dolorem ipsum.",
    image: orientationImg,
    bgImage: orientationBg,
  },
  {
    title: "Payment",
    description:
      "Neque porro quisquam est qui dolorem ipsum.",
    image: paymentImg,
    bgImage: memberBg,

  },
  {
    title: "Bookings",
    description:
      "Neque porro quisquam est qui dolorem ipsum.",
    image: bookingImg,
    bgImage: orientationBg,
  },
];

const boats = [
  {
    title: "Calma Suite 1",
    engine: "Engine: Twin Mercury V1",
    length: "Length:16m",
    image: boatCard1,
  },
  {
    title: "TENDER 9 (T9)",
    engine: "Twin Mercury Verado V6 (2 x 225 hp)",
    length: "Length:16m",
    image: boatCard2,
  },
  {
    title: "Calma Suite 3",
    engine: "Engine: Twin Mercury V1",
    length: "Length:16m",
    image: boatCard3,
  },
];

const HomePage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div className="landing-page">
      <Header />
      <section
        className="landing-hero"
        style={{ backgroundImage: `url(${landingBg})` }}
      >
        <div className="landing-overlay mt-5">
          <div className="landing-hero-content" data-aos="fade-up" data-aos-delay="200">
            <p className="landing-kicker">
              Experience Nirvana Yachts &amp; Boats
            </p>
            <h1>Your New Adventure Starts Here!</h1>
          </div>
        </div>
      </section>

      <section className="landing-services">
        {services.map((service, index) => (
          <div 
            key={service.title} 
            className="service-card"
            style={{ backgroundImage: `url(${service.bgImage})`, height: '430px' }}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="service-icon">
              <img src={service.image} alt={service.title} />
            </div>
            <h3>{service.title}</h3>
            <p className="service-description">{service.description}</p>
            <p className="service-small">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
            </p>
          </div>
        ))}
      </section>

      <div className="services-spacer" />

      <section className="boats-section">
        <div className="boats-header" data-aos="fade-up">
          <p className="boats-kicker">Boats &amp; Yachts</p>
          <h2 className="boats-heading">Top Luxurious Boat</h2>
        </div>
        <div className="boats-grid">
          {boats.map((boat, index) => (
            <div 
              className="boat-card" 
              key={boat.title}
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              <div
                className="boat-card-image"
                style={{ backgroundImage: `url(${boat.image})` }}
              />
              <div className="boat-card-body">
                <div className="boat-card-title">{boat.title}</div>
                <div className="boat-card-meta">
                  <span>{boat.engine}</span>
                  <span>{boat.length}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
