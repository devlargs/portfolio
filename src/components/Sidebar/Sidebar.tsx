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

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider trigger={null}>
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <ImageContainer>
          <NameTag>
            <p>Ralph Largo</p>
          </NameTag>
          <StyledImage src={ProfileImage} alt="" />
        </ImageContainer>

        <Menu.Item key="1" icon={<HomeOutlined />}>
          HOME
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          ABOUT ME
        </Menu.Item>
        <Menu.Item key="3" icon={<FileProtectOutlined />}>
          RESUME
        </Menu.Item>
        <Menu.Item key="4" icon={<AppstoreOutlined />}>
          PORTFOLIO
        </Menu.Item>
        <Menu.Item key="5" icon={<PhoneOutlined />}>
          CONTACT
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
