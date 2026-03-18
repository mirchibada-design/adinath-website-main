// app/robots.ts
// Generates robots.txt at build time
// Access at: https://your-domain.com/robots.txt

import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://anantam.adinath.net.in'; // Update with real domain

  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
