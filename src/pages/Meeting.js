import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Layout,
  Modal,
  Row,
  TimePicker,
  theme,
} from "antd";
import { Headers } from "../components/Header";
import "../css/meeting.css";
import moment from "moment";
import axios from "axios";
import { Table } from "../components/Table";
import { Sidebar } from "../components/Sidebar";
import { useToken } from "../context/TokenContext";

const { Content } = Layout;

const UserForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  // const [start_date, setDate] = useState("");
  // const [end_date, setEndDate] = useState("");
  const [agenda, setAgenda] = useState("");
  const [desc, setDesc] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [duration, setDuration] = useState(null);

  const today = new Date();
  const epoch = Math.floor(today.valueOf() / 1000);

  const dept = sessionStorage.getItem("department"),
    email = sessionStorage.getItem("email"),
    empId = sessionStorage.getItem("emp_id"),
    name = sessionStorage.getItem("name");

  const { accessToken } = useToken();

  const onFinish = (values, duration) => {
    axios
      .post(`/aravalli/user/schedule?token=${accessToken}`, {
        email: email,
        emp_id: empId,
        full_name: name,
        access_code: 0,
        approved: true,
        date: moment(startTime.$d).format(),
        end_date: moment(endTime.$d).format(),
        duration: parseInt(duration),
        epoch: epoch,
        internal_meeting: true,
        agenda: agenda,
        department: dept,
        description: desc,
      })
      .then((resp) => console.log(resp.data))
      .catch((err) => console.log(err));
    form.resetFields();
    onCreate(values, duration);
  };

  const handleStartTimeChange = (time) => {
    setStartTime(time);
    updateDuration(time, endTime);
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
    updateDuration(startTime, time);
  };

  const updateDuration = (start, end) => {
    if (start && end && start <= end) {
      const duration = moment.duration(end.diff(start));
      const totalMinutes = duration.asMinutes();
      setDuration(totalMinutes.toFixed(0));
    } else {
      setDuration(null);
    }
  };

  return (
    <Modal
      open={visible}
      title={
        <h2 style={{ textAlign: "center", marginBottom: "15px" }}>
          Add Meeting
        </h2>
      }
      okText="Add"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onFinish(values, duration);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical">
        <Row justify={"space-between"}>
          <Form.Item name="email" label="Email" initialValue={email}>
            <Input disabled style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="emp_id" label="Employee ID" initialValue={empId}>
            <Input disabled style={{ width: "100%" }} />
          </Form.Item>
        </Row>
        <Row justify={"space-between"}>
          <Form.Item name="name" label="Full Name" initialValue={name}>
            <Input disabled style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="department" label="Department" initialValue={dept}>
            <Input disabled style={{ width: "100%" }} />
          </Form.Item>
        </Row>
        <Row justify={"space-between"}>
          <Form.Item
            name="date"
            label="Date of Meeting"
            initialValue={moment()}
          >
            <DatePicker style={{ width: "220px" }} disabled />
          </Form.Item>
          <Form.Item
            name="agenda"
            label="Agenda"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              value={agenda}
              onChange={(e) => setAgenda(e.target.value)}
              placeholder="Agenda"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Row>
        <Row justify={"space-between"}>
          <Form.Item
            name="start_time"
            label="Start Time"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TimePicker
              placeholder="Select Start Time"
              onChange={handleStartTimeChange}
              style={{ width: "220px" }}
            />
          </Form.Item>
          <Form.Item
            name="end_time"
            label="End Time"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TimePicker
              placeholder="Select End Time"
              onChange={handleEndTimeChange}
              style={{ width: "220px" }}
            />
          </Form.Item>
        </Row>
        <Form.Item
          name={"description"}
          label="Meeting Description"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Describe your event briefly"
            showCount
            maxLength={100}
            style={{ resize: "none", height: "100px" }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const Meeting = () => {
  const [visible, setVisible] = useState(false);
  const [tableData, setTableData] = useState(null);

  const onCreate = (values, duration) => {
    console.log("Received values of form:", values);
    setVisible(false);

    getTableData();
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { accessToken } = useToken();

  const getTableData = () => {
    fetch(`/aravalli/?token=${accessToken}`)
      .then((resp) => resp.json())
      .then((response) => {
        console.log(response.data);
        const dataWithSerial = response.data.map((item, index) => ({
          ...item,
          serialNumber: index + 1,
        }));
        setTableData(dataWithSerial);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getTableData();
  }, [accessToken]);

  return (
    <Layout>
      <Headers />
      <Layout>
        <Sidebar />
        <Layout
          style={{
            height: "93vh",
            padding: "24px 24px",
            background: "#aaaccc",
          }}
        >
          <Content
            style={{
              padding: "24px",
              borderRadius: "12px",
              background: colorBgContainer,
            }}
          >
            <div className="meeting">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h1
                  style={{
                    color: "#1677ff",
                    textShadow: "5px 5px 5px rgba(0, 0, 0, 0.2)",
                    fontSize: "35px",
                  }}
                >
                  Aravalli Meeting Room
                </h1>
                <Button
                  icon={<PlusOutlined />}
                  type="primary"
                  onClick={() => {
                    setVisible(true);
                  }}
                >
                  New Meeting
                </Button>
              </div>
              <div style={{ padding: "0 10px" }}>
                <h2 style={{ marginBottom: "20px" }}>
                  Upcoming Meetings of the Day
                </h2>
                <Table tableData={tableData} />
                <UserForm
                  visible={visible}
                  onCreate={onCreate}
                  onCancel={() => {
                    setVisible(false);
                  }}
                />
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
