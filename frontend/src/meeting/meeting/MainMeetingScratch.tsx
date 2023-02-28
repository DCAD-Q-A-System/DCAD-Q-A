import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Col,
  Container,
  Image,
  Row,
  Stack,
  FormLabel,
  Form,
  Spinner,
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
  ISocketMessageSend,
  SOCKET_COMMAND_TYPE,
  SOCKET_ERRORS_TYPE,
} from "../../utils/socket_types";
import { checkIfInitiallyLoggedIn, jsonToArray } from "../../utils/funcs";
import { setData } from "../../store/loginSlice";
import { UsersList } from "../components/users_list/UsersList";
import ReconnectingWebSocket from "reconnecting-websocket";
import { HIGH_PRIVELAGE, URL, WS } from "../../utils/constants";
// import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";

export function MainMeetingScratch() {
  const [darkMode, setDarkMode] = useState(false);
  const { meetingId } = useParams<{ meetingId?: string }>();
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState<MeetingData | null>(null);
  const dispatch = useAppDispatch();
  const loginData = useAppSelector((state) => state.loginReducer.data);

  const [usersList, setUsersList] = useState(false);

  const ws = useMemo(
    () =>
      new ReconnectingWebSocket(WS, [], {
        connectionTimeout: 1000,
        maxRetries: 10,
      }),
    []
  );
  // const s = useWebSocket(WS, {
  //   share: false,
  //   reconnectAttempts: 5,
  //   retryOnError: true,
  // });

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
      console.log("IN OPEN");
      if (meetingId && loginData?.userId && loginData?.username) {
        const sockMsg: ISocketMessageSend = {
          userId: loginData?.userId,
          meetingId: meetingId,
          username: loginData?.username,
        };
        const bytes = jsonToArray(sockMsg);
        ws.send(bytes);
      }
    };
    ws.addEventListener("open", onOpen);

    const onClose = (e: any) => {
      console.log(e.data);
      console.log("CLOSING SOCKET!");
    };

    // s.getWebSocket()?.onopen = onOpen;
    ws.addEventListener("close", onClose);
    return () => {
      ws.removeEventListener("open", onOpen);

      ws.removeEventListener("close", onClose);
      ws.close();
    };
  }, []);

  useEffect(() => {
    const onMessage = (e: any) => {
      console.log("Message data", e.data);

      const data: ISocketMessageReceive = JSON.parse(e.data);
      console.log("MESSAGE DATA", data);

      if (data.error) {
        switch (data.error) {
          case SOCKET_ERRORS_TYPE.INVALID_REQ_TYPE:
          case SOCKET_ERRORS_TYPE.MEETING_ID_EMPTY:
            alert("something went wrong with connection, leave and rejoin");
            break;
        }
      } else if (data.command) {
        switch (data.command) {
          case SOCKET_COMMAND_TYPE.MAKE_USER_LEAVE:
            navigate(-1);
            break;
          default:
            break;
        }
      } else {
        if (meeting) {
          const newMeeting: MeetingData = JSON.parse(JSON.stringify(meeting));
          console.log("copy of meeting", newMeeting, meeting);
          console.log("New data", data);
          if (newMeeting.messages && data && data.message) {
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
    ws.addEventListener("message", onMessage);

    return () => {
      ws.removeEventListener("message", onMessage);
    };
  });

  const MyAccount = (
    <div>
      <Image className="rounded-circle" src={anonSmall} width="30vw" />
      <Navbar.Text>My Account</Navbar.Text>
    </div>
  );

  console.log("RENDER", meeting?.messages);

  return (
    <>
      {meeting ? (
        <>
          <Navbar
            fixed="top"
            expand="lg"
            className="meeting-banner-color navbar-dark"
            variant="light"
          >
            <Navbar.Brand className="title">{meeting.name}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
              <Form.Group
                controlId="formBasicCheckbox"
                className="form-check-inline"
              >
                <Form.Check
                  reverse
                  type="checkbox"
                  label="Dark Mode"
                  id="reverse-dark-mode-switch"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
              </Form.Group>
              <NavDropdown title={MyAccount} id="basic-nav-dropdown">
                <NavDropdown.Divider />
                <NavDropdown.Item href={`/leave-meeting/${meetingId}`}>
                  Leave Meeting
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => setUsersList(true)}>
                  Users List
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
            </Navbar.Collapse>
          </Navbar>
          {HIGH_PRIVELAGE.includes(loginData?.type) && usersList && (
            <UsersList
              show={usersList}
              setShow={setUsersList}
              meetingId={meetingId}
              socket={ws}
            />
          )}

          {meeting?.messages ? (
            <Container fluid className="main">
              <Row>
                <Col xs={3} md={3} className="col">
                  <QuestionTabs
                    meetingId={meetingId!}
                    questions={meeting.messages.questions}
                    socket={ws}
                  />
                </Col>
                <Col xs={6} md={6} className="col">
                  <Container className="iframe">
                    <Stack direction="vertical" gap={3}>
                      <Iframe link={meeting.iframeLink} />
                      <CurrentQuestion
                        question={meeting.messages.questions[0]}
                      />
                    </Stack>
                  </Container>
                </Col>
                <Col
                  xs={{ span: 2, offset: 1 }}
                  md={{ span: 2, offset: 1 }}
                  className="col"
                >
                  <ChatPanel
                    meetingId={meetingId!}
                    chats={meeting.messages.chat}
                    socket={ws}
                  />
                </Col>
              </Row>
            </Container>
          ) : (
            <p className="text-center"> Not fetched right, reload again </p>
          )}
        </>
      ) : (
        <Spinner className="text-center" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </>
  );
}
