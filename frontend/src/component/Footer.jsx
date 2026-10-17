import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import FooterFeatures from './footer/FooterFeatures'
import FooterNewsletter from './footer/FooterNewsletter'
import { QUICK_LINKS, CATEGORY_LINKS, SOCIAL_LINKS } from './footer/footerData'
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiHeart
} from 'react-icons/fi'

function Footer() {
  return (
    <footer className="w-full bg-[#0c1a1f] text-gray-400 relative overflow-hidden border-t border-white/10 mb-[70px] md:mb-0">
      {/* Ambient background glow accents */}
      <div
        className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-96 bg-[#0c7c86]/10 rounded-full blur-3xl pointer-events-none -z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-10 w-96 h-96 bg-[#a5faf7]/5 rounded-full blur-3xl pointer-events-none -z-0"
        aria-hidden="true"
      />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-16 pb-12">
        {/* Top Feature Bar */}
        <FooterFeatures />

        {/* 4-Column Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link to="/" className="inline-flex items-center gap-3 group">
                <img
                  src={logo}
                  alt="ShopIn Logo"
                  className="w-9 h-9 object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(12,124,134,0.5)]"
                />
                <span className="text-2xl font-bold tracking-tight text-white group-hover:text-[#a5faf7] transition-colors">
                  Shop<span className="text-[#a5faf7]">In</span>
                </span>
              </Link>

              <p className="mt-4 text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm">
                Elevating lifestyle fashion with contemporary elegance and premium everyday essentials. Designed for those who demand sophistication, comfort, and uncompromising quality.
              </p>

              {/* Contact Snips */}
              <div className="mt-6 space-y-2.5 text-xs text-gray-300">
                <div className="flex items-center gap-3">
                  <FiMapPin className="text-[#a5faf7] shrink-0" size={15} />
                  <span>61/A Main Street, Colombo 03, LK</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiPhone className="text-[#a5faf7] shrink-0" size={15} />
                  <span>+ (011) 23 4567 89</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiMail className="text-[#a5faf7] shrink-0" size={15} />
                  <span>support@shopin.com</span>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-8 flex items-center gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#a5faf7] hover:bg-[#0c7c86]/20 hover:border-[#0c7c86]/40 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0c7c86]"></span>
              Navigation
            </h3>
            <ul className="space-y-3 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-[#a5faf7] transition-colors duration-200 inline-block hover:translate-x-1 transition-transform"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Categories (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0c7c86]"></span>
              Categories
            </h3>
            <ul className="space-y-3 text-sm">
              {CATEGORY_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-[#a5faf7] transition-colors duration-200 inline-block hover:translate-x-1 transition-transform"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter Box (4 cols) */}
          <FooterNewsletter />
        </div>

        {/* Bottom Bar: Copyright & Payment Security */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span>© 2026 ShopIn Inc. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline flex items-center gap-1">
              Crafted with <FiHeart className="inline text-rose-400" size={12} /> 100% genuine passion
            </span>
          </div>

          {/* Secure Payment Badges */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-gray-400 font-medium">Guaranteed Safe Checkout:</span>
            <div className="flex items-center gap-1.5">
              {['VISA', 'MASTERCARD', 'UPI', 'STRIPE'].map((card) => (
                <span
                  key={card}
                  className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-semibold text-gray-300 tracking-wider"
                >
                  {card}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer