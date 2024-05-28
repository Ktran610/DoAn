import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.scss";
import dtu_logo from "../../assets/img/dtu_logo.png";
import { httpClient } from "../../api";
import { Button, Flex, Form, Input, InputNumber, message } from "antd";
import { LoginImg } from "../../assets/img";

function Registration() {
  const [isSubmittting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // const handleNameChange = (value) => {
  //   setName(value);
  // };
  // const handlePasswordChange = (value) => {
  //   setPassword(value);
  // };
  // const handleAddressChange = (value) => {
  //   setAddress(value);
  // };
  // const handleAgeChange = (value) => {
  //   setAge(value);
  // };
  // const handleEmailChange = (value) => {
  //   setEmail(value);
  // };
  // const handlePhoneNumberChange = (value) => {
  //   setPhoneNumber(value);
  // }; -> TRASH

  const [form] = Form.useForm();

  const handleSubmit = (formData) => {
    console.log({ formData });
    setIsSubmitting(true);
    httpClient
      .post("Account/Register", { ...formData, roleId: 1 })
      .then((res) => {
        if (res.data.value.success) {
          if (res.data.value.data != null) {
            message.success(res.data.value.message);
            navigate("/login"); // route k viet hoa
          }
        } else {
          message.warning(res.data.value.message);
        }
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setIsSubmitting(false);
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
              Register
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
          <div className="sign-in-up-box">
            <div className="logo">
              <img src={dtu_logo} alt="dtu_chatbot" />
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

            <Form
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 24,
              }}
              onFinish={handleSubmit}
            >
              <Form.Item
                label="Username"
                name="userName"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="passwordHash"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  {
                    min: 8,
                    message:
                      "Please enter a password of more than 8 characters",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["passwordHash"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("passwordHash") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="Age"
                name="age"
                rules={[
                  {
                    required: true,
                    message: "Please input your age!",
                  },
                  {
                    type: "number",
                    min: 10,
                    max: 100,
                    message: "Enter age from 10 to 100",
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                  {
                    type: "email",
                    message: "Please input valid Email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 6,
                  span: 18,
                }}
              >
                <Button
                  loading={isSubmittting}
                  className="login-button"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  type="primary"
                  htmlType="submit"
                >
                  Register
                </Button>
              </Form.Item>
            </Form>

            <span className="desc">Bạn đã có tài khoản? </span>
            {/* <a href="#!" className="sign-link">
                        Đăng Nhập
                    </a> */}
            <Link to="/Login" className="sign-link">
              Đăng Nhập
            </Link>
          </div>
        </Flex>
      </div>
    </Fragment>
  );
}
export default Registration;
