'use client';

import cx from '@utils/cx';
import { FC, useEffect, useRef, useState } from 'react';
import styles from './CodeBlock.module.css';

interface Props {
  content: string;
  label?: string;
}

const RESET_AFTER = 1600;

const CodeBlock: FC<Props> = ({ content, label }) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => (): void => clearTimeout(timer.current), []);

  const copy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      timer.current = setTimeout(() => setCopied(false), RESET_AFTER);
    } catch {}
  };

  return (
    <div className={styles.block}>
      <div className={styles.head}>
        <span className={styles.label}>{label ?? 'snippet'}</span>

        <button type="button" onClick={copy} className={cx(styles.copy, copied && styles.copied)}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <pre className={styles.pre}>
        <code>{content}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
