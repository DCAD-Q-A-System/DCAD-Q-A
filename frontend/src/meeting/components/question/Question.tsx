import React, { useState } from "react";
import { MessageStructure } from "../../../utils/interfaces";
import { ListGroup, Row, Col, Form } from "react-bootstrap";
import { Vote } from "../../../question/Vote";
import { IQuestion } from "../../../utils/interfaces";
import { BsFillTrashFill } from "react-icons/bs";
import { ISocketMessageSend, REQ_TYPES } from "../../../utils/socket_types";
import ReconnectingWebSocket from "reconnecting-websocket";
import { useAppSelector } from "../../../store/hooks";
import { isOpen, jsonToArray } from "../../../utils/funcs";

interface QuestionProps extends IQuestion {
  socket: ReconnectingWebSocket;
  meetingId: string;
}
export function Question({
  id,
  username,
  userId,
  content,
  timeCreated,
  answered: propsAnswered,
  socket,
  meetingId,
}: QuestionProps) {
  const loginData = useAppSelector((s) => s.loginReducer.data);
  // const [answered, setAnswered] = useState(propsAnswered);
  return (
    <ListGroup.Item
      as="li"
      className="question-bg d-flex justify-content-start align-items-start position-relative"
    >
      <div className="ms-2 me-2">
        <Row>
          <Col xs={2} md={2}>
            <Vote />
          </Col>
          <Col xs={8} md={8}>
            <div>{content}</div>
          </Col>
          <Col
            xs={2}
            md={2}
            className="d-flex flex-column justify-content-between"
          >
            <BsFillTrashFill
              onClick={() => {
                const socketMessage: ISocketMessageSend = {
                  reqType: REQ_TYPES.DELETE_QUESTION,
                  content: "",
                  meetingId,
                  chatId: "",
                  questionId: id,
                  replyId: "",
                  userId: loginData?.userId,
                  username: loginData?.username,
                };
                const bytes = jsonToArray(socketMessage);
                if (!isOpen(socket)) {
                  alert("connection lost");
                  return;
                }
                socket.send(bytes);
                alert("delete command success");
              }}
              className="bin position-absolute top-0 end-0"
            />
            <Form.Check
              reverse
              type="checkbox"
              className="answered position-absolute bottom-0 end-0"
              checked={propsAnswered}
              onChange={(e) => {
                // setAnswered(!answered);
                // console.log("new answered", answered);
                const socketMsg: ISocketMessageSend = {
                  reqType: REQ_TYPES.SWITCH_QUESTION_ANSWERED,
                  meetingId: meetingId,
                  questionId: id,
                  questionAnswered: !propsAnswered,
                  userId: loginData?.userId,
                  username: loginData?.username,
                };
                const bytes = jsonToArray(socketMsg);
                if (!isOpen(socket)) {
                  alert("socket not connected try reloading");
                }
                socket.send(bytes);
              }}
            />
          </Col>
        </Row>
      </div>
    </ListGroup.Item>
  );
}
