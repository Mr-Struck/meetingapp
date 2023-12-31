import React, { useState } from "react";
import "../css/map.css";
import { Link } from "react-router-dom";
import { ManOutlined, WomanOutlined } from "@ant-design/icons";
import { Form, Input, Layout, theme } from "antd";
import { Headers } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

const { Content } = Layout;

export const Map = () => {
  const [people, setPeople] = useState("");
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Headers />
      <Layout>
        <Sidebar />
        <Layout
          style={{
            height: "93vh",
            padding: "24px",
            background: "#aaaccc",
          }}
        >
          <Content
            style={{
              padding: "24px",
              borderRadius: "12px",
              margin: 0,
              background: colorBgContainer,
            }}
          >
            <Form.Item label="Set No. of People">
              <Input
                type="number"
                placeholder="Enter no. of people"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
              />
            </Form.Item>
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
                    <div className="compartment-label">Head Washroom</div>
                  </div>
                  <div className="compartment compartment-i">
                    <div className="compartment-label">Kitchen</div>
                  </div>
                </div>
                <div
                  title="Needs Prior Approval"
                  // className={`${
                  //   people >= 16
                  //     ? ""
                  //     : "compartment compartment-e"
                  // }`}
                  className="compartment compartment-e himalaya"
                >
                  <div className="compartment-label">
                    {/* <Link to={"/meeting"}> */}
                    Pacific Meeting Room
                    {/* </Link> */}
                  </div>
                </div>
                <div
                  className={`${
                    people >= 1 && people <= 4
                      ? "compartment compartment-f meet"
                      : "compartment compartment-f"
                  }`}
                >
                  <div className="compartment-label">Arctic Meeting Room</div>
                </div>
                <div className="compartment compartment-g">
                  <div className="compartment-label">Head Room</div>
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
                  <div
                    className={`${
                      people >= 1 && people <= 12
                        ? "compartment compartment-o meet"
                        : "compartment compartment-o"
                    }`}
                  >
                    <div className="compartment-label">
                      <Link to={"/meeting"}>Atlantic Meeting Room</Link>
                    </div>
                  </div>
                  <div className="compartment compartment-p">
                    <div className="compartment-label">
                      Embedded and IoT Cabin
                    </div>
                  </div>
                  <div
                    className={`${
                      people >= 1 && people <= 4
                        ? "compartment compartment-q meet"
                        : "compartment compartment-q"
                    }`}
                  >
                    <div className="compartment-label">
                      Indian Meeting Room
                    </div>
                  </div>
                </div>
                <div
                  className={`${
                    people >= 1 && people <= 15
                      ? "compartment compartment-r meet"
                      : "compartment compartment-r"
                  }`}
                >
                  <div className="compartment-label">Southern Meeting Room</div>
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
                <div
                  className={`${
                    people >= 1 && people <= 20
                      ? "compartment compartment-ac meet"
                      : "compartment compartment-ac"
                  }`}
                >
                  <div className="compartment-label">Antarctic Meeting Room</div>
                </div>
                <div className="compartment compartment-ag">
                  <div className="compartment-label">Head Room</div>
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
                <div className="compartment compartment-aj"></div>
                <div className="compartment compartment-ak"></div>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
