import React, { useState } from "react";
import { Card, Flex, Form, Typography, Input, Button, Alert, Spin } from "antd";
import { Link } from "react-router-dom";
import LoginImage from "../assets/login.gif";
import useSignup from "../hooks/useSignup";
import axios from "axios";

const Login = () => {
  const { loading } = useSignup();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);

  const getLocationAndLogin = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPositionAndLogin, showError);
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const showPositionAndLogin = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({
      latitude,
      longitude,
    });
    setError(null);
    loginUser(latitude, longitude);
  };

  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setError("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        setError("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        setError("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        setError("An unknown error occurred.");
        break;
      default:
        setError("An unknown error occurred.");
    }
  };

  const loginUser = async (latitude, longitude) => {
    // getLocationAndLogin();
    try{
      const res = await fetch( `http://localhost:5000/api/v1/users/login?lat=${latitude}&lon=${longitude}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password})
      });
        console.log("Login successful", res.data);
    }
    catch(error){
      console.error("Error logging in", error.message);
    }
    
    // try {
    //   const response = await axios.post(
    //     `http://localhost:5000/api/v1/users/login?lat=${latitude}&lon=${longitude}`,
    //     { email, password }
    //   );
    //   console.log("Login successful", response.data);
    // } catch (error) {
    //   console.error("Error logging in", error);
    // }
  };

  // const handleChange = (e) => {
  //   if (e.target.name === "email") {
  //     setUser((prevUser) => ({
  //       ...prevUser,
  //       email: e.target.value,
  //     }));
  //   }
  //   if (e.target.name === "password") {
  //     setUser((prevUser) => ({
  //       ...prevUser,
  //       password: e.target.value,
  //     }));
  //   }
  // };

  // const handleLogin = (user) => {
  //   console.log(user);
  //   loginUser(user);
  // };

  return (
    <Card className="form-container">
      <Flex gap="large" align="center">
        <Flex flex={1}>
          <img src={LoginImage} className="auth-image" />
        </Flex>
        <Flex vertical flex={1}>
          <Typography.Title level={3} strong className="title">
            Sign In
          </Typography.Title>
          <Typography.Text type="secondary" strong className="sub-title">
            Unlock your world
          </Typography.Text>
          <Form layout="vertical" autoComplete="off">
            <Form.Item
              label="Emain Id"
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
                placeholder="Enter your full name"
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                name="password"
              />
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
                type={`${loading ? "" : "primary"}`}
                htmlType="submit"
                size="large"
                className="btn"
                onClick={getLocationAndLogin}
              >
                {loading ? <Spin /> : ""}
                Sign In
              </Button>
            </Form.Item>
            {error ? (
              <p>{error}</p>
            ) : (
              location.latitude &&
              location.longitude && (
                <p>
                  Latitude: {location.latitude} <br />
                  Longitude: {location.longitude}
                </p>
              )
            )}
            <Form.Item size="large">
              <Link to="/">
                <Button size="large" className="btn">
                  Create an Account
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
    </Card>
  );
};

export default Login;
