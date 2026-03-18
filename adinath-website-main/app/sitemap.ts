// app/sitemap.ts
// Generates sitemap.xml at build time for SEO
// Access at: https://your-domain.com/sitemap.xml

import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://anantam.adinath.net.in'; // Update with real domain

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
