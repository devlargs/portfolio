'use client';

import { FC, KeyboardEvent, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import IconButton from './IconButton';
import styles from './Menu.module.css';

export interface MenuItem {
  label: string;
  onSelect: () => void;
}

interface Props {
  label: string;
  icon: ReactNode;
  items: readonly MenuItem[];
}

const Menu: FC<Props> = ({ label, icon, items }) => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const close = useCallback((focusTrigger: boolean): void => {
    setOpen(false);
    if (focusTrigger) triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent): void => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    return (): void => document.removeEventListener('mousedown', onPointerDown);
  }, [open]);

  const openAndFocusFirst = (): void => {
    setOpen(true);
    window.requestAnimationFrame(() => itemRefs.current[0]?.focus());
  };

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>): void => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      openAndFocusFirst();
    }
  };

  const onListKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Escape') {
      event.preventDefault();
      close(true);
      return;
    }

    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;

    event.preventDefault();
    const current = itemRefs.current.findIndex((el) => el === document.activeElement);
    const step = event.key === 'ArrowDown' ? 1 : -1;
    const next = (current + step + items.length) % items.length;
    itemRefs.current[next]?.focus();
  };

  return (
    <div ref={wrapRef} className={styles.wrap}>
      <IconButton
        ref={triggerRef}
        label={label}
        icon={icon}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(): void => setOpen((was) => !was)}
        onKeyDown={onTriggerKeyDown}
      />

      {open && (
        <div role="menu" aria-label={label} className={styles.list} onKeyDown={onListKeyDown}>
          {items.map((item, i) => (
            <button
              key={item.label}
              ref={(el): void => {
                itemRefs.current[i] = el;
              }}
              type="button"
              role="menuitem"
              className={styles.item}
              onClick={(): void => {
                close(false);
                item.onSelect();
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
