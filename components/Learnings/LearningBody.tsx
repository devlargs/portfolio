import { Box } from '@chakra-ui/react';
import { LearningBlock } from '@constants/learnings';
import { FC, JSX } from 'react';
import CodeBlock from './blocks/CodeBlock';
import FieldsBlock from './blocks/FieldsBlock';
import Heading from './blocks/Heading';
import ListBlock from './blocks/ListBlock';
import NoteBlock from './blocks/NoteBlock';
import Paragraph from './blocks/Paragraph';
import headingId from './headingId';

interface Props {
  body: readonly LearningBlock[];
}

/* Exhaustive by construction: adding a variant to LearningBlock without adding a
   case here fails the build rather than rendering nothing. */
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
  <Box
    display="grid"
    /* Explicit column: the implicit one sizes to max-content, and a wide `pre`
       would then stretch every paragraph past the measure instead of scrolling
       inside its own box. */
    gridTemplateColumns="minmax(0, 1fr)"
    gap={{ base: 'var(--space-md)', md: 'var(--space-lg)' }}
    maxW="var(--measure-wide)"
  >
    {body.map((block, i) => (
      // Prose holds the reading measure; a snippet is scanned, so it runs wider.
      // eslint-disable-next-line react/no-array-index-key
      <Box key={i} maxW={block.kind === 'code' ? 'none' : 'var(--measure)'}>
        {renderBlock(block)}
      </Box>
    ))}
  </Box>
);

export default LearningBody;
