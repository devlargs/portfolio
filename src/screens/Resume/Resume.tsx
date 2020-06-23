import React from "react";
import { FileProtectOutlined } from "@ant-design/icons";
import Container from "../../components/Container";
import Header from "../../components/Header";

const Resume = () => {
  return (
    <Container>
      <Header label="Resume" icon={<FileProtectOutlined />} />
    </Container>
  );
};

export default Resume;
