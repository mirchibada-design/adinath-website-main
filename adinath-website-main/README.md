# ANANTAM by Adinath Buildwell — Website

A production-ready, luxury real estate landing page built with **Next.js 15**, **TailwindCSS**, **Framer Motion**, and **GSAP**.

---

## Quick Start

### Step 1: Install Node.js

Download and install Node.js (v20+) from: **https://nodejs.org**

To check if it's already installed, open your terminal and type:
```
node --version
```

---

### Step 2: Open the Project

Open your terminal (Command Prompt or Windows Terminal on Windows).

Navigate to this project folder:
```
cd "E:\Adinath Website VC"
```

---

### Step 3: Install Dependencies

Run this command once to install all required packages:
```
npm install
```

This will create a `node_modules/` folder. It may take 1–2 minutes.

---

### Step 4: Run the Development Server

```
npm run dev
```

Open your browser and go to: **http://localhost:3000**

You should see the ANANTAM website running locally.

---

## Project Structure

```
Adinath Website VC/
│
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout: fonts, SEO metadata
│   ├── page.tsx                # Main page (assembles all sections)
│   ├── globals.css             # Global styles, CSS variables
│   ├── sitemap.ts              # Auto-generates sitemap.xml
│   └── robots.ts               # Auto-generates robots.txt
│
├── components/
│   ├── layout/
│   │   └── Navbar.tsx          # Fixed top navigation bar
│   ├── sections/               # Each section of the landing page
│   │   ├── Hero.tsx            # Section 1: Full-screen hero
│   │   ├── ScrollStory.tsx     # Section 2: GSAP scroll narrative
│   │   ├── ProjectOverview.tsx # Section 3: Stats + description
│   │   ├── ProjectHighlights.tsx # Section 4: Feature cards
│   │   ├── BuildingShowcase.tsx  # Section 5: Horizontal gallery
│   │   ├── Amenities.tsx       # Section 6: Amenities icon grid
│   │   ├── LocationAdvantage.tsx # Section 7: Map + landmarks
│   │   ├── FloorPlans.tsx      # Section 8: Floor plan viewer
│   │   ├── DeveloperTrust.tsx  # Section 9: Developer credibility
│   │   ├── LeadGeneration.tsx  # Section 10: Contact/enquiry form
│   │   └── Footer.tsx          # Section 11: Footer
│   └── ui/
│       ├── Button.tsx          # Reusable button (gold/outline/ghost)
│       ├── SectionHeader.tsx   # Reusable section heading component
│       └── GoldDivider.tsx     # Gold horizontal rule
│
├── hooks/
│   └── useScrollAnimation.ts  # GSAP ScrollTrigger hook
│
├── utils/
│   ├── constants.ts           # All text, data, and config (edit here)
│   └── cn.ts                  # Tailwind class merger utility
│
├── public/                    # Static files (add images here)
│   └── images/                # Create this folder for your images
│
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## How to Update Content

All text, data, and configuration is centralized in **one file**:

```
utils/constants.ts
```

Open this file to update:
- Project name and tagline
- Contact details (phone, email, address)
- Social media links
- Stats (years of experience, projects, families)
- Location highlights
- Floor plan types, areas, and prices
- Amenities list

---

## How to Add Real Images

### Step 1: Create the images folder
```
public/images/
```

### Step 2: Add your images
Place images inside `public/images/`. Recommended names:
```
public/images/
├── hero-bg.jpg          # Hero section background (1920×1080)
├── developer.jpg        # Developer section photo
├── gallery-1.jpg        # Gallery image 1
├── gallery-2.jpg        # Gallery image 2
├── gallery-3.jpg        # Gallery image 3
├── gallery-4.jpg        # Gallery image 4
├── gallery-5.jpg        # Gallery image 5
├── gallery-6.jpg        # Gallery image 6
├── floor-plan-1.png     # 2 BHK floor plan
├── floor-plan-2.png     # 3 BHK floor plan
├── floor-plan-3.png     # 4 BHK floor plan
├── floor-plan-4.png     # Penthouse floor plan
├── og-image.jpg         # Social share image (1200×630)
└── logo.png             # Adinath Buildwell logo
```

### Step 3: Replace placeholders
Search for `<!-- Replace with:` comments in the component files.
Each placeholder has a ready-to-use `<Image />` code snippet commented out.

Example in `Hero.tsx`:
```tsx
// Replace this:
<div className="absolute inset-0 bg-gradient-to-br from-stone-950 ..."/>

// With this:
<Image src="/images/hero-bg.jpg" fill alt="ANANTAM exterior" className="object-cover" priority />
```

### Step 4: Add your logo
In `Navbar.tsx` and `Footer.tsx`, replace the text logo:
```tsx
// Replace:
<span className="font-playfair text-xl ...">ANANTAM</span>

// With:
<Image src="/images/logo.png" width={140} height={40} alt="ANANTAM logo" />
```

---

## Form Integration

The enquiry form in `LeadGeneration.tsx` currently simulates a submission.

### Connect to a real backend or email service:

**Option A: WhatsApp/Email notification (easiest)**
Use a service like Formspree:
1. Go to https://formspree.io and create a free account
2. Create a form and get your Form ID (e.g. `xyzabc`)
3. In `LeadGeneration.tsx`, replace the simulated submission:
```tsx
// Replace this:
await new Promise((resolve) => setTimeout(resolve, 1500));

// With this:
const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});
if (!res.ok) throw new Error('Submission failed');
```

**Option B: Build a custom API route**
Create `app/api/lead/route.ts` with your email or CRM integration.

---

## Map Integration

To show a real Google Maps embed in the Location section:

1. Go to https://maps.google.com
2. Search for the project address
3. Click **Share → Embed a map → Copy HTML**
4. In `LocationAdvantage.tsx`, replace `<MapVisualization />` with:
```tsx
<iframe
  src="YOUR_GOOGLE_MAPS_EMBED_URL"
  width="100%"
  height="100%"
  className="absolute inset-0"
  title="ANANTAM Location Map"
  loading="lazy"
/>
```

---

## Update SEO Information

In `app/layout.tsx`, update the `metadata` object:
- Change the `title` and `description`
- Update `keywords` with relevant search terms
- Update the `openGraph.url` and `alternates.canonical` with your real domain
- Add the real `og-image.jpg` (1200×630 px) to `public/`

---

## Deploy to Vercel (Free & Recommended)

### Step 1: Push code to GitHub
1. Create a GitHub account at https://github.com
2. Create a new repository (e.g. `anantam-website`)
3. Upload your project files

### Step 2: Deploy on Vercel
1. Go to https://vercel.com and sign in with GitHub
2. Click **Add New Project**
3. Select your GitHub repository
4. Vercel auto-detects Next.js — click **Deploy**
5. Your site goes live in ~60 seconds

### Step 3: Add your custom domain
1. In Vercel dashboard → your project → **Settings → Domains**
2. Add your domain (e.g. `anantam.adinath.net.in`)
3. Update DNS records as instructed by Vercel

---

## Build for Production (Manual)

To build a production-optimized bundle:
```
npm run build
npm start
```

---

## Common Commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start local development server |
| `npm run build` | Build for production |
| `npm start` | Start production server locally |
| `npm run lint` | Check for code errors |

---

## Technology Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 15** | React framework with App Router, SSR, image optimization |
| **TailwindCSS** | Utility-first CSS framework |
| **Framer Motion** | Smooth animations and transitions |
| **GSAP + ScrollTrigger** | Advanced scroll-driven animations |
| **Lucide React** | Consistent, lightweight icon set |
| **React Hook Form** | Performant, accessible form management |
| **Zod** | Type-safe form validation |
| **TypeScript** | Type safety for maintainable code |

---

## Performance Notes

- Images should be **WebP format** for best performance
- Hero image should be `1920×1080` and under **200KB** (compress at https://squoosh.app)
- Gallery images should be under **100KB** each
- The site uses **lazy loading** — only the hero section loads on first visit

---

## Browser Support

Chrome, Firefox, Safari, Edge (all modern versions)
Mobile: iOS Safari, Android Chrome

---

## Need Help?

For any questions about the code or making changes:
- Email the development team with the specific file name and line number
- Use the comments inside each file as a guide — every placeholder has clear instructions

---

*Built with care for ANANTAM by Adinath Buildwell, Jodhpur.*
