// components/layout/Navbar.tsx
// ─────────────────────────────────────────────────────────────
// Fixed navigation bar with:
//   - Transparent → frosted-dark on scroll
//   - Desktop: horizontal links
//   - Mobile: hamburger menu with slide-down panel
//   - Active section highlighting via IntersectionObserver
// ─────────────────────────────────────────────────────────────

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import Image from 'next/image';
import { NAV_LINKS, SITE_CONFIG } from '@/utils/constants';
import { cn } from '@/utils/cn';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);  // Is user scrolled down?
  const [menuOpen, setMenuOpen] = useState(false);   // Mobile menu open?
  const [activeSection, setActiveSection] = useState(''); // Currently visible section

  // ── Detect scroll to add background blur ──────────────────
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── IntersectionObserver: track which section is visible ──
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // ── Close mobile menu on resize to desktop ────────────────
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ── Smooth scroll helper ──────────────────────────────────
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-500',
          scrolled
            ? 'bg-black/85 backdrop-blur-md border-b border-white/5 py-3'
            : 'bg-transparent py-5'
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="w-full mx-auto max-w-[1680px] px-6 md:px-[60px] xl:px-[120px] flex items-center justify-between">

          {/* ── Logo ────────────────────────────────────── */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center leading-none"
            aria-label="ANANTAM - Home"
          >
            <Image
              src="/logo/anantam-logo.png"
              alt="ANANTAM by Adinath Buildwell"
              width={160}
              height={82}
              priority
              className="h-10 w-auto object-contain"
            />
          </a>

          {/* ── Desktop Navigation Links ─────────────────── */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Desktop nav">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={cn(
                    'font-dm-sans text-xs tracking-[0.15em] uppercase transition-colors duration-300',
                    isActive ? 'text-gold' : 'text-white/60 hover:text-white'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* ── Desktop CTA ──────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="flex items-center gap-2 text-white/60 hover:text-gold transition-colors duration-300"
              aria-label={`Call us at ${SITE_CONFIG.phone}`}
            >
              <Phone size={14} />
              <span className="font-dm-sans text-xs tracking-wider">{SITE_CONFIG.phone}</span>
            </a>
            <button
              onClick={() => scrollTo('#contact')}
              className="
                px-5 py-2 border border-gold/60 text-gold text-xs tracking-[0.15em] uppercase
                font-dm-sans hover:bg-gold hover:text-black transition-all duration-300
              "
              aria-label="Schedule a visit"
            >
              Schedule Visit
            </button>
          </div>

          {/* ── Mobile Hamburger ─────────────────────────── */}
          <button
            className="lg:hidden p-2 text-white/80 hover:text-gold transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* ── Mobile Menu Overlay ─────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="
              fixed top-0 left-0 right-0 bottom-0 z-40
              bg-black/98 backdrop-blur-xl
              flex flex-col justify-center items-center gap-8
              lg:hidden
            "
            aria-label="Mobile navigation menu"
          >
            {/* Close button */}
            <button
              className="absolute top-5 right-6 p-2 text-white/60 hover:text-gold"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            {/* Logo in mobile menu */}
            <div className="flex justify-center mb-4">
              <Image
                src="/logo/anantam-logo.png"
                alt="ANANTAM by Adinath Buildwell"
                width={160}
                height={82}
                className="h-12 w-auto object-contain"
              />
            </div>

            {/* Nav links */}
            <nav className="flex flex-col items-center gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => scrollTo(link.href)}
                  className="font-playfair text-2xl text-white/70 hover:text-gold transition-colors duration-300"
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>

            {/* Mobile CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 flex flex-col items-center gap-3"
            >
              <a href={`tel:${SITE_CONFIG.phone}`} className="text-gold/70 text-sm tracking-wider">
                {SITE_CONFIG.phone}
              </a>
              <button
                onClick={() => scrollTo('#contact')}
                className="
                  px-8 py-3 border border-gold text-gold text-sm tracking-[0.15em] uppercase
                  font-dm-sans hover:bg-gold hover:text-black transition-all duration-300
                "
              >
                Schedule Visit
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
