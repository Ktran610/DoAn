import React, { useState } from "react";
import { botIcon } from "../../assets/img";
import { Skeleton, Tooltip } from "antd";
import {
  DislikeFilled,
  DislikeOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import api, { httpClient } from "../../api";
import { useParams } from "react-router-dom";

export default function ChatItem({ request, updateChatDetail }) {
  const [isReGenerating, setIsReGenerating] = useState(false);
  const [isDisLiked, setIsDisliked] = useState(false);

  const handleRegenerate = (request) => {
    setIsReGenerating(true);
    console.log("Request gen", request);
    const newQuery = request.question + ", Trả lời chi tiết";
    api
      .post("/query?query=" + newQuery)
      //.post("/posts")
      .then((res) => {
        console.log({ res });
        const newChatDetail = {
          id: request.id,
          question: newQuery,
          answer: res.data.response,
          chatId: request.chatId,
          report: null,
        };

        httpClient
          .post("ChatDetail/updatechatdetail", newChatDetail)
          .then((result) => {
            let finalResult = result.data.value;
            console.log("FinalResult", finalResult);
          })
          .catch((error) => {
            console.log(error);
          });
        updateChatDetail((prev) =>
          prev.map((chat) => {
            if (chat.id === request.id) {
              chat.answer = res.data.response;
              return chat;
            }

            return chat;
          })
        );
      })
      .catch((e) => {})
      .finally(() => {
        setIsReGenerating(false);
        setIsDisliked(false);
      });
  };

  const toggleLiked = (newReport) => {
    const updateChatDetail = {
      id: request.id,
      question: request.question,
      answer: request.answer,
      chatId: request.chatId,
      report: newReport,
    };

    httpClient
      .post("ChatDetail/updatechatdetail", updateChatDetail)
      .then((result) => {
        let finalResult = result.data.value;
        console.log("FinalResult", finalResult);
      })
      .catch((error) => {
        console.log(error);
      });
    setIsDisliked((prev) => !prev);
  };
  return isReGenerating ? (
    <Skeleton />
  ) : (
    <div className="box-answer">
      <div>
        <img src={botIcon} alt="bot" />
        <span>{request.answer}</span>
      </div>
      <div>
        <Tooltip title="Regenerate">
          <RedoOutlined
            className="icon-refresh"
            onClick={() => handleRegenerate(request)}
          />
        </Tooltip>
        {isDisLiked ? (
          <Tooltip title="UnDisliked">
            <DislikeFilled
              onClick={() => toggleLiked(null)}
              style={{ cursor: "pointer" }}
            />
          </Tooltip>
        ) : (
          <Tooltip title="Dislike">
            <DislikeOutlined
              onClick={() => toggleLiked("Bad")}
              style={{ cursor: "pointer" }}
              className="icon-dislike"
            />
          </Tooltip>
        )}
      </div>
    </div>
  );
}
