import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import img1 from '../assets/img1.jpg';
import img2 from '../assets/banner2.jpg';
import { useNavigate } from "react-router-dom";


const slides = [
  {
    image:img1,
    title: "Commercial",
    highlight: "Shifting",
    subtitle: "Expert office and corporate relocation services you can trust.",
  },
  {
    image:img2,
    title: "Professional",
    highlight: "Packers & Movers",
    subtitle: "Safe packing, secure transport, and on-time delivery.",
  },
  {
    image:img1,
      
    title: "Trusted",
    highlight: "Relocation Services",
    subtitle: "Handled by trained experts with complete care.",
  },
];

export default function Banner() {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((prev) => (prev + 1) % slides.length),
      6000
    );
    return () => clearInterval(timer);
  }, []);

  // AOS Init
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  // Refresh AOS on slide change
  useEffect(() => {
    AOS.refreshHard();
  }, [current]);

  const navigate = useNavigate();
  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt="Packers and Movers"
            className="h-full w-full object-cover"
          />
        </div>
      ))}

      {/* CONTENT */}
      <div
        key={current}
        className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center"
      >
        <div className="max-w-2xl text-white">
          <h1
            data-aos="fade-down"
            data-aos-delay="150"
            className="text-4xl md:text-6xl font-serif font-bold leading-tight"
            style={{
              textShadow:
                "2px 2px 6px rgba(0,0,0,0.6), 6px 6px 14px rgba(0,0,0,0.35)",
            }}
          >
            {slides[current].title} <br />
            <span
              data-aos="fade-left"
              data-aos-delay="300"
              className="text-white"
            >
              {slides[current].highlight}
            </span>
          </h1>

          <p
            data-aos="fade-right"
            data-aos-delay="450"
            className="mt-6 text-white/90 text-base md:text-lg leading-relaxed"
            style={{
              textShadow: "1px 1px 4px rgba(0,0,0,0.4)",
            }}
          >
            {slides[current].subtitle}
          </p>

          <div className="mt-8">
            <button 
            onClick={() => navigate("/contact")}
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--color-primary)] text-white font-bold shadow-md hover:scale-105 hover:shadow-xl transition-all">
              Get a Quote
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-[var(--color-primary)] scale-125"
                : "bg-white/70 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
