import React from "react";
import {
  DesktopOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Headers } from "../components/Header";

const { Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Analytics", "1", <PieChartOutlined />),
  getItem("Meetings", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Schedule", "sub2", <TeamOutlined />, [
    getItem("New", "6"),
    getItem("Previous", "8"),
  ]),
];

export const Meeting = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Headers />
      <Layout>
        <Sider>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout
          style={{
            padding: "24px 24px",
            background: "#aaaccc",
          }}
        >
          <Content
            style={{
              padding: "24px 24px",
              borderRadius: "12px",
              margin: 0,
              background: colorBgContainer,
            }}
          >
            <div className="meeting">Meeting</div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
