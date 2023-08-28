import React, { useState } from "react";
import "../css/registration.css";
import { Button, Collapse, Form, Input, Row, Select, Typography } from "antd";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import {
  DesktopOutlined,
  IdcardOutlined,
  LockOutlined,
  MailOutlined,
  NumberOutlined,
  UserOutlined,
} from "@ant-design/icons";

const dropValues = [
  "IT/Tech",
  "Administration",
  "Fintech",
  "Finance",
  "Legal",
  "HR",
  "Retail",
  "Other",
];

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

export const RegistrationForm = () => {
  const [form] = Form.useForm();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [employee, setEmployee] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const CustomEmailValidator = (_, value) => {
    if (!value || value.includes("@djt")) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Email must contain @djt"));
  };

  const onFinish = (values) => {
    console.log(values);
    axios
      .post(
        "/register",
        {
          first_name: firstName,
          last_name: lastName,
          mobile: mobile,
          email: email,
          password: password,
          emp_id: employee,
          designation: designation,
          department: department,
          role: "user",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.status) {
          form.resetFields();
          toast.success("User added successfully");
          navigate("/");
        }
        setMsg(response.data.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error fetching user");
      });
  };

  return (
    <div className="form">
      <div className="form-container">
        <Typography.Title
          style={{
            fontFamily: "'Montserrat', sans-serif",
            textAlign: "center",
            marginBottom: 30,
            fontSize: 30,
          }}
        >
          Hello new user, register here
        </Typography.Title>
        <Form
          name="register-form"
          form={form}
          onFinish={onFinish}
          layout="vertical"
        >
          <Row justify={"space-between"}>
            <Form.Item
              name="first_name"
              label="First Name"
              rules={[
                {
                  required: true,
                  message: "Please enter your first name",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="icon" />}
                value={firstName}
                placeholder="Enter your first name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="last_name"
              label="Last Name"
              rules={[
                {
                  required: true,
                  message: "Please enter your last name",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="icon" />}
                value={lastName}
                placeholder="Enter your last name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Item>
          </Row>
          <Row justify={"space-between"}>
            <Form.Item
              name="mobile"
              label="Mobile Number"
              rules={[
                {
                  required: true,
                  message: "Please enter your mobile number",
                },
              ]}
            >
              <Input
                prefix={<NumberOutlined className="icon" />}
                value={mobile}
                type="number"
                placeholder="Enter your mobile number"
                onChange={(e) => setMobile(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  type: "email",
                  message: "Please enter a valid email",
                },
                {
                  required: true,
                  message: "Please enter your email",
                },
                { validator: CustomEmailValidator },
              ]}
            >
              <Input
                prefix={<MailOutlined className="icon" />}
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
          </Row>
          <Row justify="space-between">
            <Form.Item
              name="password"
              label="Password"
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
                style={{
                  width: "346px",
                }}
                prefix={<LockOutlined className="icon" />}
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="emp_id"
              label="Employee ID"
              rules={[
                {
                  required: true,
                  message: "Please enter your employee ID",
                },
              ]}
            >
              <Input
                suffix={<IdcardOutlined className="icon" />}
                value={employee}
                placeholder="Enter your employee ID"
                onChange={(e) => setEmployee(e.target.value)}
              />
            </Form.Item>
          </Row>
          <Row justify="space-between">
            <Form.Item
              name="designation"
              label="Designation"
              rules={[
                {
                  required: true,
                  message: "Please enter your designation",
                },
              ]}
            >
              <Input
                suffix={<DesktopOutlined className="icon" />}
                value={designation}
                placeholder="Enter your designation"
                onChange={(e) => setDesignation(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="department"
              label="Department"
              rules={[
                {
                  required: true,
                  message: "Please select your department",
                },
              ]}
            >
              <Select
                style={{ width: "346px" }}
                labelInValue
                placeholder="Select your department"
                onChange={(value) => setDepartment(value.label)}
              >
                {dropValues.map((value, i) => {
                  return <Select.Option key={i}>{value}</Select.Option>;
                })}
              </Select>
            </Form.Item>
          </Row>
          <Form.Item>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                shape="round"
                size="large"
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
              <br />
            </div>
            <p style={{ marginTop: 5 }}>
              Already registered? <Link to="/auth">Login!</Link>
            </p>
          </Form.Item>
          {msg && <p className="error">{msg}</p>}
        </Form>
        <div className="password">
          <Collapse items={item} bordered={true} />
        </div>
      </div>
      <Toaster />
    </div>
  );
};
