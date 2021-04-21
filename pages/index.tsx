import { GithubIcon, LinkedinIcon, TwitterIcon } from "theme/icons";
import { Avatar, Box, Icon, Text, useColorModeValue } from "@chakra-ui/react";

export default function Home() {
  const iconColor = useColorModeValue("black", "white");

  return (
    <Box fontFamily="heading">
      <Box h="calc(100vh - 10rem)">
        <Box d="grid" placeItems="center" h="100%">
          <Box d="flex" h="100%" flexWrap="wrap">
            <Box flex="1" alignSelf="center" textAlign="center">
              <Avatar
                boxSize="300px"
                name="Ralph Largo"
                src="https://wordpress.highoutput.io/wp-content/uploads/2020/08/Ralph-Largo-768x1026.jpg"
              />
            </Box>
            <Box flex="1" alignSelf="center" textAlign="left">
              <Text fontSize="55px" fontWeight="700" as="h1">
                Ralph Largo
              </Text>
              <Box h="2" />
              <Text size="15px" color="#767676">
                Front End Developer based in Philippines and Lorem ipsum keme
                keme keme 48 years at nang at ang sangkatuts ng juts nang nang
              </Text>
              <Box mt="5" d="flex">
                <Box pr="3">
                  <Icon as={GithubIcon} color={iconColor} boxSize="20px" />
                </Box>
                <Box px="3">
                  <Icon as={LinkedinIcon} color={iconColor} boxSize="20px" />
                </Box>
                <Box px="3">
                  <Icon as={TwitterIcon} color={iconColor} boxSize="20px" />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
