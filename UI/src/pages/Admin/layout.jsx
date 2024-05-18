import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Avatar, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Layout(props) {
  useEffect(() => {}, []);

  const items1 = ["Accounts", "Response", "Cost"].map((key, index) => ({
    key,
    label: (
      <Link to={index === 0 ? "/admin" : `/admin/${key.toLowerCase()}`}>
        {key}
      </Link>
    )
  }));

  return (
    <>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
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
            minWidth: 0
          }}
        />
        <Menu
          theme="dark"
          mode="horizontal"
          items={[
            {
              key: 1,
              label: <Avatar icon={<UserOutlined />} />
            }
          ]}
        />
      </Header>
      {props.children}
    </>
  );
}
