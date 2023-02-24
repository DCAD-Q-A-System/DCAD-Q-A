import React from "react";
import { ListGroup, Row, Col } from "react-bootstrap";
import { IChat } from "../../../utils/interfaces";
import Bin from "../../../image/trash.png";
import "./Chat.css";

export function Chat({ id, username, content, timeCreated }: IChat) {
  return (
    <ListGroup.Item
      as="li"
      className="chat-bg d-flex justify-content align-items-start"
    >
      <div className="ms-2 me-auto">
        <Row>
          <Col>
            <div>{content}</div>
          </Col>
          <Col>
            <img src={Bin} className="bin"/>
          </Col>
        </Row>
        <p className="fw-bold">{username}</p>
      </div>
    </ListGroup.Item>
  );
}
