import React, { useState } from "react";
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
  const [reply, setReply] = useState("");

  function handleSend() {
    if (chat.trim() === "") {
      return;
    }

    const socketMessage: ISocketMessageSend = {
      reqType: REQ_TYPES.INSERT_CHAT,
      content: reply === "" ? chat : reply, // Send the reply message if it exists, otherwise send the chat message
      meetingId: meetingId!,
      userId: loginData?.userId,
      username: loginData?.username,
      replyTo: reply === "" ? undefined : chats[chats.length - 1].id, // Set the ID of the last message in the list as the reply target
    };
    console.log(socketMessage);
    const bytes = jsonToArray(socketMessage);
    if (!isOpen(socket)) {
      alert("connection lost");
      return;
    }
    socket.send(bytes);
    setChat("");
    setReply("");
  }

  return (
    <div className="chat-panel">
      <ListGroup as="ol">
        {chats &&
          chats.length > 0 &&
          chats.map((chat, i) => (
            <div key={i}>
              <Chat {...chat} />
            </div>
          ))}
      </ListGroup>
      {loginData && loginData.type !== USER_TYPE.GUEST && (
        <InputGroup className="chat-input">
          {reply === "" ? (
            <Form.Control
              value={chat}
              onChange={(e) => setChat(e.target.value)}
              placeholder="Enter chat"
              as="textarea"
            />
          ) : (
            <Form.Control
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder={`Enter reply to ${chat.username}`}
              as="textarea"
            />
          )}

          <Button onClick={handleSend}>{reply === "" ? "Send" : "Reply"}</Button>
        </InputGroup>
      )}
    </div>
  );
}
