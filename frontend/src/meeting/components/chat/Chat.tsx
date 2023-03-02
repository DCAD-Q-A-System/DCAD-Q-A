import React from "react";
import { ListGroup, Row, Col } from "react-bootstrap";
import { IChat } from "../../../utils/interfaces";
import Bin from "../../../image/trash.png";
import Reply from "../../../image/reply.png";
import "./Chat.css";

export function Chat({ id, username, content, timeCreated }: IChat) {
  return (
    <ListGroup.Item
      as="li"
      className="chat-bg d-flex justify-content-start align-items-start position-relative"
    >
      <div className="ms-2 me-2">
        <Row>
          <Col xs={10} md={10}>
            <div>{content}</div>
          </Col>
          <Col xs={2} md={2} className="d-flex flex-column justify-content-between">
            <img src={Bin} className="bin position-absolute top-0 end-0"/>
            <img src={Reply} className="reply position-absolute bottom-0 end-0"/>
          </Col>
        </Row>
        <p className="fw-bold">{username}</p>
      </div>
    </ListGroup.Item>
  );
}
