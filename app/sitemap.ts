import { LEARNINGS } from '@constants/learnings';
import { SITE_URL } from '@constants/profile';
import type { MetadataRoute } from 'next';

const latestEntry = (): string =>
  LEARNINGS.reduce((newest, learning) => {
    const stamp = learning.updated ?? learning.published;
    return stamp > newest ? stamp : newest;
  }, LEARNINGS[0]?.published ?? '');

const sitemap = (): MetadataRoute.Sitemap => {
  const newest = latestEntry();

  return [
    { url: SITE_URL, lastModified: newest, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/work`, lastModified: newest, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/learnings`, lastModified: newest, changeFrequency: 'weekly', priority: 0.7 },
    ...LEARNINGS.map((learning) => ({
      url: `${SITE_URL}/learnings/${learning.slug}`,
      lastModified: learning.updated ?? learning.published,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
};

export default sitemap;
