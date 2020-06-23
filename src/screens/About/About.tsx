import React from "react";
import { UserOutlined } from "@ant-design/icons";
import Container from "../../components/Container";
import Header from "../../components/Header";

const About = () => {
  return (
    <Container>
      <Header label="About Me" icon={<UserOutlined />} />
    </Container>
  );
};

export default About;
