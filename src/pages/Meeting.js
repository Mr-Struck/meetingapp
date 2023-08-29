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
  const [start_date, setDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [agenda, setAgenda] = useState("");
  const [desc, setDesc] = useState("");

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
        date: moment(start_date).format(),
        end_date: moment(end_date).format(),
        duration: parseInt(duration).toFixed(0),
        epoch: 0,
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

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [duration, setDuration] = useState(null);

  const handleStartTimeChange = (time) => {
    setStartTime(time);
    calculateDuration(time, endTime);
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
    calculateDuration(startTime, time);
  };

  const calculateDuration = (start, end) => {
    if (start && end && start < end) {
      const durationInMinutes = moment.duration(end.diff(start)).asMinutes();
      setDuration(durationInMinutes);
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
          <Form.Item
            name="date"
            label="Date of Meeting"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker
              value={start_date}
              showTime
              placeholder="Meeting date"
              style={{ width: "220px" }}
              onChange={(date) => setDate(date.$d)}
            />
          </Form.Item>
        </Row>
        <Row justify={"space-between"}>
          <Form.Item
            name="end_date"
            label="End Date of Meeting"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker
              value={end_date}
              showTime
              placeholder="Meeting end date"
              style={{ width: "220px" }}
              onChange={(date) => setEndDate(date.$d)}
            />
          </Form.Item>
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
        <Row justify={"space-between"}>
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
          <Form.Item name="department" label="Department" initialValue={dept}>
            <Input disabled style={{ width: "100%" }} />
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
            <div className="meeting">
              <Button
                icon={<PlusOutlined />}
                type="primary"
                onClick={() => {
                  setVisible(true);
                }}
              >
                New Meeting
              </Button>
              <h1>Upcoming Meetings</h1>
              <Table tableData={tableData} />
              <UserForm
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                  setVisible(false);
                }}
              />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
