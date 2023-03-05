import React, { useState } from "react";
import { ListGroup, Row, Col } from "react-bootstrap";
import { IChat } from "../../../utils/interfaces";
import Bin from "../../../image/trash.png";
import Reply from "../../../image/reply.png";
import "./Chat.css";

export function Chat({
  id,
  username,
  content,
  timeCreated,
  replies,
}: IChat) {
  const [reply, setReply] = useState("");

  function handleSend() {
    // Do something with the reply message here
    console.log(reply);
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
            className={replies ? "ms-5 border border-secondary" : ""}
          >
            <div>{content}</div>
            {replies && (
              <div className="ms-5">
                <p className="fw-bold text-secondary">{`@${username} replied:`}</p>
                <div>{content}</div>
              </div>
            )}
            <p className="fw-bold">{username}</p>
          </Col>
          <Col
            xs={2}
            md={2}
            className="d-flex flex-column justify-content-between"
          >
            <img
              src={Bin}
              className="bin position-absolute top-0 end-0"
              alt="Delete"
            />
            <img
              src={Reply}
              className="reply position-absolute bottom-0 end-0"
              alt="Reply"
              onClick={() => setReply(`@${username} `)}
            />
          </Col>
        </Row>
        {reply !== "" && (
          <Row className="mt-3">
            <Col xs={10} md={10}>
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder={`Enter reply to ${username}`}
                className="form-control"
              />
            </Col>
            <Col xs={2} md={2} className="d-flex justify-content-end">
              <button className="btn btn-primary" onClick={handleSend}>
                Send
              </button>
            </Col>
          </Row>
        )}
      </div>
    </ListGroup.Item>
  );
}
