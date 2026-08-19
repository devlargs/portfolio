import { Box, Text } from '@chakra-ui/react';
import Reveal from '@components/Reveal';
import { Projects } from '@constants/portfolio';
import { FC } from 'react';
import IndexRow from './IndexRow';

interface Props {
  title: string;
  projects: Projects[];
  brokenSet: Set<string>;
}

/** Strips protocol, `www.` and any trailing path so the column stays scannable. */
const toDomain = (rawUrl: string): string => {
  try {
    return new URL(rawUrl.trim()).hostname.replace(/^www\./, '');
  } catch {
    return rawUrl.trim();
  }
};

const IndexGroup: FC<Props> = ({ title, projects, brokenSet }) => (
  <Box>
    <Box
      display="flex"
      alignItems="baseline"
      justifyContent="space-between"
      gap="var(--space-sm)"
      pb="var(--space-2xs)"
      mb="var(--space-2xs)"
      borderBottom="var(--rule-hair) solid var(--color-ink)"
    >
      <Text
        as="h3"
        fontFamily="var(--font-meta)"
        fontSize="var(--text-2xs)"
        fontWeight={500}
        letterSpacing="0.12em"
        textTransform="uppercase"
        color="var(--color-ink)"
        m="0"
      >
        {title}
      </Text>
      <Text
        as="span"
        fontFamily="var(--font-meta)"
        fontSize="var(--text-2xs)"
        color="var(--color-ink-3)"
        whiteSpace="nowrap"
      >
        {String(projects.length).padStart(2, '0')}
      </Text>
    </Box>

    {/* One reveal for the whole run. Staggering thirty rows individually reads
        as decoration rather than intent, and delays the last row too long. */}
    <Reveal distance={12}>
      <Box as="ul" listStyleType="none" m="0" p="0">
        {projects.map((project, i) => (
          <IndexRow
            key={project.link}
            index={String(i + 1).padStart(2, '0')}
            title={project.title}
            href={project.link.trim()}
            domain={toDomain(project.link)}
            highlight={project.highlight}
            unavailable={brokenSet.has(project.link.trim())}
          />
        ))}
      </Box>
    </Reveal>
  </Box>
);

export default IndexGroup;
