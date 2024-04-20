"use client";
import React from "react";

import { Form, Input, Button, DatePicker, Upload, message, List } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { useState } from "react";

const result = [
  {
    title: "adwdwfq",
    author: "jnh",
    theme: "adf",
    date: "2024-4-1",
  },
  {
    title: "afd",
    author: "zed",
    theme: "godwaod",
    date: "2022-1-1",
  },
  {
    title: "feaw",
    author: "david",
    theme: "aodia",
    date: "2024-3-1",
  },
];
const StoryForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    // 在这里处理表单数据，如上传到服务器
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name="title" rules={[{ required: true }]}>
        <Input placeholder="Story Title" />
      </Form.Item>
      <Form.Item name="author" rules={[{ required: true }]}>
        <Input placeholder="Author" />
      </Form.Item>
      <Form.Item name="theme" rules={[{ required: true }]}>
        <Input placeholder="Theme" />
      </Form.Item>
      <Form.Item name="date" rules={[{ required: true }]}>
        <DatePicker />
      </Form.Item>
      <Form.Item name="content" rules={[{ required: true }]}>
        <Input.TextArea placeholder="Content" />
      </Form.Item>
      <Form.Item name="image">
        <Upload>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const SearchBox = ({ onSearch }) => {
  return (
    <Input.Search
      placeholder="Search stories"
      onSearch={onSearch}
      enterButton
      style={{ marginBottom: "30px" }}
    />
  );
};

export default function Story() {
  const [searchResults, setSearchResults] = useState([]);
  const [showForm, setShowForm] = useState(true);

  const handleSearch = (value) => {
    // 这里处理搜索逻辑，并更新搜索结果
    // 伪代码: setSearchResults(searchInServer(value));
    setSearchResults(result);

    setShowForm(false);
  };

  const handleBack = () => {
    // 清空搜索结果并显示表单
    setSearchResults([]);
    setShowForm(true);
  };
  return (
    <div
      style={{
        width: "50%",
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "space-between",
        // alignItems: "center",
      }}
    >
      {showForm ? (
        <>
          <SearchBox onSearch={handleSearch} />
          <StoryForm />
        </>
      ) : (
        <>
          <Button onClick={handleBack}>Back</Button>
          <List
            itemLayout="horizontal"
            dataSource={searchResults}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={item.title}
                  description={`${item.author}, ${item.theme}, ${item.date}`}
                />
              </List.Item>
            )}
          />
        </>
      )}
    </div>
  );
}
