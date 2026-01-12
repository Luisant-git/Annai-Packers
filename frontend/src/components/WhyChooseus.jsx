import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaShieldAlt } from "react-icons/fa";
import { GiFastArrow, GiTeamIdea } from "react-icons/gi";
import img1 from "../assets/chooseus-img1.jpg";
import img2 from "../assets/chooseus-img2.jpg";
import img3 from "../assets/chooseus-img3.webp";
import img4 from "../assets/chooseus-img4.jpg";

const features = [
  {
    icon: <FaShieldAlt size={22} />,
    title: "Safe & Secure",
    desc: "We ensure your belongings are packed and transported with the highest safety standards.",
    aos: "fade-up",
  },
  {
    icon: <GiFastArrow size={22} />,
    title: "Fast Delivery",
    desc: "Optimized routes and professional drivers guarantee timely delivery every time.",
    aos: "fade-up",
  },
  {
    icon: <GiTeamIdea size={22} />,
    title: "Expert Team",
    desc: "Our trained professionals handle each item with utmost care and precision.",
    aos: "fade-up",
  },
];

const collageImages = [img1, img2, img3, img4];

export default function WhyChooseUs() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true, mirror: false });
  }, []);

  return (
    <section className="py-24 bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent relative overflow-hidden">
      {/* Decorative blurred background shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[var(--color-primary)]/20 rounded-full blur-3xl z-0" />
      {/* Removed bottom-right blue/dark gradient */}

      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left: Modern Collage with Glass Badge */}
        <div className="relative w-full h-[420px] md:h-[500px] lg:h-[550px] flex items-center justify-center">
          {/* Overlapping images */}
          <div className="absolute inset-0 flex flex-wrap items-center justify-center">
            {collageImages.map((url, idx) => {
              const positions = [
                "top-0 left-8 rotate-[-8deg]",
                "top-20 right-0 rotate-[6deg]",
                "bottom-0 left-0 rotate-[7deg]",
                "bottom-10 right-8 rotate-[-5deg]",
              ];
              return (
                <img
                  key={idx}
                  src={url}
                  alt={`collage-${idx}`}
                  className={`absolute ${positions[idx]} w-32 md:w-40 lg:w-48 h-32 md:h-40 lg:h-48 object-cover rounded-2xl shadow-2xl border-4 border-white hover:scale-105 transition-transform duration-700`}
                  data-aos="zoom-in"
                  data-aos-delay={200 * (idx + 1)}
                />
              );
            })}
          </div>
          {/* Glass-style circular badge */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-[var(--color-primary)]/90 backdrop-blur-md text-white flex flex-col items-center justify-center shadow-3xl border-4 border-white"
            data-aos="flip-up"
            data-aos-delay="700"
          >
            <span className="font-bold text-2xl md:text-3xl">15+</span>
            <span className="text-xs md:text-sm text-center">YEARS EXPERIENCE</span>
          </div>
        </div>

        {/* Right: Vertical Stepper */}
        <div>
          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-3xl md:text-4xl font-bold mb-2 text-[var(--color-dark)]"
          >
            Why Choose <span className="text-[var(--color-primary)]">Annai</span>?
          </h2>
          <p
            data-aos="fade-left"
            data-aos-delay="200"
            className="text-gray-600 italic mb-12 max-w-lg text-lg"
          >
            Moving isn’t just boxes; it’s memories and valuables. We deliver fast, safe, and reliable relocation services with a highly trained team you can trust.
          </p>
          <div className="relative pl-6">
            {/* Vertical line */}
            <div className="absolute left-3 top-0 h-full w-1 bg-gradient-to-b from-[var(--color-primary)]/60 to-transparent rounded-full" />
            <div className="space-y-12">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  data-aos={feature.aos}
                  data-aos-delay={200 * (idx + 1)}
                  className="relative flex items-start group"
                >
                  {/* Step icon */}
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full shadow-lg border-4 border-white bg-[var(--color-primary)]/90 text-white text-2xl z-10 transition-all duration-500 group-hover:scale-110`}
                  >
                    {feature.icon}
                  </div>
                  {/* Connector dot */}
                  <div className="absolute left-3 top-12 w-2 h-6 bg-[var(--color-primary)]/30 rounded-full" />
                  {/* Text */}
                  <div className="ml-6">
                    <h4 className="font-semibold text-lg md:text-xl text-[var(--color-dark)] mb-1 group-hover:text-[var(--color-primary)] transition-colors duration-500">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 text-sm md:text-base">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
