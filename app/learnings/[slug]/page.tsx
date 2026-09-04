import { findLearning, LEARNINGS } from '@constants/learnings';
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
      tags: [...learning.tags],
    },
    twitter: { title: learning.title, description: learning.summary },
  };
};

const Page = async ({ params }: Params): Promise<JSX.Element> => {
  const { slug } = await params;
  const learning = findLearning(slug);

  if (!learning) notFound();

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: learning.title,
    description: learning.summary,
    keywords: learning.tags.join(', '),
    url: `${SITE_URL}/learnings/${learning.slug}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/learnings/${learning.slug}` },
    author: { '@id': `${SITE_URL}/#person` },
    publisher: { '@id': `${SITE_URL}/#person` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <LearningView learning={learning} year={new Date().getFullYear()} />
    </>
  );
};

export default Page;
