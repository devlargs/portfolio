import React from "react";
import { AppstoreOutlined } from "@ant-design/icons";
import Container from "../../components/Container";
import Header from "../../components/Header";

const Portfolio = () => {
  return (
    <Container>
      <Header label="Portfolio" icon={<AppstoreOutlined />} />
    </Container>
  );
};

export default Portfolio;
