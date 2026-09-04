import cx from '@utils/cx';
import Image from 'next/image';
import { CSSProperties, FC } from 'react';
import styles from './CapabilityItem.module.css';

interface Props {
  name: string;
  slug: string;
  blurDataURL?: string;
  /** Primary skills get the larger mark and full-strength ink. */
  emphasis?: boolean;
}

/**
 * A named capability, not a logo tile. The mark carries its own brand colour and
 * the name picks up the accent when the reader points at the row.
 */
const CapabilityItem: FC<Props> = ({ name, slug, blurDataURL, emphasis = false }) => (
  <li className={styles.item} style={{ '--mark-size': emphasis ? '20px' : '16px' } as CSSProperties}>
    <div className={styles.mark} aria-hidden="true">
      <Image
        src={`/images/${slug}.png`}
        alt=""
        fill
        sizes="20px"
        style={{ objectFit: 'contain' }}
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
      />
    </div>

    <span className={cx(styles.name, emphasis && styles.emphasis)}>{name}</span>
  </li>
);

export default CapabilityItem;
