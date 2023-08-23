import React, { useState } from "react";
import "../css/header.css";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { Clock } from "./Clock";

export const Headers = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">DJT Meetings</div>
      <div className={`menu ${isOpen ? "active" : ""}`}>
        <ul>
          <li>
            <Clock />
          </li>
          <li>
            <Button icon={<LogoutOutlined />} type="primary" danger>
              Logout
            </Button>
          </li>
        </ul>
      </div>
      <div className="burger" onClick={toggleMenu}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
};
