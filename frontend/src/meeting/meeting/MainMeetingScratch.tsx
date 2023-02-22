import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Col,
  Container,
  Image,
  Row,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { credentialFetch } from "../../utils/credential_fetch";
import { HTTP_METHODS } from "../../utils/http_methods";
import { MeetingData } from "../../utils/interfaces";
import { GET_ALL_MESSAGES } from "../../utils/paths";
import anonSmall from "../../image/anon_small.png";

import "./MainMeetingScratch.css";

export function MainMeetingScratch() {
  const { meetingId } = useParams<{ meetingId?: string }>();

  const [meeting, setMeeting] = useState<MeetingData>({
    id: "",
    name: "",
    iframeLink: "",
    startTime: 0,
    endTime: 0,
    onlineMembers: [],
    messages: {
      questions: [],
      chat: [],
    },
  });

  useEffect(() => {
    const fetchMeeting = async () => {
      const res = await credentialFetch(
        `${GET_ALL_MESSAGES}?meetingId=${meetingId}`,
        HTTP_METHODS.GET
      );
      if (res.status === 200) {
        const data: MeetingData = res.data;
        console.log(data);

        setMeeting(data);
      } else {
        alert("something has gone wrong");
      }
    };
    fetchMeeting();
  }, []);

  const MyAccount = (
    <div>
      <Image src={anonSmall} width="30vw" />
      <Navbar.Text>My Account</Navbar.Text>
    </div>
  );

  return (
    <div>
      <Navbar
        className="meeting-banner-color navbar-dark"
        variant="light"
        fixed="top"
        expand="lg"
      >
        <Container className="justify-content-center m-auto">
          <Navbar.Brand>Meeting Title</Navbar.Brand>
        </Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title={MyAccount} id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {/* <div className=" d-flex align-items-center justify-content-center">
        <Col className="vertical-column-margin  d-flex align-items-center">
          Questions
        </Col>

        <Col className="vertical-column-margin  d-flex align-items-center">
          Ifrmae
        </Col>
        <Col className=" d-flex align-items-center">Chat</Col>
      </div> */}
      <Container>
        <Row>
          <Col>Questions</Col>
          <Col>Iframe</Col>
          <Col>Chat</Col>
        </Row>
      </Container>
    </div>
  );
}
