import moment from "moment";
import React, { useCallback, useMemo, useState } from "react";
import {
  Tabs,
  Tab,
  InputGroup,
  Form,
  Button,
  ListGroup,
} from "react-bootstrap";
import ReconnectingWebSocket from "reconnecting-websocket";
import { useAppSelector } from "../../../store/hooks";
import { CATEGORIES, USER_TYPE } from "../../../utils/enums";
import { jsonToArray } from "../../../utils/funcs";
import { IQuestion } from "../../../utils/interfaces";
import { ISocketMessageSend, REQ_TYPES } from "../../../utils/socket_types";
import { Question } from "./Question";
import "./QuestionTabs.css";
import { SortBy } from "./SortBy";

export function QuestionTabs({
  meetingId,
  questions,
  socket,
}: {
  meetingId: string;
  questions: IQuestion[];
  socket: ReconnectingWebSocket;
}) {
  enum TABS {
    CURRENT = "Current",
    ANSWERED = "Answered",
  }

  const [category, setCategory] = useState(CATEGORIES.POPULAR);
  const [key, setKey] = useState(TABS.CURRENT.toLowerCase());
  const questionElements = useCallback(
    (answered: boolean) => (
      <ListGroup as="ol" className="list-group-1">
        {questions &&
          questions.length > 0 &&
          questions
            .filter((q) => q.answered == answered)
            .sort((a, b) => {
              switch (category) {
                case CATEGORIES.POPULAR:
                  const A = a.voteCount,
                    B = b.voteCount;
                  return B - A;
                case CATEGORIES.RECENT:
                  const C = moment(a.timeCreated).unix();
                  const D = moment(b.timeCreated).unix();
                  return D - C;
                case CATEGORIES.OLDER:
                  const E = moment(a.timeCreated).unix();
                  const F = moment(b.timeCreated).unix();
                  return E - F;
              }
            })
            .map((question, i) => (
              <Question
                meetingId={meetingId}
                socket={socket}
                key={i}
                {...question}
              />
            ))}
      </ListGroup>
    ),
    [questions, category]
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
        fill
      >
        <Tab eventKey={TABS.CURRENT.toLowerCase()} title={TABS.CURRENT}>
          <SortBy category={category} setCategory={setCategory} />
          {questionElements(false)}
        </Tab>
        <Tab eventKey={TABS.ANSWERED.toLowerCase()} title={TABS.ANSWERED}>
          <SortBy category={category} setCategory={setCategory} />
          {questionElements(true)}
        </Tab>
      </Tabs>
      {loginData && loginData.type !== USER_TYPE.GUEST && (
        <InputGroup className="question-input">
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
