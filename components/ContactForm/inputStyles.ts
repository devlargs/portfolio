import { SystemStyleObject } from '@chakra-ui/react';
import defaults from 'theme/defaults';

export const getInputStyles = (hasError: boolean): SystemStyleObject => ({
  bg: 'rgba(255,255,255,0.02)',
  border: '1px solid',
  borderColor: hasError ? 'rgba(245,101,101,0.6)' : 'rgba(196,207,222,0.12)',
  borderRadius: '8px',
  color: '#c4cfde',
  fontSize: '14px',
  px: '14px',
  py: '10px',
  transition: 'border-color 180ms ease, box-shadow 180ms ease, background 180ms ease',
  _placeholder: { color: '#5a626c' },
  _hover: {
    borderColor: hasError ? 'rgba(245,101,101,0.8)' : 'rgba(196,207,222,0.25)',
  },
  _focus: {
    borderColor: hasError ? '#f56565' : defaults.primary,
    boxShadow: hasError ? '0 0 0 3px rgba(245,101,101,0.15)' : `0 0 0 3px rgba(50,171,255,0.15)`,
    bg: 'rgba(255,255,255,0.03)',
    outline: 'none',
  },
});
