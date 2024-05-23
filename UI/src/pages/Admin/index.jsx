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
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const Admin = () => {
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
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
      });
    //
  }, []);

  console.log({ data });

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
          <EditOutlined className="hover:text-emerald-700" />
        </Space>
      ),
    },
  ];

  const columns2 = [
    {
      title: "Name",
      dataIndex: "userName",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "PhoneNumber",
      dataIndex: "phoneNumber",
    },
    {
      title: "Role",
      dataIndex: "roleName",
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      render: (_, { tags }) => (
        <>
          {/* <Button type="primary" style={{marginRight: 10}} onClick={() => showModalEdit()}>Chỉnh sửa</Button> */}
          <Button type="primary" danger onClick={() => showModalDelete()}>
            Xóa
          </Button>
        </>
      ),
    },
  ];

  // const data = [];
  // for (let i = 0; i < 46; i++) {
  //   data.push({
  //     key: i,
  //     name: `Edward King ${i}`,
  //     age: 32,
  //     address: `London, Park Lane no. ${i}`,
  //   });
  // }

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

  const onFinish = (values) => {
    setData((prev) => [...prev, values]);
    setIsModalAddOpen(false)
    form.resetFields();
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
              <Table columns={columns} dataSource={data} />
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
        title="Thêm"
        open={isModalAddOpen}
        onOk={addMember}
        onCancel={() => {
          setIsModalAddOpen(false);
        }}
        footer={<></>}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={
            {
              // maxWidth: 600,
            }
          }
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
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
            label="Age"
            name="age"
            rules={[
              {
                required: true,
                message: "Please input your age!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your address!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Admin;
