import React from "react";
import { Button, Container, Form, InputGroup, Stack } from "react-bootstrap";
import { useAppSelector } from "../../../store/hooks";
import { USER_TYPE } from "../../../utils/enums";
import { IChat } from "../../../utils/interfaces";
import { Chat } from "./Chat";
import "./ChatPanel.css";

export function ChatPanel({ chats }: { chats: IChat[] }) {
  const loginData = useAppSelector((state) => state.loginReducer.data);
  return (
    <Container fluid className="chat-panel">
      <Stack direction="vertical">
        {chats.map((chat, i) => (
          <div key={i}>
            <Chat {...chat} />
            <hr className="solid" />
          </div>
        ))}
      </Stack>
      {loginData && loginData !== USER_TYPE.GUEST && (
        <InputGroup>
          <Form.Control placeholder="Enter chat" as="textarea" />
          {/* TODO */}
          <Button>Send</Button>
        </InputGroup>
      )}
    </Container>
  );
}
