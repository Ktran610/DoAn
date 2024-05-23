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
  UserOutlined
} from "@ant-design/icons";
import { Button, Flex, Input, message } from "antd";
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
      name: value.name
    };
  });

  localStorage.setItem("chats", JSON.stringify(chats));
}

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  const handleNameChange = (value) => {
    setName(value);
  };
  const handlePhoneNOChange = (value) => {
    setPhoneNo(value);
  };
  const handleLogin = () => {
    const data = {
      UserName: name,
      PasswordHash: phoneNo
    };

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
          SetStorage(finalResult.data);
          localStorage.setItem("isGuestUser", false);
          console.log("RoleId:", localStorage.getItem("RoleId"));
          console.log("Compare:", localStorage.getItem("RoleId") == 0);
          if (localStorage.getItem("RoleId") == 0) {
            navigate("/Admin");
          } else {
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
          <img
            style={{
              width: 556,
              height: 369
            }}
            src={LoginImg}
            alt=""
          />
          <div>
            <div className="logo">
              <img
                style={{
                  width: 500,
                  height: 100,
                  marginBottom: 32
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
                fontWeight: 700
              }}
            >
              ChatDTU Tư Vấn Tuyển Sinh Đại Học Duy Tân
            </div>
            <div className="group">
              <div className="box">
                {/* <i className="fa-solid fa-user-plus"></i> */}
                <Input
                  size="large"
                  placeholder="Enter Name"
                  prefix={<UserOutlined />}
                  onChange={(e) => handleNameChange(e.target.value)}
                />
                {/* <input
                type="text"
                id="txtName"
                placeholder="Enter Name"
                onChange={(e) => handleNameChange(e.target.value)}
              /> */}
              </div>
            </div>
            <div style={{ marginTop: 26, marginBottom: 26 }} className="group">
              <div className="box">
                <Input.Password
                  size="large"
                  prefix={<LockOutlined />}
                  id="txtPhoneNo"
                  placeholder="Enter Password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  visibilityToggle={{
                    visible: passwordVisible,
                    onVisibleChange: setPasswordVisible
                  }}
                  onChange={(e) => handlePhoneNOChange(e.target.value)}
                />
              </div>
            </div>
            {/* <a href="#!" class="forgot-passowrd">
              Quên Mật Khẩu?
            </a> */}

            <div>
              <Button
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                loading={isLoading}
                disabled={isLoading}
                className="login-button"
                onClick={() => handleLogin()}
              >
                Login
              </Button>

              <Button
                class="sign-btn guest-sign-in-btn"
                style={{
                  marginTop: 26,
                  marginBottom: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                loading={isLoading}
                disabled={isLoading}
                className="login-button-guest"
                onClick={() => handleGuestLogin()}
              >
                Đăng nhập với Tư Cách Khách
              </Button>
            </div>

            <Link href={"/login"}>
              <a className="login-forgot-pass">Forgot password</a>
            </Link>
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
