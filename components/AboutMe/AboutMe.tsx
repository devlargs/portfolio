'use client';

import { Box } from '@chakra-ui/react';
import Reveal from '@components/Reveal';
import { SectionLede, SectionRule, SectionTitle } from '@components/Section';
import { FC } from 'react';
import AboutProse from './AboutProse';
import AboutRail from './AboutRail';

interface Props {
  id: string;
  title: string;
  lede?: string;
}

/**
 * Broadsheet body: one reading column at measure, annotations in the margin.
 *
 * The section head is composed here rather than sitting above as a full-width
 * SectionHead, so the margin column starts on the same grid row as the heading.
 * Rendered the other way round the rail can only begin below the lede, which
 * leaves a block of dead space at the top of the column.
 *
 * Collapses to a single column below md, notes last.
 */
const AboutMe: FC<Props> = ({ id, title, lede }) => (
  <Box>
    <SectionRule />

    <Box
      display="grid"
      gap={{ base: 'var(--space-xl)', md: 'var(--space-2xl)' }}
      gridTemplateColumns={{ base: 'minmax(0, 1fr)', md: 'minmax(0, 1.6fr) minmax(0, 1fr)' }}
      alignItems="start"
    >
      <Box minW="0">
        <SectionTitle id={id}>{title}</SectionTitle>
        {lede && <SectionLede>{lede}</SectionLede>}

        <Box mt={{ base: 'var(--space-lg)', md: 'var(--space-xl)' }}>
          <AboutProse />
        </Box>
      </Box>

      <Reveal delay={160}>
        <AboutRail />
      </Reveal>
    </Box>
  </Box>
);

export default AboutMe;
