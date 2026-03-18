// app/layout.tsx
// ─────────────────────────────────────────────────────────────
// Root layout — loads fonts, injects SEO metadata, wraps all pages
// This file runs on every route. Keep it lean.
// ─────────────────────────────────────────────────────────────

import type { Metadata, Viewport } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';

// ─── Google Fonts ─────────────────────────────────────────────
// Playfair Display: Elegant serif for all headings
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],  // Playfair Display: no 300 weight available
  variable: '--font-playfair',
  display: 'swap', // Prevents invisible text during load
});

// DM Sans: Modern, clean sans-serif for body and UI
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
});

// ─── SEO Metadata ─────────────────────────────────────────────
// Optimized for: "luxury apartments Jodhpur", "premium flats Rajasthan"
export const metadata: Metadata = {
  title: 'ANANTAM by Adinath Buildwell | Luxury Apartments in Jodhpur',
  description:
    'Discover ANANTAM — a landmark luxury residential project by Adinath Buildwell in Jodhpur, Rajasthan. Premium apartments featuring world-class architecture, spacious layouts, and unmatched amenities.',
  keywords: [
    'luxury apartments Jodhpur',
    'premium flats Jodhpur',
    'real estate Rajasthan',
    'Adinath Buildwell',
    'Anantam Jodhpur',
    'luxury residential Jodhpur',
    'new flats Jodhpur',
    '3BHK Jodhpur',
    'premium real estate Rajasthan',
  ],
  authors: [{ name: 'Adinath Buildwell', url: 'https://adinath.net.in' }],
  creator: 'Adinath Buildwell',
  publisher: 'Adinath Buildwell',

  // Open Graph — controls how links look when shared on WhatsApp, LinkedIn, Facebook
  openGraph: {
    title: 'ANANTAM by Adinath Buildwell | Luxury Apartments in Jodhpur',
    description:
      'Luxury living redefined. ANANTAM offers premium apartments in the heart of Jodhpur, Rajasthan.',
    url: 'https://anantam.adinath.net.in', // Update with your actual URL
    siteName: 'ANANTAM by Adinath Buildwell',
    images: [
      {
        url: '/og-image.jpg', // Add your OG image to /public/og-image.jpg
        width: 1200,
        height: 630,
        alt: 'ANANTAM Luxury Apartments Jodhpur',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'ANANTAM by Adinath Buildwell | Luxury Apartments in Jodhpur',
    description: 'Luxury living redefined in the heart of Jodhpur.',
    images: ['/og-image.jpg'],
  },

  // Robots directive
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Canonical URL (update with real domain)
  alternates: {
    canonical: 'https://anantam.adinath.net.in',
  },
};

// ─── Viewport Settings ────────────────────────────────────────
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5, // Allow pinch-zoom for accessibility
  themeColor: '#000000',
};

// ─── Structured Data (JSON-LD) ────────────────────────────────
// Helps Google understand the business/property — improves search rankings
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateListing',
  name: 'ANANTAM by Adinath Buildwell',
  description:
    'Luxury residential apartments by Adinath Buildwell in Jodhpur, Rajasthan, India.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Jodhpur',
    addressRegion: 'Rajasthan',
    addressCountry: 'IN',
  },
  brand: {
    '@type': 'Organization',
    name: 'Adinath Buildwell',
    url: 'https://adinath.net.in',
  },
};

// ─── Root Layout Component ────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-black text-white font-dm-sans antialiased overflow-x-hidden">
        {/* Main content — all sections render here */}
        {children}
      </body>
    </html>
  );
}
