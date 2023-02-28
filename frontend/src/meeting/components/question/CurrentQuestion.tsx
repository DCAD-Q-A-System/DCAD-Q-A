import React from "react";
import { MessageStructure } from "../../../utils/interfaces";
import "./CurrentQuestion.css";

export function CurrentQuestion({ question }: { question: MessageStructure }) {
  return (
    <div className="jumbotron">
      <h2>Current Question</h2>
      <p>{question?.content}</p>
    </div>
  );
}
