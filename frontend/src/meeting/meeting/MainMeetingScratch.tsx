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
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { USER_TYPE } from "../../utils/enums";
import {
  ISocketMessageReceive,
  SOCKET_ERRORS_TYPE,
} from "../../utils/socket_types";
import { checkIfInitiallyLoggedIn } from "../../utils/funcs";
import { socket } from "../../utils/constants";
import { setData } from "../../store/loginSlice";

export function MainMeetingScratch() {
  const [darkMode, setDarkMode] = useState(false);
  const { meetingId } = useParams<{ meetingId?: string }>();
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState<MeetingData | null>(null);
  const dispatch = useAppDispatch();
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

    const onOpen = (event: any) => {
      console.log(event, "Open");
    };
    socket.addEventListener("open", onOpen);

    const onClose = (e: any) => {
      console.log(e.data);
      console.log("CLOSING SOCKET!");
    };

    socket.addEventListener("close", onClose);

    return () => {
      socket.removeEventListener("open", onOpen);

      socket.removeEventListener("close", onClose);
    };
  }, []);

  useEffect(() => {
    const onMessage = (e: any) => {
      console.log(e.data);

      const data: ISocketMessageReceive = JSON.parse(e.data);
      console.log(data.error);

      if (data.error) {
        switch (data.error) {
          case SOCKET_ERRORS_TYPE.INVALID_REQ_TYPE:
          case SOCKET_ERRORS_TYPE.MEETING_ID_EMPTY:
            alert("something went wrong with connection, leave and rejoin");
            break;
        }
      } else {
        if (meeting) {
          const newMeeting: MeetingData = JSON.parse(JSON.stringify(meeting));
          console.log("copy of meeting", newMeeting, meeting);
          console.log("New data", data);
          if (newMeeting.messages && data) {
            if (data.message.chat && data.message.chat.length > 0) {
              data.message?.chat.forEach((chatElement) => {
                newMeeting.messages.chat.push(chatElement);
                console.log("After push", newMeeting.messages.chat);
              });
            } else if (
              data?.message.questions &&
              data?.message.questions.length > 0
            ) {
              newMeeting.messages.questions = [
                ...newMeeting.messages.questions,
                ...data.message.questions,
              ];
            }
          } else if (newMeeting.onlineMembers) {
            if (
              data.message?.newOnlineMembers &&
              data.message.newOnlineMembers.length > 0
            ) {
              console.log(
                `These are new members ${data.message.newOnlineMembers}`
              );
              newMeeting.onlineMembers = [
                ...newMeeting.onlineMembers,
                ...data.message.newOnlineMembers,
              ];
            }
            if (
              data.message?.membersWhoLeft &&
              data.message.membersWhoLeft.length > 0
            ) {
              console.log(
                `These are new members ${data.message.membersWhoLeft}`
              );

              newMeeting.onlineMembers = [
                ...newMeeting.onlineMembers,
                ...data.message.newOnlineMembers,
              ];
            }
          }
          console.log("NEW MEETING BEFORE UPDATE", newMeeting);
          setMeeting(newMeeting);
        }
      }
    };
    socket.addEventListener("message", onMessage);

    return () => {
      socket.removeEventListener("message", onMessage);
    };
  });

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
                  <NavDropdown.Item href={`/leave-meeting/${meetingId}`}>
                    Leave Meeting
                  </NavDropdown.Item>
                  {loginData && loginData.type !== USER_TYPE.GUEST && (
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
          {meeting.messages ? (
            <Container fluid className="main">
              <Row className="row gutter-0 flex-grow-1">
                <Col className="col">
                  <QuestionTabs
                    meetingId={meetingId!}
                    questions={meeting.messages.questions}
                  />
                </Col>
                <Col xs={6} className="col">
                  <Container fluid className="iframe">
                    <Stack direction="vertical" gap={3}>
                      <Iframe link={meeting.iframeLink} />
                      <CurrentQuestion question={meeting.messages.questions[0]} />
                    </Stack>
                  </Container>
                </Col>
                <Col className="col">
                  <ChatPanel
                    meetingId={meetingId!}
                    chats={meeting.messages.chat}
                  />
                </Col>
              </Row>
            </Container>
          ) : (
            <p className="text-center"> Not fetched right, reload again </p>
          )}
        </div>
      ) : (
        <p className="text-center">Something's gone wrong</p>
      )}
    </>
  );
}
