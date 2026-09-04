'use client';

import { FC, KeyboardEvent, ReactNode, RefObject, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './AlertDialog.module.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer: ReactNode;
  initialFocusRef?: RefObject<HTMLElement | null>;
}

const FOCUSABLE = 'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const AlertDialog: FC<Props> = ({ isOpen, onClose, title, children, footer, initialFocusRef }) => {
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    body.style.overflow = 'hidden';
    window.requestAnimationFrame(() => (initialFocusRef?.current ?? dialogRef.current)?.focus());

    return (): void => {
      body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [isOpen, initialFocusRef]);

  if (!mounted || !isOpen) return null;

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      onClose();
      return;
    }

    if (event.key !== 'Tab') return;

    const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return createPortal(
    <>
      <div className={styles.overlay} />
      <div className={styles.container} onMouseDown={onClose}>
        <div
          ref={dialogRef}
          role="alertdialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          className={styles.dialog}
          onMouseDown={(event): void => event.stopPropagation()}
          onKeyDown={onKeyDown}
        >
          <header id={titleId} className={styles.header}>
            {title}
          </header>
          <div className={styles.body}>{children}</div>
          <div className={styles.footer}>{footer}</div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default AlertDialog;
