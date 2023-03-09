import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Container,
  Form,
  InputGroup,
  ListGroup,
  Stack,
} from "react-bootstrap";
import ReconnectingWebSocket from "reconnecting-websocket";
import { useAppSelector } from "../../../store/hooks";
import { USER_TYPE } from "../../../utils/enums";
import { isOpen, jsonToArray } from "../../../utils/funcs";
import { IChat } from "../../../utils/interfaces";
import { ISocketMessageSend, REQ_TYPES } from "../../../utils/socket_types";
import { Chat } from "./Chat";
import "./ChatPanel.css";

export function ChatPanel({
  meetingId,
  chats,
  socket,
}: {
  meetingId: string;
  chats: IChat[];
  socket: ReconnectingWebSocket;
}) {
  const loginData = useAppSelector((state) => state.loginReducer.data);
  const [chat, setChat] = useState("");
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, []);

  function handleSend() {
    if (chat.trim() === "") {
      return;
    }

    const socketMessage: ISocketMessageSend = {
      reqType: REQ_TYPES.INSERT_CHAT,
      content: chat, // Send the reply message if it exists, otherwise send the chat message
      meetingId: meetingId!,
      userId: loginData?.userId,
      username: loginData?.username,
    };
    console.log(socketMessage);
    const bytes = jsonToArray(socketMessage);
    if (!isOpen(socket)) {
      alert("connection lost");
      return;
    }
    socket.send(bytes);
    setChat("");
  }

  return (
    <div className="chat-panel">
      <ListGroup as="ol">
        {chats &&
          chats.length > 0 &&
          chats.map((chat, i) => (
            <div key={i} ref={chatBoxRef}>
              <Chat socket={socket} meetingId={meetingId} {...chat} />
            </div>
          ))}
      </ListGroup>
      {loginData && loginData.type !== USER_TYPE.GUEST && (
        <InputGroup className="chat-input">
          <Form.Control
            value={chat}
            onChange={(e) => setChat(e.target.value)}
            placeholder="Enter chat"
            as="textarea"
          />

          <Button onClick={handleSend}>Send</Button>
        </InputGroup>
      )}
    </div>
  );
}
