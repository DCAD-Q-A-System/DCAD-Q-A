import React, { useState } from "react";
import { MessageStructure } from "../../../utils/interfaces";
import { ListGroup, Row, Col, Form } from "react-bootstrap";
import { Vote } from "../../../question/Vote";
import { IQuestion } from "../../../utils/interfaces";
import { BsFillTrashFill } from "react-icons/bs";
import { ISocketMessageSend, REQ_TYPES } from "../../../utils/socket_types";
import ReconnectingWebSocket from "reconnecting-websocket";
import { useAppSelector } from "../../../store/hooks";
import { isOpen, jsonToArray, toastHook } from "../../../utils/funcs";
import { VARIANT } from "../../../utils/enums";

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
  voteCount,
  socket,
  meetingId,
}: QuestionProps) {
  const loginData = useAppSelector((s) => s.loginReducer.data);
  // const [answered, setAnswered] = useState(propsAnswered);
  const {setToast} = toastHook();
  return (
    <ListGroup.Item
      as="li"
      className="question-bg d-flex justify-content-start align-items-start position-relative"
    >
      <div className="ms-2 me-2">
        <Row>
          <Col xs={2} md={2}>
            <Vote
              questionId={id}
              socket={socket}
              meetingId={meetingId}
              voteCount={voteCount}
            />
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
                  userId: loginData?.userId!,
                  username: loginData?.username,
                };
                const bytes = jsonToArray(socketMessage);
                if (!isOpen(socket)) {
                  setToast("Connection error", "connection lost", VARIANT.DANGER, true);
                  return;
                }
                socket.send(bytes);
                setToast("Deletion success", "delete command success", VARIANT.SUCCESS, true);
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
                  setToast("Socket error", "socket not connected try reloading", VARIANT.DANGER, true);
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
