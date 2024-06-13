import React, { useState } from "react";
import './Register.css';
import {
  Card,
  Flex,
  Form,
  Typography,
  Input,
  Button,
  Alert,
  Spin,
  Radio,
} from "antd";
import { Link } from "react-router-dom";
import registerImage from "../assets/register.gif";
import useSignup from "../hooks/useSignup";

const Register = () => {
  const { loading, error, registerUser } = useSignup();
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    role: "",
    lab: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "username") {
      setUser((prevUser) => ({
        ...prevUser,
        username: e.target.value,
      }));
    }
    if (e.target.name === "email") {
      setUser((prevUser) => ({
        ...prevUser,
        email: e.target.value,
      }));
    }
    if (e.target.name === "password") {
      setUser((prevUser) => ({
        ...prevUser,
        password: e.target.value,
      }));
    }
    if (e.target.name === "role") {
      setUser((prevUser) => ({
        ...prevUser,
        role: e.target.value,
      }));
    }
    if (e.target.name === "lab") {
      setUser((prevUser) => ({
        ...prevUser,
        lab: e.target.value,
      }));
    }
  };

  const handleRegistration = () => {
    console.log(user);
    registerUser(user);
  };

  return (
    <Card className="form-container">
      <Flex gap="large" align="center">
        <Flex vertical flex={1}>
          {/* Heading  */}
          <Typography.Title level={3} strong className="title">
            Create an Account
          </Typography.Title>
          <Typography.Text type="secondary" strong className="sub-title">
            Welcome to the Portal
          </Typography.Text>
          {/* form container  */}
          <Form
            layout="vertical"
            onFinish={handleRegistration}
            autoComplete="off"
          >
            <Form.Item
              label="Full Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Field is required",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter your full name"
                onChange={handleChange}
                name="username"
              />
            </Form.Item>

            <Form.Item
              label="Email Id"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Field is required",
                },
                {
                  type: "email",
                  message: "This input is not valid Email!",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter your mail Id"
                onChange={handleChange}
                name="email"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Field is required",
                },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Enter your password"
                onChange={handleChange}
                name="password"
              />
            </Form.Item>

            <Form.Item
              label="Role"
              name="role"
              rules={[
                {
                  required: true,
                  message: "Field is required",
                },
              ]}
            >
              <Radio.Group
                onChange={handleChange}
                value={user.role}
                name="role"
              >
                <Radio value={"Admin"}>Admin</Radio>
                <Radio value={"Candidate"}>Candidate</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Lab"
              name="lab"
              rules={[
                {
                  required: true,
                  message: "Field is required",
                },
              ]}
            >
              <Radio.Group onChange={handleChange} value={user.lab} name="lab">
                <Radio value={"Mumbai-Lab"}>Mumbai-Lab</Radio>
                <Radio value={"Bangalore-Lab"}>Bangalore-Lab</Radio>
              </Radio.Group>
            </Form.Item>
            {error && (
              <Alert
                description={error}
                type="error"
                showIcon
                closable
                className="alert"
              ></Alert>
            )}

            <Form.Item>
              <Button
                ype={`${loading ? "" : "primary"}`}
                htmlType="submit"
                size="large"
                className="btn"
              >
                {loading ? <Spin /> : "Create Account"}
              </Button>
            </Form.Item>
            <Form.Item size="large">
              <Link to="/login">
                <Button size="large" className="btn">
                  Sign In
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </Flex>
        <Flex flex={1}>
          <img src={registerImage} className="auth-image" />
        </Flex>
      </Flex>
    </Card>
  );
};

export default Register;
