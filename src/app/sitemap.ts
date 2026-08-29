import type { MetadataRoute } from 'next';
import siteData from '@/content/site.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${siteData.domain}`;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/politica-de-privacidade`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
