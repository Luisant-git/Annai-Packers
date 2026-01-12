import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import banner from "../assets/banner2.jpg";

export default function HalfBanner() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: false,
    });
  }, []);
  const navigate = useNavigate();


  return (
    <section className="relative w-full overflow-x-hidden bg-gray-50 py-20">
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 h-56 w-56 rounded-full bg-[var(--color-primary)]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-[var(--color-primary)]/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-2xl bg-white shadow-xl">
          
          {/* LEFT CONTENT */}
          <div
            data-aos="fade-right"
            className="flex flex-col justify-center bg-[var(--color-dark)] p-10 text-white md:p-14"
          >
            <span className="text-xs uppercase tracking-widest text-white/60">
              Annai Packers & Movers
            </span>

            <h2 className="mt-4 text-3xl font-serif font-bold leading-tight md:text-4xl">
              Planning to Move?
              <br />
              We Make It Easy.
            </h2>

            <p className="mt-4 max-w-md text-white/85 leading-relaxed">
              Reliable packing and relocation services designed for safety,
              speed, and peace of mind.
            </p>

            <button 
              onClick={() => navigate("/contact")}
              className="group mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-[var(--color-primary)] px-6 py-3 font-semibold text-white transition hover:scale-105">
              Get Free Quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
            </button>
          </div>

          {/* RIGHT IMAGE (BRIGHT) */}
          <div
            data-aos="fade-left"
            className="relative h-[240px] md:h-auto"
          >
            <img
              src= {banner}
              alt="Moving Services"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* PREMIUM BADGE (NO DARK OVERLAY) */}
            <div
              data-aos="zoom-in"
              data-aos-delay="300"
              className="absolute bottom-4 left-4 rounded-xl bg-white/95 px-4 py-2 shadow-lg backdrop-blur"
            >
              <p className="text-sm font-semibold text-[var(--color-dark)]">
                Trusted Movers
              </p>
              <p className="text-xs text-gray-600">
                Annai Packers & Movers
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
