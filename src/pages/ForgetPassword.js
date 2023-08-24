import { Button, Collapse, Form, Input, Typography } from "antd";
import axios from "axios";
import React, { useState } from "react";
import "../css/login.css";
import { LockOutlined, NumberOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const text = (
  <ul>
    <li>8 characters </li>
    <li>at least one number</li>
    <li>one uppercase letter</li>
    <li>one lowercase letter</li>
    <li>at least one special character</li>
  </ul>
);

const item = [
  {
    key: 1,
    label: "Rules for correct password",
    children: text,
  },
];

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
      danger
      type="primary"
      htmlType="submit"
      disabled={!submittable}
      style={{ width: "100%" }}
    >
      Submit
    </Button>
  );
};

export const ForgetPassword = () => {
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [clicked, isClicked] = useState(false);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const CustomEmailValidator = (_, value) => {
    if (!value || value.includes("@djt")) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Email must contain @djt"));
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
    console.log("Received values of form: ", values);
    axios
      .post(
        `/forgot_password?otp=${otp}&email=${email}&new_password=${password}`,
        {
          headers: {
            accept: "application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp.data);
        if (resp.data.status) {
          form.resetFields();
          toast.success("Password changed successfully");
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="form">
      <div
        className="form-container"
        style={{ width: "35rem", paddingBottom: "1rem" }}
      >
        <Typography.Title
          style={{
            fontFamily: "'Montserrat', sans-serif",
            textAlign: "center",
            marginBottom: 30,
            fontSize: 30,
          }}
        >
          Forgot Password?
          <br /> Don't worry we've got You.
        </Typography.Title>
        <Form
          name="loginform"
          form={form}
          onFinish={onFinish}
          layout="vertical"
        >
          {clicked ? (
            <div>
              <Form.Item
                name="otp"
                label="OTP"
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
              <Form.Item
                name="email"
                label="Email ID"
                rules={[
                  {
                    type: "email",
                    message: "Please enter a valid email",
                  },
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                  {
                    validator: CustomEmailValidator,
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
                  disabled
                  placeholder="Please enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="new_password"
                label="New Password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your password",
                  },
                  {
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: "Please enter correct password",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="icon" />}
                  value={password}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <SubmitButton form={form} />
              </Form.Item>
            </div>
          ) : (
            <div>
              <Form.Item
                name="email"
                label="Email ID"
                rules={[
                  {
                    type: "email",
                    message: "Please enter a valid email",
                  },
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                  {
                    validator: CustomEmailValidator,
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
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
              <Form.Item className="registerlink">
                <Button onClick={handleGetOTP} style={{ width: "100%" }}>
                  Get OTP
                </Button>
              </Form.Item>
            </div>
          )}
          <div className="password">
            <Collapse items={item} bordered={true} />
          </div>
        </Form>
        {msg && <p>{msg}</p>}
        <Toaster />
      </div>
    </div>
  );
};
