import React from "react";
import { IQuestion } from "../../../utils/interfaces";

export function Question({
  id,
  username,
  userId,
  content,
  timeCreated,
}: IQuestion) {
  return <div className="lorem-ipsum-dolor-sit-amet-co">{content}</div>;
}
