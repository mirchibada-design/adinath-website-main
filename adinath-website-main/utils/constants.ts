// utils/constants.ts
// ─────────────────────────────────────────────────────────────
// All site-wide copy, data, and configuration constants.
// Change text here — it automatically updates across all sections.
// ─────────────────────────────────────────────────────────────

// ─── Site Config ─────────────────────────────────────────────
export const SITE_CONFIG = {
  projectName: 'ANANTAM',
  developer: 'Adinath Buildwell',
  tagline: 'Where Infinity Meets Elegance',
  location: 'Jodhpur, Rajasthan',
  phone: '+91 98290 XXXXX', // Replace with actual phone
  email: 'info@adinath.net.in', // Replace with actual email
  website: 'https://adinath.net.in',
  address: 'Jodhpur, Rajasthan, India — 342001', // Replace with actual address
  // Social media links — replace with actual handles
  social: {
    instagram: 'https://instagram.com/adinathjpr',
    facebook: 'https://facebook.com/adinathbuilders',
    youtube: '#',
    linkedin: '#',
  },
};

// ─── Navigation Links ─────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Overview', href: '#overview' },
  { label: 'Highlights', href: '#highlights' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Floor Plans', href: '#floor-plans' },
  { label: 'Location', href: '#location' },
  { label: 'Contact', href: '#contact' },
];

// ─── Project Overview Stats ───────────────────────────────────
export const PROJECT_STATS = [
  { value: '2026', label: 'Possession Year' },
  { value: '3.5+', label: 'Acres of Land' },
  { value: '200+', label: 'Luxury Units' },
  { value: 'B+G+12', label: 'Floors' },
];

// ─── Project Highlights ───────────────────────────────────────
export const PROJECT_HIGHLIGHTS = [
  {
    id: 1,
    icon: 'building',
    title: 'Premium Architecture',
    description:
      "Designed by award-winning architects, ANANTAM's facade blends timeless craftsmanship with contemporary vision.",
  },
  {
    id: 2,
    icon: 'layout',
    title: 'Spacious Layouts',
    description:
      'Generously proportioned 2, 3, and 4 BHK residences with intelligent floor plans that maximize light and living space.',
  },
  {
    id: 3,
    icon: 'star',
    title: 'Luxury Amenities',
    description:
      'A curated collection of world-class amenities — rooftop infinity pool, clubhouse, spa, gym, and more.',
  },
  {
    id: 4,
    icon: 'map-pin',
    title: 'Prime Location',
    description:
      'Positioned at the heart of Jodhpur, offering seamless connectivity to business hubs, schools, and lifestyle destinations.',
  },
];

// ─── Amenities ────────────────────────────────────────────────
export const AMENITIES = [
  { icon: 'waves', label: 'Infinity Pool' },
  { icon: 'dumbbell', label: 'Fitness Center' },
  { icon: 'spa', label: 'Spa & Wellness' },
  { icon: 'trees', label: 'Landscaped Gardens' },
  { icon: 'shield', label: '24/7 Security' },
  { icon: 'car', label: 'Covered Parking' },
  { icon: 'users', label: 'Clubhouse' },
  { icon: 'gamepad', label: 'Kids Play Area' },
  { icon: 'wifi', label: 'High-Speed Internet' },
  { icon: 'coffee', label: 'Café Lounge' },
  { icon: 'video', label: 'Theatre Room' },
  { icon: 'zap', label: 'Power Backup' },
];

// ─── Location Highlights ──────────────────────────────────────
export const LOCATION_HIGHLIGHTS = [
  { place: 'Jodhpur Airport', distance: '12 min', direction: 'north' },
  { place: 'Jodhpur Railway Station', distance: '8 min', direction: 'east' },
  { place: 'AIIMS Jodhpur', distance: '10 min', direction: 'south' },
  { place: 'Mehrangarh Fort', distance: '15 min', direction: 'west' },
  { place: 'MBM Engineering College', distance: '5 min', direction: 'nearby' },
  { place: 'High Court of Rajasthan', distance: '7 min', direction: 'nearby' },
];

// ─── Floor Plans ─────────────────────────────────────────────
export const FLOOR_PLANS = [
  {
    id: 1,
    type: '2 BHK',
    area: '1,050 sq.ft.',
    price: '₹ 75 Lacs onwards',
    badge: 'Most Popular',
  },
  {
    id: 2,
    type: '3 BHK',
    area: '1,450 sq.ft.',
    price: '₹ 1.05 Cr onwards',
    badge: 'Premium',
  },
  {
    id: 3,
    type: '4 BHK',
    area: '2,100 sq.ft.',
    price: '₹ 1.65 Cr onwards',
    badge: 'Luxury',
  },
  {
    id: 4,
    type: '4 BHK Penthouse',
    area: '3,200 sq.ft.',
    price: 'On Request',
    badge: 'Ultra Luxury',
  },
];

// ─── Developer Trust Stats ────────────────────────────────────
export const DEVELOPER_STATS = [
  { value: '25+', label: 'Years of Excellence' },
  { value: '50+', label: 'Projects Delivered' },
  { value: '5000+', label: 'Happy Families' },
  { value: '100%', label: 'On-Time Delivery' },
];

// ─── Gallery Placeholder Labels ───────────────────────────────
export const GALLERY_IMAGES = [
  { id: 1, label: 'Exterior Facade', aspect: 'landscape' },
  { id: 2, label: 'Grand Lobby', aspect: 'portrait' },
  { id: 3, label: 'Master Bedroom', aspect: 'landscape' },
  { id: 4, label: 'Infinity Pool', aspect: 'landscape' },
  { id: 5, label: 'Living Room', aspect: 'portrait' },
  { id: 6, label: 'Kitchen', aspect: 'landscape' },
];
