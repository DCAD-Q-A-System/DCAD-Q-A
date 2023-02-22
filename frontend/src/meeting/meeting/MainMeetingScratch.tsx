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
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { credentialFetch } from "../../utils/credential_fetch";
import { HTTP_METHODS } from "../../utils/http_methods";
import { MeetingData } from "../../utils/interfaces";
import { GET_ALL_MESSAGES, LEAVE_MEETING } from "../../utils/paths";
import anonSmall from "../../image/anon_small.png";

import "./MainMeetingScratch.css";
import { QuestionTabs } from "../components/question/QuestionTabs";
import { Iframe } from "../components/iframe/Iframe";
import { CurrentQuestion } from "../components/question/CurrentQuestion";
import { ChatPanel } from "../components/chat/ChatPanel";
import { useAppSelector } from "../../store/hooks";
import { USER_TYPE } from "../../utils/enums";

export function MainMeetingScratch() {
  const { meetingId } = useParams<{ meetingId?: string }>();
  const navigate = useNavigate();
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
            <Container className="justify-content-center ">
              <Navbar.Brand>{meeting.name}</Navbar.Brand>
            </Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown title={MyAccount} id="basic-nav-dropdown">
                  <NavDropdown.Divider />
                  <NavDropdown.Item href={`/leave-meeting/${meetingId}`}>
                    Leave Meeting
                  </NavDropdown.Item>
                  {loginData && loginData !== USER_TYPE.GUEST && (
                    <NavDropdown.Item
                      onClick={async () => {
                        const res = await credentialFetch(
                          LEAVE_MEETING,
                          HTTP_METHODS.PUT,
                          JSON.stringify({
                            meetingId,
                            userId: loginData?.userId,
                          })
                        );
                        if (res.status === 200) {
                          navigate("/logout");
                        }
                      }}
                    >
                      Logout
                    </NavDropdown.Item>
                  )}
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <div className="container">
            <div className="row flex-grow-1">
              <div className="col">
                <QuestionTabs questions={meeting.messages.questions} />
              </div>

              <div className="col">
                <Stack direction="vertical" gap={3}>
                  <Iframe link={meeting.iframeLink} />
                  <CurrentQuestion question={meeting.messages.questions[0]} />
                </Stack>
              </div>
              <div className="col">
                <ChatPanel chats={meeting.messages.chat} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center">Something's gone wrong</p>
      )}
    </>
  );
}
