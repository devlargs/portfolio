import { COMPANY_CONTRIBUTIONS, PERSONAL_PROJECTS } from '@constants/portfolio';
import { PROFILE, SITE_URL } from '@constants/profile';
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

const ALL_WORK = [...COMPANY_CONTRIBUTIONS, ...PERSONAL_PROJECTS];

/* Every entry carries its outbound URL, which is what makes this an index a
   crawler can follow rather than a list of names. */
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/work#page`,
      url: `${SITE_URL}/work`,
      name: 'Work',
      description,
      inLanguage: 'en',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#person` },
      author: { '@id': `${SITE_URL}/#person` },
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/work#list`,
      numberOfItems: ALL_WORK.length,
      itemListElement: ALL_WORK.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: project.title,
        url: project.link,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/work#breadcrumbs`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: PROFILE.name, item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Work', item: `${SITE_URL}/work` },
      ],
    },
  ],
};

const Page = async (): Promise<JSX.Element> => {
  const brokenLinks = await getBrokenLinks();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <WorkView brokenLinks={brokenLinks} year={new Date().getFullYear()} />
    </>
  );
};

export default Page;
