import React from "react";
import "../css/map.css";
import { Link } from "react-router-dom";
import {
  DesktopOutlined,
  ManOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  WomanOutlined,
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

export const Map = () => {
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
            <div className="container">
              <div className="map">
                <div className="section section-a">
                  <div className="compartment compartment-a">
                    <div className="compartment-label">
                      <ManOutlined style={{ fontSize: 14 }} />
                    </div>
                  </div>
                  <div className="compartment compartment-b">
                    <div className="compartment-label">Store #1</div>
                  </div>
                </div>
                <div className="compartment compartment-c">
                  <div className="compartment-label">Reception</div>
                </div>
                <div className="section section-d">
                  <div className="compartment compartment-d">
                    <div className="compartment-label">
                      <WomanOutlined style={{ fontSize: 14 }} />
                    </div>
                  </div>
                  <div className="compartment compartment-h">
                    <div className="compartment-label">MD sir Washroom</div>
                  </div>
                  <div className="compartment compartment-i">
                    <div className="compartment-label">Kitchen</div>
                  </div>
                </div>
                <div className="compartment compartment-e meet">
                  <div className="compartment-label">
                    <Link to={"/meeting"}>Himalaya Meeting Room</Link>
                  </div>
                </div>
                <div className="compartment compartment-f meet">
                  <div className="compartment-label">
                    <Link to={"/meeting"}>Jing Meeting Room</Link>
                  </div>
                </div>
                <div className="compartment compartment-g">
                  <div className="compartment-label">MD Sir's Room</div>
                </div>
                <div className="compartment compartment-j">
                  <div className="compartment-label">Finance Department</div>
                </div>
                <div className="compartment compartment-k">
                  <div className="compartment-label">Store #2</div>
                </div>
                <div className="section section-l">
                  <div className="compartment compartment-l">
                    <div className="compartment-label">Admin Team</div>
                  </div>
                  <div className="compartment compartment-m">
                    <div className="compartment-label">IT/Tech Team</div>
                  </div>
                  <div className="compartment compartment-n">
                    <div className="compartment-label">HR Team</div>
                  </div>
                </div>
                <div className="section section-o">
                  <div className="compartment compartment-o meet">
                    <div className="compartment-label">
                      <Link to={"/meeting"}>Aravalli Meeting Room</Link>
                    </div>
                  </div>
                  <div className="compartment compartment-p">
                    <div className="compartment-label">
                      Embedded and IoT Cabin
                    </div>
                  </div>
                  <div className="compartment compartment-q meet">
                    <div className="compartment-label">
                      <Link to={"/meeting"}>Sahayadri Meeting Room</Link>
                    </div>
                  </div>
                </div>
                <div className="compartment compartment-r meet">
                  <div className="compartment-label">
                    <Link to={"/meeting"}>Nilgiri Meeting Room</Link>
                  </div>
                </div>
                <div className="section section-s">
                  <div className="compartment compartment-s">
                    <div className="compartment-label">Retail Team</div>
                  </div>
                  <div className="compartment compartment-t">
                    <div className="compartment-label">Server Room</div>
                  </div>
                </div>
                <div className="section section-u">
                  <div className="compartment compartment-u">
                    <div className="compartment-label">Business Head</div>
                  </div>
                  <div className="compartment compartment-v">
                    <div className="compartment-label">Finance Head</div>
                  </div>
                </div>
                <div className="compartment compartment-w">
                  <div className="compartment-label">Store #3</div>
                </div>
                <div className="compartment compartment-x">
                  <div className="compartment-label">Legal Head</div>
                </div>
                <div className="compartment compartment-y">
                  <div className="compartment-label">Customer Experience</div>
                </div>
                <div className="compartment compartment-z">
                  <div className="compartment-label">Fintech Department</div>
                </div>
                <div className="section section-z">
                  <div className="compartment compartment-aa">
                    <div className="compartment-label">Fintech Head</div>
                  </div>
                  <div className="compartment compartment-af">
                    <div className="compartment-label">Store #4</div>
                  </div>
                  <div className="compartment compartment-ab">
                    <div className="compartment-label">Cafeteria</div>
                  </div>
                </div>
                <div className="compartment compartment-ac meet">
                  <div className="compartment-label">Trisul</div>
                </div>
                <div className="compartment compartment-ag">
                  <div className="compartment-label">Director's Room</div>
                </div>
                <div className="compartment compartment-ae">
                  <div className="compartment-label">Electric Room</div>
                </div>
                <div className="section section-ad">
                  <div className="compartment compartment-ad">
                    <div className="compartment-label">Kitchen</div>
                  </div>
                  <div className="compartment compartment-ah">
                    <div className="compartment-label">
                      <ManOutlined style={{ fontSize: 14 }} />
                    </div>
                  </div>
                  <div className="compartment compartment-ai">
                    <div className="compartment-label">
                      <WomanOutlined style={{ fontSize: 14 }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
