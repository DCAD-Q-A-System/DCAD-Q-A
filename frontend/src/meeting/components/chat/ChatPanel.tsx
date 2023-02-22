import React from "react";
import { Container, Stack } from "react-bootstrap";
import { IChat } from "../../../utils/interfaces";
import { Chat } from "./Chat";
import "./ChatPanel.css";
export function ChatPanel({ chats }: { chats: IChat[] }) {
  return (
    <Container fluid className="chat-panel">
      <Stack direction="vertical">
        {chats.map((chat, i) => (
          <Chat key={i} {...chat} />
        ))}
      </Stack>
    </Container>
  );
}
