import React, {useState} from "react";
import { MessageStructure } from "../../../utils/interfaces";
import { ListGroup, Row, Col, Form } from "react-bootstrap";
import Bin from "../../../image/trash.png";
import { Vote } from "../../../question/vote"

export function Question({
  id,
  username,
  userId,
  content,
  timeCreated,
}: MessageStructure) {
  const [answered, setAnswered] = useState(false);
  return (
    <ListGroup.Item
    as="li"
    className="question-bg d-flex justify-content-start align-items-start position-relative"
  >
    <div className="ms-2 me-2">
      <Row>
        <Col xs={2} md={2}>
          <Vote/>
        </Col>
        <Col xs={8} md={8}>
          <div>{content}</div>
        </Col>
        <Col xs={2} md={2} className="d-flex flex-column justify-content-between">
          <img src={Bin} className="bin position-absolute top-0 end-0"/>
          <Form.Check
                  reverse
                  type="checkbox"
                  label="Answered"
                  className="answered position-absolute bottom-0 end-0"
                  checked={answered}
                  onChange={() => setAnswered(!answered)}
                />
        </Col>
      </Row>
    </div>
  </ListGroup.Item>
  );
}
