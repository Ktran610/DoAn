import React, { Fragment, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";
import dtu_logo from "../../assets/img/dtu_logo.png";
import { httpClient } from "../../api";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Flex, Form, Input, message } from "antd";
import { LoginImg } from "../../assets/img";

function SetStorage(data) {
  localStorage.setItem("UserId", data.id);
  localStorage.setItem("UserName", data.userName);
  localStorage.setItem("RoleId", data.roleId);
  localStorage.setItem("Email", data.email);
  localStorage.setItem("Age", data.age);

  let chats = data.chats.map((value) => {
    return {
      id: value.id,
      name: value.name,
    };
  });

  localStorage.setItem("chats", JSON.stringify(chats));
}

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  const handleLogin = (data) => {
    console.log({ data });

    httpClient
      .post("Account/Login", data)
      .then((result) => {
        setIsLoading(true);
        let finalResult = result.data.value;
        console.log("FinalResult", finalResult.message);
        if (finalResult.data == null) {
          message.error(finalResult.message);
        } else {
          message.success(finalResult.message);
        }
        if (finalResult.data != null) {
          if (finalResult.data.roleId == 0) {
            navigate("/Admin");
          } else {
            SetStorage(finalResult.data);
            localStorage.setItem("isGuestUser", false);
            navigate("/");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // axios
    //     .post(url, data)
    //     .then((result) => {
    //         let finalResult = result.data.value;
    //         //localStorage.setItem('chats', JSON.stringify(finalResult.data))
    //         SetStorage(finalResult.data)
    //         alert(finalResult.message);
    //         if (finalResult.data != null){
    //             navigate("/")
    //         }
    //     })
    //     .catch((error) => {
    //         alert(error);
    //     });
  };

  const handleGuestLogin = () => {
    httpClient
      .post("Account/LoginWithGuest")
      .then((result) => {
        setIsLoading(true);
        let finalResult = result.data.value;
        console.log("FinalResultGuest", finalResult.data);
        message.success(finalResult.message);
        if (finalResult.data != null) {
          SetStorage(finalResult.data);
          localStorage.setItem("isGuestUser", true);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <Fragment>
      <div className="sign-in-up">
        <Flex gap={100}>
          <Flex vertical align="center">
            <div
              style={{
                color: "#f4371a",
                fontSize: 38,
                lineHeight: 4,
                fontWeight: 700,
              }}
            >
              Login
            </div>
            <img
              style={{
                width: 556,
                height: 369,
              }}
              src={LoginImg}
              alt=""
            />
          </Flex>
          <div>
            <div className="logo">
              <img
                style={{
                  width: 500,
                  height: 100,
                  marginBottom: 32,
                }}
                src={dtu_logo}
                alt="dtu_chatbot"
              />
            </div>
            <div className="logo_responsives">
              <img src="img/mobile_dtu_logo.png" alt="dtu_chatbot" />
            </div>

            <div
              style={{
                color: "#f4371a",
                fontSize: 25,
                lineHeight: 4,
                fontWeight: 700,
              }}
            >
              Tư Vấn Tuyển Sinh Đại Học Duy Tân
            </div>

            <Form onFinish={handleLogin}>
              <Form.Item
                name="userName"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter Name"
                  prefix={<UserOutlined />}
                />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: 42, marginTop: 42 }}
                name="passwordHash"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  style={{
                    height: 42,
                  }}
                  prefix={<LockOutlined />}
                  placeholder="Enter Password"
                />
              </Form.Item>

              <div>
                <Form.Item>
                  <Button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    loading={isLoading}
                    disabled={isLoading}
                    className="login-button"
                    htmlType="submit"
                  >
                    Login
                  </Button>
                </Form.Item>

                <Button
                  class="sign-btn guest-sign-in-btn"
                  style={{
                    marginTop: 26,
                    marginBottom: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  loading={isLoading}
                  disabled={isLoading}
                  className="login-button-guest"
                  onClick={() => handleGuestLogin()}
                >
                  Đăng nhập với Tư Cách Khách
                </Button>
              </div>
            </Form>

            {/* <Link href={"/login"}>
              <a className="login-forgot-pass">Forgot password</a>
            </Link> */}
            <br />

            <Link to="/Register" className="sign-link">
              <a className="login-forgot-pass">Register</a>
            </Link>
          </div>
        </Flex>
      </div>
    </Fragment>
  );
}

export default Login;
