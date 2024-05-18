import React, { Fragment, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";
import dtu_logo from "../../assets/img/dtu_logo.png";
import { httpClient } from "../../api";
import { Button } from "antd";

function SetStorage(data) {
  localStorage.setItem("UserId", data.id);
  localStorage.setItem("UserName", data.userName);
  localStorage.setItem("RoleId", data.roleId);

  let chats = data.chats.map((value) => {
    return {
      id: value.id,
      name: value.name,
    };
  });

  localStorage.setItem("chats", JSON.stringify(chats));
}

function Login() {
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
      PasswordHash: phoneNo,
    };

    httpClient
      .post("Account/Login", data)
      .then((result) => {
        setIsLoading(true);
        let finalResult = result.data.value;
        console.log("FinalResult", finalResult.message);
        alert(finalResult.message);
        if (finalResult.data != null) {
          SetStorage(finalResult.data);
          localStorage.setItem('isGuestUser', false)
          console.log("RoleId:", localStorage.getItem("RoleId"))
          console.log("Compare:", localStorage.getItem("RoleId") == 0)
          if(localStorage.getItem("RoleId") == 0){
            navigate("/Admin")
          }
          else{
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
        alert(finalResult.message);
        if (finalResult.data != null) {
          SetStorage(finalResult.data);
          localStorage.setItem('isGuestUser', true)
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
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
          <div className="group">
            <p>Name</p>
            <div className="box">
              <i className="fa-solid fa-user-plus"></i>
              <input
                type="text"
                id="txtName"
                placeholder="Enter Name"
                onChange={(e) => handleNameChange(e.target.value)}
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
          <a href="#!" class="forgot-passowrd">
            Quên Mật Khẩu?
          </a>

          <div class="sign-in-btn-group">
            <Button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              loading={isLoading}
              disabled={isLoading}
              className="sign-btn"
              onClick={() => handleLogin()}
            >
              Login
            </Button>
            {/* <a href="#!" class="sign-btn guest-sign-in-btn">
              Đăng Nhập Với Tư Cách Khách
            </a> */}

            <Button class="sign-btn guest-sign-in-btn"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              loading={isLoading}
              disabled={isLoading}
              className="sign-btn"
              onClick={() => handleGuestLogin()}
            >
              Đăng nhập với Tư Cách Khách
            </Button>
          </div>

          <span class="desc">Bạn chưa có tài khoản? </span>
          <Link to="/Register" className="sign-link">
            Đăng Ký
          </Link>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
