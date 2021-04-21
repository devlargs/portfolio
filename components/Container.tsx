import { FC } from "react";
import { Container as ChakraContainer, ContainerProps } from "@chakra-ui/react";

const Container: FC<ContainerProps> = ({ children, ...otherProps }) => {
  return (
    <ChakraContainer maxW="80rem" {...otherProps}>
      {children}
    </ChakraContainer>
  );
};

export default Container;
