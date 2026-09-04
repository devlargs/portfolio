import { Box, Text } from '@chakra-ui/react';
import MoreLink from '@components/MoreLink';
import { IndexGroup } from '@components/WorkIndex';
import { COMPANY_CONTRIBUTIONS, PERSONAL_PROJECTS } from '@constants/portfolio';
import { FC } from 'react';

interface Props {
  brokenLinks?: string[];
}

/** Enough rows to show the shape of the work, short enough to stay a band. */
const PREVIEW_ROWS = 6;

const TOTAL = COMPANY_CONTRIBUTIONS.length + PERSONAL_PROJECTS.length;

const FEATURED = COMPANY_CONTRIBUTIONS.filter((project) => project.highlight).slice(0, PREVIEW_ROWS);

/**
 * The home page carries the pick, not the archive. The full run reads as a
 * document of its own and lives at /work.
 */
const WorkPreview: FC<Props> = ({ brokenLinks = [] }) => (
  <Box>
    <IndexGroup title="Longest engagements" projects={FEATURED} brokenSet={new Set(brokenLinks)} />

    <Box
      mt={{ base: 'var(--space-lg)', md: 'var(--space-xl)' }}
      display="flex"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="space-between"
      gap="var(--space-md)"
    >
      <MoreLink href="/work" label="Read the full index" />

      <Text
        as="span"
        fontFamily="var(--font-meta)"
        fontSize="var(--text-2xs)"
        letterSpacing="0.1em"
        textTransform="uppercase"
        color="var(--color-ink-3)"
      >
        {TOTAL} entries, {COMPANY_CONTRIBUTIONS.length} client and {PERSONAL_PROJECTS.length} personal
      </Text>
    </Box>
  </Box>
);

export default WorkPreview;
