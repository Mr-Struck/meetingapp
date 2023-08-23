import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import "../css/login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const onFinish = (values) => {
    // console.log("Received values of form: ", values);
    axios
      .post(`/login?email=${email}&password=${password}`, {
        headers: {
          accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.status) {
          console.log(response.data);
          navigate("/map");
        }
        setMsg(response.data.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="form">
      <div className="form-contain">
        <Typography.Title
          style={{
            fontFamily: "'Montserrat', sans-serif",
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          Login Form
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
            rules={[{ required: true, message: "Please input your Password!" }]}
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
            <Link className="login-form-forgot" to="/">
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
              Not a Member? <Link to="/registration">register now!</Link>
            </p>
          </Form.Item>
        </Form>
        {msg && <p>{msg}</p>}
      </div>
    </div>
  );
};
