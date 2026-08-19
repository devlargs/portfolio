import { SITE_URL } from '@constants/profile';
import type { MetadataRoute } from 'next';

const robots = (): MetadataRoute.Robots => ({
  rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api/'] }],
  sitemap: `${SITE_URL}/sitemap.xml`,
  host: SITE_URL,
});

export default robots;
