import { Box } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FC, Fragment, ReactNode } from 'react';

interface Props {
  content: string;
}

/* One pass, four inline forms: `code`, **strong**, *emphasis*, [label](href).
   Deliberately not a markdown parser. Anything richer than this belongs in a
   block, where it gets a component and a considered treatment.

   Neither regex is global: `split` keeps capture groups without /g, and a
   stateful lastIndex would make the membership test below alternate. */
const TOKEN = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/;
const IS_TOKEN = /^(?:`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))$/;

const LINK = /^\[([^\]]+)\]\(([^)]+)\)$/;

export const CODE_SX = {
  fontFamily: 'var(--font-meta)',
  fontSize: '0.875em',
  background: 'var(--color-paper-3)',
  color: 'var(--color-ink)',
  padding: '0.1em 0.35em',
  borderRadius: 'var(--radius-sm)',
  overflowWrap: 'anywhere',
} as const;

const renderToken = (token: string): ReactNode => {
  if (token.startsWith('`')) {
    return (
      <Box as="code" sx={CODE_SX}>
        {token.slice(1, -1)}
      </Box>
    );
  }

  if (token.startsWith('**')) {
    return (
      <Box as="strong" fontWeight={600} color="var(--color-ink)">
        {token.slice(2, -2)}
      </Box>
    );
  }

  if (token.startsWith('*')) {
    return <Box as="em">{token.slice(1, -1)}</Box>;
  }

  const link = LINK.exec(token);
  if (!link) return token;

  const [, label, href] = link;
  const external = /^https?:/.test(href);

  return (
    <Box
      as={external ? 'a' : NextLink}
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      color="var(--color-ink)"
      borderBottom="var(--rule-hair) solid var(--color-accent)"
      transition="color var(--dur-1) var(--ease-out)"
      _hover={{ color: 'var(--color-accent)' }}
    >
      {label}
    </Box>
  );
};

/** Inline formatting for authored copy. Block structure is the caller's job. */
const RichText: FC<Props> = ({ content }) => (
  <>
    {content.split(TOKEN).map((part, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <Fragment key={i}>{IS_TOKEN.test(part) ? renderToken(part) : part}</Fragment>
    ))}
  </>
);

export default RichText;
