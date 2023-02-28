import React, { useState } from "react";
import { Tabs, Tab, InputGroup, Form, Button } from "react-bootstrap";
import ReconnectingWebSocket from "reconnecting-websocket";
import { useAppSelector } from "../../../store/hooks";
import { USER_TYPE } from "../../../utils/enums";
import { jsonToArray } from "../../../utils/funcs";
import { MessageStructure } from "../../../utils/interfaces";
import { ISocketMessageSend, REQ_TYPES } from "../../../utils/socket_types";
import { Question } from "./Question";
import "./QuestionTabs.css";

export function QuestionTabs({
  meetingId,
  questions,
  socket,
}: {
  meetingId: string;
  questions: MessageStructure[];
  socket: ReconnectingWebSocket;
}) {
  enum TABS {
    CURRENT = "Current",
    ANSWERED = "Answered",
  }
  const [key, setKey] = useState(TABS.CURRENT.toLowerCase());
  const questionElements = (
    <div className="list-group-1">
      {questions &&
        questions.length > 0 &&
        questions.map((question, i) => <Question key={i} {...question} />)}
    </div>
  );

  const [question, setQuestion] = useState("");
  const loginData = useAppSelector((state) => state.loginReducer.data);

  return (
    <div className="question-panel">
      <Tabs
        activeKey={key}
        onSelect={(k) => {
          if (k) setKey(k);
        }}
        className="mb-3"
        fill
      >
        <Tab eventKey={TABS.CURRENT.toLowerCase()} title={TABS.CURRENT}>
          {questionElements}
        </Tab>
        <Tab eventKey={TABS.ANSWERED.toLowerCase()} title={TABS.ANSWERED}>
          {questionElements}
        </Tab>
      </Tabs>
      {loginData && loginData.type !== USER_TYPE.GUEST && (
        <InputGroup className="question_list">
          <Form.Control
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter chat"
            as="textarea"
          />

          <Button
            onClick={() => {
              const socketMessage: ISocketMessageSend = {
                reqType: REQ_TYPES.INSERT_QUESTION,
                content: question,
                meetingId: meetingId,
                userId: loginData?.userId,
                username: loginData?.username,
              };
              console.log(socketMessage);
              const bytes = jsonToArray(socketMessage);
              socket.send(bytes);
              setQuestion("");
            }}
          >
            Send
          </Button>
        </InputGroup>
      )}
    </div>
  );
}
