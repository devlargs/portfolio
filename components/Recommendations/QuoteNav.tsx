import { FC } from 'react';
import styles from './QuoteNav.module.css';

interface Props {
  total: number;
  index: number;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (i: number) => void;
}

const QuoteNav: FC<Props> = ({ total, index, onPrev, onNext, onGoTo }) => (
  <div className={styles.nav}>
    <div className={styles.arrows}>
      <button type="button" onClick={onPrev} aria-label="Previous recommendation" className={styles.arrow}>
        <span aria-hidden="true">&#8592;</span>
      </button>
      <button type="button" onClick={onNext} aria-label="Next recommendation" className={styles.arrow}>
        <span aria-hidden="true">&#8594;</span>
      </button>
    </div>

    <span className={styles.counter} aria-live="polite">
      {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
    </span>

    <div className={styles.dots}>
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={(): void => onGoTo(i)}
          aria-label={`Go to recommendation ${i + 1}`}
          aria-current={i === index ? 'true' : undefined}
          className={styles.dot}
        >
          <span aria-hidden="true" />
        </button>
      ))}
    </div>
  </div>
);

export default QuoteNav;
