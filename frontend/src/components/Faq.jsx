import React, { useEffect, useMemo, useRef, useState } from "react";
import { Search, ChevronDown, Phone } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

/* Replace/extend these Q&A items */
const RAW_FAQS = [
  {
    q: "How far in advance should I book packers and movers?",
    a: "We recommend booking at least 7–10 days in advance to ensure availability, especially during weekends, month-end, or peak relocation seasons."
  },
  {
    q: "Do you provide packing materials like boxes and bubble wrap?",
    a: "Yes. We use high-quality packing materials including sturdy cartons, bubble wrap, stretch film, foam sheets, and corrugated boxes to ensure complete safety."
  },
  {
    q: "Are my household items insured during the move?",
    a: "Absolutely. We offer transit insurance that covers your goods against damage or loss during transportation. Insurance options are explained before confirmation."
  },
  {
    q: "How do you calculate the moving cost?",
    a: "The cost depends on factors such as distance, volume of goods, type of items, packing requirements, floor level, and vehicle size required."
  },
  {
    q: "Will my items be delivered on the same day?",
    a: "Local moves are usually completed the same day. For intercity relocations, delivery time depends on distance, route, and weather conditions."
  },
  {
    q: "Can you handle fragile and valuable items safely?",
    a: "Yes. Our trained professionals specialize in handling fragile items like glassware, electronics, antiques, and artwork with extra protective packing."
  },
  {
    q: "Do you offer unpacking and rearranging services?",
    a: "Yes. Upon request, we provide unpacking, furniture reassembly, and placement services to help you settle in quickly at your new location."
  },
];

export default function FAQPremiumStyled() {
  // stable ids
  const faqs = useMemo(() => RAW_FAQS.map((f, i) => ({ ...f, id: i })), []);

  const [query, setQuery] = useState("");
  const [openSet, setOpenSet] = useState(new Set()); // opened item ids
  const contentRefs = useRef({}); // DOM refs for measuring answer heights

  useEffect(() => {
    AOS.init({ duration: 700, once: true, easing: "ease-out-cubic" });
    AOS.refresh();
  }, []);

  // filter by query (search both question and answer)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqs;
    return faqs.filter(
      (f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
    );
  }, [faqs, query]);

  const toggle = (id) => {
    setOpenSet((prev) => {
      const s = new Set(prev);
      if (s.has(id)) s.delete(id);
      else s.add(id);
      return s;
    });
  };

  const expandAll = () => setOpenSet(new Set(filtered.map((f) => f.id)));
  const collapseAll = () => setOpenSet(new Set());

  // keyboard accessibility toggle
  const handleKeyToggle = (e, id) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(id);
    }
  };

  return (
    <section className="w-full bg-[var(--bg)] py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">
          <div>
            <h2
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-3xl font-bold text-left mb-2 text-[var(--color-dark)]"
            >
              Frequently <span className="text-[var(--color-primary)]">Asked</span> Questions
            </h2>
            <p data-aos="fade-up" data-aos-delay="80" className="mt-3 max-w-xl text-sm text-[var(--color-muted)]">
              Quick answers to your most common queries about our packing, moving and storage services. Search or browse below.
            </p>
            <div className="mt-4 text-xs text-[var(--color-muted)]">
              Pro tip: try searching keywords like "insurance", "packing" or "vehicle".
            </div>
          </div>

          {/* Controls: Search + Expand/Collapse */}
          <div data-aos="fade-up" data-aos-delay="120" className="w-full lg:w-auto flex gap-3 items-center">
            <div className="relative w-full lg:w-[420px]">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-primary)]">
                <Search size={18} />
              </div>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search questions or answers..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-[var(--color-dark)]/10 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                aria-label="Search FAQs"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={expandAll}
                className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-[var(--color-dark)]/10 text-sm text-[var(--color-dark)] shadow-sm hover:shadow-md transition"
                aria-label="Expand all FAQs"
              >
                Expand all
              </button>
              <button
                onClick={collapseAll}
                className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-[var(--color-dark)]/10 text-sm text-[var(--color-dark)] shadow-sm hover:shadow-md transition"
                aria-label="Collapse all FAQs"
              >
                Collapse
              </button>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: FAQ list */}
          <div className="lg:col-span-7 space-y-4">
            {/* result count */}
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-[var(--color-muted)]">
                {filtered.length} question{filtered.length !== 1 ? "s" : ""} found
              </div>
              <div className="text-sm text-[var(--color-muted)]">Tip: use keywords to narrow results</div>
            </div>

            {filtered.length === 0 ? (
              <div data-aos="fade-up" className="rounded-2xl border border-[var(--color-dark)]/8 bg-white p-8 text-center shadow-sm">
                <div className="text-lg font-semibold text-[var(--color-dark)] mb-2">No results</div>
                <p className="text-sm text-[var(--color-muted)]">Try a different keyword or clear the search.</p>
              </div>
            ) : (
              filtered.map((item, idx) => {
                const isOpen = openSet.has(item.id);
                // measure content height if ref exists
                const contentEl = contentRefs.current[item.id];
                const contentHeight = contentEl ? contentEl.scrollHeight : 0;

                // card styles (open -> dark bg, inverted text)
                const cardBgClass = isOpen ? "bg-[var(--color-dark)]" : "bg-white";
                const cardBorderStyle = isOpen
                  ? "1px solid rgba(255, 138, 0, 0.08)" // subtle warm border on dark
                  : "1px solid rgba(15,23,36,0.06)";

                const questionClass = isOpen ? "text-[var(--color-light)]" : "text-[var(--color-dark)]";
                const answerClass = isOpen ? "text-[var(--color-light)]/90" : "text-[var(--color-muted)]";
                const badgeClass = isOpen ? "bg-[var(--color-light)] text-[var(--color-dark)]" : "bg-[var(--color-primary)]/10 text-[var(--color-primary)]";
                const chevronClass = isOpen ? "rotate-180 text-[var(--color-primary)]" : "text-[var(--color-muted)]";

                return (
                  <div
                    key={item.id}
                    data-aos="fade-up"
                    data-aos-delay={80 + idx * 60}
                    className="relative rounded-2xl overflow-hidden"
                  >
                    {/* subtle card with left accent bar */}
                    <div
                      className={`relative p-6 rounded-2xl shadow-sm transition-transform duration-300 hover:-translate-y-1 ${cardBgClass}`}
                      style={{ border: cardBorderStyle }}
                    >
                      {/* left accent (absolute) */}
                      <div className={`absolute left-0 top-4 bottom-4 w-1 rounded-r-full bg-[var(--color-primary)]/90`} />

                      <div
                        role="button"
                        tabIndex={0}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${item.id}`}
                        onKeyDown={(e) => handleKeyToggle(e, item.id)}
                        onClick={() => toggle(item.id)}
                        className="flex items-start gap-6 cursor-pointer"
                      >
                        {/* number badge */}
                        <div className={`flex-shrink-0 w-12 h-12 rounded-lg grid place-items-center font-semibold text-sm ${badgeClass}`}>
                          {idx + 1}
                        </div>

                        {/* question + answer */}
                        <div className="flex-1">
                          <h3 className={`${questionClass} font-semibold text-lg`}>{item.q}</h3>

                          {/* animated answer */}
                          <div
                            id={`faq-panel-${item.id}`}
                            role="region"
                            aria-hidden={!isOpen}
                            ref={(el) => (contentRefs.current[item.id] = el)}
                            style={{
                              maxHeight: isOpen ? `${contentHeight}px` : "0px",
                              transition: "max-height 420ms cubic-bezier(.2,.9,.2,1)",
                              overflow: "hidden"
                            }}
                          >
                            <div className={`mt-4 text-sm ${answerClass} ${isOpen ? "opacity-100" : "opacity-0"}`}>
                              {item.a}
                            </div>
                          </div>
                        </div>

                        {/* chevron */}
                        <div className={`flex-shrink-0 ml-4 mt-1 transition-transform ${chevronClass}`}>
                          <ChevronDown size={20} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right: Contact / CTA card */}
          <aside className="lg:col-span-5">
            <div data-aos="zoom-in" className="rounded-2xl overflow-hidden shadow-xl">
              <div className="p-8 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-600)] text-[var(--color-dark)]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg grid place-items-center bg-white/90 text-[var(--color-primary)]">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase">Need help now?</div>
                    <h4 className="mt-2 text-2xl font-bold">Talk to our specialists</h4>
                    <p className="mt-2 text-sm text-[var(--color-dark)]/90">Get personalized guidance, an instant estimate, or schedule a site visit.</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <a href="tel:+1234567890" className="inline-flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-[var(--color-dark)] text-[var(--color-light)] font-semibold shadow">
                    Call Now: +1 234 567 890
                  </a>
                  <a href="/contact" className="inline-flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-white/40 bg-white text-[var(--color-dark)] font-semibold">
                    Request a Quote
                  </a>
                </div>
              </div>

              <div className="bg-white p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-start gap-1">
                    <div className="text-sm text-[var(--color-muted)]">Working Hours</div>
                    <div className="font-medium">Mon - Sat • 9:00 AM - 7:00 PM</div>
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <div className="text-sm text-[var(--color-muted)]">Response Time</div>
                    <div className="font-medium">Usually within an hour</div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-[var(--color-dark)]/8 p-4 text-center">
                    <div className="text-[var(--color-primary)] font-bold text-lg">110+</div>
                    <div className="text-xs text-[var(--color-muted)]">Team Members</div>
                  </div>
                  <div className="rounded-lg border border-[var(--color-dark)]/8 p-4 text-center">
                    <div className="text-[var(--color-primary)] font-bold text-lg">250+</div>
                    <div className="text-xs text-[var(--color-muted)]">Projects Done</div>
                  </div>
                </div>
              </div>

            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}