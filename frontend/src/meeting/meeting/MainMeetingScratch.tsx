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

    const onOpen = (event: MessageEvent<any>) => {
      console.log("sent msg");
    };
    socket.addEventListener("open", onOpen);
    const onMessage = async (e: MessageEvent<any>) => {
      console.log(e.data);

      const data: ISocketMessageReceive = e.data;
      console.log(data.error);
      if (data.error) {
        switch (data.error) {
          case SOCKET_ERRORS_TYPE.INVALID_JWT:
            const res = await checkIfInitiallyLoggedIn();
            if (res) {
              dispatch(setData({ data: res }));
            }
            break;
          case SOCKET_ERRORS_TYPE.INVALID_REQ_TYPE:
          case SOCKET_ERRORS_TYPE.MEETING_ID_EMPTY:
            alert("something went wrong with connection, leave and rejoin");
            break;
        }
      } else {
        const newMeeting = { ...meeting };
        console.log("New data", data);
        if (newMeeting.messages) {
          if (data.message.chats.length > 0) {
            newMeeting.messages.chat = [
              ...newMeeting.messages.chat,
              ...data.message.chats,
            ];
          }
          if (data.message.questions.length > 0) {
            newMeeting.messages.questions = [
              ...newMeeting.messages.questions,
              ...data.message.questions,
            ];
          }
        }
        if (newMeeting.onlineMembers) {
          if (data.message.newOnlineMembers.length > 0) {
            console.log(`These are new members ${data.newOnlineMembers}`);
            newMeeting.onlineMembers = [
              ...newMeeting.onlineMembers,
              ...data.message.newOnlineMembers,
            ];
          }
          if (data.message.membersWhoLeft.length > 0) {
            console.log(`These are new members ${data.message.membersWhoLeft}`);

            newMeeting.onlineMembers = [
              ...newMeeting.onlineMembers,
              ...data.message.newOnlineMembers,
            ];
          }
        }
        setMeeting(newMeeting);
      }
    };
    socket.addEventListener("message", onMessage);

    const onClose = (e: MessageEvent<any>) => {
      console.log(e.data);
    };

    socket.addEventListener("close", onClose);

    return () => {
      socket.removeEventListener("open", onOpen);
      socket.removeEventListener("message", onMessage);
      socket.removeEventListener("close", onClose);
    };
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
          {meeting.messages ? (
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
                  <ChatPanel
                    meetingId={meetingId}
                    chats={meeting.messages.chat}
                  />
                </div>
              </div>
            </div>
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
