import { Box } from '@chakra-ui/react';
import MoreLink from '@components/MoreLink';
import PageHead from '@components/PageHead';
import { Learning, readingMinutes } from '@constants/learnings';
import { FC } from 'react';
import LearningBody from './LearningBody';
import TagList from './TagList';

interface Props {
  learning: Learning;
}

const LearningArticle: FC<Props> = ({ learning }) => (
  <Box as="article">
    <PageHead
      backHref="/learnings"
      backLabel="Learnings"
      meta={`${readingMinutes(learning)} min read`}
      title={learning.title}
      lede={learning.summary}
    />

    <Box
      maxW="var(--page-max)"
      mx="auto"
      px="var(--page-gutter)"
      pb={{ base: 'var(--space-2xl)', md: 'var(--space-3xl)' }}
    >
      <Box maxW="var(--measure-wide)" mb={{ base: 'var(--space-lg)', md: 'var(--space-xl)' }}>
        <TagList tags={learning.tags} />
      </Box>

      <LearningBody body={learning.body} />

      <Box
        maxW="var(--measure-wide)"
        mt={{ base: 'var(--space-2xl)', md: 'var(--space-3xl)' }}
        pt="var(--space-lg)"
        borderTop="var(--rule-hair) solid var(--color-rule)"
      >
        <MoreLink href="/learnings" label="More things I learned" />
      </Box>
    </Box>
  </Box>
);

export default LearningArticle;
