import React, { ReactElement, cloneElement } from "react";
import { Row, Col } from "antd";
import { Root } from "./styles";

type Props = {
  icon?: ReactElement;
  label?: string;
};

const Header = ({ label, icon }: Props) => {
  const sizes = {
    lg: 12,
  };

  return (
    <Root>
      <Row gutter={10}>
        <Col {...sizes} style={{ textAlign: "left" }}>
          <p className="header-text">{label}</p>
        </Col>
        <Col {...sizes} style={{ textAlign: "right" }}>
          <p className="header-text">{icon && cloneElement(icon)}</p>
        </Col>
      </Row>
    </Root>
  );
};

export default Header;
