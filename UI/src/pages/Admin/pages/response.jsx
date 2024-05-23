import React, { useState, useEffect } from "react";
import {
  Dropdown,
  Flex,
  Select,
  message,
  Popconfirm,
  Space,
  Table,
  Tag,
  Typography,
  Tooltip,
} from "antd";
import { httpClient } from "../../../api";
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
        console.log("🚀 ~ setDataFilter ~ data:", data);
        return data;
      }
      return data.filter((d) => d.status === +value);
    });
  };

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

  const columns = [
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
      render: (text) => (
        <Space size="middle">
           <Typography.Paragraph
            ellipsis={{
              rows: 2,
              expandable: "collapsible",
            }}
          >{text || "-"} </Typography.Paragraph>
        </Space>
      ),
      width: "30%",
    },
    {
      title: "Answer",
      dataIndex: "answer",
      key: "answer",
      render: (text) => (
        <Space size="middle">
          <Typography.Paragraph
            ellipsis={{
              rows: 2,
              expandable: "collapsible",
            }}
          >
            {text || "-"}
          </Typography.Paragraph>
        </Space>
      ),
      width: "60%",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => (
        <Tag color={status ? "green" : "volcano"}>
          {status ? "No response" : "Bad"}
        </Tag>
      ),
      width: "5%",
    },
    {
      title: "Action",
      key: "action",
      width: "5%",
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
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      question: "Bạn có ngu ko?",
      answer:
        " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam facilis officiis eum consequatur. Aliquam itaque ratione mollitia harum possimus. Iure perferendis quibusdam dolorem voluptas alias commodi aperiam dolorum fuga sunt?Aspernatur, obcaecati! Placeat, odio optio cupiditate reiciendis ut amet hic a omnis odit molestiae? Facere, incidunt consectetur sint, voluptatum hic veritatis dignissimos nulla at non ab nesciunt odit! Quisquam, id?Culpa consequuntur sed, excepturi assumenda enim eos iste pariatur doloribus praesentium maiores quasi sunt fugiat? Magnam ut sapiente pariatur, blanditiis quibusdam earum. Amet incidunt quae tenetur optio nesciunt ut. Rem!Commodi nobis enim veritatis culpa maiores fugit ut! Ipsa praesentium dolores nemo nulla molestiae eaque odit rem neque deserunt dolorem, eveniet vero voluptates unde cum magni excepturi! Impedit, pariatur dolore?Magni neque deleniti officia! Et inventore placeat ipsa at eaque asperiores aspernatur. Sequi, corporis beatae. Officiis voluptatibus necessitatibus voluptatum suscipit eveniet, numquam nisi doloribus dolore ipsum ad quibusdam sint blanditiis.",
      status: 0,
    },
    {
      key: "2",
      name: "Jim Green",
      question: "Bạn có ngu ko?",
      answer: "Có",
      status: 1,
    },
    {
      key: "3",
      name: "Joe Black",
      question: "Bạn có ngu ko?",
      answer: "Có",
      status: 1,
    },
  ];

  const [dataFilter, setDataFilter] = useState(data);

  return (
    <Flex vertical style={{ margin: "0 24px" }}>
      <Title
        style={{
          marginBottom: 48,
          marginTop: 48,
        }}
        level={2}
      >
        Quản lý câu hỏi
      </Title>

      <Space style={{ marginBottom: 48 }}>
        <Select
          defaultValue="2"
          style={{
            width: 120,
          }}
          onChange={handleChange}
          options={[
            {
              value: "2",
              label: "All",
            },
            {
              value: "1",
              label: "No response",
            },
            {
              value: "0",
              label: "Bad",
            },
          ]}
        />
      </Space>
      <Table showSorterTooltip columns={columns} dataSource={dataFilter} />
    </Flex>
  );
}
