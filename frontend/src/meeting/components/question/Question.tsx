import React from "react";
import { MessageStructure } from "../../../utils/interfaces";

export function Question({
  id,
  username,
  userId,
  content,
  timeCreated,
}: MessageStructure) {
  return <div className="lorem-ipsum-dolor-sit-amet-co">{content}</div>;
}
