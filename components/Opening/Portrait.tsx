import Image from 'next/image';
import { FC } from 'react';
import styles from './Portrait.module.css';

interface Props {
  src: string;
  alt: string;
  blurDataURL?: string;
}

const Portrait: FC<Props> = ({ src, alt, blurDataURL }) => (
  <div className={styles.frame}>
    <Image
      src={src}
      alt={alt}
      fill
      sizes="104px"
      style={{ objectFit: 'cover', objectPosition: 'center top' }}
      placeholder={blurDataURL ? 'blur' : 'empty'}
      blurDataURL={blurDataURL}
      priority
    />
  </div>
);

export default Portrait;
