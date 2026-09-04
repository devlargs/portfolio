import { LEARNINGS } from '@constants/learnings';
import type { Metadata } from 'next';
import { JSX } from 'react';
import LearningsView from './LearningsView';

export const dynamic = 'force-static';

const title = 'Learnings';
const description =
  'Short write-ups on the configuration, tooling and platform details that cost Ralph Largo an afternoon.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/learnings' },
  openGraph: { title, description, url: '/learnings', type: 'website' },
  twitter: { title, description },
};

const Page = (): JSX.Element => <LearningsView learnings={LEARNINGS} year={new Date().getFullYear()} />;

export default Page;
