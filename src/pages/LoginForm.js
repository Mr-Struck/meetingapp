import { Button, Form, Input } from "antd";
import axios from "axios";
import React, { useState } from "react";
import "../css/login.css";
import { NumberOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const SubmitButton = ({ form }) => {
  const [submittable, setSubmittable] = React.useState(false);

  const values = Form.useWatch([], form);
  React.useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(
        () => {
          setSubmittable(true);
        },
        () => {
          setSubmittable(false);
        }
      );
  }, [values, form]);

  return (
    <Button
      shape="round"
      size="large"
      danger
      type="primary"
      htmlType="submit"
      disabled={!submittable}
    >
      Submit
    </Button>
  );
};

export const LoginForm = () => {
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const [isEmilValid, setEmailValid] = useState(false);
  const [clicked, isClicked] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [msg, setMsg] = useState("");

  const isEmailValid = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEmailValid(isEmailValid(newEmail));
  };

  const handleGetOTP = () => {
    axios
      .post(`/send-otp/?email=${email}`, {
        headers: {
          accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          isClicked(true);
        }
        setMsg(response.data.message);
        setTimeout(() => {
          setMsg("");
        }, 5000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onFinish = (values) => {
    // console.log("Received values of form: ", values);
    axios
      .post(`/verify-otp/?email=${email}&entered_otp=${otp}`, {
        headers: {
          accept: "application/json",
        },
      })
      .then((resp) => {
        console.log(resp.data);
        if (resp.data.success) {
          setIsLoggedIn(true);
        }
        setMsg(resp.data.message);
        setTimeout(() => {
          setMsg("");
        }, 5000);
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    form.resetFields();
    isClicked(false);
    setMsg("");
  };

  if (isLoggedIn) {
    return (
      <div className="form">
        <div
          className="form-container"
          style={{ textAlign: "center", fontSize: "20px" }}
        >
          <p>
            Welcome <span>{email}</span>
          </p>
          <br />
          <Button danger onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="form">
      <div className="form-container">
        <Form
          name="loginform"
          form={form}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="email"
            label={<p style={{ fontSize: "18px" }}>Email ID</p>}
            rules={[
              {
                type: "email",
                message: "Please enter a valid email",
              },
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              prefix={
                <UserOutlined
                  style={{
                    marginRight: 2,
                    fontSize: 16,
                    color: "#bbb",
                  }}
                />
              }
              value={email}
              type="email"
              placeholder="Please enter your email"
              onChange={handleEmailChange}
            />
          </Form.Item>
          {clicked ? (
            <div>
              <Form.Item
                name="otp"
                label={<p style={{ fontSize: "18px" }}>OTP</p>}
                rules={[
                  {
                    required: true,
                    message: "Please input your OTP!",
                  },
                  {
                    max: 6,
                    min: 6,
                    message: "Please enter a 6 digit valid OTP",
                  },
                ]}
              >
                <Input
                  prefix={
                    <NumberOutlined
                      style={{
                        marginRight: 2,
                        fontSize: 16,
                        color: "#bbb",
                      }}
                    />
                  }
                  type="number"
                  placeholder="Enter your OTP"
                  maxLength={6}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </Form.Item>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "-15px",
                }}
              >
                <Form.Item>
                  <SubmitButton form={form} />
                </Form.Item>
              </div>
            </div>
          ) : (
            <Form.Item className="registerlink">
              <Button
                onClick={handleGetOTP}
                disabled={!isEmilValid}
                style={{ width: "100%" }}
              >
                Get OTP
              </Button>
              <p style={{ marginTop: 5 }}>
                Or <Link to={"/registration"}>register now!</Link>
              </p>
            </Form.Item>
          )}
        </Form>
        {msg && <p>{msg}</p>}
      </div>
    </div>
  );
};
