import { Box, Button, Flex, Text } from '@chakra-ui/react';
import COMMONS from '@theme/commons';
import { FC } from 'react';

const CompanyContribution: FC = () => {
  return (
    <Box px={COMMONS.px} my="100px">
      <Flex mb="60px" justifyContent="space-between" alignItems="center">
        <Text fontWeight={600} lineHeight="42px" fontSize="32px">
          Company Contribution
        </Text>
        <Button variant="link">See all →</Button>
      </Flex>

      <Flex justifyContent="space-between">
        {Array.from({ length: 4 }).map((_, i) => {
          return <Box key={i} width="313px" height="250px" bg="red.900" />;
        })}
      </Flex>
    </Box>
  );
};

export default CompanyContribution;
