"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Button, Col, Form, Input, Typography, message } from "antd";
import axios from "axios";
import { setItem } from "@src/utils/localStorage";
import { API_BASE_URL } from "@src/utils/contants";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const Login = () => {
  const [form] = Form.useForm();
  const { push } = useRouter();
  const [isloading, setIsLoading] = useState(false);

  const onFinish = (values) => {
    const { email, password } = values;
    axios
      .post(`${API_BASE_URL}/user/login`, { email, password })
      .then((response) => {
        // Handle
        if (response.status === 200) {
          message.success("Login successful");
          setItem("token", response.data.token);
          setIsLoading(false);
          push("/form");
        }
      })
      .catch((error) => {
        // Handle error
        message.error("Error during login:", error);
        setIsLoading(false);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // Make sure the form covers the entire viewport height
      }}
    >
      {/* <PageHeader className="site-page-header" title="Login Page" /> */}

      <Form
        // {...formItemLayout}
        layout="vertical"
        form={form}
        name="Login"
        onFinish={onFinish}
        style={{
          maxWidth: 400,
          width: "100%", // Make sure the form takes the full width
          padding: "20px", // Add some padding for better appearance
          backgroundColor: "#fff", // Set a background color if needed
          borderRadius: "8px", // Add some border radius for rounded corners
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
        scrollToFirstError
      >
        <Typography.Title level={2} style={{ textAlign: "center" }}>
          Login Page
        </Typography.Title>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            loading={isloading}
            disabled={isloading}
            block
            type="primary"
            htmlType="submit"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
