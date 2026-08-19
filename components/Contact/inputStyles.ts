import { SystemStyleObject } from '@chakra-ui/react';

/**
 * Underline-first fields. A broadsheet form is a ruled line to write on, not a
 * rounded box, so the only structural mark is the baseline rule.
 */
export const getInputStyles = (hasError: boolean): SystemStyleObject => ({
  bg: 'transparent',
  border: 'none',
  borderRadius: 'var(--radius-none)',
  borderBottom: 'var(--rule-hair) solid',
  borderColor: hasError ? 'var(--color-danger)' : 'var(--color-rule-strong)',
  color: 'var(--color-ink)',
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--text-md)',
  px: '0',
  py: 'var(--space-2xs)',
  h: 'auto',
  transition: 'border-color var(--dur-2) var(--ease-out), background var(--dur-2) var(--ease-out)',
  _placeholder: { color: 'var(--color-ink-3)' },
  _hover: {
    borderColor: hasError ? 'var(--color-danger)' : 'var(--color-ink-2)',
  },
  _focusVisible: {
    borderColor: hasError ? 'var(--color-danger)' : 'var(--color-accent)',
    borderBottomWidth: 'var(--rule-thick)',
    bg: hasError ? 'var(--color-danger-soft)' : 'var(--color-accent-soft)',
    boxShadow: 'none',
    outline: '2px solid var(--color-focus)',
    outlineOffset: '3px',
  },
  _disabled: { opacity: 0.55, cursor: 'not-allowed' },
});
