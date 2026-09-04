'use client';

import { NAV_LINKS, PROFILE } from '@constants/profile';
import cx from '@utils/cx';
import NextLink from 'next/link';
import { FC, useRef } from 'react';
import styles from './Masthead.module.css';
import MenuToggle from './MenuToggle';
import MobileMenu from './MobileMenu';
import NavLink from './NavLink';
import ScrollProgress from './ScrollProgress';
import ThemeToggle from './ThemeToggle';
import useMenuDisclosure from './useMenuDisclosure';
import useNavActive from './useNavActive';

const MENU_ID = 'masthead-menu';

/**
 * N9 edge-aligned: wordmark hard left, destinations hard right, hairline under.
 * Below 48em the destinations collapse into a sheet, since four mono labels and
 * a toggle cannot hold their rhythm across a 320px bar.
 */
const Masthead: FC = () => {
  const isActive = useNavActive();
  const menuButton = useRef<HTMLButtonElement>(null);
  const { open, toggle, close } = useMenuDisclosure(menuButton);

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

        <div className={styles.actions}>
          <nav aria-label="Primary" className={styles.links}>
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} active={isActive(link)} />
            ))}
          </nav>

          <ThemeToggle />

          <MenuToggle ref={menuButton} open={open} controls={MENU_ID} onToggle={toggle} />
        </div>
      </div>

      <MobileMenu id={MENU_ID} open={open} links={NAV_LINKS} isActive={isActive} onDismiss={close} />
    </header>
  );
};

export default Masthead;
