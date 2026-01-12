import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

// IMPORT ASSETS
import ocean from "../assets/partner-logo-1.png";
import active from "../assets/partner-logo-2.png";
import audio from "../assets/partner-logo-3.png";
import code from "../assets/partner-logo-4.png";

const partners = [
  { name: "3docean", logo: ocean },
  { name: "activeden", logo: active },
  { name: "audiojungle", logo: audio },
  { name: "codecanyon", logo: code },
  { name: "audiojungle2", logo: audio },
];

export default function OurPartners() {
  const sliderRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  /* ---------- SCREEN CHECK ---------- */
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  /* ---------- AOS ---------- */
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  /* ---------- AUTO SCROLL (DESKTOP ONLY) ---------- */
  useEffect(() => {
    if (isMobile) return;

    const interval = setInterval(() => {
      if (!sliderRef.current) return;

      sliderRef.current.scrollLeft += 1;
      if (
        sliderRef.current.scrollLeft >=
        sliderRef.current.scrollWidth - sliderRef.current.clientWidth
      ) {
        sliderRef.current.scrollLeft = 0;
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isMobile]);

  /* ---------- MOBILE CONTROLS ---------- */
  const nextLogo = () => {
    setActiveIndex((prev) => (prev + 1) % partners.length);
  };

  const prevLogo = () => {
    setActiveIndex((prev) =>
      prev === 0 ? partners.length - 1 : prev - 1
    );
  };

  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">

        {/* HEADING */}
        <h2
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-3xl font-bold mb-2 text-[var(--color-dark)]"
        >
          Our <span className="text-[var(--color-primary)]">Clients</span>
        </h2>

        {/* DESCRIPTION */}
        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="mt-4 max-w-2xl mx-auto text-gray-500 italic leading-relaxed"
        >
          We work with trusted industry partners to ensure quality, reliability,
          and continuous innovation across all our services.
        </p>

        {/* SLIDER */}
        <div className="relative mt-14 flex items-center justify-center">

          {/* MOBILE LEFT */}
          {isMobile && (
            <button
              onClick={prevLogo}
              className="absolute left-4 z-20 w-10 h-10 flex items-center justify-center bg-white/90 rounded-full shadow text-gray-700"
            >
              <FaChevronLeft size={18} />
            </button>
          )}

          {/* LOGOS */}
          <div
            ref={sliderRef}
            className={`
              ${isMobile
                ? "flex justify-center items-center"
                : "flex gap-16 mx-auto overflow-x-auto scroll-smooth touch-pan-x scrollbar-hide"
              }
            `}
          >
            {isMobile ? (
              <img
                src={partners[activeIndex].logo}
                alt={partners[activeIndex].name}
                className="h-12 object-contain transition duration-300"
              />
            ) : (
              [...partners, ...partners].map((item, index) => (
                <div
                  key={index}
                  className="min-w-[180px] flex items-center justify-center"
                >
                  <img
                    src={item.logo}
                    alt={item.name}
                    className="h-10 object-contain grayscale hover:grayscale-0 transition duration-300"
                  />
                </div>
              ))
            )}
          </div>

          {/* MOBILE RIGHT */}
          {isMobile && (
            <button
              onClick={nextLogo}
              className="absolute right-4 z-20 w-10 h-10 flex items-center justify-center bg-white/90 rounded-full shadow text-gray-700"
            >
              <FaChevronRight size={18} />
            </button>
          )}

        </div>
      </div>
    </section>
  );
}
