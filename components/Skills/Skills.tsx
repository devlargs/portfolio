import { Grid, Text } from '@chakra-ui/react';
import { toKebabCase } from 'largs-utils';
import { FC } from 'react';
import SkillCard from './SkillCard';

const Skills: FC<{
  skills: string[];
  title: string;
  imagePlaceholders: Record<string, string>;
}> = ({ skills, title, imagePlaceholders }) => (
  <>
    <Text mb="16px" fontSize="14px" fontWeight={300} color="#c4cfde" letterSpacing="3px" textTransform="uppercase">
      {title}
    </Text>

    <Grid
      gridTemplateColumns={{
        base: 'repeat(4, 1fr)',
        md: 'repeat(6, 1fr)',
        lg: 'repeat(5, 1fr)',
      }}
      gridGap="16px"
    >
      {skills.map((item) => {
        const key = toKebabCase(item);
        return <SkillCard key={item} name={item} blurDataURL={key ? imagePlaceholders[key] : undefined} />;
      })}
    </Grid>
  </>
);

export default Skills;
