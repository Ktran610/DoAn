import React, { useEffect, useState } from "react";
import { botIcon, userIcon } from "../../assets/img";
import { useLocation, useParams } from "react-router-dom";
import { httpClient } from "../../api";
import { Skeleton, Tooltip } from "antd";
import { RedoOutlined, DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import api from "../../api";
import ChatItem from "./ChatItem";

function ChatDetailList(props) {
  let { chatDetailList, SetChatDetailList, isLoading } = props;
  console.log({chatDetailList})
  // const [chatDetailList, SetChatDetailList] = useState(props.chatDetailList)
  const location = useLocation();
  const param = useParams();
  const id = param.id;

  useEffect(() => {
    httpClient
      .get("Chat/GetChatDetailsByChatId?id=" + id)
      .then((result) => {
        let finalResult = result.data.data;
        let tempChat = finalResult.map((value) => {
          return {
            id: value.id,
            question: value.question,
            answer: value.answer,
            report: value.report,
            chatId: value.chatId
          };
        });
        console.log("TempChat:", tempChat);
        SetChatDetailList(tempChat);
        console.log("Data", result.data);
        console.log("FinalResult", finalResult.message);
      })
      .catch((error) => {
        console.log(error);
      });

    //
  }, [location.pathname]);

  // const handleSubmit = (content) => {
  //   let dataLocal = localStorage.get("");

  //   dataLocal = JSON.parse(dataLocal ?? []);

  //   dataLocal.map((data) => [
  //     ...data,
  //     {
  //       id: id,
  //       content: content,
  //     },
  //   ]);
  // };

  return (
    <div className="chat-list">
      {chatDetailList.length ? (
        chatDetailList.map((request, index) => (
          <div>
            <div className="user">
              <img src={userIcon} alt="user" />
              {request.question}
            </div>
            <div className="bot">
              {isLoading && index === chatDetailList.length - 1 ? (
                <Skeleton avatar paragraph={{ rows: 4 }} />
              ) : (
               <ChatItem request={request} updateChatDetail={SetChatDetailList}/>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="bot">
          <img src={botIcon} alt="bot" />
          <span>"Hãy hỏi tôi điều gì đó về trường đại học Duy Tân"</span>
        </div>
      )}
    </div>
  );
}

export default ChatDetailList;
