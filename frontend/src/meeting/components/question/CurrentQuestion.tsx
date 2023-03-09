import React from "react";
import { Form } from "react-bootstrap";
import ReconnectingWebSocket from "reconnecting-websocket";
import { isOpen, jsonToArray } from "../../../utils/funcs";
import { IQuestion, MeetingData } from "../../../utils/interfaces";
import { ISocketMessageSend, REQ_TYPES } from "../../../utils/socket_types";
import "./CurrentQuestion.css";

export function CurrentQuestion({
  questions,
  currentQuestionIndex,
  socket,
  meetingId,
}: {
  questions: IQuestion[];
  currentQuestionIndex: number;
  socket: ReconnectingWebSocket;
  meetingId: string;
}) {
  return (
    <div className="jumbotron">
      <h2>Current Question</h2>
      {questions && questions.length > 0 && (
        <Form.Select
          value={currentQuestionIndex !== -1 ? `${currentQuestionIndex}` : 0}
          onChange={(e) => {
            console.log(questions[+e.currentTarget.value].id);
            const sockMsg: ISocketMessageSend = {
              reqType: REQ_TYPES.CHANGE_CURRENT_QUESTION,
              meetingId,
              currentQuestionId: questions[+e.currentTarget.value].id,
            };
            const bytes = jsonToArray(sockMsg);
            if (!isOpen(socket)) {
              alert("socket closed");
              return;
            }
            socket.send(bytes);
          }}
        >
          {questions.map((q, i) => (
            <option key={i} value={i.toString()}>
              {q.content}
            </option>
          ))}
        </Form.Select>
      )}
    </div>
  );
}
