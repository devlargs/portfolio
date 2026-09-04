import { FC } from 'react';

type IconProps = { className?: string };

const base = {
  viewBox: '0 0 24 24',
  width: 16,
  height: 16,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  focusable: false,
  'aria-hidden': true,
} as const;

export const SunIcon: FC<IconProps> = ({ className }) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="4.25" />
    <path d="M12 2.5v2.25M12 19.25v2.25M4.22 4.22l1.6 1.6M18.18 18.18l1.6 1.6M2.5 12h2.25M19.25 12h2.25M4.22 19.78l1.6-1.6M18.18 5.82l1.6-1.6" />
  </svg>
);

export const MoonIcon: FC<IconProps> = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M20.5 14.4A8.6 8.6 0 0 1 9.6 3.5a8.6 8.6 0 1 0 10.9 10.9Z" />
  </svg>
);
