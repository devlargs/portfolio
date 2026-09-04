import { LEARNINGS } from '@constants/learnings';
import { PROFILE, SITE_URL } from '@constants/profile';
import type { Metadata } from 'next';
import { JSX } from 'react';
import LearningsView from './LearningsView';

export const dynamic = 'force-static';

const title = 'Learnings';
const description =
  'A notebook Ralph Largo keeps for himself: short write-ups on the configuration, tooling and platform details that cost him an afternoon. Anyone is welcome to read along.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/learnings' },
  openGraph: { title, description, url: '/learnings', type: 'website' },
  twitter: { title, description },
};

/* A CollectionPage plus the ordered list of what is in it. Without the ItemList
   the index reads to a crawler as prose that happens to contain links. */
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/learnings#page`,
      url: `${SITE_URL}/learnings`,
      name: title,
      description,
      inLanguage: 'en',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#person` },
      author: { '@id': `${SITE_URL}/#person` },
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/learnings#list`,
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      numberOfItems: LEARNINGS.length,
      itemListElement: LEARNINGS.map((learning, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: learning.title,
        url: `${SITE_URL}/learnings/${learning.slug}`,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/learnings#breadcrumbs`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: PROFILE.name, item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: title, item: `${SITE_URL}/learnings` },
      ],
    },
  ],
};

const Page = (): JSX.Element => (
  <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <LearningsView learnings={LEARNINGS} year={new Date().getFullYear()} />
  </>
);

export default Page;
