'use client';

import { SECTIONS } from '@constants/profile';
import useActiveSection from 'hooks/useActiveSection';
import { FC, useMemo } from 'react';
import styles from './SideRail.module.css';

/**
 * `rail-track` primitive, vertical form.
 * A numbered index of the document that marks where the reader is.
 * lg and up only: on narrow screens the masthead carries navigation alone.
 */
const SideRail: FC = () => {
  const ids = useMemo(() => SECTIONS.map((s) => s.id), []);
  const active = useActiveSection(ids);

  return (
    <nav aria-label="Document index" className={styles.rail}>
      <div className={styles.list}>
        {SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-current={active === section.id ? 'true' : undefined}
            className={styles.item}
          >
            <span className={styles.tick} aria-hidden="true" />
            <span>{section.index}</span>
            <span className={styles.label}>{section.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default SideRail;
