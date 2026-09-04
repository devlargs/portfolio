'use client';

import cx from '@utils/cx';
import { createContext, FC, PropsWithChildren, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { CheckIcon, InfoIcon, WarningIcon } from './icons';
import styles from './Toast.module.css';

type Status = 'error' | 'success' | 'info';

export interface ToastOptions {
  title: string;
  description?: string;
  status?: Status;
  position?: 'bottom';
}

interface Toast extends ToastOptions {
  id: number;
}

const DURATION = 5000;

const ICONS: Record<Status, FC> = {
  error: WarningIcon,
  success: CheckIcon,
  info: InfoIcon,
};

const ToastContext = createContext<((options: ToastOptions) => void) | null>(null);

export const useToast = (): ((options: ToastOptions) => void) => {
  const push = useContext(ToastContext);
  if (!push) throw new Error('useToast must be used inside ToastProvider');
  return push;
};

const ToastProvider: FC<PropsWithChildren> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(0);
  const timers = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  useEffect(
    () => (): void => {
      timers.current.forEach(clearTimeout);
    },
    []
  );

  const push = useCallback((options: ToastOptions): void => {
    const id = (nextId.current += 1);
    setToasts((current) => [...current, { ...options, id }]);
    timers.current.push(setTimeout(() => setToasts((current) => current.filter((t) => t.id !== id)), DURATION));
  }, []);

  return (
    <ToastContext.Provider value={push}>
      {children}

      <div className={styles.viewport}>
        {toasts.map((toast) => {
          const status = toast.status ?? 'info';
          const Icon = ICONS[status];

          return (
            <div key={toast.id} role="status" aria-live="polite" className={cx(styles.toast, styles[status])}>
              <span className={styles.icon} aria-hidden="true">
                <Icon />
              </span>
              <div className={styles.content}>
                <span className={styles.title}>{toast.title}</span>
                {toast.description && <span className={styles.description}>{toast.description}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
