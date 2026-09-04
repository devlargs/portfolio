'use client';

import { NavLinkItem } from '@constants/profile';
import cx from '@utils/cx';
import NextLink from 'next/link';
import { CSSProperties, FC, useEffect, useRef } from 'react';
import styles from './MobileMenu.module.css';

interface Props {
  id: string;
  open: boolean;
  links: readonly NavLinkItem[];
  isActive: (link: NavLinkItem) => boolean;
  onDismiss: () => void;
}

/**
 * An index of destinations dropped from under the masthead rule, not a
 * full-screen takeover: four entries do not earn one, and a takeover reads
 * nothing like the rest of the document.
 *
 * It stays mounted so the close can animate, and goes `inert` when shut, which
 * takes it out of the tab order and the accessibility tree at once.
 */
const MobileMenu: FC<Props> = ({ id, open, links, isActive, onDismiss }) => {
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (open) firstLink.current?.focus({ preventScroll: true });
  }, [open]);

  return (
    <div className={styles.root} data-open={open} inert={!open}>
      <button type="button" className={styles.scrim} tabIndex={-1} aria-hidden="true" onClick={onDismiss} />

      <nav id={id} aria-label="Primary" className={styles.panel}>
        <ul className={styles.list}>
          {links.map((link, index) => {
            const active = isActive(link);

            return (
              <li key={link.href} className={styles.row} style={{ '--i': index } as CSSProperties}>
                <NextLink
                  href={link.href}
                  ref={index === 0 ? firstLink : undefined}
                  aria-current={active ? 'page' : undefined}
                  className={cx(styles.link, active && styles.active)}
                  onClick={onDismiss}
                >
                  {/* The mask is the row itself; the label rises out from behind its own rule. */}
                  <span className={styles.mask}>
                    <span className={styles.label}>{link.label}</span>
                  </span>
                  <span className={styles.path} aria-hidden="true">
                    {link.href}
                  </span>
                </NextLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default MobileMenu;
