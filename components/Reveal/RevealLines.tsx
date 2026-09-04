'use client';

import useReveal from 'hooks/useReveal';
import { CSSProperties, ElementType, FC, ReactNode } from 'react';
import styles from './RevealLines.module.css';

interface Props {
  /** Copy authored as explicit lines so the mask lands on real line breaks. */
  lines: ReadonlyArray<ReactNode>;
  as?: ElementType;
  stagger?: number;
  fontSize?: string;
  lineHeight?: string | number;
  letterSpacing?: string;
  color?: string;
  maxW?: string;
}

/**
 * `line-reveal` primitive, multi-line form.
 * Each line sits in its own overflow-clipped row and travels up from below it,
 * so the copy unmasks rather than fading in as a block.
 */
const RevealLines: FC<Props> = ({
  lines,
  as: Tag = 'h2',
  stagger = 60,
  fontSize = 'var(--text-display-s)',
  lineHeight = 1.05,
  letterSpacing = '-0.02em',
  color = 'var(--color-ink)',
  maxW,
}) => {
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      className={styles.lines}
      data-revealed={revealed || undefined}
      style={
        {
          fontSize,
          letterSpacing,
          color,
          maxWidth: maxW,
          '--reveal-line-height': String(lineHeight),
        } as CSSProperties
      }
    >
      {lines.map((line, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <span key={i} className={styles.row}>
          <span className={styles.line} style={{ '--line-delay': `${i * stagger}ms` } as CSSProperties}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
};

export default RevealLines;
