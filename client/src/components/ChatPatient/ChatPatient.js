import React, { useEffect, useState, useRef } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import io from "socket.io-client";
import SendIcon from "@mui/icons-material/Send";
import Cookies from "js-cookie";
import { Input, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useStylesInput } from "../Styles/InputStyle";
/*Code adapted from: https://github.com/machadop1407/react-socketio-chat-app */
const socket = io.connect("http://localhost:3001");

function ChatPatient() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const classesInput = useStylesInput();
  const messagesList = useRef();
  useEffect(() => {
    fetch("http://localhost:3001/patient/getPersonalInfo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Expose-Headers": "auth-token",
        "auth-token": Cookies.get("jwt"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUsername(data.firstName);
        socket.emit("join_room", data._id);
        setRoom(data._id);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/getChatMessages", {
      type: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Expose-Headers": "id-patient",
        room: room,
        "Access-Control-Expose-Headers": "auth-token",
        "auth-token": Cookies.get("jwt"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMessageList(data.answer);
      });
  }, [room]);
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      fetch("http://localhost:3001/addChatMessage", {
        method: "POST",
        body: JSON.stringify(messageData),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Expose-Headers": "auth-token",
          "auth-token": Cookies.get("jwt"),
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => console.log(data));
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container" ref={messagesList}>
          {messageList.map((messageContent, index) => {
            return (
              <div
                key={index}
                className="message"
                id={username === messageContent.author ? "other" : "you"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Scrie un mesaj..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>
          <SendIcon />
        </button>
      </div>
    </div>
  );
}

export default ChatPatient;
