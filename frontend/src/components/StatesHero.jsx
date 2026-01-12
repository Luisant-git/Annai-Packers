import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Package, Truck, Home, Users } from "lucide-react";

/* ---------------- SINGLE STAT ITEM ---------------- */
function StatItem({ icon: Icon, value, suffix, label, delay }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;

          let start = 0;
          const duration = 1800;
          const step = Math.max(1, Math.floor(value / (duration / 16)));

          const timer = setInterval(() => {
            start += step;
            if (start >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div
      ref={ref}
      data-aos="fade-up"
      data-aos-delay={delay}
      className="flex items-center gap-4 text-white"
    >
      {/* ICON */}
      <div className="text-[var(--color-primary)]">
        <Icon size={42} strokeWidth={1.8} />
      </div>

      {/* TEXT */}
      <div>
        <div className="text-3xl font-bold leading-none">
          {count}
          {suffix}
        </div>
        <div className="mt-1 text-sm text-white/80">
          {label}
        </div>
      </div>
    </div>
  );
}

/* ---------------- MAIN BANNER ---------------- */
export default function StatsBanner() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
    });
  }, []);

  const stats = [
    { icon: Package, value: 110, suffix: "", label: "People in Team" },
    { icon: Truck, value: 390, suffix: "+", label: "Projects Done" },
    { icon: Home, value: 250, suffix: "+", label: "Moved Houses" },
    { icon: Users, value: 9500, suffix: "", label: "Satisfied Client" },
  ];

  return (
    <section className="relative w-full overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
          alt="Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[var(--color-dark)]/85" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-16">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-10">
          {stats.map((item, index) => (
            <StatItem
              key={index}
              icon={item.icon}
              value={item.value}
              suffix={item.suffix}
              label={item.label}
              delay={(index + 1) * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
