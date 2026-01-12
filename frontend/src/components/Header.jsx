import {
  Truck,
  Menu,
  X,
  PhoneCall,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

/* ================= TOP CONTACT BAR ================= */
function TopContactBar() {
  return (
    <div
      className="hidden md:block text-sm"
      style={{ backgroundColor: "var(--color-dark)" }}
    >
      <div className="max-w-7xl mx-auto px-4 h-10 flex items-center justify-between">
        
        {/* LEFT: EMAIL + PHONE */}
        <div className="flex items-center gap-6 text-white">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[var(--color-primary)]" />
            <span>annaipackers@gmail.com</span>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[var(--color-primary)]" />
            <span>+91 98765 43210</span>
          </div>
        </div>

        {/* RIGHT: SOCIAL ICONS */}
        <div className="flex items-center gap-4">
          <a href="#" className="text-white hover:text-[var(--color-primary)] transition">
            <Facebook className="w-4 h-4" />
          </a>
          <a href="#" className="text-white hover:text-[var(--color-primary)] transition">
            <Instagram className="w-4 h-4" />
          </a>
          <a href="#" className="text-white hover:text-[var(--color-primary)] transition">
            <Twitter className="w-4 h-4" />
          </a>
          <a href="#" className="text-white hover:text-[var(--color-primary)] transition">
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

/* ================= MAIN HEADER ================= */
export default function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <TopContactBar />

      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between">

            {/* LOGO */}
            <NavLink to="/" className="flex items-center gap-2">
              <div
                className="h-9 w-9 rounded-xl flex items-center justify-center shadow-sm"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                <Truck className="w-5 h-5 text-white stroke-white" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-[var(--color-dark)]">
                Annai{" "}
                <span className="text-[var(--color-primary)] font-bold">
                  Packers
                </span>{" "}
                & Movers
              </span>
            </NavLink>

            {/* DESKTOP MENU */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              <NavItem label="Home" to="/" />
              <NavItem label="About" to="/about" />
              <NavItem label="Services" to="/services" />
              <NavItem label="Gallery" to="/gallery" />
              <NavItem label="Contact" to="/contact" />
            </nav>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-2">

              {/* GET QUOTE BUTTON */}
              <div className="hidden md:flex">
              <button
  onClick={() => navigate("/contact")}
  className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-md hover:shadow-lg transition"
  style={{ backgroundColor: "var(--color-primary)" }}
>
  <PhoneCall className="w-4 h-4" />
  Get Quote
</button>

              </div>

              {/* HAMBURGER */}
              <button
                onClick={() => setOpen(!open)}
                className="md:hidden p-2 rounded-full hover:bg-gray-100 transition"
                aria-label="Menu"
              >
                {open ? (
                  <X className="w-6 h-6 text-[var(--color-dark)]" />
                ) : (
                  <Menu className="w-6 h-6 text-[var(--color-dark)]" />
                )}
              </button>
            </div>
          </div>

          {/* MOBILE MENU */}
          {open && (
            <nav className="md:hidden border-t border-gray-200 mt-2 pb-4">
              <ul className="flex flex-col gap-4 pt-4 text-base font-medium">
                <NavItem label="Home" to="/" mobile setOpen={setOpen} />
                <NavItem label="About" to="/about" mobile setOpen={setOpen} />
                <NavItem label="Services" to="/services" mobile setOpen={setOpen} />
                <NavItem label="Gallery" to="/gallery" mobile setOpen={setOpen} />
                <NavItem label="Contact" to="/contact" mobile setOpen={setOpen} />

                {/* GET QUOTE MOBILE */}
                <li className="pt-2">
                <button
  onClick={() => {
    setOpen(false);
    navigate("/contact");
  }}
  className="w-full inline-flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-sm font-semibold text-white shadow-md"
  style={{ backgroundColor: "var(--color-primary)" }}
>
  <PhoneCall className="w-4 h-4" />
  Get Quote
</button>

                </li>
              </ul>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}

/* ================= NAV ITEM ================= */
function NavItem({ label, to, mobile, setOpen }) {
  return (
    <NavLink
      to={to}
      onClick={() => setOpen && setOpen(false)}
      className={({ isActive }) =>
        `
        tracking-wide transition
        ${mobile ? "px-2" : ""}
        ${
          isActive
            ? "text-[var(--color-primary)] font-semibold"
            : "text-[var(--color-dark)] hover:text-[var(--color-primary)]"
        }
      `
      }
    >
      {label}
    </NavLink>
  );
}
