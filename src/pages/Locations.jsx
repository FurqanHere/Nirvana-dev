import React, { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import landingBg from "../assets/images/experiences/experience-bg.png";

import Header from "../components/Header";
import Footer from "../components/Footer";

import locationMap from "../assets/images/location-map.png";
import loc1 from "../assets/images/loc1.png";
import loc2 from "../assets/images/loc2.png";
import loc3 from "../assets/images/loc3.png";
import loc4 from "../assets/images/loc4.png";
import loc5 from "../assets/images/loc5.png";
import loc6 from "../assets/images/loc6.png";
import office1 from "../assets/images/office/office1.png";
import office2 from "../assets/images/office/office2.png";
import office3 from "../assets/images/office/office3.png";
import thumb1 from "../assets/images/office/thumbnail1.png";
import thumb2 from "../assets/images/office/thumbnail2.png";
import thumb3 from "../assets/images/office/thumbnail3.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCreative } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-creative";

const Locations = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: false,
      offset: 120,
    });
  }, []);

  const [activePin, setActivePin] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const locationsData = [
    { id: "yas", title: "YAS MARINA", image: loc1, style: { left: "5%", top: "50%" } },
    { id: "saadiyat", title: "SAADIYAT MARINA", image: loc2, style: { left: "50%", top: "53%", transform: "translateX(-50%)" } },
    { id: "emirates", title: "EMIRATES PALACE MANDARIN ORIENTAL", image: loc3, style: { right: "1%", top: "9%" }, bubbleWide: true },
    { id: "erth", title: "ERTH HOTEL", image: loc4, style: { right: "7%", top: "55%" } },
    { id: "royal", title: "ROYAL M MARINA", image: loc5, style: { left: "15%", top: "80%" } },
    { id: "best", title: "BEST MARINE BAY MARINA", image: loc6, style: { right: "24%", top: "85%" }, bubbleWide: true },
  ];

  const activeLocation = locationsData.find((loc) => loc.id === activePin);

  const getPreviewStyle = () => {
    if (!activeLocation) return {};
    const { style } = activeLocation;
    const baseTransform = "translateY(-100%) translateY(-20px)"; 
    
    let xShift = "";
    if (style.left) {
      xShift = "translateX(-15%)"; 
      if (activeLocation.id === "saadiyat") xShift = "translateX(-50%)"; 
    } else if (style.right) {
      xShift = "translateX(15%)";
    }

    return {
      ...style,
      transform: `${xShift} ${baseTransform}`,
      zIndex: 10,
    };
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
            <h1 className="text-white">Locations</h1>
            
          </div>
        </div>
      </section>

      <section className="locations-map-section" id="locations-map">
        <h1 className="fw-bold text-center mb-5">Mariana Locations</h1>
        <div className="container">
          <div className="location-map-wrap" data-aos="fade-up" onMouseLeave={() => setActivePin(null)}>
            <img src={locationMap} alt="" className="location-map-bg" />
            {activeLocation && (
              <div 
                className="location-preview" 
                style={getPreviewStyle()}
                data-aos="zoom-in" 
                data-aos-delay="120"
              >
                <img src={activeLocation.image} alt="" className="location-preview-img hoverable" />
              </div>
            )}

            {locationsData.map((loc) => (
              <button
                key={loc.id}
                type="button"
                className={`location-pin hoverable`}
                style={loc.style}
                aria-label={loc.title}
                onMouseEnter={() => setActivePin(loc.id)}
                onMouseLeave={() => setActivePin(null)}
              >
                <span className={`pin-label ${loc.bubbleWide ? "pin-label-wide" : ""}`}>{loc.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="office-slider-section">
        <h1 className="text-center fw-bold mb-5">Offices Locations</h1>
        <div className="container" data-aos="fade-up">
          <div className="office-slider-wrapper">
            <button className="office-nav prev btn-hover" aria-label="Previous slide">
              <i className="bi bi-arrow-left"></i>
            </button>
            <Swiper
              modules={[Navigation, EffectCreative]}
              onSwiper={(sw) => (swiperRef.current = sw)}
              onSlideChange={(sw) => setActiveIndex(sw.realIndex)}
              navigation={{ prevEl: ".office-nav.prev", nextEl: ".office-nav.next" }}
              loop
              centeredSlides
              slidesPerView={1}
              grabCursor
              effect="creative"
              creativeEffect={{
                prev: {
                  translate: [-160, 0, -120],
                  scale: 1.06,
                  opacity: 0.92,
                },
                next: {
                  translate: [160, 0, -120],
                  scale: 1.06,
                  opacity: 0.92,
                },
              }}
              className="office-swiper"
            >
              {[{id:"nyb1", title:"NYB FLOATING OFFICE 1 BEST MARINE BAY MARINA", image: office1, thumb: thumb1},
                {id:"nyb2", title:"NYB FLOATING OFFICE 2 BEST MARINE BAY MARINA", image: office2, thumb: thumb2},
                {id:"nyb3", title:"NYB FLOATING OFFICE 3 BEST MARINE BAY MARINA", image: office3, thumb: thumb3}
              ].map((s) => (
                <SwiperSlide key={s.id} className="office-slide">
                  <div className="office-slide-card hoverable">
                    <img src={s.image} alt={s.title} />
                    <div className="office-slide-overlay">
                      <h3 className="office-slide-title">{s.title}</h3>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button className="office-nav next btn-hover" aria-label="Next slide">
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>

          <div className="office-thumbs" data-aos="fade-up" data-aos-delay="160">
            {[{id:"nyb1", title:"NYB FLOATING OFFICE 1 BEST MARINE BAY MARINA", image: office1, thumb: thumb1},
              {id:"nyb2", title:"NYB FLOATING OFFICE 2 BEST MARINE BAY MARINA", image: office2, thumb: thumb2},
              {id:"nyb3", title:"NYB FLOATING OFFICE 3 BEST MARINE BAY MARINA", image: office3, thumb: thumb3}
            ].map((s, i) => (
              <button
                key={s.id}
                type="button"
                className={`office-thumb btn-hover ${activeIndex === i ? "active" : ""}`}
                onClick={() => {
                  setActiveIndex(i);
                  swiperRef.current?.slideToLoop(i);
                }}
                aria-label={s.title}
              >
                <img src={s.thumb} alt="" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Locations;
