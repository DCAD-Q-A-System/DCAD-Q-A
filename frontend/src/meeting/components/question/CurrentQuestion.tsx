import React from "react";
import { IQuestion } from "../../../utils/interfaces";
import "./CurrentQuestion.css";

export function CurrentQuestion({ question }: { question: IQuestion }) {
  return (
    <div className="jumbotron">
      <h2>Current Question</h2>
      <p>{question?.content}</p>
    </div>
  );
}
