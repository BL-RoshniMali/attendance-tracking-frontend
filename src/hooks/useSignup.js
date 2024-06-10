import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { message } from "antd";
import axios from "axios";

const useSignup = () => {
  // const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [latitude, setLatitude] = React.useState("");
  const [longitude, setLongitude] = React.useState("");

  const registerUser = async (values) => {
    // if(values.password !== values.passwordConfirm){
    //     return setError('Passwords are not same');
    // }
    try {
      setError(null);
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/v1/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      // const res = await axios.post('http://localhost:3000/api/v1/users/register', values)
      // console.log(res.data.message);

      const data = await res.json();
      console.log("Data", data);
      if (res.status === 200) {
        message.success(data.message);
        // login(data.token, data.user);
      } else if (res.status === 400) {
        setError(data.message);
      } else {
        message.error("Registration Failed");
      }
    } catch (error) {
      message.error(error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   handleLocation();
  // })

  // function handleLocation() {
  //   console.log("handle location called");
  //   navigator.geolocation.getCurrentPosition(showPosition);
  // }

  // function showPosition(position) {
  //   console.log("in position");
  //   const latitude = position.coords.latitude;
  //   const longitude = position.coords.longitude;
  //   // 12.914813708485358, 77.63880500067502
  //   setLatitude("12.914813708485358");
  //   setLongitude("77.63880500067502");
  // }

  const loginUser = async (values) => {
    console.log("login user function");
    const lat = 12.914750963878166;
    const lon = 77.63855823744244;
    try {
      setError(null);
      setLoading(true);
      // const res = await fetch("http://localhost:3000/api/v1/users/register", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(values),
      // });
      const res = await fetch("http://localhost:5000/api/v1/users/login/", {
          params: {
            lat: latitude,
            lon: longitude,
          },
          method: "POST",
          headers: {
                "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
        .then((res) => {
          console.log(res.data.data);
        //   navigate("/dashboard");
        })
        .catch((err) => {
          console.log(err.message);
        });
    //   console.log(res.data);
    //   const data = await res.json();
    //   console.log(data);
      if (res.status === 200) {
        console.log("login............");
        // message.success(data.message);
        // login(data.token, data.user);
      } else if (res.status === 400) {
        // setError(data.message);
      } else {
        message.error("Invalid Credentials");
      }
    } catch (error) {
      message.error(error);
    }
  };
  return { loading, error, registerUser, loginUser };
};

export default useSignup;
