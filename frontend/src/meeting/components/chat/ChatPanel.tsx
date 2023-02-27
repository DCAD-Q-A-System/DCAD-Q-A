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
  return (
    <Container fluid className="chat-panel">
      <ListGroup as="ol">
        {chats.map((chat, i) => (
          <div key={i}>
            <Chat {...chat} />
          </div>
        ))}
      </ListGroup>
      {loginData && loginData.type !== USER_TYPE.GUEST && (
        <InputGroup>
          <Form.Control
            value={chat}
            onChange={(e) => setChat(e.target.value)}
            placeholder="Enter chat"
            as="textarea"
          />

          <Button
            onClick={() => {
              const socketMessage: ISocketMessageSend = {
                reqType: REQ_TYPES.INSERT_CHAT,
                content: chat,
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
            }}
          >
            Send
          </Button>
        </InputGroup>
      )}
    </Container>
  );
}
