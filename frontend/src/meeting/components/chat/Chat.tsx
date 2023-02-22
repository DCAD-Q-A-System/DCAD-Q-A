import React from "react";
import { IChat } from "../../../utils/interfaces";
import "./Chat.css";

export function Chat({ id, username, content, timeCreated }: IChat) {
  return (
    <div className="div-42">
      <div className="div-43">Username</div>
      <div className="lorem-ipsum-dolor-sit-amet-co-2">{content}</div>
    </div>
  );
}
