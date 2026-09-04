import { Box } from '@chakra-ui/react';
import { FC } from 'react';

/** The hairline that opens every section, full bleed across the container. */
const SectionRule: FC = () => <Box h="var(--rule-hair)" bg="var(--color-ink)" mb="var(--space-md)" />;

export default SectionRule;
