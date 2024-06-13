import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();

  const registerUser = async (values) => {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/v1/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      console.log(res.status);
      if (res.status === 200) {
        message.success("Login successful");
        navigate("/login"); // Redirect to dashboard after successful login
      } else if (res.status === 400) {
        setError(data.message);
      } else {
        message.error("Invalid Credentials");
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (values, location) => {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch(
        `http://localhost:5000/api/v1/users/login?lat=${location.latitude}&lon=${location.longitude}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const data = await res.json();
      console.log(res.status);
      if (res.status === 202) {
        message.success("Login successful");
        navigate("/candidate-dashboard"); // Redirect to dashboard after successful login
      } else if (res.status === 400) {
        setError(data.message);
      } else {
        message.error("Invalid Credentials");
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, registerUser, loginUser };
};

export default useSignup;
