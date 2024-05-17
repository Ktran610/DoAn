import React from "react";
import SideBar from "../Sidebar";
import { Layout, Flex } from "antd";
const { Sider, Content } = Layout;

const siderStyle = {
    // color: "#fff",
    // backgroundColor: "#1677ff",
};

const contentStyle = {
    // textAlign: "center",
    // color: "#fff",
    // backgroundColor: "#0958d9",
};

const layoutStyle = {
    overflow: "hidden",
    height: "100vh",
};

const DefaultLayout = ({ children }) => {
    return (
        <Flex gap="middle" wrap="wrap">
            <Layout style={layoutStyle}>
                <Sider width="25%" style={siderStyle}>
                    <SideBar />
                </Sider>
                <Content style={contentStyle}>{children}</Content>
            </Layout>
        </Flex>
    );
};

export default DefaultLayout;
