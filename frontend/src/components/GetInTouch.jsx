// src/components/GetInTouch.jsx
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTruckMoving,
  FaShieldAlt,
  FaUserAlt,
  FaCity,
  FaRegCommentDots,
} from "react-icons/fa";

const API_BASE = import.meta.env.VITE_API_URL; // e.g. http://localhost:4000

export default function GetInTouch() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-in-out-cubic",
      once: false,
      mirror: true,
      offset: 90,
    });

    const t = setTimeout(() => AOS.refresh(), 150);
    return () => clearTimeout(t);
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    moveFrom: "",
    moveTo: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const update = (key) => (e) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/mail/enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg = Array.isArray(data?.message)
          ? data.message.join(", ")
          : data?.message || "Failed to submit enquiry";
        throw new Error(msg);
      }

      toast.success("Enquiry submitted successfully!");

      setForm({
        name: "",
        email: "",
        phone: "",
        city: "",
        moveFrom: "",
        moveTo: "",
        message: "",
      });

      setTimeout(() => AOS.refresh(), 150);
    } catch (err) {
      toast.error(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative isolate py-24 sm:py-28">
      {/* Premium background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#f7f9ff] via-white to-[#f7f9ff]" />
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[color:var(--color-primary)] opacity-[0.18] blur-3xl" />
        <div className="absolute -bottom-28 -right-24 h-96 w-96 rounded-full bg-[color:var(--color-primary)] opacity-[0.14] blur-3xl" />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(60%_55%_at_50%_30%,black,transparent)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-12">
          <p
            data-aos="fade-right"
            data-aos-delay="0"
            className="text-xs font-semibold tracking-[0.28em] uppercase text-gray-500"
          >
            Get in Touch
          </p>

          <h2
            data-aos="fade-up"
            data-aos-delay="80"
            className="mt-3 text-3xl sm:text-4xl font-bold text-[color:var(--color-dark)]"
          >
            Annai Packers & Movers —{" "}
            <span className="text-[color:var(--color-primary)]">
              Request a quick callback
            </span>
          </h2>

          <p
            data-aos="fade-up"
            data-aos-delay="140"
            className="mt-3 max-w-2xl text-gray-600"
          >
            Share your details and we’ll call you with a clear estimate and the
            best schedule for your move.
          </p>

          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="mt-6 flex flex-wrap gap-2"
          >
            <Badge
              icon={
                <FaShieldAlt className="text-[color:var(--color-primary)]" />
              }
            >
              Insured handling
            </Badge>
            <Badge
              icon={
                <FaTruckMoving className="text-[color:var(--color-primary)]" />
              }
            >
              Professional crew
            </Badge>
            <Badge
              icon={<FaPhoneAlt className="text-[color:var(--color-primary)]" />}
            >
              Fast support
            </Badge>
          </div>
        </div>

        {/* Main layout */}
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* LEFT: Info Card */}
          <div
            data-aos="fade-down"
            data-aos-delay="0"
            className="
              lg:col-span-5
              relative overflow-hidden rounded-3xl
              border border-white/10
              bg-[linear-gradient(180deg,rgba(15,23,42,0.98),rgba(15,23,42,0.92))]
              text-white
              shadow-xl
            "
          >
            <div className="relative p-6 sm:p-8">
              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0">
                  <p
                    data-aos="fade-up"
                    data-aos-delay="100"
                    className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-primary)]"
                  >
                    Direct Support
                  </p>

                  <h3
                    data-aos="fade-up"
                    data-aos-delay="160"
                    className="mt-2 text-xl sm:text-2xl font-semibold leading-snug"
                  >
                    Moving made simple, safe and on-time
                  </h3>

                  <p
                    data-aos="fade-up"
                    data-aos-delay="220"
                    className="mt-2 text-sm text-white/75"
                  >
                    Packing • Loading • Transport • Unloading — handled end‑to‑end
                    by our trained team.
                  </p>
                </div>

                <div
                  className="hidden sm:flex"
                  data-aos="zoom-in"
                  data-aos-delay="260"
                >
                  <TruckBadge />
                </div>
              </div>

              <div className="mt-8" data-aos="fade-up" data-aos-delay="320">
                <FloatingVisual />
              </div>

              <div className="mt-8 grid gap-3">
                <div data-aos="fade-up" data-aos-delay="380">
                  <InfoRow
                    icon={<FaPhoneAlt />}
                    label="Call Us"
                    value="+91 98765 43210"
                    href="tel:+919876543210"
                  />
                </div>
                <div data-aos="fade-up" data-aos-delay="440">
                  <InfoRow
                    icon={<FaEnvelope />}
                    label="Email"
                    value="info@annaipackersandservices.com"
                    href="mailto:info@annaipackersandservices.com"
                  />
                </div>
                <div data-aos="fade-up" data-aos-delay="500">
                  <InfoRow
                    icon={<FaMapMarkerAlt />}
                    label="Office"
                    value="Bangalore, Karnataka, India"
                  />
                </div>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-3">
                <div data-aos="fade-up" data-aos-delay="560">
                  <StatCard title="Moves Completed" value="5,000+" />
                </div>
                <div data-aos="fade-up" data-aos-delay="620">
                  <StatCard title="Customer Rating" value="4.8 / 5" />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Form wrapper */}
          <div
            data-aos="fade-up"
            data-aos-delay="80"
            className="lg:col-span-7 rounded-3xl p-[1px] shadow-[0_26px_80px_rgba(15,23,42,0.14)]"
            style={{
              background:
                "linear-gradient(135deg, rgba(238,107,20,0.30), rgba(238,107,20,0.10), rgba(238,107,20,0.22))",
            }}
          >
            <div className="rounded-3xl bg-white/75 backdrop-blur-xl">
              <div className="border-b border-gray-900/5 px-6 py-6 sm:px-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                  Request a quote
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Fill the form below — we’ll contact you shortly.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="px-6 py-6 sm:px-8 sm:py-8 space-y-5"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <FloatingField
                    id="name"
                    label="Name"
                    icon={<FaUserAlt className="h-4 w-4" />}
                    required
                    value={form.name}
                    onChange={update("name")}
                    aos="fade-up"
                    aosDelay={100}
                  />
                  <FloatingField
                    id="email"
                    label="Email"
                    type="email"
                    icon={<FaEnvelope className="h-4 w-4" />}
                    required
                    value={form.email}
                    onChange={update("email")}
                    aos="fade-up"
                   
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FloatingField
                    id="phone"
                    label="Phone Number"
                    type="tel"
                    icon={<FaPhoneAlt className="h-4 w-4" />}
                    required
                    value={form.phone}
                    onChange={update("phone")}
                    aos="fade-up"
                    
                  />
                  <FloatingField
                    id="city"
                    label="City"
                    icon={<FaCity className="h-4 w-4" />}
                    required
                    value={form.city}
                    onChange={update("city")}
                    aos="fade-up"
                    
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FloatingField
                    id="moveFrom"
                    label="Move From"
                    icon={<FaMapMarkerAlt className="h-4 w-4" />}
                    required
                    value={form.moveFrom}
                    onChange={update("moveFrom")}
                    aos="fade-up"
                  
                  />
                  <FloatingField
                    id="moveTo"
                    label="Move To"
                    icon={<FaMapMarkerAlt className="h-4 w-4" />}
                    required
                    value={form.moveTo}
                    onChange={update("moveTo")}
                    aos="fade-up"
                   
                  />
                </div>

                <FloatingTextarea
                  id="message"
                  label="Message"
                  icon={<FaRegCommentDots className="h-4 w-4" />}
                  hint="Floor, lift availability, fragile items, preferred time..."
                  value={form.message}
                  onChange={update("message")}
                  aos="fade-up"
                 
                />

                <div
                  className="relative flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between"
                  data-aos="fade-up"
                  data-aos-delay="800"
                >
                  <p className="text-xs text-gray-500 flex items-center gap-2">
                    <FaShieldAlt className="text-emerald-600" />
                    Your details are kept private.
                  </p>

                  <div className="absolute -inset-2 rounded-full bg-[color:var(--color-primary)] opacity-[0.30] blur-3xl z-0" />

                  <button
                    type="submit"
                    disabled={loading}
                    className="relative z-10 group inline-flex items-center justify-center gap-2
                      rounded-full px-7 py-2.5 text-sm font-semibold text-white
                      shadow-[0_18px_45px_rgba(238,107,20,0.35)]
                      hover:shadow-[0_22px_55px_rgba(238,107,20,0.45)]
                      active:translate-y-[1px]
                      transition-all
                      disabled:opacity-60 disabled:cursor-not-allowed
                      focus:outline-none focus-visible:ring-2
                      focus-visible:ring-[color:var(--color-primary)]
                      focus-visible:ring-offset-2
                    "
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    {loading ? "Sending..." : "Get Quote"}
                  
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- UI Bits ---------------- */

function Badge({ icon, children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm backdrop-blur">
      {icon}
      {children}
    </span>
  );
}

function InfoRow({ icon, label, value, href }) {
  const Wrapper = href ? "a" : "div";
  return (
    <Wrapper
      href={href}
      className="
        w-full max-w-full overflow-hidden
        flex items-start gap-3 rounded-2xl
        border border-white/10 bg-white/5 p-4
        hover:bg-white/10 transition
      "
    >
      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-white/10 text-white">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[0.72rem] uppercase tracking-[0.18em] text-white/60">
          {label}
        </p>

        <p className="mt-1 text-sm font-semibold text-white break-all sm:truncate">
          {value}
        </p>
      </div>
    </Wrapper>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs text-white/70">{title}</p>
      <p className="mt-1 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

function TruckBadge() {
  return (
    <div
      className="relative h-14 w-14 rounded-2xl border border-white/10 flex items-center justify-center
      bg-[linear-gradient(135deg,rgba(238,107,20,0.35),rgba(255,255,255,0.06))]"
    >
      <div className="h-11 w-11 rounded-2xl bg-white/10 flex items-center justify-center">
        <FaTruckMoving className="text-white text-xl" />
      </div>
    </div>
  );
}

/* ---------------- Floating label input/textarea (extra gap after typing) ---------------- */

function FloatingField({
  id,
  label,
  type = "text",
  icon,
  required,
  value,
  onChange,
  aos = "fade-up",
  aosDelay = 0,
}) {
  const floated = (value ?? "").trim().length > 0;

  return (
    <div className="relative" data-aos={aos} data-aos-delay={aosDelay} data-aos-once="false">
      <div className="pointer-events-none absolute left-4 top-5 text-gray-400">
        {icon}
      </div>

      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder=" "
        value={value}
        onChange={onChange}
        className="
          peer w-full rounded-2xl
          border border-gray-200 bg-white/85
          px-11 pt-9 pb-3 text-sm text-[color:var(--color-dark)]
          shadow-sm outline-none transition
          focus:bg-white/85
          focus:border-[color:var(--color-primary)]
          focus-visible:ring-4 focus-visible:ring-[color:var(--color-primary)]/15
        "
      />

      <label
        htmlFor={id}
        className={[
          "pointer-events-none absolute left-11 transition-all",
          "top-5 text-sm text-gray-500",
          floated ? "top-1.5 text-[0.7rem] text-gray-600 bg-white/90 px-1 rounded" : "",
          "peer-focus:top-1.5 peer-focus:text-[0.7rem] peer-focus:text-[color:var(--color-primary)] peer-focus:bg-white/90 peer-focus:px-1 peer-focus:rounded",
        ].join(" ")}
      >
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({
  id,
  label,
  icon,
  hint,
  value,
  onChange,
  aos = "fade-up",
  aosDelay = 0,
}) {
  const floated = (value ?? "").trim().length > 0;

  return (
    <div className="relative" data-aos={aos} data-aos-delay={aosDelay} data-aos-once="false">
      <div className="pointer-events-none absolute left-4 top-5 text-gray-400">
        {icon}
      </div>

      <textarea
        id={id}
        name={id}
        rows={4}
        placeholder=" "
        value={value}
        onChange={onChange}
        className="
          peer w-full rounded-2xl
          border border-gray-200 bg-white/85
          px-11 pt-9 pb-3 text-sm text-[color:var(--color-dark)]
          shadow-sm outline-none transition
          resize-none
          focus:bg-white/85
          focus:border-[color:var(--color-primary)]
          focus-visible:ring-4 focus-visible:ring-[color:var(--color-primary)]/15
        "
      />

      <label
        htmlFor={id}
        className={[
          "pointer-events-none absolute left-11 transition-all",
          "top-5 text-sm text-gray-500",
          floated ? "top-1.5 text-[0.7rem] text-gray-600 bg-white/90 px-1 rounded" : "",
          "peer-focus:top-1.5 peer-focus:text-[0.7rem] peer-focus:text-[color:var(--color-primary)] peer-focus:bg-white/90 peer-focus:px-1 peer-focus:rounded",
        ].join(" ")}
      >
        {label}
      </label>

      {hint && <p className="mt-2 text-xs text-gray-500">{hint}</p>}
    </div>
  );
}

/* ---------------- Floating Visual ---------------- */

function FloatingVisual() {
  return (
    <div className="relative h-[220px] sm:h-[180px] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 520 220" fill="none">
        <path
          d="M40 50 C140 10, 210 110, 310 80 C390 55, 420 140, 490 170"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="2"
          strokeDasharray="6 10"
        />
      </svg>

      <FloatIcon top="18%" left="12%" delay="0s">
        <FaPhoneAlt />
      </FloatIcon>
      <FloatIcon top="10%" left="62%" delay="1.2s">
        <FaEnvelope />
      </FloatIcon>
      <FloatIcon top="58%" left="35%" delay="2.4s">
        <FaMapMarkerAlt />
      </FloatIcon>
      <FloatIcon top="62%" left="78%" delay="3.6s">
        <FaTruckMoving />
      </FloatIcon>

      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/10 px-4 py-3">
        <p className="text-xs text-white/70">
          Average response time: <span className="font-semibold text-white">10–15 min</span>
        </p>
        <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_5px_rgba(16,185,129,0.18)]" />
      </div>
    </div>
  );
}

function FloatIcon({ top, left, delay, children }) {
  return (
    <div
      className="
        absolute
        h-12 w-12 rounded-2xl
        border border-white/15
        bg-gradient-to-br from-white/12 to-white/5
        shadow-[0_14px_30px_rgba(0,0,0,0.35)]
        flex items-center justify-center
        text-white
        animate-[float_6s_ease-in-out_infinite]
      "
      style={{ top, left, animationDelay: delay }}
    >
      <div className="h-10 w-10 rounded-2xl bg-white/10 flex items-center justify-center text-lg">
        {children}
      </div>
    </div>
  );
}