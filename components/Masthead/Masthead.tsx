'use client';

import { NAV_LINKS, PROFILE } from '@constants/profile';
import cx from '@utils/cx';
import NextLink from 'next/link';
import { FC } from 'react';
import styles from './Masthead.module.css';
import NavLink from './NavLink';
import ScrollProgress from './ScrollProgress';
import ThemeToggle from './ThemeToggle';
import useNavActive from './useNavActive';

/** N9 edge-aligned: wordmark hard left, destinations hard right, hairline under. */
const Masthead: FC = () => {
  const isActive = useNavActive();

  return (
    <header className={styles.header}>
      <ScrollProgress />

      <div className={cx('page-wrap', styles.bar)}>
        <NextLink href="/" className={styles.wordmark}>
          <span className={styles.wordmarkText}>
            <span className={styles.wordmarkFull}>{PROFILE.wordmark}</span>
            <span className={styles.wordmarkShort}>RL</span>
          </span>
          <span className={styles.dot} aria-hidden="true" />
        </NextLink>

        <nav aria-label="Primary" className={styles.nav}>
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} active={isActive(link)} />
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Masthead;
