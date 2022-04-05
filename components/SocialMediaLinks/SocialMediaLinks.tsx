import { Box, Flex, Image } from '@chakra-ui/react';
import SOCIAL_MEDIA_LINKS from 'constants/socialMediaLinks';
import { FC } from 'react';

const SocialLinks: FC = () => (
  <Flex>
    {SOCIAL_MEDIA_LINKS.map((social) => (
      <Box
        key={social.name}
        bg="primary"
        h="40px"
        w="40px"
        d="grid"
        placeContent="center"
        borderRadius="50%"
        mr="2rem"
        cursor="pointer"
        onClick={(): void => {
          if (typeof window !== 'undefined') {
            window.open(social.value);
          }
        }}
      >
        <Image src={`/svgs/${social.name}.svg`} alt={social.name} />
      </Box>
    ))}
  </Flex>
);

export default SocialLinks;
