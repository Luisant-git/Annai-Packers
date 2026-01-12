// src/components/ServicesSection.jsx
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaWarehouse,
  FaHome,
  FaBuilding,
  FaHandshake,
  FaBoxOpen,
  FaTruck,
} from "react-icons/fa";

// Example images - replace with your own imports or URLs
import img1 from "../assets/img1.jpg";    
import img2 from "../assets/homeshifting.webp";             // e.g. generic warehouse/home pic
import img3 from "../assets/localshifting.jpeg";    // e.g. local shifting image
import img4 from "../assets/commercial.png"; 
import img5 from "../assets/vehicle transformation.png";  
import img6 from  "../assets/Loading and Unloading.webp";     // e.g. commercial moving image

export default function ServicesSection() {
  useEffect(() => {
    AOS.init({ duration: 900, once: false, mirror: true });
  }, []);

  // reuse images array so you only need a few files — replace to have unique images
  const images = [img1, img2, img3,img4,img5,img6];

  const services = [
    {
      image: images[0],
      icon: <FaWarehouse size={20} />,
      title: "Warehousing & Storage Solutions",
      desc:
        "Secure short- and long-term storage with inventory management and optional climate control.",
      aos: "fade-right",
    },
    {
      image: images[1],
      icon: <FaHome size={20} />,
      title: "Home Shifting",
      desc:
        "Local and long-distance home shifting with careful packing, transport and unpacking support.",
      aos: "fade-up",
    },
    {
      image: images[2],
      icon: <FaBuilding size={20} />,
      title: "Corporate Relocation",
      desc:
        "End-to-end office moving: planning, packing, transport and post-move setup to reduce downtime.",
      aos: "zoom-in",
    },
    {
      image: images[3],
      icon: <FaHandshake size={20} />,
      title: "Commercial Goods Moving",
      desc:
        "Trusted partner for commercial shipments, retail distribution and supply-chain logistics.",
      aos: "fade-left",
    },
    {
      image: images[5],
      icon: <FaBoxOpen size={20} />,
      title: "Loading & Unloading Solutions",
      desc:
        "Professional loading/unloading, palletizing and safe handling for fragile or heavy cargo.",
      aos: "flip-left",
    },
    {
      image: images[4],
      icon: <FaTruck size={20} />,
      title: "Vehicle Transportation",
      desc:
        "Door-to-door vehicle transport for cars, motorcycles and commercial vehicles with insured transit.",
      aos: "flip-up",
    },
  ];

  return (
    <section className="py-16 bg-[var(--color-light)] overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 overflow-x-hidden">
        <h2
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-3xl font-bold text-center mb-2 text-[var(--color-dark)]"
        >
          Our <span className="text-[var(--color-primary)]">Services</span>
        </h2>

        <p
          data-aos="fade-up"
          data-aos-delay="150"
          className="text-center text-gray-500 italic mb-10"
        >
          Comprehensive moving and logistic solutions for businesses and individuals.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
          {services.map((service, idx) => (
            <div
              key={idx}
              data-aos={service.aos}
              className={`group relative flex flex-col items-start
                rounded-xl transition-all duration-500
                bg-[#f6f8fa] text-[var(--color-dark)]
                shadow-lg
                px-5 pt-7 pb-6
                hover:bg-[var(--color-dark)] hover:text-[var(--color-light)]
                min-h-[200px] w-full max-w-full sm:max-w-xs mx-auto
                cursor-pointer
                hover:scale-105
                overflow-visible
              `}
              style={{
                transitionProperty:
                  "background-color, color, box-shadow, transform",
                transitionDuration: "500ms",
                transitionTimingFunction: "cubic-bezier(.4,0,.2,1)",
              }}
            >
              {/* optional image at top (replace or remove if you prefer icon-only cards) */}
              {service.image && (
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-32 object-cover rounded-t-xl mb-3"
                />
              )}

              {/* Icon box */}
              <div
                className={`
                  absolute top-0
                  flex items-center justify-center
                  w-11 h-11 rounded-full
                  bg-[var(--color-primary)] text-[var(--color-dark)]
                  text-lg shadow-lg
                  transition-all duration-500
                  z-10
                  border-4 border-[#f6f8fa] group-hover:border-[var(--color-dark)]
                  group-hover:bg-[var(--color-light)] group-hover:text-[var(--color-primary)]
                  left-0 right-auto group-hover:right-0 group-hover:left-auto
                `}
                style={{
                  transitionProperty:
                    "background-color, color, border-color, left, right, transform, z-index",
                  transitionDuration: "500ms",
                }}
              >
                {service.icon}
              </div>

              <h3 className="mt-10 mb-2 text-base font-bold text-left transition-colors duration-500 group-hover:text-[var(--color-primary)]">
                {service.title}
              </h3>
              <p className="text-left text-[14px] leading-relaxed opacity-90 group-hover:text-[var(--color-light)]">
                {service.desc}
              </p>

              {/* decorative underline */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-2 rounded-b-xl bg-gradient-to-r from-[var(--color-primary)]/60 to-transparent opacity-60 group-hover:opacity-90 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}