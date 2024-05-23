import {
  LaptopOutlined,
  LogoutOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Flex, Menu, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Layout(props) {
  const navigate = useNavigate()

  const items1 = ["Accounts", "Response", "Cost"].map((key, index) => ({
    key,
    label: (
      <Link to={index === 0 ? "/admin" : `/admin/${key.toLowerCase()}`}>
        {key}
      </Link>
    ),
  }));

  return (
    <>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["Accounts"]}
          items={items1}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
        <Menu
          theme="dark"
          mode="horizontal"
          items={[
            {
              key: 1,
              label: <Avatar icon={<UserOutlined />} />,
              children: [
                {
                  label: (
                    <Flex
                      onClick={() => {
                        localStorage.clear();
                        navigate("/login")
                      }}
                      gap={12}
                    >
                      <LogoutOutlined /> <Space>Sign out</Space>
                    </Flex>
                  ),
                  key: "setting:1",
                },
              ],
            },
          ]}
        />
      </Header>
      {props.children}
    </>
  );
}
