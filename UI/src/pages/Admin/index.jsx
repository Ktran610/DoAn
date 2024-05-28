import React, { useEffect } from "react";
import bot_icon from "../../assets/img/bot.png";
import user_icon from "../../assets/img/user.png";
import dtu_logo from "../../assets/img/dtu_logo.png";
import "./index.scss";
import { Search } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import api from "../../api";
import { useLocation } from "react-router-dom";
import { httpClient } from "../../api";
import {
  Table,
  Modal,
  Button,
  Flex,
  Input,
  Typography,
  Form,
  Popconfirm,
  Space,
  InputNumber,
  message,
  Spin,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const Admin = () => {
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isSubmittting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [data, setData] = useState([]);

  const fetchTableData = () => {
    httpClient
      .get("Account/GetAllUserAndAdminAccounts")
      .then((result) => {
        console.log("REsult: ", result);
        let finalResult = result.data.value.data;
        console.log("Finalreaisdsaf: ", finalResult);
        setData(finalResult);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "userName",
      key: "userName",
      render: (text, record) => (
        <Space size="middle">
          <a
            className="aTagAntd"
            style={{ color: "blue" }}
            // onClick={() => handleNameClick(record)}
          >
            {text}
          </a>
        </Space>
      ),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      render: (text) => (
        <Space size="middle">
          <a>{text || "-"}</a>
        </Space>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => (
        <Space size="middle">
          <a>{text || "-"}</a>
        </Space>
      ),
    },
    {
      title: "PhoneNumber",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (text) => (
        <Space size="middle">
          <a>{text || "-"}</a>
        </Space>
      ),
    },
    {
      title: "Role",
      dataIndex: "roleName",
      key: "roleName",
      render: (text) => (
        <Space size="middle">
          <a>{text || "-"}</a>
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            // onConfirm={() => handleDelete(record)}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined className="hover:text-emerald-700" />
          </Popconfirm>
          {/* <EditOutlined className="hover:text-emerald-700" /> */}
        </Space>
      ),
    },
  ];

  const showModalEdit = () => {
    setIsModalEditOpen(true);
  };
  const handleOk = () => {
    setIsModalEditOpen(false);
  };
  const handleCancel = () => {
    setIsModalEditOpen(false);
  };
  const showModalDelete = () => {
    setIsModalDeleteOpen(true);
  };
  const deleteMember = () => {
    //call API delete
    httpClient
      .get("Account/GetAllUserAndAdminAccounts")
      .then((result) => {
        console.log("REsult: ", result);
        let finalResult = result.data.value.data;
        console.log("Finalreaisdsaf: ", finalResult);
      })
      .catch((error) => {
        console.log(error);
      });
    setIsModalDeleteOpen(false);
  };
  const addMember = () => {
    //call API add
    setIsModalAddOpen(false);
  };

  const [form] = Form.useForm();

  const onFinish = (data) => {
    setIsSubmitting(true);
    httpClient
      .post("Account/CreateAdminAccount", data)
      .then(async (response) => {
        if (response.data.value.success) {
          message.success("Create account successfully!");
          await fetchTableData();
          await setIsModalAddOpen(false);
          await form.resetFields();
        } else {
          message.warning(response.data.value.message);
        }
        console.log({ response: response.data.value.success });
      })
      .catch((error) => {
        message.error(error ?? "");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
    // setIsModalAddOpen(false);
    // form.resetFields();
  };

  return (
    <>
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav
            class="sb-sidenav accordion sb-sidenav-light"
            id="sidenavAccordion"
          >
            <div class="sb-sidenav-menu">
              <div class="nav"></div>
              <Button
                type="primary"
                style={{ marginRight: 10 }}
                onClick={() => {
                  setIsModalAddOpen(true);
                }}
              >
                Thêm
              </Button>
            </div>
          </nav>
        </div>
        <div id="layoutSidenav_content">
          <main>
            <div class="container-fluid px-4">
              <h1 class="my-4">Quản Lý Tài Khoản Người Dùng</h1>
              {isFetching ? <Spin/> : <Table columns={columns} dataSource={data} />}
            </div>
          </main>
        </div>
      </div>
      {/* <Modal title="Chỉnh sửa" open={isModalEditOpen} onOk={handleOk} onCancel={handleCancel}>
                <div style={{padding: 20}}>
                    <div>
                        <Typography.Title level={5}>Name</Typography.Title>
                        <Input defaultValue="" />
                    </div>
                    <div>
                        <Typography.Title level={5}>Age</Typography.Title>
                        <Input defaultValue="" />
                    </div>
                    <div>
                        <Typography.Title level={5}>PhoneNumber</Typography.Title>
                        <Input defaultValue="" />
                    </div>
                </div>
            </Modal> */}
      <Modal
        title="Xóa"
        open={isModalDeleteOpen}
        onOk={deleteMember}
        onCancel={() => {
          setIsModalDeleteOpen(false);
        }}
      >
        <p>Bạn có chắc chắn muốn xóa ?</p>
      </Modal>
      <Modal
        title="Create New Admin Account"
        open={isModalAddOpen}
        onOk={addMember}
        onCancel={() => {
          setIsModalAddOpen(false);
        }}
        footer={<></>}
      >
        <Form
          form={form}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 24,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Username"
            name="userName"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="passwordHash"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                min: 8,
                message: "Please enter a password of more than 8 characters",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["passwordHash"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("passwordHash") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[
              {
                required: true,
                message: "Please input your age!",
              },
              {
                type: "number",
                min: 10,
                max: 100,
                message: "Enter age from 10 to 100",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
              {
                type: "email",
                message: "Please input valid Email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 18,
            }}
          >
            <Button
              loading={isSubmittting}
              className="login-button"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              type="primary"
              htmlType="submit"
            >
              Create Admin Account
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Admin;
