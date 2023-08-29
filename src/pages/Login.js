import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import "../css/login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToken } from "../context/TokenContext";
import img from "../images/Tablet login-bro.png";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [greeting, setGreeting] = useState("");

  const navigate = useNavigate();
  const { setAccessToken } = useToken();

  useEffect(() => {
    const currentTime = new Date().getHours();
    if (currentTime >= 6 && currentTime < 12) {
      setGreeting("Good Morning");
    } else if (currentTime >= 12 && currentTime < 15) {
      setGreeting("Good Afternoon");
    } else if (currentTime >= 15 && currentTime < 21) {
      setGreeting("Good Evening");
    } else {
      setGreeting("Good Night");
    }
  }, []);

  const onFinish = (values) => {
    // console.log("Received values of form: ", values);
    axios
      .post(`/login?email=${email}&password=${password}`, {
        headers: {
          accept: "application/json",
        },
      })
      .then((response) => {
        if (response.data.status) {
          console.log(response.data);
          const token = response.data.access_token;
          setAccessToken(token);
          sessionStorage.setItem("isLogin", "true");
          navigate("/");
        }
        setMsg(response.data.data);
        setInterval(() => {
          setMsg("");
        }, 2000);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="form">
      <div className="contain">
        <div className="image-container">
          <img src={img} alt="img" />
        </div>
        <div className="form-contain">
          <Typography.Title
            style={{
              fontFamily: "'Montserrat', sans-serif",
              marginBottom: 40,
              fontSize: 30,
            }}
          >
            Welcome, User
            <br />
            <span style={{ fontSize: 20, color: "#1677ff" }}>{greeting}</span>
          </Typography.Title>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
            >
              <Input
                size="large"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                prefix={<UserOutlined className="icon" />}
                placeholder="Email Address"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                size="large"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                prefix={<LockOutlined className="icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Link className="login-form-forgot" to="/auth/forget">
                Forgot password?
              </Link>
            </Form.Item>
            <Form.Item>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "-20px 0",
                }}
              >
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ width: "100%" }}
                >
                  Log in
                </Button>
              </div>
              <br />
              <p style={{ marginTop: 5, textAlign: "center" }}>
                Not a Member? <Link to="/auth/registration">register now!</Link>
              </p>
            </Form.Item>
          </Form>
          {msg && <p className="error">{msg}</p>}
        </div>
      </div>
    </div>
  );
};
