"use client";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const onFinish = async (values) => {
    const formData = new FormData();
    for (var key in values) {
      formData.append(key, values[key]);
    }
    const response = await fetch("/api/login", {
      method: "POST",
      body: formData,
    });
    const res = await response.json();
    if (res.status === "failed") {
      message.error("Login failed");
    } else if (res.status === "success") {
      router.push("/home/usermanage");
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: "100px auto" }}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="Account"
          rules={[{ required: true, message: "Please input your Account!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Account"
          />
        </Form.Item>

        <Form.Item
          name="Password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
