'use client';

import Reveal from '@components/Reveal';
import { SectionLede, SectionRule, SectionTitle } from '@components/Section';
import { FC } from 'react';
import AboutProse from './AboutProse';
import AboutRail from './AboutRail';
import styles from './AboutMe.module.css';

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
  <div>
    <SectionRule />

    <div className={styles.grid}>
      <div className={styles.column}>
        <SectionTitle id={id}>{title}</SectionTitle>
        {lede && <SectionLede>{lede}</SectionLede>}

        <div className={styles.prose}>
          <AboutProse />
        </div>
      </div>

      <Reveal delay={160}>
        <AboutRail />
      </Reveal>
    </div>
  </div>
);

export default AboutMe;
