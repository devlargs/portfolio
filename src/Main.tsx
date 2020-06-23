import React from "react";
import { Layout } from "antd";

import Sidebar from "./components/Sidebar";
import Routes from "./components/Routes";
import { BrowserRouter } from "react-router-dom";

const Main = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <BrowserRouter>
        <Sidebar />
        <Routes />
      </BrowserRouter>
    </Layout>
  );
};

export default Main;
