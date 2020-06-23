import React from "react";
import { Layout } from "antd";

import Sidebar from "./components/Sidebar";
import Content from "./components/Content";

const Main = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Sidebar />
      <Content />
    </Layout>
  );
};

export default Main;
