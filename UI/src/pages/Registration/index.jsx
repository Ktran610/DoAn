import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.scss";
import dtu_logo from "../../assets/img/dtu_logo.png";
import { httpClient } from "../../api";
import { Flex, Input } from "antd";

function Registration() {
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (value) => {
    setName(value);
  };
  const handlePhoneNOChange = (value) => {
    setPhoneNo(value);
  };
  const handleAddressChange = (value) => {
    setAddress(value);
  };
  const handleAgeChange = (value) => {
    setAge(value);
  };
  const handleEmailChange = (value) => {
    setEmail(value);
  };
  const handleSave = () => {
    const data = {
      userName: name,
      passwordHash: phoneNo,
      roleId: 0,
    };
    httpClient
      .post("Account/Register", data)
      .then((res) => {
        console.log("Res", res);
        alert(res.data.value.message);
        if (res.data.value.data != null) {
          navigate("/Login");
        }
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <Fragment>
      <div className="sign-in-up">
        <div className="sign-in-up-box">
          <div className="logo">
            <img src={dtu_logo} alt="dtu_chatbot" />
          </div>
          <div className="logo_responsives">
            <img src="img/mobile_dtu_logo.png" alt="dtu_chatbot" />
          </div>

          <div className="title">ChatDTU Tư Vấn Tuyển Sinh Đại Học Duy Tân</div>
          <div className="create-account">Tạo Tài Khoản</div>
          <div className="group">
            <Flex align="center" gap={16}>
              <i className="fa-solid fa-user-plus"></i>
              <p>Name</p>
            </Flex>
            <div className="box">
              <input
                type="text"
                id="txtName"
                placeholder="Enter Name"
                onChange={(e) => handleNameChange(e.target.value)}
              />
            </div>
          </div>
          <div className="group">
            <Flex>
            <i class="fa-regular fa-calendar-days"></i>
            <p>Age</p>
            </Flex>
            
            <div className="box">
              
              <input
                type="number"
                id="age"
                placeholder="Enter Age"
                onChange={(e) => handleAgeChange(e.target.value)}
              />
            </div>
          </div>
          <div className="group">
            <p>Email</p>
            <div className="box">
              <i class="fa-solid fa-envelope"></i>
              <input
                type="email"
                id="email"
                placeholder="Enter Email"
                onChange={(e) => handleEmailChange(e.target.value)}
              />
            </div>
          </div>
          <div className="group">
            <p>Password</p>
            <div className="box">
              <i class="fa-solid fa-lock"></i>
              <input
                type="password"
                id="txtPhoneNo"
                placeholder="Enter Password"
                onChange={(e) => handlePhoneNOChange(e.target.value)}
              />
            </div>
          </div>
          <div className="group">
            <p>Password</p>
            <div className="box">
              <i class="fa-solid fa-lock"></i>
              <input
                type="password"
                id="txtAddress"
                placeholder="Enter Password again"
                onChange={(e) => handleAddressChange(e.target.value)}
              />
            </div>
          </div>
          <button className="sign-btn" onClick={() => handleSave()}>
            Đăng Ký
          </button>
          <span className="desc">Bạn đã có tài khoản? </span>
          {/* <a href="#!" className="sign-link">
                        Đăng Nhập
                    </a> */}
          <Link to="/Login" className="sign-link">
            Đăng Nhập
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
export default Registration;
