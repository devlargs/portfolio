import { LEARNINGS } from '@constants/learnings';
import { SITE_URL } from '@constants/profile';
import type { MetadataRoute } from 'next';

const sitemap = (): MetadataRoute.Sitemap => {
  const now = new Date();

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/work`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/learnings`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    ...LEARNINGS.map((learning) => ({
      url: `${SITE_URL}/learnings/${learning.slug}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
};

export default sitemap;
