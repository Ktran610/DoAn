import React from "react";
import bot_icon from "../../assets/img/bot.png";
import user_icon from "../../assets/img/user.png";
import dtu_logo from "../../assets/img/dtu_logo.png";
import "./index.scss";
import { Search } from "lucide-react";
import { useState } from "react";
import ChatDetailList from "./ChatDetailList";
import axios from "axios";
import api from "../../api";
import Typewriter from "typewriter-effect";
import { ReactTyped } from "react-typed";
import { useLocation, useParams } from "react-router-dom";
import { httpClient } from "../../api";
import { message } from "antd";
//import ChatDetailList from "../../components/ChatDetail";

function QuestionAnswer({ request }) {
  return (
    <div>
      <div className="user">
        <img src={user_icon} alt="user" />
        {request.question}
      </div>
      <div className="bot">
        <img src={bot_icon} alt="bot" />
        <span className="hehe"></span>
        <Typewriter
          onInit={(typewriter) => {
            typewriter.typeString(request.answer).pauseFor(2000).start();
          }}
        />
      </div>
    </div>
  );
}

const Home = () => {
  const [chatDetailList, SetChatDetailList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [valueAnswer, setValueAnswer] = useState("");
  const location = useLocation();
  const param = useParams();
  const id = param.id;

  function createAnswer(questionAnswerData) {
    SetChatDetailList((prevState) => [...prevState, questionAnswerData]);
    //setValueAnswer("");
  }

  function UpdateAnswer(questionAnswerData) {
    SetChatDetailList((prevState) => {
      console.log({ prevState });
      prevState[prevState.length - 1].answer = questionAnswerData.answer;
      return [...prevState];
    });
  }

  function handlePostMsg(event) {
    const { key } = event;

    if (key !== "Enter") {
      return;
    }

    if (!valueAnswer.trim()) {
      message.warning("Please enter question...");
      return;
    }

    if (loading) {
      return;
    }

    setLoading(true);
    const data = {
      question: valueAnswer,
      answer: "...",
      //answer: "hellosd sdfsdf sdafsd fsdafsdf dsafsad dsfasdaf sdafsd"
    };
    createAnswer(data);
    setValueAnswer("");
    api
      .post("/query?query=" + valueAnswer)
      //.post("/posts")
      .then((res) => {
        console.log({ res });
        const newData = {
          question: valueAnswer,
          answer: res.data.response,
          //answer: "hellosd sdfsdf sdafsd fsdafsdf dsafsad dsfasdaf sdafsd"
        };
        console.log("Update answer data:", newData);
        UpdateAnswer(newData);

        const chatDetailCreate = {
          question: valueAnswer,
          answer: res.data.response,
          report: "1",
          chatId: id,
        };
        console.log("ChatDetailCreate", chatDetailCreate);
        httpClient
          .post("ChatDetail/AddChatDetail", chatDetailCreate)
          .then((result) => {
            let finalResult = result.data.data;
            console.log("FinalResult", finalResult);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="chat-content">
      <div>
        <a id="navbar" className="bar-button" href="#!">
          <i className="fa-solid fa-bars-staggered" />
        </a>
        <div className="mobile_dtu_logo">
          <img src={dtu_logo} alt="dtu" />
        </div>
        <div className="header">ChatDTU Tư Vấn Tuyển Sinh Đại Học Duy Tân</div>
        <ChatDetailList
          chatDetailList={chatDetailList}
          SetChatDetailList={SetChatDetailList}
          isLoading={loading}
        />
        <div className="non" />
        <div className="chat-search">
          <input
            onChange={(event) => setValueAnswer(event.target.value)}
            className="search"
            value={valueAnswer}
            type="text"
            placeholder="Đặt Câu Hỏi"
            onKeyDown={(event) => handlePostMsg(event)}
          />
          <a className="search-btn" href="#!">
            {/* <i className="fa-solid fa-magnifying-glass" /> */}
            <Search
              onClick={() => {
                if (!valueAnswer.trim()) {
                  message.warning("Please enter question...");
                  return;
                }

                if (loading) {
                  return;
                }

                setLoading(true);
                const data = {
                  question: valueAnswer,
                  answer: "...",
                  //answer: "hellosd sdfsdf sdafsd fsdafsdf dsafsad dsfasdaf sdafsd"
                };
                createAnswer(data);
                setValueAnswer("");
                api
                  .post("/query?query=" + valueAnswer)
                  //.post("/posts")
                  .then((res) => {
                    console.log({ res });
                    const newData = {
                      question: valueAnswer,
                      answer: res.data.response,
                      //answer: "hellosd sdfsdf sdafsd fsdafsdf dsafsad dsfasdaf sdafsd"
                    };
                    console.log("Update answer data:", newData);
                    UpdateAnswer(newData);

                    const chatDetailCreate = {
                      question: valueAnswer,
                      answer: res.data.response,
                      report: "1",
                      chatId: id,
                    };
                    console.log("ChatDetailCreate", chatDetailCreate);
                    httpClient
                      .post("ChatDetail/AddChatDetail", chatDetailCreate)
                      .then((result) => {
                        let finalResult = result.data.data;
                        console.log("FinalResult", finalResult);
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  })
                  .catch(() => {})
                  .finally(() => {
                    setLoading(false);
                  });
              }}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
