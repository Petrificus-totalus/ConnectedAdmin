"use client";
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message, Spin } from "antd";

const UserManage = () => {
  const [spin, setSpin] = useState(true);
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUserID, setEditingUserID] = useState(null);
  const [form] = Form.useForm();
  useEffect(() => {
    const getUser = async () => {
      setSpin(true);
      const response = await fetch("/api/users");
      const res = await response.json();
      const { data } = res;
      setUsers(data);
      setSpin(false);
    };
    getUser();
  }, []);
  const columns = [
    {
      title: "User ID",
      dataIndex: "UserID",
      key: "UserID",
    },
    {
      title: "Account",
      dataIndex: "Account",
      key: "Account",
    },
    {
      title: "Access",
      dataIndex: "Access",
      key: "Access",
    },
    {
      title: "AdminID",
      dataIndex: "AdminID",
      key: "AdminID",
    },
    {
      title: "Password",
      dataIndex: "Password",
      key: "Password",
    },
    {
      title: "CreateDate",
      dataIndex: "CreateDate",
      key: "CreateDate",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => {
            setEditingUserID(record.UserID);
            setIsModalVisible(true);
            form.setFieldsValue(record);
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
      .then(async (values) => {
        const formData = new FormData();
        for (var key in values) {
          formData.append(key, values[key]);
        }
        formData.append("UserID", editingUserID);
        await fetch("/api/user", {
          method: "PUT",
          body: formData,
        });
        window.location.reload();
        setIsModalVisible(false);
        message.success("User updated successfully");
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <div>
      <Spin spinning={spin}>
        <Table columns={columns} dataSource={users} rowKey="UserID" />
      </Spin>

      <Modal
        title="Edit User"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="Account"
            label="Account"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="Password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="Access" label="Access" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManage;
