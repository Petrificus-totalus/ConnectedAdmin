"use client";
import React, { useEffect } from "react";

import {
  Form,
  Input,
  Button,
  DatePicker,
  Upload,
  Select,
  Table,
  Spin,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { useState } from "react";
import moment from "moment";

import { useSession } from "next-auth/react";

const StoryForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    form.setFieldsValue({ date: moment() });
  }, [form]);

  const onFinish = async (values) => {
    setLoading(true);
    const formattedValues = {
      ...values,
      date: values.date.format("YYYY-MM-DD HH:mm:ss"),
      theme: values.theme,
      AdminID: session.user.AdminID,
    };

    try {
      const response = await fetch("/api/storypublish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedValues),
      });
      const { status } = await response.json();
      if (status === "success") {
        message.success("Story submitted successfully!");
      } else {
        message.error("Story submitted failed!");
      }
    } catch (error) {
      message.error("Failed to submit the story.");
    } finally {
      setLoading(false);
      form.resetFields();
    }
  };

  return (
    <Spin spinning={loading}>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="title" rules={[{ required: true }]}>
          <Input placeholder="Story Title" />
        </Form.Item>
        <Form.Item name="author" rules={[{ required: true }]}>
          <Input placeholder="Author" />
        </Form.Item>
        <Form.Item name="theme" rules={[{ required: true }]}>
          <Select placeholder="Select a theme">
            <Select.Option value="type1">Type 1</Select.Option>
            <Select.Option value="type2">Type 2</Select.Option>
            <Select.Option value="type3">Type 3</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="date">
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
    </Spin>
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

const columns = [
  {
    title: "AdminID",
    dataIndex: "AdminID",
    key: "AdminID",
  },
  {
    title: "Title",
    dataIndex: "Title",
    key: "Title",
  },
  {
    title: "UploadTime",
    dataIndex: "UploadTime",
    key: "UploadTime",
  },

  {
    title: "Type",
    dataIndex: "Type",
    key: "Type",
  },
  {
    title: "Author",
    dataIndex: "Author",
    key: "Author",
  },
  {
    title: "Content",
    dataIndex: "Content",
    key: "Content",
  },
];
export default function Story() {
  const [spin, setSpin] = useState(true);

  const [searchResults, setSearchResults] = useState([]);
  const [showForm, setShowForm] = useState(true);

  const handleSearch = async (value) => {
    setSpin(true);
    setShowForm(false);

    const response = await fetch("/api/stories");
    const { data } = await response.json();
    setSpin(false);
    setSearchResults(data);
  };

  const handleBack = () => {
    setSearchResults([]);
    setShowForm(true);
  };
  return (
    <div>
      {showForm ? (
        <div
          style={{
            width: "50%",
            padding: "30px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <SearchBox onSearch={handleSearch} />

          <StoryForm />
        </div>
      ) : (
        <>
          <Button
            style={{ margin: "10px", width: "100%" }}
            onClick={handleBack}
            type="primary"
          >
            Back
          </Button>
          <Spin spinning={spin}>
            <Table
              columns={columns}
              dataSource={searchResults}
              rowKey={searchResults.StoryID}
            />
          </Spin>
        </>
      )}
    </div>
  );
}
