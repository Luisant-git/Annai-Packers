import { useEffect } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const contactItems = [
  {
    title: "Contact Us At",
    lines: ["00 987 654 32", "+123 456 78"],
    icon: Phone,
    delay: 100,
  },
  {
    title: "Mail Us At",
    lines: ["info@example.com", "movers@abc.com"],
    icon: Mail,
    delay: 200,
  },
  {
    title: "Find Us At",
    lines: ["Vestibulum maximus", "convallis egestas"],
    icon: MapPin,
    delay: 300,
  },
  {
    title: "Working Hours",
    lines: ["09:00 am - 06:00 pm", "Sat - Sun OFF"],
    icon: Clock,
    delay: 400,
  },
];

export default function GetInTouchGrid() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: false,
      mirror: true,
    });
  }, []);

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {contactItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={item.delay}
                className="
                  relative
                  bg-[var(--color-primary)]
                  text-white
                  rounded-md
                  overflow-hidden
                  px-6 py-7
                  min-h-[120px]
                "
              >
                {/* TEXT */}
                <div className="relative z-10">
                  <h4 className="text-lg font-semibold mb-3">
                    {item.title}
                  </h4>

                  {item.lines.map((line, i) => (
                    <p
                      key={i}
                      className="text-sm text-white/80 leading-relaxed"
                    >
                      {line}
                    </p>
                  ))}
                </div>

                {/* YELLOW CURVE */}
                <div
                  data-aos="zoom-in"
                  data-aos-delay={item.delay + 300}
                  className="
                    absolute
                    top-1/2
                    -right-[72px]
                    -translate-y-1/2
                    w-[140px]
                    h-[140px]
                    rounded-full
                    bg-[var(--color-dark)]
                    flex
                    items-center
                  "
                >
                  {/* ICON – OPTICALLY CENTERED */}
                  <Icon
                    className="
                      ml-[26px]
                      w-7 h-7
                      text-[var(--color-primary)]
                    "
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
