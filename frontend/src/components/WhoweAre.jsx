import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ShieldCheck, Clock, Users, Truck } from "lucide-react";
import trolley from "../assets/trolley.png";

export default function WhoWeAre() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-in-out-cubic",
      once: false,
    });
  }, []);

  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-[var(--color-primary)]" />,
      text: "Safe and secure packing & moving",
    },
    {
      icon: <Clock className="w-6 h-6 text-[var(--color-primary)]" />,
      text: "Timely delivery on every move",
    },
    {
      icon: <Users className="w-6 h-6 text-[var(--color-primary)]" />,
      text: "Experienced & professional team",
    },
    {
      icon: <Truck className="w-6 h-6 text-[var(--color-primary)]" />,
      text: "Reliable transport logistics",
    },
  ];

  const kiteIcons = [ShieldCheck, Clock, Users, Truck];

  return (
    <section className="w-full py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">

        {/* LEFT CONTENT */}
        <div className="md:w-1/2 space-y-6">
          <p
            data-aos="fade-right"
            className="text-sm tracking-widest uppercase text-gray-500"
          >
            Who We Are
          </p>

          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-3xl md:text-4xl font-bold"
          >
            Welcome To{" "}
            <span className="text-[var(--color-primary)]">
              Annai Packers & Movers
            </span>
          </h2>

          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-gray-700 leading-relaxed"
          >
            Annai Packers & Movers provides hassle-free home relocation and
            dependable transportation services with a dedicated professional
            team. We focus on safe handling, secure packing, and timely delivery.
          </p>

          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feat, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={300 + i * 100}
                className="flex items-center gap-3 text-gray-700"
              >
                {feat.icon}
                <span className="font-medium">{feat.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT IMAGE + FLOATING KITES */}
        <div className="md:w-1/2 flex items-center justify-end gap-6 relative">

          {/* CURVE + KITES */}
          <div className="relative flex flex-col items-center">
            {/* Curved SVG */}
            <svg
              className="h-[360px] md:h-[460px] w-10 text-[var(--color-primary)]"
              viewBox="0 0 90 460"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              data-aos="fade-down"
            >
              <path
                d="M70 0 C 20 80, 90 160, 30 240 C 0 300, 70 360, 40 460"
                stroke="currentColor"
                strokeWidth="3"
                fill="transparent"
              />
            </svg>

            {/* Diamond Kites */}
            <div className="absolute top-10 flex flex-col justify-between h-[360px] md:h-[460px]">
              {kiteIcons.map((IconCmp, idx) => (
                <div
                  key={idx}
                  data-aos="zoom-in"
                  data-aos-delay={200 + idx * 150}
                  className="
                    kite-shape
                    w-12 h-12 md:w-16 md:h-16
                    bg-[var(--color-dark)]
                    border-2 border-[var(--color-primary)]
                    shadow-xl
                    flex items-center justify-center
                    floating-icon
                  "
                >
                  <IconCmp className="w-5 h-5 md:w-7 md:h-7 text-white" />
                </div>
              ))}
            </div>
          </div>

          {/* MAIN IMAGE */}
          <img
            src={trolley}
            alt="Mover"
            data-aos="fade-left"
            data-aos-delay="300"
            className="
              w-[200px] sm:w-[240px] md:w-[340px]
              relative z-10
            "
          />
        </div>
      </div>

      {/* STYLES */}
      <style>
        {`
          .kite-shape {
            clip-path: polygon(
              50% 0%,
              100% 50%,
              50% 100%,
              0% 50%
            );
          }

          @keyframes float-x {
            0% { transform: translateX(0); }
            50% { transform: translateX(8px); }
            100% { transform: translateX(0); }
          }

          .floating-icon {
            animation: float-x 4s ease-in-out infinite;
          }
        `}
      </style>
    </section>
  );
}
