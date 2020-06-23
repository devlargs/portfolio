import React from "react";
import {
  HomeOutlined,
  UserOutlined,
  FileProtectOutlined,
  PhoneOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import ProfileImage from "../../assets/images/profile.jpg";
import { StyledImage, NameTag, ImageContainer } from "./styles";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider trigger={null}>
      <ImageContainer>
        <NameTag>
          <p>Ralph Largo</p>
        </NameTag>
        <StyledImage src={ProfileImage} alt="" />
      </ImageContainer>

      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/">HOME</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          <Link to="/about">ABOUT ME</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<FileProtectOutlined />}>
          RESUME
        </Menu.Item>
        <Menu.Item key="4" icon={<AppstoreOutlined />}>
          PORTFOLIO
        </Menu.Item>
        <Menu.Item key="5" icon={<PhoneOutlined />}>
          <Link to="/contact">CONTACT</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
