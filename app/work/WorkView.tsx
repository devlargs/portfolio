import { Box } from '@chakra-ui/react';
import MoreLink from '@components/MoreLink';
import PageHead from '@components/PageHead';
import PageShell from '@components/PageShell';
import WorkIndex from '@components/WorkIndex';
import { COMPANY_CONTRIBUTIONS, PERSONAL_PROJECTS } from '@constants/portfolio';
import { FC } from 'react';

interface Props {
  brokenLinks: string[];
  year: number;
}

const TOTAL = COMPANY_CONTRIBUTIONS.length + PERSONAL_PROJECTS.length;

const WorkView: FC<Props> = ({ brokenLinks, year }) => (
  <PageShell year={year}>
    <PageHead
      eyebrow="Work"
      title="Everything I have shipped"
      lede="Products and sites I have contributed to, plus things I built for myself. Marked entries are the engagements I spent the most time inside. Links are checked when this page is built, so a dead one is labelled rather than left to fail."
      meta={`${TOTAL} entries`}
    />

    <Box
      maxW="var(--page-max)"
      mx="auto"
      px="var(--page-gutter)"
      pb={{ base: 'var(--space-2xl)', md: 'var(--space-3xl)' }}
    >
      <WorkIndex brokenLinks={brokenLinks} />

      <Box
        mt={{ base: 'var(--space-2xl)', md: 'var(--space-3xl)' }}
        pt="var(--space-lg)"
        borderTop="var(--rule-hair) solid var(--color-rule)"
      >
        <MoreLink href="/#contact" label="Start a conversation" />
      </Box>
    </Box>
  </PageShell>
);

export default WorkView;
