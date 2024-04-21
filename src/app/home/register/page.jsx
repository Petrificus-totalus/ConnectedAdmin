"use client";
import React, { useState } from "react";
import { List, Button, Modal, Input } from "antd";

const { TextArea } = Input;

const mockApplications = [
  {
    id: 1,
    date: "2023-04-01",
    username: "user1",
    userId: "1001",
    fileInfo: "Document.pdf",
  },
  {
    id: 2,
    date: "2023-04-02",
    username: "user2",
    userId: "1002",
    fileInfo: "Image.png",
  },
  {
    id: 3,
    date: "2023-04-03",
    username: "user3",
    userId: "1003",
    fileInfo: "Video.mp4",
  },
];

export default function ApplicationList() {
  const [applications, setApplications] = useState(mockApplications);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentApplication, setCurrentApplication] = useState(null);
  const [reason, setReason] = useState("");
  const [isDisagree, setIsDisagree] = useState(false);

  const viewDetails = (application) => {
    setCurrentApplication(application);
    setIsModalVisible(true);
    setIsDisagree(false); // 查看详情时重置拒绝状态
  };

  const agreeApplication = () => {
    setApplications(
      applications.filter((app) => app.id !== currentApplication.id)
    );
    setIsModalVisible(false);
  };

  const disagreeApplication = () => {
    setIsDisagree(true); // 显示拒绝理由输入框
  };

  const submitDisagreement = () => {
    if (!reason) {
      alert("Please enter a reason for rejection.");
      return;
    }
    // 发送拒绝理由给用户（实现发送逻辑）
    setIsModalVisible(false);
    setReason("");
  };

  return (
    <>
      <List
        style={{ width: "60%" }}
        itemLayout="horizontal"
        dataSource={applications}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                key="list-loadmore-edit"
                onClick={() => viewDetails(item)}
              >
                Detail
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={item.username}
              description={`Time:${item.date} - UserID:${item.userId}`}
            />
          </List.Item>
        )}
      />
      <Modal
        title="Detail"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <p>File:{currentApplication?.fileInfo}</p>
        <Button
          type="primary"
          onClick={agreeApplication}
          style={{ marginRight: 8 }}
        >
          Agree
        </Button>
        <Button type="default" onClick={disagreeApplication}>
          Reject
        </Button>
        {isDisagree && (
          <>
            <TextArea
              rows={4}
              placeholder="Reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              style={{ marginTop: 16 }}
            />
            <Button
              type="primary"
              onClick={submitDisagreement}
              style={{ marginTop: 8 }}
            >
              Send
            </Button>
          </>
        )}
      </Modal>
    </>
  );
}
