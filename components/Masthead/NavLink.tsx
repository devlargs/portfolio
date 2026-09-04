import { Box } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FC } from 'react';

interface Props {
  href: string;
  label: string;
  active?: boolean;
}

const NavLink: FC<Props> = ({ href, label, active = false }) => (
  <Box
    as={NextLink}
    href={href}
    aria-current={active ? 'page' : undefined}
    position="relative"
    display="inline-block"
    whiteSpace="nowrap"
    fontFamily="var(--font-meta)"
    fontSize="var(--text-xs)"
    letterSpacing="0.06em"
    textTransform="lowercase"
    color={active ? 'var(--color-ink)' : 'var(--color-ink-2)'}
    py="var(--space-2xs)"
    transition="color var(--dur-1) var(--ease-out)"
    _hover={{ color: 'var(--color-accent)' }}
    sx={{
      /* drawn underline, not text-decoration — it can be animated on transform */
      '&::after': {
        content: '""',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: '2px',
        height: 'var(--rule-hair)',
        background: 'currentColor',
        transformOrigin: 'left center',
        transform: active ? 'scaleX(1)' : 'scaleX(0)',
        transition: 'transform var(--dur-2) var(--ease-out)',
      },
      '&:hover::after, &:focus-visible::after': { transform: 'scaleX(1)' },
    }}
  >
    {label}
  </Box>
);

export default NavLink;
