import { Box, Text } from '@chakra-ui/react';
import Reveal from '@components/Reveal';
import { toKebabCase } from 'largs-utils';
import { FC } from 'react';
import CapabilityItem from './CapabilityItem';

interface Props {
  title: string;
  skills: readonly string[];
  imagePlaceholders: Record<string, string>;
  emphasis?: boolean;
}

const CapabilityGroup: FC<Props> = ({ title, skills, imagePlaceholders, emphasis = false }) => (
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
        {String(skills.length).padStart(2, '0')}
      </Text>
    </Box>

    <Reveal distance={12}>
      <Box
        as="ul"
        listStyleType="none"
        m="0"
        p="0"
        display="grid"
        columnGap="var(--space-md)"
        gridTemplateColumns={{
          base: 'repeat(2, minmax(0, 1fr))',
          sm: 'repeat(3, minmax(0, 1fr))',
          md: `repeat(${emphasis ? 4 : 5}, minmax(0, 1fr))`,
        }}
      >
        {skills.map((skill) => {
          const slug = toKebabCase(skill);
          return (
            <CapabilityItem
              key={skill}
              name={skill}
              slug={slug ?? ''}
              blurDataURL={slug ? imagePlaceholders[slug] : undefined}
              emphasis={emphasis}
            />
          );
        })}
      </Box>
    </Reveal>
  </Box>
);

export default CapabilityGroup;
