import { LEARNINGS } from '@constants/learnings';
import { SITE_URL } from '@constants/profile';
import type { MetadataRoute } from 'next';

/** The newest entry's own date, which is also the last time the index changed. */
const latestEntry = (): string =>
  LEARNINGS.reduce((newest, learning) => {
    const stamp = learning.updated ?? learning.published;
    return stamp > newest ? stamp : newest;
  }, LEARNINGS[0]?.published ?? '');

/* Entry dates come from the entries, not from the clock. A build-time stamp on
   every URL tells a crawler the whole site changed on every deploy, which is
   both untrue and a reason to stop trusting the file. */
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
