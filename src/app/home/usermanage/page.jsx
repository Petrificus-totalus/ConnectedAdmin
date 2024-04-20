"use client";
import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";

const { Option } = Select;

// 模拟用户数据
const mockUsers = [
  {
    id: 1,
    username: "User1",
    status: "normal",
    password: "pass123",
    age: 28,
    address: "Address 1",
  },
  {
    id: 2,
    username: "User2",
    status: "muted",
    password: "pass456",
    age: 32,
    address: "Address 2",
  },
  {
    id: 3,
    username: "User3",
    status: "banned",
    password: "pass789",
    age: 24,
    address: "Address 3",
  },
];

const UserManage = () => {
  const [users, setUsers] = useState(mockUsers);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: "User ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const statusColor = {
          normal: "green",
          muted: "orange",
          banned: "red",
        }[status];
        return <span style={{ color: statusColor }}>{status}</span>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          onClick={() => {
            setEditingUser(record);
            setIsModalVisible(true);
            form.setFieldsValue(record);
            console.log(record);
          }}
        >
          Edit
        </Button>
      ),
    },
  ];

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const newUsers = users.map((user) => {
          if (user.id === editingUser.id) {
            return { ...user, ...values };
          }
          return user;
        });
        setUsers(newUsers);
        setIsModalVisible(false);
        message.success("User updated successfully");
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <div>
      <Table columns={columns} dataSource={users} rowKey="id" />
      <Modal
        title="Edit User"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Option value="normal">Normal</Option>
              <Option value="muted">Muted</Option>
              <Option value="banned">Banned</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="age" label="Age" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManage;
