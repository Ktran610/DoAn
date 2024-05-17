import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Flex, Input } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Chat(props) {
  const { request, onDelete, setChatList } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState("");
  const handleEdit = (questionId) => {
    setChatList((prev) => {
      return prev.map((chat) => {
        if (chat.id === questionId) {
          return {
            id: questionId,
            name: value,
          };
        }
        return chat;
      });
    });
    setIsEditing(false);
  };

  return (
    <li key={request.id}>
      <Flex justify="space-between">
        {isEditing ? (
          <>
            <Input
              onChange={(e) => setValue(e.target.value)}
              allowClear
              style={{ marginRight: 12 }}
            />
            {value ? (
              <CheckCircleOutlined
                style={{
                  width: 22,
                  fontSize: 26,
                  cursor: "pointer",
                  color: "blue",
                }}
                onClick={() => handleEdit(request.id)}
              />
            ) : (
              <CloseOutlined onClick={() => setIsEditing(false)} />
            )}
          </>
        ) : (
          <>
            <Link to={`/chats/${request.id}`}>{request.name}</Link>
            <Flex gap={16}>
              <EditOutlined
                style={{
                  width: 22,
                  fontSize: 26,
                  cursor: "pointer",
                  color: "blue",
                }}
                onClick={() => setIsEditing(true)}
              />
              <CloseCircleOutlined
                onClick={() => onDelete(request.id)}
                style={{
                  width: 22,
                  fontSize: 26,
                  cursor: "pointer",
                  color: "blue",
                }}
              />
            </Flex>
          </>
        )}
      </Flex>
    </li>
  );
}
