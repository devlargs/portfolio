import { LEARNINGS } from '@constants/learnings';
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

const Page = (): JSX.Element => <LearningsView learnings={LEARNINGS} year={new Date().getFullYear()} />;

export default Page;
