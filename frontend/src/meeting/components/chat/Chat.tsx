import React from "react";
import { IChat } from "../../../utils/interfaces";
import "./Chat.css";

export function Chat({ id, username, content, timeCreated }: IChat) {
  return (
    <div className="chat-bg">
      <div className="div-43">{username}</div>
      <div className="lorem-ipsum-dolor-sit-amet-co-2">{content}</div>
    </div>
  );
}
