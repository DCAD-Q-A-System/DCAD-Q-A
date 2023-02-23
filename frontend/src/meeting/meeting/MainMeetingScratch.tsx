import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Col,
  Container,
  Image,
  Row,
  Stack,
  Form
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { credentialFetch } from "../../utils/credential_fetch";
import { HTTP_METHODS } from "../../utils/http_methods";
import { MeetingData } from "../../utils/interfaces";
import { GET_ALL_MESSAGES } from "../../utils/paths";
import anonSmall from "../../image/anon_small.png";

import "./MainMeetingScratch.css";
import { QuestionTabs } from "../components/question/QuestionTabs";
import { Iframe } from "../components/iframe/Iframe";
import { CurrentQuestion } from "../components/question/CurrentQuestion";
import { ChatPanel } from "../components/chat/ChatPanel";
import { useAppSelector } from "../../store/hooks";
import { USER_TYPE } from "../../utils/enums";

export function MainMeetingScratch() {
  const [darkMode, setDarkMode] = useState(false);
  const { meetingId } = useParams<{ meetingId?: string }>();

  const [meeting, setMeeting] = useState<MeetingData | null>(null);

  const loginData = useAppSelector((state) => state.loginReducer.data);
  useEffect(() => {
    const fetchMeeting = async () => {
      console.log(meetingId);
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
      <Image className="rounded-circle" src={anonSmall} width="30vw" />
      <Navbar.Text>My Account</Navbar.Text>
    </div>
  );

  return (
    <>
      {meeting !== null ? (
        <div>
          <Navbar
            className="meeting-banner-color navbar-dark"
            variant="light"
            fixed="top"
            expand="lg"
          >
            <Container className="justify-content-center">
              <Navbar.Brand>{meeting.name}</Navbar.Brand>
            </Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <label className="switch-bg mx-auto">
                  Dark Mode
                  <input
                    type="checkbox"
                    id="dark-mode-switch"
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                  />
                </label>
                <NavDropdown title={MyAccount} id="basic-nav-dropdown">
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Leave Meeting
                  </NavDropdown.Item>
                  {loginData && loginData !== USER_TYPE.GUEST && (
                    <NavDropdown.Item href="#action/3.4">
                      Logout
                    </NavDropdown.Item>
                  )}
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Container fluid>
            <Row className="row flex-grow-1 h-100">
              <Col className="col-md-4 h-100">
                <QuestionTabs questions={meeting.messages.questions} />
              </Col>
              <Col className="col-md-4 h-100">
                <Stack direction="vertical" gap={3}>
                  <Iframe link={meeting.iframeLink} />
                  <CurrentQuestion question={meeting.messages.questions[0]} />
                </Stack>
              </Col>
              <Col className="col-md-4 h-100">
                <ChatPanel chats={meeting.messages.chat} />
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <p className="text-center">Something's gone wrong</p>
      )}
    </>
  );
}
