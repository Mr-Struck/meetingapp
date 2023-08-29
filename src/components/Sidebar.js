import {
  DesktopOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Your Account", "1", <UserOutlined />),
  getItem("Conference Booking", "2", <DesktopOutlined />),
  getItem("Intercom Extension", "3", <PhoneOutlined />),
];

export const Sidebar = () => {
  return (
    <div>
      <Sider width={225} style={{ height: "100vh", background: "#001529" }}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["2"]}
          mode="inline"
          items={items}
        />
      </Sider>
    </div>
  );
};
