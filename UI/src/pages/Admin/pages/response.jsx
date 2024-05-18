import React, { useState } from "react";
import {
  Dropdown,
  Flex,
  Select,
  message,
  Popconfirm,
  Space,
  Table,
  Tag,
  Typography
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export default function Response() {
  const { Title } = Typography;

  const handleDelete = (record) => {};
  const cancel = (e) => {
    message.error("Click on No");
  };

  const handleChange = (value) => {
    console.log("🚀 ~ handleChange ~ value:", value);
    setDataFilter(() => {
      if (+value === 2) {
        console.log("🚀 ~ setDataFilter ~ data:", data)
        return data;
      }
      return data.filter((d) => d.status === +value);
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space size="middle">
          <a
            className="aTagAntd"
            style={{ color: "blue" }}
            onClick={() => handleNameClick(record)}
          >
            {text}
          </a>
        </Space>
      )
    },
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
      render: (text) => (
        <Space size="middle">
          <a>{text || "-"}</a>
        </Space>
      )
    },
    {
      title: "Answer",
      dataIndex: "answer",
      key: "answer",
      render: (text) => (
        <Space size="middle">
          <a>{text || "-"}</a>
        </Space>
      )
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => (
        <Tag color={status ? "green" : "volcano"}>
          {status ? "Good" : "Bad"}
        </Tag>
      )
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => handleDelete(record)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined className="hover:text-emerald-700" />
          </Popconfirm>
          <EditOutlined className="hover:text-emerald-700" />
        </Space>
      )
    }
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      question: "Bạn có ngu ko?",
      answer: "Không",
      status: 0
    },
    {
      key: "2",
      name: "Jim Green",
      question: "Bạn có ngu ko?",
      answer: "Có",
      status: 1
    },
    {
      key: "3",
      name: "Joe Black",
      question: "Bạn có ngu ko?",
      answer: "Có",
      status: 1
    }
  ];

  const [dataFilter, setDataFilter] = useState(data);

  return (
    <Flex vertical style={{ margin: "0 24px" }}>
      <Title
        style={{
          marginBottom: 48,
          marginTop: 48
        }}
        level={2}
      >
        Quản lý câu hỏi
      </Title>

      <Space style={{ marginBottom: 48 }}>
        <Select
          defaultValue="2"
          style={{
            width: 120
          }}
          onChange={handleChange}
          options={[
            {
              value: "2",
              label: "All"
            },
            {
              value: "1",
              label: "Good"
            },
            {
              value: "0",
              label: "Bad"
            }
          ]}
        />
      </Space>
      <Table showSorterTooltip columns={columns} dataSource={dataFilter} />
    </Flex>
  );
}
