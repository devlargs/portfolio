import Image from 'next/image';
import { FC } from 'react';
import styles from './Quote.module.css';

export interface Testimonial {
  name: string;
  position: string;
  company: string;
  testimonial: string;
  avatar: string;
  url: string;
}

interface Props {
  testimonial: Testimonial;
  blurDataURL?: string;
}

const Quote: FC<Props> = ({ testimonial, blurDataURL }) => (
  <figure className={styles.figure}>
    <figcaption className={styles.caption}>
      <div className={styles.avatar}>
        <Image
          src={testimonial.avatar}
          alt=""
          fill
          sizes="40px"
          style={{ objectFit: 'cover' }}
          placeholder={blurDataURL ? 'blur' : 'empty'}
          blurDataURL={blurDataURL}
        />
      </div>

      <div className={styles.who}>
        <a
          href={`https://linkedin.com/in/${testimonial.url}`}
          target="_blank"
          rel="noreferrer noopener"
          onPointerDown={(e): void => e.stopPropagation()}
          className={styles.name}
        >
          {testimonial.name}
        </a>
        <p className={styles.role}>
          {testimonial.position}, {testimonial.company}
        </p>
      </div>
    </figcaption>

    <blockquote className={styles.quote}>
      <p className={styles.text}>{testimonial.testimonial}</p>
    </blockquote>
  </figure>
);

export default Quote;
