import { LearningBlock } from '@constants/learnings';
import cx from '@utils/cx';
import { FC, JSX } from 'react';
import CodeBlock from './blocks/CodeBlock';
import FieldsBlock from './blocks/FieldsBlock';
import Heading from './blocks/Heading';
import ListBlock from './blocks/ListBlock';
import NoteBlock from './blocks/NoteBlock';
import Paragraph from './blocks/Paragraph';
import headingId from './headingId';
import styles from './LearningBody.module.css';

interface Props {
  body: readonly LearningBlock[];
}

const renderBlock = (block: LearningBlock): JSX.Element => {
  switch (block.kind) {
    case 'heading':
      return <Heading content={block.content} id={headingId(block.content)} />;
    case 'code':
      return <CodeBlock content={block.content} label={block.label} />;
    case 'list':
      return <ListBlock items={block.items} ordered={block.ordered} />;
    case 'fields':
      return <FieldsBlock items={block.items} />;
    case 'note':
      return <NoteBlock content={block.content} tone={block.tone} />;
    case 'text':
      return <Paragraph content={block.content} />;
  }
};

const LearningBody: FC<Props> = ({ body }) => (
  <div className={styles.body}>
    {body.map((block, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <div key={i} className={cx(styles.block, block.kind === 'code' && styles.wide)}>
        {renderBlock(block)}
      </div>
    ))}
  </div>
);

export default LearningBody;
