import React from "react";
import { Layout } from "antd";

import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import { BrowserRouter } from "react-router-dom";

const Main = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <BrowserRouter>
        <Sidebar />
        <Content />
      </BrowserRouter>
    </Layout>
  );
};

export default Main;
