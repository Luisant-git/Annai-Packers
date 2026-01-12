import React, { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import process1 from "../assets/process1.png";
import process2 from "../assets/process2.png";
import process3 from "../assets/process3.png";
import process4 from "../assets/process4.png";

export default function ProcessSteps() {
  useEffect(() => {
    AOS.init({
      duration: 650,
      easing: "ease-out-cubic",
      once: true,
    });
  }, []);

  const steps = [
    { id: 1, title: "Book Your Order", icon: process1 },
    { id: 2, title: "Pack Your Things", icon: process2 },
    { id: 3, title: "Move Your Things", icon: process4 },
    { id: 4, title: "Deliver Your Things", icon: process3 },
  ];

  const [mobileIndex, setMobileIndex] = useState(1);
  const touchStartRef = useRef(null);

  const boxBase =
    "w-[130px] h-[130px] border-2 border-[var(--color-dark)] rounded-sm bg-[var(--color-light)] flex items-center justify-center relative text-[var(--color-dark)]";

  const goPrev = () => {
    setMobileIndex((p) => (p === 1 ? steps.length : p - 1));
  };

  const goNext = () => {
    setMobileIndex((p) => (p === steps.length ? 1 : p + 1));
  };

  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches?.[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e) => {
    const startX = touchStartRef.current;
    if (startX == null) return;
    const endX = e.changedTouches?.[0]?.clientX ?? null;
    if (endX == null) return;

    const diff = startX - endX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? goNext() : goPrev();
    }
    touchStartRef.current = null;
  };

  const currentStep = steps[mobileIndex - 1];

  return (
    <section className="max-w-[1100px] mx-auto px-4 py-10 text-center">
      {/* TITLE */}
      <h2 data-aos="fade-down" className="text-2xl font-bold mb-2">
        Our <span className="text-[var(--color-primary)]">Process</span>
      </h2>

      <p
        data-aos="fade-up"
        className="max-w-[700px] mx-auto text-[rgba(0,0,0,0.45)] italic mb-8"
      >
        Book online, pack, move safely, and deliver everything to your door.
      </p>

      {/* ================= DESKTOP ================= */}
      <div className="hidden sm:flex items-center justify-center flex-wrap gap-6">
        {steps.map((step, idx) => (
          <div key={step.id} className="flex items-center">
            <div
              className="flex flex-col items-center"
              data-aos="zoom-in"
              data-aos-delay={(idx + 1) * 100}
            >
              {/* BOX */}
              <div className={`${boxBase} group`}>
                {/* STEP NUMBER */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="w-9 h-9 bg-[var(--color-dark)] text-white rounded-full flex items-center justify-center font-semibold border-[3px] border-white">
                    {step.id}
                  </div>
                </div>

                {/* ICON */}
                <img
                  src={step.icon}
                  alt={step.title}
                  className="w-14 h-14 object-contain"
                  draggable="false"
                />

                {/* HOVER ARROW */}
                <div
                  className="
                    absolute -right-5 top-1/2 -translate-y-1/2
                    w-9 h-9 rounded-full
                    bg-[var(--color-primary)] text-white
                    flex items-center justify-center
                    opacity-0 scale-90
                    group-hover:opacity-100 group-hover:scale-100
                    transition-all duration-200
                    pointer-events-none
                  "
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline
                      points="9 6 15 12 9 18"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* TITLE */}
              <div className="mt-4 font-semibold text-sm text-[var(--color-dark)]">
                {step.title}
              </div>
            </div>

            {/* CONNECTOR */}
            {idx < steps.length - 1 && (
              <div className="hidden sm:flex items-center px-3">
                <svg
                  className="w-7 h-4 text-[var(--color-dark)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M3 12h18" strokeWidth="1.6" />
                  <path d="M15 6l6 6-6 6" strokeWidth="1.6" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ================= MOBILE ================= */}
      <div
        className="sm:hidden relative mt-6"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          onClick={goPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow rounded-full"
        >
          ‹
        </button>

        <div className="mx-16 flex justify-center">
          <div data-aos="zoom-in" className="flex flex-col items-center">
            <div className={boxBase}>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="w-9 h-9 bg-[var(--color-dark)] text-white rounded-full flex items-center justify-center font-semibold border-[3px] border-white">
                  {currentStep.id}
                </div>
              </div>

              <img
                src={currentStep.icon}
                alt={currentStep.title}
                className="w-14 h-14 object-contain"
              />
            </div>

            <div className="mt-4 font-semibold text-sm text-[var(--color-dark)]">
              {currentStep.title}
            </div>
          </div>
        </div>

        <button
          onClick={goNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow rounded-full"
        >
          ›
        </button>

        <div className="mt-3 text-sm text-[rgba(0,0,0,0.45)]">
          {mobileIndex} / {steps.length}
        </div>
      </div>
    </section>
  );
}
