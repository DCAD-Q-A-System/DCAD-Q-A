import React from "react";
import "./Chat.css";
export function Chat({
  id,
  username,
  content,
  timeCreated,
}: {
  id: string;
  username: string;
  content: string;
  timeCreated: string;
}) {
  return (
    <div className="div-42">
      <div className="div-43">Username</div>
      <div className="lorem-ipsum-dolor-sit-amet-co-2">{content}</div>
    </div>
  );
}
