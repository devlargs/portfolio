import React from "react";
import { Row, Col } from "antd";
import { FileProtectOutlined } from "@ant-design/icons";
import Container from "../../components/Container";
import Header from "../../components/Header";
import Experience from "./components/Experience";
import Education from "./components/Education";

const Resume = () => {
  return (
    <Container>
      <Header label="Resume" icon={<FileProtectOutlined />} />
      <Row gutter={10}>
        <Col span={24}>
          <Experience />
        </Col>
        <Col span={24}>
          <Education />
        </Col>
      </Row>
    </Container>
  );
};

export default Resume;
