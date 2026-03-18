// components/sections/Footer.tsx
// ─────────────────────────────────────────────────────────────
// Section 11: Footer
// Dark, minimal footer with:
//   - Logo + tagline
//   - Quick navigation links
//   - Contact info
//   - Social links
//   - Legal / copyright bar
// ─────────────────────────────────────────────────────────────

'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, Linkedin } from 'lucide-react';
import { NAV_LINKS, SITE_CONFIG } from '@/utils/constants';
import Container from '@/components/Container';

// ─── Social icon map ──────────────────────────────────────────
const SOCIAL_LINKS = [
  { icon: Instagram, href: SITE_CONFIG.social.instagram, label: 'Instagram' },
  { icon: Facebook, href: SITE_CONFIG.social.facebook, label: 'Facebook' },
  { icon: Youtube, href: SITE_CONFIG.social.youtube, label: 'YouTube' },
  { icon: Linkedin, href: SITE_CONFIG.social.linkedin, label: 'LinkedIn' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative bg-black border-t border-white/[0.06]"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* ── Top gold line ─────────────────────────────────── */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(223,193,94,0.3), transparent)' }}
        aria-hidden="true"
      />

      {/* ── Main Footer Content ───────────────────────────── */}
      <Container className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >

          {/* ── Column 1: Logo & About ────────────────────── */}
          <div className="lg:col-span-1 space-y-5">
            {/* Logo placeholder — replace with <Image> */}
            <div>
              <p className="font-playfair text-2xl tracking-[0.3em] text-white uppercase">
                ANANTAM
              </p>
              <p className="font-dm-sans text-[10px] tracking-[0.3em] text-gold/60 uppercase mt-1">
                by Adinath Buildwell
              </p>
            </div>

            <div className="w-8 h-px bg-gold/40" aria-hidden="true" />

            <p className="font-dm-sans text-xs text-white/35 leading-relaxed">
              A landmark luxury residential project redefining the skyline of Jodhpur, Rajasthan.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-4 pt-2">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-8 h-8 border border-white/10
                    hover:border-gold/40 hover:text-gold
                    flex items-center justify-center
                    text-white/30 transition-all duration-300
                  "
                  aria-label={`Follow us on ${label}`}
                >
                  <Icon size={14} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Column 2: Quick Links ─────────────────────── */}
          <div className="space-y-5">
            <h3 className="font-dm-sans text-[10px] tracking-[0.35em] uppercase text-white/30">
              Quick Links
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="font-dm-sans text-xs text-white/40 hover:text-gold transition-colors duration-300 tracking-wide"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* ── Column 3: Project Info ────────────────────── */}
          <div className="space-y-5">
            <h3 className="font-dm-sans text-[10px] tracking-[0.35em] uppercase text-white/30">
              Project
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Configuration', value: '2, 3, 4 BHK + Penthouse' },
                { label: 'Area', value: '1,050 – 3,200 sq.ft.' },
                { label: 'Floors', value: 'B+G+12' },
                { label: 'Status', value: 'Under Construction' },
                { label: 'Possession', value: '2026 (Est.)' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="font-dm-sans text-[10px] text-white/25 tracking-widest uppercase mb-0.5">
                    {label}
                  </p>
                  <p className="font-dm-sans text-xs text-white/50">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Column 4: Contact ─────────────────────────── */}
          <div className="space-y-5">
            <h3 className="font-dm-sans text-[10px] tracking-[0.35em] uppercase text-white/30">
              Contact
            </h3>
            <div className="space-y-5">
              {/* Address */}
              <div className="flex gap-3">
                <MapPin size={14} className="text-gold/40 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-dm-sans text-[10px] text-white/25 tracking-widest uppercase mb-1">
                    Address
                  </p>
                  <address className="font-dm-sans text-xs text-white/45 not-italic leading-relaxed">
                    {SITE_CONFIG.address}
                  </address>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-3">
                <Phone size={14} className="text-gold/40 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-dm-sans text-[10px] text-white/25 tracking-widest uppercase mb-1">
                    Phone
                  </p>
                  <a
                    href={`tel:${SITE_CONFIG.phone}`}
                    className="font-dm-sans text-xs text-white/45 hover:text-gold transition-colors duration-300"
                  >
                    {SITE_CONFIG.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-3">
                <Mail size={14} className="text-gold/40 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-dm-sans text-[10px] text-white/25 tracking-widest uppercase mb-1">
                    Email
                  </p>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="font-dm-sans text-xs text-white/45 hover:text-gold transition-colors duration-300"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>

      {/* ── Bottom Legal Bar ──────────────────────────────── */}
      <div className="border-t border-white/[0.04]">
        <Container className="py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-dm-sans text-[10px] text-white/20 text-center md:text-left">
            © {currentYear} Adinath Buildwell. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Use', 'RERA'].map((item) => (
              <a
                key={item}
                href="#"
                className="font-dm-sans text-[10px] text-white/20 hover:text-white/40 transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </Container>
      </div>

      {/* ── Back to top button ────────────────────────────── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="
          fixed bottom-6 right-6 z-30
          w-10 h-10 border border-gold/30
          bg-black/80 backdrop-blur-sm
          flex items-center justify-center
          text-gold/60 hover:text-gold hover:border-gold/60
          transition-all duration-300
          text-xs font-dm-sans
        "
        aria-label="Scroll back to top"
      >
        ↑
      </button>
    </footer>
  );
}
