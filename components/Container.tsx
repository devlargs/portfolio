import { Container as ChakraContainer, ContainerProps } from "@chakra-ui/react";
import { FC } from "react";

const Container: FC<ContainerProps> = ({ children, ...otherProps }) => {
  return (
    <ChakraContainer maxW="85rem" {...otherProps}>
      {children}
    </ChakraContainer>
  );
};

export default Container;
