'use client';

import cx from '@utils/cx';
import { CSSProperties, FC } from 'react';
import Quote, { Testimonial } from './Quote';
import QuoteNav from './QuoteNav';
import styles from './Recommendations.module.css';
import useCarousel, { SLIDE_MS } from './useCarousel';

interface Props {
  items: Testimonial[];
  imagePlaceholders: Record<string, string>;
}

const getPlaceholderKey = (avatar: string): string => {
  const [path] = avatar.split('.jpg');
  const parts = path.split('/');
  return parts[parts.length - 1];
};

const Recommendations: FC<Props> = ({ items, imagePlaceholders }) => {
  const total = items.length;
  const { index, goTo, next, prev, trackRef, slideRefs, containerHeight, isDragging, dragPercent, handlers } =
    useCarousel<HTMLDivElement>(total);

  return (
    <div className={styles.carousel}>
      <div className={styles.nav}>
        <QuoteNav total={total} index={index} onPrev={prev} onNext={next} onGoTo={goTo} />
      </div>

      <div
        ref={trackRef}
        className={styles.track}
        data-dragging={isDragging || undefined}
        style={
          {
            '--slide-ms': `${SLIDE_MS}ms`,
            height: containerHeight ? `${containerHeight}px` : 'auto',
          } as CSSProperties
        }
        {...handlers}
      >
        {items.map((testimonial, i) => {
          const isActive = i === index;

          return (
            <div
              key={testimonial.name}
              ref={(el: HTMLDivElement | null): void => {
                slideRefs.current[i] = el;
              }}
              className={cx(styles.slide, isActive && styles.active)}
              aria-hidden={!isActive}
              inert={!isActive}
              style={{ '--slide-offset': `${(i - index) * 100 + dragPercent}%` } as CSSProperties}
            >
              <Quote testimonial={testimonial} blurDataURL={imagePlaceholders[getPlaceholderKey(testimonial.avatar)]} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Recommendations;
