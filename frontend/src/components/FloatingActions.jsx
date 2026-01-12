// src/components/FloatingActions.jsx
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaArrowUp, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

export default function FloatingActions({
  phone = "+919999000787",
   // digits only with country code
}) {
  const [mounted, setMounted] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    setMounted(true);

    const onScroll = () => setShowTop(window.scrollY > 280);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!mounted) return null;

  const ui = (
    <div
      className="fixed right-4 sm:right-6 z-[2147483647] flex flex-col gap-3"
      style={{
        // safe-area support (iPhone notch)
        bottom: `calc(env(safe-area-inset-bottom, 0px) + 16px)`,
      }}
    >
     

      {/* Call */}
      <a
        href={`tel:${phone}`}
        aria-label="Call"
        title="Call"
        className="
          grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-full
          bg-[color:var(--color-dark)] text-white shadow-lg
          transition hover:-translate-y-0.5 hover:shadow-xl
          active:translate-y-[1px]
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)]
        "
      >
        <FaPhoneAlt className="text-[16px] sm:text-lg" />
      </a>

      {/* Scroll To Top (same nice circle button, shows after scroll; no layout jump) */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        title="Top"
        className={[
          "grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-full text-white shadow-lg",
          "bg-[color:var(--color-primary)] transition",
          "hover:-translate-y-0.5 hover:shadow-xl active:translate-y-[1px]",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)]",
          showTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-2 pointer-events-none",
        ].join(" ")}
      >
        <FaArrowUp className="text-[16px] sm:text-[18px]" />
      </button>
    </div>
  );

  // Portal => fixes mobile issues when parent has transform/AOS/overflow etc.
  return createPortal(ui, document.body);
}