import React, { useState } from "react";
import { ListGroup, Row, Col } from "react-bootstrap";
import { IChat } from "../../../utils/interfaces";
import "./Chat.css";
import { BsFillReplyFill, BsFillTrashFill } from "react-icons/bs";
import ReconnectingWebSocket from "reconnecting-websocket";
import { ISocketMessageSend, REQ_TYPES } from "../../../utils/socket_types";
import { useAppSelector } from "../../../store/hooks";
import { isOpen, jsonToArray, toastHook } from "../../../utils/funcs";
import { USER_TYPE, VARIANT } from "../../../utils/enums";
import { HIGH_PRIVELAGE } from "../../../utils/constants";

interface ChatProps extends IChat {
  socket: ReconnectingWebSocket;
  meetingId: string;
}
export function Chat({
  id,
  username,
  content,
  timeCreated,
  replies,
  socket,
  meetingId,
}: ChatProps) {
  const [reply, setReply] = useState("");
  const { setToast } = toastHook();

  const loginData = useAppSelector((s) => s.loginReducer.data);
  function handleSendReply() {
    // Do something with the reply message here
    console.log(reply);
    const socketMessage: ISocketMessageSend = {
      reqType: REQ_TYPES.INSERT_REPLY,
      content: reply,
      meetingId: meetingId!,
      chatId: id,
      userId: loginData?.userId,
      username: loginData?.username,
    };
    console.log(socketMessage);
    const bytes = jsonToArray(socketMessage);
    if (!isOpen(socket)) {
      setToast("Connection error", "connection lost", VARIANT.DANGER, true);
      return;
    }
    socket.send(bytes);

    setReply("");
  }

  return (
    <ListGroup.Item
      as="li"
      className="chat-bg d-flex justify-content-start align-items-start position-relative"
    >
      <div className="ms-2 me-2">
        <Row>
          <Col
            xs={10}
            md={10}
            className={
              replies && replies.length > 0 ? "border border-secondary" : ""
            }
          >
            <div>{content}</div>
            {replies &&
              replies.length > 0 &&
              replies.map((r, i) => (
                <div key={i} className="reply-m">
                  <p className="reply-i fw-bold">{`@${r.username} replied:`}</p>
                  <div>{r.content}</div>
                </div>
              ))}
            <p className="fw-bold">{username}</p>
          </Col>
          <Col
            xs={2}
            md={2}
            className="d-flex flex-column justify-content-between"
          >
            {loginData && HIGH_PRIVELAGE.includes(loginData.type) && (
              <BsFillTrashFill
                onClick={() => {
                  const socketMessage: ISocketMessageSend = {
                    reqType: REQ_TYPES.DELETE_CHAT,
                    content: "",
                    meetingId,
                    chatId: id,
                    questionId: "",
                    replyId: "",
                    userId: loginData?.userId,
                    username: loginData?.username,
                  };
                  const bytes = jsonToArray(socketMessage);
                  if (!isOpen(socket)) {
                    setToast(
                      "Connection error",
                      "connection lost",
                      VARIANT.DANGER,
                      true
                    );
                    return;
                  }
                  socket.send(bytes);
                  setToast(
                    "Deletion success",
                    "delete command success",
                    VARIANT.SUCCESS,
                    true
                  );
                }}
                className="bin position-absolute top-0 end-0"
                alt="Delete"
              />
            )}
            {loginData && loginData.type !== USER_TYPE.GUEST && (
              <BsFillReplyFill
                className="reply position-absolute bottom-0 end-0"
                alt="Reply"
                onClick={() => setReply(`@${username} `)}
              />
            )}
          </Col>
        </Row>
        {reply !== "" && (
          <Row className="mt-3">
            <Col xs={10} md={10}>
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder={`Send reply to ${username}`}
                className="form-control"
              />
            </Col>
            <Col xs={2} md={2} className="d-flex justify-content-end">
              <button className="btn btn-primary" onClick={handleSendReply}>
                Send
              </button>
            </Col>
          </Row>
        )}
      </div>
    </ListGroup.Item>
  );
}
