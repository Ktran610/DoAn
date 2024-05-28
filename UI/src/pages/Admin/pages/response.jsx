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
  Spin,
} from "antd";
import { httpClient } from "../../../api";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export default function Response() {
  const { Title } = Typography;
  const [isFetching, setIsFetching] = useState(true);
  const [initialData, setInitialData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);

  const handleDelete = (record) => {};
  const cancel = (e) => {
    message.error("Click on No");
  };

  const handleChange = (value) => {
    setDataFilter(() => {
      if (+value === 2) {
        return initialData;
      }
      return initialData.filter((d) => d.status === +value);
    });
  };

  useEffect(() => {
    setIsFetching(true);
    httpClient
      .get("ChatDetail/getallchatdetails")
      .then((result) => {
        let finalResult = [];
        finalResult = result.data.data;
        const newData = finalResult.map((data) => ({
          ...data,
          status: +data.status,
          key: data.id,
        }));

        setDataFilter(newData);
        setInitialData(newData);
      })
      .catch((error) => {})
      .finally(() => {
        setIsFetching(false);
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
          >
            {text || "-"}{" "}
          </Typography.Paragraph>
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
      width: "10%",
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   width: "5%",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <Popconfirm
    //         title="Delete the task"
    //         description="Are you sure to delete this task?"
    //         onConfirm={() => handleDelete(record)}
    //         onCancel={cancel}
    //         okText="Yes"
    //         cancelText="No"
    //       >
    //         <DeleteOutlined className="hover:text-emerald-700" />
    //       </Popconfirm>
    //       <EditOutlined className="hover:text-emerald-700" />
    //     </Space>
    //   ),
    // },
  ];

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
      {isFetching ? (
        <Spin />
      ) : (
        <Table showSorterTooltip columns={columns} dataSource={dataFilter} />
      )}
    </Flex>
  );
}
