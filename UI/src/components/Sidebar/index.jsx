import React, { useState, useEffect } from "react";
import "./index.scss";
import dtu_logo from "../../assets/img/dtu_logo.png";
import avatar from "../../assets/img/user123.png";
import hau_account from "../../assets/img/hau_account.png";
import { SquarePen } from "lucide-react";
import dataSidebar from "../../data/dataSidebar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { httpClient } from "../../api";
import { EditOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Modal, Typography } from "antd";
import Chat from "./Chat";

function ChatList(props) {
  const { chatList, setChatList } = props;


  const handleDelete = (questionId) => {
    setChatList((prev) => prev.filter((chat) => chat.id !== questionId));
    httpClient
      .delete("Chat/DeleteChatById?id=" + questionId)
      .then((result) => {
        console.log("data", result.data.data);
        let finalResult = result.data.value;
        console.log("Finalresult", finalResult);
      })
      .catch((error) => {
        alert(error);
      });
  };

 

  return (
    <div>
      {chatList.length ? (
        chatList.map((request) => (
         <Chat request={request} onDelete={handleDelete} setChatList={setChatList}/>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
}

const SideBar = () => {
  const [history, setHistory] = useState(dataSidebar);
  const [flag, setFlag] = useState(false);
  const [isShowPopupSetting, setIsShowPopupSetting] = useState(false);
  const [isModalEditSetting, setIsModalEditSetting] = useState(false);
  let navigate = useNavigate();
  

  useEffect(() => {
    let request = localStorage.getItem("UserId");
    console.log("AccountId", request);
    if (request == null) return;
    httpClient
      .get("Chat/GetChatsByAccountId?id=" + request)
      .then((result) => {
        console.log("data", result.data.data);
        let finalResult = result.data.value;
        console.log("Finalresult", finalResult);
        let data = result.data.data.map((value) => {
          return {
            id: value.id,
            name: value.name,
          };
        });
        console.log("data", data);
        setHistory([...data]);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  function handleCreateNewChat(props) {
    let userId = localStorage.getItem("UserId");
    // console.log("UserId", userId == null)
    // if (userId == null) {
    //   const tempChat = {
    //     name: "New Guest DTU Chat",
    //     id: localStorage.getItem("UserId"),
    //   };
    //   setHistory((prevState) => {
    //     let temp = [tempChat, ...prevState];
    //     console.log("Temp:", temp);
    //     console.log("Prev:", prevState);
    //     return temp;
    //   });
    //   return;
    // }

    let isGuestUser = JSON.parse(localStorage.getItem("isGuestUser"));
    let request = {
      name: "New DTU Chat",
      accountId: localStorage.getItem("UserId"),
    };
    if (isGuestUser == true) {
      request.name = "New Guest DTU Chat";
    }
    if (userId != null) {
      httpClient
        .post("Chat/CreateChat", request)
        .then((result) => {
          console.log("data", result.data.data);
          let finalResult = result.data.value;
          console.log("Finalresult", finalResult);
          setHistory((prevState) => {
            let temp = [
              { id: result.data.data.id, name: result.data.data.name },
              ...prevState,
            ];
            console.log("Temp:", temp);
            console.log("Prev:", prevState);
            return temp;
          });
        })
        .catch((error) => {
          alert(error);
        });
    }
  }
  const handleCancelSetting = () => {
    setIsModalEditSetting(!isModalEditSetting)
  }

  function removeUserStorage(data) {
    localStorage.removeItem("UserId");
    localStorage.removeItem("UserName");
    localStorage.removeItem("RoleId");
    localStorage.removeItem("Age");
    localStorage.removeItem("Email");
    localStorage.removeItem("chats");
  }

  const handleLogout = () => {
    removeUserStorage()
    navigate("/Login")
  }

  return (
    <div>
      <div id="sidebar" className="sidebar">
        <div className="header">
          <div className="dtu_logo">
            <a href="index.html">
              <img className="logo" src={dtu_logo} alt="dtu_logo" />
            </a>
          </div>
          <div
            className="new_chat"
            onClick={(event) => handleCreateNewChat(event)}
          >
            <a href="#!">
              <SquarePen color="black" fontSize={"200px"} />
            </a>
          </div>
        </div>
        <ul className="history">
          <p className="subtitle">Lịch sử hội thoại</p>
          <hr />
          {/* {history.map((value) => {
            // return (
            //   <>
            //     <li key={value.id}>
            //       <a href="#!">{value.name}</a>
            //     </li>
            //   </>
            // );
            return <ChatList chatList={value} />;
          })} */}
          <ChatList chatList={history} setChatList={setHistory} />
        </ul>
        <a href="#!" className="account" onClick={() => { setIsShowPopupSetting(!isShowPopupSetting) }}>
          <img src={avatar} alt="account" />
          <span>{localStorage.getItem("UserName")}</span>
        </a> 
        {
          isShowPopupSetting && <div className="popup-setting">
            <div className="bnt-setting bnt-gmail-text">{localStorage.getItem("Email")}</div>
            <Button type="primary" className="bnt-setting" onClick={handleCancelSetting}>Thay đổi thông tin</Button>
            <Button type="primary" className="bnt-setting" onClick={handleLogout}>Đăng xuất</Button>
          </div>
        }
        <Modal title="Setting" open={isModalEditSetting} onOk={handleCancelSetting} onCancel={handleCancelSetting}>
                <div style={{padding: 10}}>
                    <div>
                        <Typography.Title level={5}>Name</Typography.Title>
                        <Input defaultValue="" />
                    </div>
                    <div>
                        <Typography.Title level={5}>Age</Typography.Title>
                        <Input defaultValue="" />
                    </div>
                    <div>
                        <Typography.Title level={5}>Address</Typography.Title>
                        <Input defaultValue="" />
                    </div>
                </div>
        </Modal>
      </div>
    </div>
  );
};

export default SideBar;
