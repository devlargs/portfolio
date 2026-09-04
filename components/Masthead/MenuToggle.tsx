'use client';

import cx from '@utils/cx';
import { FC, Ref } from 'react';
import styles from './MenuToggle.module.css';

interface Props {
  ref?: Ref<HTMLButtonElement>;
  open: boolean;
  /** id of the sheet this button discloses */
  controls: string;
  onToggle: () => void;
}

/**
 * Closed, the three rules sit ragged like a set text block. Open, they even out
 * and the outer two cross while the middle one leaves. The rules are drawn at
 * `--rule-thick`, so the mark belongs to the same rule language as the section
 * dividers rather than reading as an imported glyph.
 */
const MenuToggle: FC<Props> = ({ ref, open, controls, onToggle }) => (
  <button
    ref={ref}
    type="button"
    className={styles.toggle}
    aria-expanded={open}
    aria-controls={controls}
    aria-label={open ? 'Close menu' : 'Open menu'}
    data-open={open}
    onClick={onToggle}
  >
    <span className={styles.rules} aria-hidden="true">
      <span className={cx(styles.rule, styles.top)}>
        <span className={styles.ink} />
      </span>
      <span className={cx(styles.rule, styles.mid)}>
        <span className={styles.ink} />
      </span>
      <span className={cx(styles.rule, styles.bottom)}>
        <span className={styles.ink} />
      </span>
    </span>
  </button>
);

export default MenuToggle;
