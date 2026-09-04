import { findLearning, LEARNINGS, readingMinutes, wordCount } from '@constants/learnings';
import { PROFILE, SITE_URL } from '@constants/profile';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JSX } from 'react';
import LearningView from './LearningView';

export const dynamic = 'force-static';
export const dynamicParams = false;

interface Params {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = (): { slug: string }[] => LEARNINGS.map((learning) => ({ slug: learning.slug }));

export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
  const { slug } = await params;
  const learning = findLearning(slug);

  if (!learning) return {};

  const url = `/learnings/${learning.slug}`;

  return {
    title: learning.title,
    description: learning.summary,
    keywords: [...learning.tags],
    alternates: { canonical: url },
    openGraph: {
      title: learning.title,
      description: learning.summary,
      url,
      type: 'article',
      authors: [PROFILE.name],
      publishedTime: learning.published,
      modifiedTime: learning.updated ?? learning.published,
      tags: [...learning.tags],
    },
    twitter: { title: learning.title, description: learning.summary },
  };
};

const Page = async ({ params }: Params): Promise<JSX.Element> => {
  const { slug } = await params;
  const learning = findLearning(slug);

  if (!learning) notFound();

  const url = `${SITE_URL}/learnings/${learning.slug}`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `${url}#article`,
        headline: learning.title,
        description: learning.summary,
        keywords: learning.tags.join(', '),
        articleSection: 'Learnings',
        url,
        datePublished: learning.published,
        dateModified: learning.updated ?? learning.published,
        wordCount: wordCount(learning),
        timeRequired: `PT${readingMinutes(learning)}M`,
        inLanguage: 'en',
        isAccessibleForFree: true,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        author: { '@id': `${SITE_URL}/#person` },
        publisher: { '@id': `${SITE_URL}/#person` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: PROFILE.name, item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Learnings', item: `${SITE_URL}/learnings` },
          { '@type': 'ListItem', position: 3, name: learning.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <LearningView learning={learning} year={new Date().getFullYear()} />
    </>
  );
};

export default Page;
