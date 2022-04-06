import { Avatar, Box, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import Container from "components/Container";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "theme/icons";

export default function Home() {
  const iconColor = useColorModeValue("black", "white");

  return (
    <></>
    // <Container minH="calc(100vh - 160px)">
    //   <Box fontFamily="heading">
    //     <Box h="calc(100vh - 10rem)">
    //       <Box d="grid" placeItems="center" h="100%">
    //         <Box d="flex" h="100%" flexWrap="wrap">
    //           <Box flex="1" alignSelf="center" textAlign="center">
    //             <Avatar
    //               boxSize="300px"
    //               name="Ralph Largo"
    //               src="https://wordpress.highoutput.io/wp-content/uploads/2020/08/Ralph-Largo-768x1026.jpg"
    //             />
    //           </Box>
    //           <Box flex="1" alignSelf="center" textAlign="left">
    //             <Text fontSize="55px" fontWeight="700" as="h1">
    //               Ralph Largo
    //             </Text>
    //             <Box h="2" />
    //             <Text size="15px" color="gray">
    //               Hi! I’m Ralph Largo, and I’m a developer who has passion for
    //               building clean web applications with intuitive functionality.
    //               I enjoy the process of turning ideas into reality using
    //               creative solutions. I mainly use ReactJS. I’m always curious
    //               about learning new skills, tools, and concepts. In addition to
    //               working on various solo hobby projects, I have worked with
    //               creative teams, which involves daily stand-ups and
    //               communications, source control, and project management.
    //             </Text>
    //             <Box mt="5" d="flex">
    //               <Box pr="3">
    //                 <Icon as={GithubIcon} color={iconColor} boxSize="20px" />
    //               </Box>
    //               <Box px="3">
    //                 <Icon as={LinkedinIcon} color={iconColor} boxSize="20px" />
    //               </Box>
    //               <Box px="3">
    //                 <Icon as={TwitterIcon} color={iconColor} boxSize="20px" />
    //               </Box>
    //             </Box>
    //           </Box>
    //         </Box>
    //       </Box>
    //     </Box>
    //   </Box>
    // </Container>
  );
}
