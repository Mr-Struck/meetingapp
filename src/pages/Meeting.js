import React, { useEffect, useState } from "react";
import {
  DesktopOutlined,
  PieChartOutlined,
  PlusOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Layout,
  Menu,
  Modal,
  Row,
  TimePicker,
  theme,
} from "antd";
import { Headers } from "../components/Header";
import "../css/meeting.css";
import moment from "moment";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { useToken } from "../context/TokenContext";

const { Content, Sider } = Layout;

const UserForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const [empId, setEmpId] = useState("");
  const [name, setName] = useState("");
  const [start_date, setDate] = useState("");
  const [agenda, setAgenda] = useState("");
  const [desc, setDesc] = useState("");
  const [dept, setDept] = useState("");

  const onFinish = (values, duration) => {
    axios
      .post("/aravalli/user/schedule", {
        email: email,
        emp_id: empId,
        full_name: name,
        access_code: 0,
        approved: true,
        date: moment(start_date).format(),
        end_date: moment(endTime).format(),
        duration: parseInt(duration.toFixed(0)),
        time: moment(start_date).format("h:mm:ss"),
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

  const customValidation = (_, value) => {
    if (!value || value.indexOf("DJTCO") === -1) {
      return Promise.reject(new Error('Value must contain "DJTCO"'));
    }
    return Promise.resolve();
  };

  const { accessToken } = useToken();

  useEffect(() => {
    // axios
    //   .get("/aravalli")
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    fetch(`/aravalli/?token=${accessToken}`)
      .then((resp) => resp.json())
      .then((response) => {
        console.log(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [form, accessToken]);

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
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input
              value={email}
              placeholder={"tushar@djtcorp.in"}
              style={{ width: "100%" }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="emp_id"
            label="Employee ID"
            rules={[
              {
                required: true,
                validator: customValidation,
              },
            ]}
          >
            <Input
              value={empId}
              placeholder={"DJTCO0169"}
              style={{ width: "100%" }}
              onChange={(e) => setEmpId(e.target.value)}
            />
          </Form.Item>
        </Row>
        <Row justify={"space-between"}>
          <Form.Item
            name="name"
            label="Full Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              value={name}
              placeholder="Full Name"
              style={{ width: "100%" }}
              onChange={(e) => setName(e.target.value)}
            />
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
              onChange={(e) => setDate(e.target)}
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
          <Form.Item
            name="department"
            label="Department"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              placeholder="Department"
              style={{ width: "100%" }}
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

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Analytics", "1", <PieChartOutlined />),
  getItem("Meetings", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Schedule", "sub2", <TeamOutlined />, [
    getItem("New", "6"),
    getItem("Previous", "8"),
  ]),
];

const columns = [
  { field: "sno", headerName: "S.No.", width: 70 },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 200,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  { field: "email", headerName: "Email", width: 230 },
  { field: "start_time", headerName: "Start Time[hh:mm:ss]", width: 180 },
  {
    field: "end_time",
    headerName: "End Time[hh:mm:ss]",
    width: 180,
  },
  {
    field: "type",
    headerName: "Internal?",
    type: "boolean",
    width: 120,
  },
  {
    field: "dept",
    headerName: "Department",
    width: 130,
  },
];

const rows = [
  {
    id: 1,
    sno: 1,
    lastName: "Askari Rizvi",
    firstName: "Syed Hasan",
    email: "syed.hasan@djtcorp.com",
    start_time: "14:30:00",
    end_time: "15:00:00",
    type: true,
    dept: "IT/Tech",
  },
  {
    id: 2,
    sno: 2,
    lastName: "Srivastava",
    firstName: "Tushar",
    email: "tushar.srivastava@djtcorp.com",
    start_time: "15:10:00",
    end_time: "15:45:00",
    type: false,
    dept: "Administration",
  },
];

export const Meeting = () => {
  const [visible, setVisible] = useState(false);
  const [userData, setUserData] = useState(null);

  const onCreate = (values, duration) => {
    console.log("Received values of form:", values);
    const userDataWithDuration = { ...values, duration };
    setUserData(userDataWithDuration);
    setVisible(false);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Headers />
      <Layout>
        <Sider>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Sider>
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
              <div style={{ width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 10 },
                    },
                  }}
                  pageSizeOptions={[10]}
                  checkboxSelection
                />
              </div>
              <UserForm
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                  setVisible(false);
                }}
              />
              {userData && (
                <div>
                  <p>
                    New Meeting created by: <span>{userData.email}</span>
                  </p>
                  <p>
                    Full Name: <span>{userData.name}</span>
                  </p>
                  <p>
                    Employee ID: <span>{userData.emp_id}</span>
                  </p>
                  <p>
                    Date of the Meeting:{" "}
                    <span>{moment(userData.date.$d).format("")}</span>
                  </p>
                  <p>
                    Duration:{" "}
                    <span>{userData.duration.toFixed(0)} minutes</span>
                  </p>
                  <p>
                    Agenda: <span>{userData.agenda}</span>
                  </p>
                  <p>
                    Department: <span>{userData.department}</span>
                  </p>
                  <p>
                    Description: <span>{userData.description}</span>
                  </p>
                </div>
              )}
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
