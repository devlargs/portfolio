import Image from 'next/image';
import { FC } from 'react';
import styles from './CapabilityItem.module.css';

interface Props {
  name: string;
  slug: string;
  blurDataURL?: string;
}

const CapabilityItem: FC<Props> = ({ name, slug, blurDataURL }) => (
  <li className={styles.item}>
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

    <span className={styles.name}>{name}</span>
  </li>
);

export default CapabilityItem;
