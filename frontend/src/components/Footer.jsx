import React from "react";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Truck } from "lucide-react";
import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <footer className="bg-[var(--color-dark)] text-[var(--color-light)] py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1: Logo + Description + Social Icons */}
        <div>
       
        <Truck className="text-[var(--color-primary)] text-5xl drop-shadow-md" />
            <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-wide">
            Annai{" "}
            <span className="text-[var(--color-primary)]">Packers & Movers</span>
          </h1>
          <p className="text-[var(--color-light)]/80 text-sm">
            We are a leading relocation service provider dedicated to making your moving experience smooth, safe, and stress-free.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="#" className="p-2 rounded-full bg-[var(--color-dark)] hover:bg-[var(--color-primary)] transition">
              <Facebook className="w-4 h-4 text-[var(--color-light)]" />
            </a>
            <a href="#" className="p-2 rounded-full bg-[var(--color-dark)] hover:bg-[var(--color-primary)] transition">
              <Instagram className="w-4 h-4 text-[var(--color-light)]" />
            </a>
            <a href="#" className="p-2 rounded-full bg-[var(--color-dark)] hover:bg-[var(--color-primary)] transition">
              <Twitter className="w-4 h-4 text-[var(--color-light)]" />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-[var(--color-light)] font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-[var(--color-primary)] transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-[var(--color-primary)] transition">About Us</Link></li>
            <li><Link to="/services" className="hover:text-[var(--color-primary)] transition">Services</Link></li>
            <li><Link to="/gallery" className="hover:text-[var(--color-primary)] transition">Gallery</Link></li>
            <li><Link to="/contact" className="hover:text-[var(--color-primary)] transition">Contact Us</Link></li>
          </ul>
        </div>

        {/* Column 3: Our Services */}
        <div>
          <h3 className="text-[var(--color-light)] font-semibold mb-4">Our Services</h3>
          <ul className="space-y-2 text-sm">
            <li>House Shifting</li>
            <li>Office Relocation</li>
            <li>Car Transport</li>
            <li>Warehousing</li>
            <li>Local Shifting</li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div>
          <h3 className="text-[var(--color-light)] font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[var(--color-primary)]" /> 123, Movement Street, Logistics Area, City - 600001
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[var(--color-primary)]" /> +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[var(--color-primary)]" /> info@annaipackers.com
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-[var(--color-primary)] mt-8 pt-4 text-center text-[var(--color-light)]/70 text-sm">
  © {new Date().getFullYear()} Annai Packers & Movers. All Rights Reserved.
</div>

    </footer>
  );
}
