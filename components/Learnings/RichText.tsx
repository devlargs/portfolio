import NextLink from 'next/link';
import { FC, Fragment, ReactNode } from 'react';
import styles from './RichText.module.css';

interface Props {
  content: string;
}

const TOKEN = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/;
const IS_TOKEN = /^(?:`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))$/;

const LINK = /^\[([^\]]+)\]\(([^)]+)\)$/;

const renderToken = (token: string): ReactNode => {
  if (token.startsWith('`')) {
    return <code className={styles.code}>{token.slice(1, -1)}</code>;
  }

  if (token.startsWith('**')) {
    return <strong className={styles.strong}>{token.slice(2, -2)}</strong>;
  }

  if (token.startsWith('*')) {
    return <em>{token.slice(1, -1)}</em>;
  }

  const link = LINK.exec(token);
  if (!link) return token;

  const [, label, href] = link;
  const external = /^https?:/.test(href);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={styles.link}>
        {label}
      </a>
    );
  }

  return (
    <NextLink href={href} className={styles.link}>
      {label}
    </NextLink>
  );
};

const RichText: FC<Props> = ({ content }) => (
  <>
    {content.split(TOKEN).map((part, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <Fragment key={i}>{IS_TOKEN.test(part) ? renderToken(part) : part}</Fragment>
    ))}
  </>
);

export default RichText;
