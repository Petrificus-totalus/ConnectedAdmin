"use client";
import React, { useState } from "react";
import { Table, Button, Tag, Modal, Typography } from "antd";

const { Text } = Typography;

const initialComplaints = [
  {
    key: "1",
    name: "A",
    status: "Unsolved",
    description: "Cannot log in",
  },
  {
    key: "2",
    name: "B",
    status: "Processing",
    description: "Payment failed",
  },
  {
    key: "3",
    name: "C",
    status: "Done",
    description: "Account prohibited",
  },
];

const Feedback = () => {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentComplaint, setCurrentComplaint] = useState(null);

  const showModal = (record) => {
    setCurrentComplaint(record);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setComplaints(
      complaints.map((comp) => {
        if (comp.key === currentComplaint.key) {
          return { ...comp, status: "Done" };
        }
        return comp;
      })
    );
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    { title: "UserName", dataIndex: "name", key: "name" },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => (
        <Tag
          color={
            status === "Done"
              ? "green"
              : status === "Processing"
              ? "orange"
              : "volcano"
          }
        >
          {status}
        </Tag>
      ),
    },
    { title: "Info", dataIndex: "description", key: "description" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => showModal(record)}>
          Detail
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={complaints} columns={columns} />
      <Modal
        title="Detail"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {currentComplaint && (
          <div>
            <p>
              <Text strong>Username: </Text>
              {currentComplaint.name}
            </p>
            <p>
              <Text strong>Status: </Text>
              {currentComplaint.status}
            </p>
            <p>
              <Text strong>Desc: </Text>
              {currentComplaint.description}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Feedback;
