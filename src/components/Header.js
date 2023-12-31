import React, { useState } from "react";
import "../css/header.css";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { Clock } from "./Clock";
import { Link } from "react-router-dom";

export const Headers = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">Meeting App</div>
      <div className={`menu ${isOpen ? "active" : ""}`}>
        <ul>
          <li>
            <Clock />
          </li>
          <li>
            <Link to="/auth">
              <Button
                onClick={() => {
                  sessionStorage.setItem("isLogin", "false");
                  sessionStorage.removeItem("department");
                  sessionStorage.removeItem("email");
                  sessionStorage.removeItem("name");
                  sessionStorage.removeItem("emp_id");
                }}
                icon={<LogoutOutlined />}
                type="primary"
                danger
              >
                Logout
              </Button>
            </Link>
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
