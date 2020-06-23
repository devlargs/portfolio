import React from "react";
import { PhoneOutlined } from "@ant-design/icons";
import Container from "../../components/Container";
import Header from "../../components/Header";

const Contact = () => {
  return (
    <Container>
      <Header label="Contact" icon={<PhoneOutlined />} />
    </Container>
  );
};

export default Contact;
