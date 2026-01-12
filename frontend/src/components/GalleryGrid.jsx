import React, { useEffect, useMemo, useState } from "react";
import img1 from "../assets/commercial.png";
import img2 from "../assets/banner2.jpg";
import img3 from "../assets/Loading and Unloading.webp"


import AOS from "aos";

const items = [
  { id: 1, category: "trucks", title: "Fleet Ready", img: img1, span: "6", height: "tall", aos: "zoom-in" },
  { id: 2, category: "packing", title: "Packing Materials", img:img2, span: "3", height: "mid", aos: "fade-up" },
  { id: 3, category: "loading", title: "Careful Loading", img: img3, span: "3", height: "normal", aos: "fade-up" },
  { id: 4, category: "packing", title: "Fragile Protection", img: img1 , span: "4", height: "tall", aos: "zoom-in" },
  { id: 5, category: "trucks", title: "On-Time Dispatch", img: img2, span: "4", height: "mid", aos: "zoom-in" },
  { id: 6, category: "office", title: "Customer Support",  img: img3, span: "4", height: "normal", aos: "fade-up" },
  { id: 7, category: "loading", title: "Unloading with Care",  img: img1 ,span: "3", height: "normal", aos: "fade-up" },
  { id: 8, category: "packing", title: "Labeling System", img: img2, span: "3", height: "mid", aos: "zoom-in" },
  { id: 9, category: "trucks", title: "Long Distance Moving",  img: img3, span: "6", height: "tall", aos: "zoom-in" },
  { id: 10, category: "office", title: "Planning & Coordination",  img: img1, span: "4", height: "normal", aos: "fade-up" },
  { id: 11, category: "loading", title: "Warehouse Handling", img: img2, span: "4", height: "mid", aos: "zoom-in" },
  { id: 12, category: "packing", title: "Furniture Wrapping", img: img3, span: "4", height: "tall", aos: "fade-up" },
];

const filters = [
  { key: "all", label: "All" },
  { key: "trucks", label: "Trucks" },
  { key: "packing", label: "Packing" },
  { key: "loading", label: "Loading" },
  { key: "office", label: "Office" },
];

const spanClass = {
  "6": "col-span-12 lg:col-span-6",
  "4": "col-span-12 sm:col-span-6 lg:col-span-4",
  "3": "col-span-12 sm:col-span-6 lg:col-span-3",
};

const heightClass = {
  tall: "h-[260px] sm:h-[300px] md:h-[360px]",
  mid: "h-[220px] sm:h-[250px] md:h-[290px]",
  normal: "h-[200px] sm:h-[220px] md:h-[240px]",
};

export default function GalleryGrid() {
  const [active, setActive] = useState("all");

  useEffect(() => {
    AOS.init({
      once: false,
      mirror: true,
      offset: 80,
      duration: 650,
      easing: "ease-out-cubic",
    });
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      document.querySelectorAll("[data-aos]").forEach((el) => {
        el.classList.remove("aos-animate");
      });
      AOS.refreshHard();
    }, 50);
    return () => clearTimeout(t);
  }, [active]);

  const filtered = useMemo(() => {
    if (active === "all") return items;
    return items.filter((i) => i.category === active);
  }, [active]);

  return (
    <section className="bg-[color:var(--color-light)] text-[color:var(--color-dark)]">
      <div className="mx-auto w-[min(1200px,92vw)] py-8">
        {/* Small Header */}
        <div className="mb-4">
        <h2
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-3xl font-bold text-left mb-2 text-[var(--color-dark)]"
        >
          Our <span className="text-[var(--color-primary)]">Gallery</span>
        </h2>
          <p 
           data-aos="fade-up"
           data-aos-delay="200"
            className="text-left text-gray-500 italic mb-10">
            Annai Packers & Movers highlights
          </p>
        </div>

        {/* Filters */}
        <div className="mb-5 flex flex-wrap gap-2" 
        data-aos-delay="300"data-aos="fade-up">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={[
                "rounded-full border px-4 py-2 text-xs font-extrabold transition hover:-translate-y-0.5",
                active === f.key
                  ? "border-[color:var(--color-primary)] bg-[color:var(--color-primary)] text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
              ].join(" ")}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-12 gap-4">
          {filtered.map((it, idx) => (
            <div
              key={it.id}
              data-aos={it.aos}
              data-aos-delay={(idx % 6) * 60}
              className={[
                "group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg",
                spanClass[it.span],
                heightClass[it.height],
              ].join(" ")}
            >
              <div className="relative h-full w-full">
                <img
                  src={it.img}
                  alt={it.title}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = `https://picsum.photos/seed/fallback-${it.id}/1200/900`;
                  }}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />

                {/* Bottom title strip (no dot) */}
                <div className="absolute inset-x-0 bottom-0 bg-white/90 px-3 py-2 backdrop-blur">
                  <p className="truncate text-sm font-extrabold">{it.title}</p>
                  <p className="mt-0.5 text-[11px] font-bold text-slate-600">
                    {it.category.toUpperCase()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}