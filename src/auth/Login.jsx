import React, { useState } from "react";
import './Login.css';
import { Card, Flex, Form, Typography, Input, Button, Alert, Spin } from "antd";
import { Link } from "react-router-dom";
import LoginImage from "../assets/login.gif";
import useSignup from "../hooks/useSignup";

const Login = () => {
  const { loading, error, loginUser } = useSignup();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [geoError, setGeoError] = useState(null);

  const getLocationAndLogin = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPositionAndLogin, showError);
    } else {
      setGeoError("Geolocation is not supported by this browser.");
    }
  };

  const showPositionAndLogin = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({
      latitude,
      longitude,
    });
    setGeoError(null);
    loginUser(credentials, { latitude, longitude });
  };

  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setGeoError("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        setGeoError("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        setGeoError("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        setGeoError("An unknown error occurred.");
        break;
      default:
        setGeoError("An unknown error occurred.");
    }
  };

  // const loginUser = async (latitude, longitude) => {
  //   // getLocationAndLogin();
  //   try{
  //     const res = await fetch( `http://localhost:5000/api/v1/users/login?lat=${latitude}&lon=${longitude}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({email, password})
  //     });
  //       console.log("Login successful", res.data);
  //   }
  //   catch(error){
  //     console.error("Error logging in", error.message);
  //   }

  // try {
  //   const response = await axios.post(
  //     `http://localhost:5000/api/v1/users/login?lat=${latitude}&lon=${longitude}`,
  //     { email, password }
  //   );
  //   console.log("Login successful", response.data);
  // } catch (error) {
  //   console.error("Error logging in", error);
  // }


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

const handleChange = (e) => {
  setCredentials((prevCredentials) => ({
    ...prevCredentials,
    [e.target.name]: e.target.value,
  }));
};

return (
  <Card className="form-container">
    <div style={{ display: "flex", gap: "large", alignItems: "center" }}>
      <div style={{ flex: 1 }}>
        <img src={LoginImage} alt="Login" className="auth-image" />
      </div>
      <div style={{ flex: 1, flexDirection: "column" }}>
        <Typography.Title level={3} className="title">
          Sign In
        </Typography.Title>
        <Typography.Text type="secondary" className="sub-title">
          Unlock your world
        </Typography.Text>
        <Form layout="vertical" autoComplete="off">
          <Form.Item
            label="Email"
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
              placeholder="Enter your email"
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

          {geoError && (
            <Alert
              description={geoError}
              type="error"
              showIcon
              closable
              className="alert"
            />
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="btn"
              onClick={getLocationAndLogin}
              loading={loading}
            >
              Sign In
            </Button>
          </Form.Item>

          <Form.Item size="large">
            <Link to="/">
              <Button size="large" className="btn">
                Create an Account
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  </Card>
);

}


export default Login;
