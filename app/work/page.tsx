import { COMPANY_CONTRIBUTIONS, PERSONAL_PROJECTS } from '@constants/portfolio';
import { getBrokenLinks } from '@lib/siteData';
import type { Metadata } from 'next';
import { JSX } from 'react';
import WorkView from './WorkView';

export const dynamic = 'force-static';

const description = `The full index of ${
  COMPANY_CONTRIBUTIONS.length + PERSONAL_PROJECTS.length
} products, sites and side projects Ralph Largo has built or contributed to.`;

export const metadata: Metadata = {
  title: 'Work',
  description,
  alternates: { canonical: '/work' },
  openGraph: { title: 'Work', description, url: '/work', type: 'website' },
  twitter: { title: 'Work', description },
};

const Page = async (): Promise<JSX.Element> => {
  const brokenLinks = await getBrokenLinks();

  return <WorkView brokenLinks={brokenLinks} year={new Date().getFullYear()} />;
};

export default Page;
