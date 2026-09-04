'use client';

import { Box, Text } from '@chakra-ui/react';
import { FC, useEffect, useRef, useState } from 'react';

interface Props {
  content: string;
  /** Filename or shell, printed on the header strip. */
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
    } catch {
      /* Clipboard is permission-gated and can simply say no. The snippet is
         already on screen and selectable, so there is nothing to recover. */
    }
  };

  return (
    <Box border="var(--rule-hair) solid var(--color-rule)" bg="var(--color-paper-2)" borderRadius="var(--radius-sm)">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap="var(--space-sm)"
        px="var(--space-sm)"
        py="var(--space-3xs)"
        borderBottom="var(--rule-hair) solid var(--color-rule)"
      >
        <Text
          as="span"
          fontFamily="var(--font-meta)"
          fontSize="var(--text-2xs)"
          letterSpacing="0.1em"
          textTransform="uppercase"
          color="var(--color-ink-3)"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {label ?? 'snippet'}
        </Text>

        <Box
          as="button"
          type="button"
          onClick={copy}
          flexShrink={0}
          fontFamily="var(--font-meta)"
          fontSize="var(--text-2xs)"
          letterSpacing="0.08em"
          textTransform="uppercase"
          color={copied ? 'var(--color-accent)' : 'var(--color-ink-2)'}
          transition="color var(--dur-1) var(--ease-out)"
          _hover={{ color: 'var(--color-accent)' }}
        >
          {copied ? 'Copied' : 'Copy'}
        </Box>
      </Box>

      <Box
        as="pre"
        overflowX="auto"
        m="0"
        px="var(--space-sm)"
        py="var(--space-sm)"
        fontFamily="var(--font-meta)"
        fontSize="var(--text-xs)"
        lineHeight={1.7}
        color="var(--color-ink)"
        sx={{ tabSize: 2 }}
      >
        <Box as="code">{content}</Box>
      </Box>
    </Box>
  );
};

export default CodeBlock;
