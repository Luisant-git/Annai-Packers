import { useEffect } from "react";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import img1 from "../assets/img1.jpg";

export default function Breadcrumb({
  title = "About Us",
  current = "About Us",
  bgImage = img1,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
    });
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img
          src={bgImage}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-24 text-center flex flex-col items-center">
        
        {/* TITLE */}
        <h1
          data-aos="zoom-out-up"
          data-aos-delay="100"
          data-aos-duration="1000"
          className="text-3xl md:text-4xl font-bold text-white tracking-wide drop-shadow-2xl"
        >
          {title.toUpperCase()}
        </h1>

        {/* BREADCRUMB */}
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          data-aos-duration="1000"
          className="mt-4 flex items-center justify-center gap-2 text-sm text-white drop-shadow-md"
        >
          {/* HOME LINK */}
          <span
            onClick={() => navigate("/")}
            className="flex items-center gap-1 cursor-pointer hover:text-[var(--color-primary)] transition"
          >
            <Home size={14} />
            <span>Home</span>
          </span>

          <span className="text-white/70">/</span>

          <span className="font-medium">{current}</span>
        </div>
      </div>
    </section>
  );
}
