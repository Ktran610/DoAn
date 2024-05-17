import React from "react";
import bot_icon from "../../assets/img/bot.png";
import user_icon from "../../assets/img/user.png";
import dtu_logo from "../../assets/img/dtu_logo.png";
import "./index.scss";
import { Search } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import api from "../../api";
import { useLocation } from "react-router-dom"
import { Table, Modal, Button, Flex, Input, Typography } from 'antd';
const Admin = () => {
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'action',
            render: (_, { tags }) => (
              <>
                <Button type="primary" style={{marginRight: 10}} onClick={() => showModalEdit()}>Chỉnh sửa</Button>
                <Button type="primary" danger onClick={() => showModalDelete()}>Xóa</Button>
              </>
            ),
          },
      ];
    
    const data = [];
    for (let i = 0; i < 46; i++) {
      data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
      });
    }
    
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
        setIsModalDeleteOpen(false)
    }
    const addMember = () => {
        //call API add 
        setIsModalAddOpen(false)
    }
    
    return (
        <>
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <nav
                        class="sb-sidenav accordion sb-sidenav-light"
                        id="sidenavAccordion"
                    >
                        <div class="sb-sidenav-menu">
                            <div class="nav">
                            </div>
                            <Button type="primary" style={{marginRight: 10}} onClick={()=>{setIsModalAddOpen(true)}}>Thêm</Button>
                        </div>
                    </nav>
                </div>
                <div id="layoutSidenav_content">
                    <main>
                        <div class="container-fluid px-4">
                            <h1 class="my-4">Quản Lý Tài Khoản Người Dùng</h1>
                            <Table  columns={columns} dataSource={data} />
                        </div>
                    </main>
                </div>
            </div>
            <Modal title="Chỉnh sửa" open={isModalEditOpen} onOk={handleOk} onCancel={handleCancel}>
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
                        <Typography.Title level={5}>Address</Typography.Title>
                        <Input defaultValue="" />
                    </div>
                </div>
            </Modal>
            <Modal title="Xóa" open={isModalDeleteOpen} onOk={deleteMember} onCancel={() => {setIsModalDeleteOpen(false)}}>
                <p>Bạn có chắc chắn muốn xóa ?</p>
            </Modal>
            <Modal title="Thêm" open={isModalAddOpen} onOk={addMember} onCancel={() => {setIsModalAddOpen(false)}}>
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
                        <Typography.Title level={5}>Address</Typography.Title>
                        <Input defaultValue="" />
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Admin;