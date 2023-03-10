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
  Tabs,
  Tab,
  Form,
  Spinner,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { credentialFetch } from "../../utils/credential_fetch";
import { HTTP_METHODS } from "../../utils/http_methods";
import { IQuestion, MeetingData } from "../../utils/interfaces";
import {
  END_MEETING,
  GET_ALL_MESSAGES,
  GET_ALL_USERS_IN_MEETING,
  LEAVE_MEETING,
} from "../../utils/paths";
import anonSmall from "../../image/anon_small.png";

import "./MainMeetingScratch.css";
import { QuestionTabs } from "../components/question/QuestionTabs";
import { Iframe } from "../components/iframe/Iframe";
import { CurrentQuestion } from "../components/question/CurrentQuestion";
import { ChatPanel } from "../components/chat/ChatPanel";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { USER_TYPE } from "../../utils/enums";
import {
  ISocketMember,
  ISocketMessageReceive,
  ISocketMessageSend,
  REQ_TYPES,
  SOCKET_COMMAND_TYPE,
  SOCKET_ERRORS_TYPE,
} from "../../utils/socket_types";
import {
  checkIfInitiallyLoggedIn,
  isOpen,
  jsonToArray,
} from "../../utils/funcs";
import { setData } from "../../store/loginSlice";
import { UsersList } from "../components/users_list/UsersList";
import ReconnectingWebSocket from "reconnecting-websocket";
import { HIGH_PRIVELAGE, WS } from "../../utils/constants";

import { GlobalModal } from "../../modal/GlobalModal";

export function MainMeetingScratch() {
  const [darkMode, setDarkMode] = useState(false);
  const { meetingId } = useParams<{ meetingId?: string }>();
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState<MeetingData | null>(null);
  const dispatch = useAppDispatch();
  const loginData = useAppSelector((state) => state.loginReducer.data);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usersList, setUsersList] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");

  const handleSelect = (selectedTab: string) => {
    setActiveTab(selectedTab);
  };

  const ws = useRef<ReconnectingWebSocket | null>(null);
  // const s = useWebSocket(ws.current, {
  //   share: false,
  //   reconnectAttempts: 5,
  //   retryOnError: true,
  // });

  useEffect(() => {
    const params = `?meetingId=${meetingId}&userId=${
      loginData?.userId || ""
    }&username=${loginData?.username || ""}`;
    ws.current = new ReconnectingWebSocket(WS + params, [], {
      connectionTimeout: 1000,
      maxRetries: 10,
    });
    const fetchMeeting = async () => {
      console.log(meetingId);
      const res = await credentialFetch(
        `${GET_ALL_MESSAGES}?meetingId=${meetingId}`,
        HTTP_METHODS.GET
      );
      if (res.status === 200) {
        const data: MeetingData = res.data;
        console.log("INITIAL DATA", data);

        setMeeting(data);
      } else {
        alert("something has gone wrong");
      }
    };
    fetchMeeting();

    const onOpen = (event: any) => {
      console.log(event, "Open");
      console.log("IN OPEN");
      if (meetingId) {
        const sockMsg: ISocketMessageSend = {
          reqType: REQ_TYPES.PING,
          userId: loginData?.userId || "",
          meetingId: meetingId,
          username: loginData?.username || "",
        };
        const bytes = jsonToArray(sockMsg);
        if (ws && ws.current && !isOpen(ws.current)) {
          alert("socket err");
          return;
        }
        if (!ws.current) return;
        ws.current.send(bytes);
      }
    };
    ws.current.addEventListener("open", onOpen);

    const onClose = (e: any) => {
      console.log(e.data);
      console.log("CLOSING SOCKET!");
      alert("lost connection with socket");
      navigate(-1);
    };

    // s.getWebSocket()?.onopen = onOpen;
    ws.current.addEventListener("close", onClose);
    return () => {
      ws.current.removeEventListener("open", onOpen);

      ws.current.removeEventListener("close", onClose);
      ws.current.close();
    };
  }, []);

  useEffect(() => {
    const onMessage = (e: any) => {
      console.log("Message data", e.data);

      const data: ISocketMessageReceive = JSON.parse(e.data);
      console.log("MESSAGE DATA", data);

      if (data.error) {
        switch (data.error) {
          case SOCKET_ERRORS_TYPE.UNAUTHORISED:
            alert("unauthorised to enter meeting");
            navigate(-1);
            break;
          case SOCKET_ERRORS_TYPE.INVALID_REQ_TYPE:
          case SOCKET_ERRORS_TYPE.MEETING_ID_EMPTY:
            alert("something went wrong with connection, leave and rejoin");
            break;
          case SOCKET_ERRORS_TYPE.EXPIRED_TOKEN:
            alert("expired token");
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
          if (data.message) {
            if (data.message.chat && data.message.chat.length > 0) {
              newMeeting.messages.chat = [
                ...newMeeting.messages.chat,
                ...data.message.chat,
              ];
            } else if (
              data.message.questions &&
              data.message.questions.length > 0
            ) {
              newMeeting.messages.questions = [
                ...data.message.questions,
                ...newMeeting.messages.questions,
              ];
            } else if (
              data.message.replies &&
              data.message.replies.length > 0
            ) {
              data.message.replies.forEach((r) => {
                const indx = newMeeting.messages.chat.findIndex(
                  (c) => c.id === r.parentChatId
                );

                if (indx !== -1) {
                  const prev = newMeeting.messages.chat[indx].replies;
                  newMeeting.messages.chat[indx].replies.push(r);
                }
              });
            } else if (
              data.message.newOnlineMembers &&
              data.message.newOnlineMembers.length > 0
            ) {
              newMeeting.onlineMembers = [
                ...newMeeting.onlineMembers,
                ...data.message.newOnlineMembers,
              ];
            } else if (
              data.message.membersWhoLeft &&
              data.message.membersWhoLeft.length > 0
            ) {
              const membersWhoLeftIds = data.message?.membersWhoLeft.map(
                (m) => m.userId
              );
              newMeeting.onlineMembers = newMeeting.onlineMembers.filter(
                (m) => !membersWhoLeftIds.includes(m.userId)
              );
            } else if (
              data.message.chatsDeleted &&
              data.message.chatsDeleted.length > 0
            ) {
              const idsObject: { [key: string]: string } = {};
              data.message.chatsDeleted.forEach((c) => {
                idsObject[c.id] = true;
              });
              newMeeting.messages.chat = newMeeting.messages.chat.filter(
                (c) => !idsObject[c.id]
              );
            } else if (
              data.message.repliesDeleted &&
              data.message.repliesDeleted.length > 0
            ) {
              const chatIdsToObject: { [key: string]: string } = {};
              newMeeting.messages.chat.forEach((c, i) => {
                chatIdsToObject[c.id] = i;
              });
              data.message.repliesDeleted.forEach((d) => {
                const chatChosenIndex = chatIdsToObject[d.parentChatId];
                if (chatChosenIndex !== -1) {
                  newMeeting.messages.chat[chatChosenIndex] =
                    newMeeting.messages.chat[chatChosenIndex].replies.filter(
                      (r) => r !== d.id
                    );
                }
              });
            } else if (
              data.message.questionsDeleted &&
              data.message.questionsDeleted.length > 0
            ) {
              const idsObject: { [key: string]: string } = {};
              data.message.questionsDeleted.forEach((c) => {
                idsObject[c.id] = true;
              });
              newMeeting.messages.questions =
                newMeeting.messages.questions.filter((c) => !idsObject[c.id]);
            } else if (
              data.message.questionsAnswered &&
              data.message.questionsAnswered.length > 0
            ) {
              const questionsAnsweredObj: { [key: string]: boolean[] } = {};
              data.message.questionsAnswered.forEach((q) => {
                questionsAnsweredObj[q.id] = [q.answered];
              });
              for (let i = 0; i < newMeeting.messages.questions.length; i++) {
                const q = newMeeting.messages.questions[i];
                const a = questionsAnsweredObj[q.id];
                if (a && a.length == 1) {
                  newMeeting.messages.questions[i].answered = a[0];
                }
              }
            } else if (
              data.message.questionsVoteCountChanged &&
              data.message.questionsVoteCountChanged.length > 0
            ) {
              const questionsVoteChangeObj: { [key: string]: number[] } = {};
              data.message.questionsVoteCountChanged.forEach((q) => {
                questionsVoteChangeObj[q.id] = [q.voteCount];
              });
              for (let i = 0; i < newMeeting.messages.questions.length; i++) {
                const q = newMeeting.messages.questions[i];
                const a = questionsVoteChangeObj[q.id];
                if (a && a.length == 1) {
                  newMeeting.messages.questions[i].voteCount = a[0];
                }
              }
            } else if (data.message && data.message.currentQuestionIdChanged) {
              newMeeting.currentQuestionId =
                data.message.currentQuestionIdChanged.split("").join("");
            }
          }

          console.log("NEW MEETING BEFORE UPDATE", newMeeting);
          setMeeting(newMeeting);
        }
      }
    };
    ws.current.addEventListener("message", onMessage);

    return () => {
      ws.current.removeEventListener("message", onMessage);
    };
  });

  const MyAccount = (
    <>
      <Image className="rounded-circle" src={anonSmall} width="30vw" /> My
      Account
    </>
  );

  const onEndMeeting = async () => {
    console.log("inside end meeting");
    const res = await credentialFetch(
      GET_ALL_USERS_IN_MEETING + `?meetingId=${meetingId}`
    );
    if (res.status === 200) {
      const userData: ISocketMember[] = res.data;
      const delRes = await credentialFetch(
        END_MEETING,
        HTTP_METHODS.DELETE,
        JSON.stringify({
          meetingId,
          userId: loginData?.userId,
        })
      );
      const delResQuestions: IQuestion[] = delRes.data;
      console.log("Delete res", delResQuestions);
      if (delRes.status === 200) {
        const socketKickOutMessage: ISocketMessageSend = {
          meetingId,
          reqType: "MAKE_USER_LEAVE",
          userId: loginData?.userId,
          userIdToSendCommand: userData.map((s) => s.userId),
        };
        const bytes = jsonToArray(socketKickOutMessage);
        if (!isOpen(ws.current)) {
          alert("connection lost");
          return;
        }
        ws.current.send(bytes);
        // after having sent the signal for everyone to leave meeting
        // download all the questions sent in meeting
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
          JSON.stringify(delResQuestions)
        )}`;
        const downloadATag = document.createElement("a");
        downloadATag.href = jsonString;
        downloadATag.download = "questions.json";
        downloadATag.style = "visibility:hidden;";
        downloadATag.click();
        downloadATag.remove();
      }
    }
  };

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
            <Navbar.Collapse className="right-end">
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
                  onChange={() => {
                    setDarkMode(!darkMode);
                    document.body.classList.toggle("dark-mode");
                  }}
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
                {(loginData?.type === USER_TYPE.ADMIN ||
                  loginData?.type === USER_TYPE.PANELLIST) && (
                  <NavDropdown.Item
                    onClick={() => {
                      setIsModalOpen(true);
                    }}
                  >
                    End Meeting
                  </NavDropdown.Item>
                )}

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

          {isModalOpen && (
            <GlobalModal
              pShow={isModalOpen}
              setPShow={setIsModalOpen}
              title={"Ending meeting"}
              message={"Are you sure want to end this meeting"}
              onSubmit={onEndMeeting}
            />
          )}
          {HIGH_PRIVELAGE.includes(loginData?.type) && usersList && (
            <UsersList
              show={usersList}
              setShow={setUsersList}
              meetingId={meetingId}
              socket={ws.current}
            />
          )}

          {meeting?.messages ? (
            <div>
              <Stack
                className="iframe-r d-block d-md-none"
                direction="vertical"
              >
                <Iframe link={meeting.iframeLink} />
                <Tab.Container activeKey={activeTab} onSelect={handleSelect}>
                  <Nav variant="tabs">
                    <Nav.Item>
                      <Nav.Link eventKey="chat">Chat</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="question">Questions</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content>
                    <Tab.Pane eventKey="chat">
                      <ChatPanel
                        meetingId={meetingId!}
                        socket={ws.current}
                        chats={meeting.messages.chat}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="question">
                      <QuestionTabs
                        meetingId={meetingId!}
                        questions={meeting.messages.questions}
                        socket={ws.current}
                      />
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </Stack>
              <Container fluid className="main d-none d-md-block">
                <Row>
                  <Col xs={3} md={3} className="col">
                    <QuestionTabs
                      meetingId={meetingId!}
                      questions={meeting.messages.questions}
                      socket={ws.current}
                    />
                  </Col>
                  <Col xs={6} md={6} className="col">
                    <Container className="iframe">
                      <Stack direction="vertical" gap={3}>
                        <Iframe link={meeting.iframeLink} />
                        <CurrentQuestion
                          meetingId={meetingId}
                          questions={meeting.messages.questions}
                          currentQuestionIndex={meeting.messages.questions.findIndex(
                            (q) => q.id === meeting.currentQuestionId
                          )}
                          socket={ws.current}
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
                      chats={
                        meeting.messages && meeting.messages.chat
                          ? meeting.messages.chat
                          : []
                      }
                      socket={ws.current}
                    />
                  </Col>
                </Row>
              </Container>
            </div>
          ) : (
            <p className="text-center"> Not fetched right, reload again </p>
          )}
        </>
      ) : (
        <div className="spinner-parent">
          <Spinner
            animation="border"
            role="status"
            style={{ width: "80px", height: "80px" }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </>
  );
}
