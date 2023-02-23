import React from "react";
import { ListGroup } from "react-bootstrap";
import { IChat } from "../../../utils/interfaces";
import "./Chat.css";

export function Chat({ id, username, content, timeCreated }: IChat) {
  return (
    <ListGroup.Item
      as="li"
      className="chat-bg d-flex justify-content align-items-start"
    >
      <div className="ms-2 me-auto">
        <div>{content}</div>
        <p className="fw-bold">{username}</p>
      </div>
    </ListGroup.Item>
  );
}
