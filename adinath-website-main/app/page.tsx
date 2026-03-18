// app/page.tsx
// ─────────────────────────────────────────────────────────────
// Main landing page — assembles all sections in order.
// Each section is a lazy-loaded component for performance.
// IntroAnimation is rendered as a fixed overlay on first visit.
// ─────────────────────────────────────────────────────────────

import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';

// IntroAnimation is a 'use client' component — all window/sessionStorage
// access is inside useEffect, so it is safe to import directly in a Server Component.
import IntroAnimation from '@/components/IntroAnimation';

// ─── Lazy-load all sections ───────────────────────────────────
// Each section is imported dynamically so only the visible
// section loads initially — keeps initial bundle small.

// Hero loads immediately (above the fold)
import Hero from '@/components/sections/Hero';

// All below-fold sections are lazy-loaded
const ScrollStory = dynamic(() => import('@/components/sections/ScrollStory'));
const ProjectOverview = dynamic(() => import('@/components/sections/ProjectOverview'));
const ProjectHighlights = dynamic(() => import('@/components/sections/ProjectHighlights'));
const BuildingShowcase = dynamic(() => import('@/components/sections/BuildingShowcase'));
const ExperienceVideo  = dynamic(() => import('@/components/sections/ExperienceVideo'));
const Amenities        = dynamic(() => import('@/components/sections/Amenities'));
const LocationAdvantage = dynamic(() => import('@/components/sections/LocationAdvantage'));
const FloorPlans = dynamic(() => import('@/components/sections/FloorPlans'));
const DeveloperTrust = dynamic(() => import('@/components/sections/DeveloperTrust'));
const LeadGeneration = dynamic(() => import('@/components/sections/LeadGeneration'));
const Footer = dynamic(() => import('@/components/sections/Footer'));

// ─── Page Component ───────────────────────────────────────────
export default function Home() {
  return (
    <>
      {/* Cinematic intro animation — fixed overlay, plays once per session */}
      <IntroAnimation />

    <main className="bg-black" id="main-content">
      {/* Fixed navigation bar */}
      <Navbar />

      {/* ── Section 1: Hero ──────────────────────────────── */}
      <Hero />

      {/* ── Section 2: Scroll Story / Building Reveal ───── */}
      <ScrollStory />

      {/* ── Section 3: Project Overview ──────────────────── */}
      <ProjectOverview />

      {/* ── Section 4: Project Highlights ────────────────── */}
      <ProjectHighlights />

      {/* ── Section 5: Building Showcase (Gallery) ───────── */}
      <BuildingShowcase />

      {/* ── Section 6: Experience Video (scroll-driven) ──── */}
      <ExperienceVideo />

      {/* ── Section 7: Amenities ─────────────────────────── */}
      <Amenities />

      {/* ── Section 8: Location Advantage ────────────────── */}
      <LocationAdvantage />

      {/* ── Section 9: Floor Plans ───────────────────────── */}
      <FloorPlans />

      {/* ── Section 10: Developer Trust ──────────────────── */}
      <DeveloperTrust />

      {/* ── Section 11: Lead Generation Form ─────────────── */}
      <LeadGeneration />

      {/* ── Section 11: Footer ───────────────────────────── */}
      <Footer />
    </main>
    </>
  );
}
