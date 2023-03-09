import React from "react";
import { Form } from "react-bootstrap";
import ReconnectingWebSocket from "reconnecting-websocket";
import { useAppSelector } from "../../../store/hooks";
import { HIGH_PRIVELAGE } from "../../../utils/constants";
import { USER_TYPE } from "../../../utils/enums";
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
  const loginData = useAppSelector((s) => s.loginReducer.data);
  return (
    <div className="jumbotron">
      <h2>Current Question</h2>
      {HIGH_PRIVELAGE.includes(loginData?.type) ? (
        questions &&
        questions.length > 0 && (
          <Form.Select
            value={currentQuestionIndex !== -1 ? `${currentQuestionIndex}` : 0}
            onChange={(e) => {
              const sockMsg: ISocketMessageSend = {
                reqType: REQ_TYPES.CHANGE_CURRENT_QUESTION,
                userId: loginData?.userId,
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
        )
      ) : (
        <p>
          {currentQuestionIndex !== -1
            ? questions[currentQuestionIndex].content
            : questions[0].content}
        </p>
      )}
    </div>
  );
}
