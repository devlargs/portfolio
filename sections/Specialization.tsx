import { Box, Flex, Img, Text } from '@chakra-ui/react';
import COMMONS from '@theme/commons';
import { FC } from 'react';

const Specialization: FC = () => {
  return (
    <Box bg="brand" px={COMMONS.px} color="white" pt="135px" pb="123px" pos="relative">
      <Img
        src="/images/specialization/pattern.png"
        pos="absolute"
        top={0}
        right="20%"
        marginTop="-100px"
        zIndex={1}
      ></Img>
      <Text lineHeight="42px" fontSize="32px" fontWeight={600}>
        I specialized in
      </Text>

      <Flex justifyContent="space-between" mt="62px">
        {Array.from({ length: 3 }).map((_, i) => (
          <Box border="1px solid #29303B" height={250} w={424} borderRadius="12px" key={i}>
            <Box placeContent="center" d="grid" h="100%">
              <Box>
                <Img src="/svgs/code.svg" margin="auto" />
                <Text mt="48px" fontSize="18px" fontWeight="600" lineHeight="21px">
                  Front-end Developer
                </Text>
              </Box>
            </Box>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default Specialization;
