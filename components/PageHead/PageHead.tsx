import Reveal from '@components/Reveal';
import cx from '@utils/cx';
import NextLink from 'next/link';
import { FC, ReactNode } from 'react';
import styles from './PageHead.module.css';

interface Props {
  /** Small uppercase kicker above the rule. */
  eyebrow?: string;
  title: string;
  lede?: string;
  /** Right-hand meta on the kicker line: counts, dates, tags. */
  meta?: ReactNode;
  backHref?: string;
  backLabel?: string;
}

/**
 * The `<h1>` band for a document that is not the home page. Same rule-above,
 * heading-below rhythm as SectionHead, one level up in the outline.
 */
const PageHead: FC<Props> = ({ eyebrow, title, lede, meta, backHref = '/', backLabel = 'Home' }) => (
  <div className={cx('page-wrap', styles.band)}>
    <Reveal distance={8}>
      <div className={styles.kicker}>
        <div className={styles.trail}>
          <NextLink href={backHref} className={styles.back}>
            <span aria-hidden="true">&#8592;</span>
            {backLabel}
          </NextLink>

          {eyebrow && (
            <>
              <span aria-hidden="true">/</span>
              <span>{eyebrow}</span>
            </>
          )}
        </div>

        {meta && <span>{meta}</span>}
      </div>
    </Reveal>

    <div className={styles.rule} />

    <Reveal distance={12}>
      <h1 className={styles.title}>{title}</h1>
    </Reveal>

    {lede && (
      <Reveal delay={80} distance={12}>
        <p className={styles.lede}>{lede}</p>
      </Reveal>
    )}
  </div>
);

export default PageHead;
