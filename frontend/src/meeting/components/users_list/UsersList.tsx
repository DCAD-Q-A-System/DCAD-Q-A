import React, { useEffect, useState } from "react";
import { Button, ListGroup, Modal } from "react-bootstrap";
import { credentialFetch } from "../../../utils/credential_fetch";
import { HTTP_METHODS } from "../../../utils/http_methods";
import { BAN_USER, GET_ALL_USERS_IN_MEETING } from "../../../utils/paths";
import {
  ISocketMember,
  ISocketMessageSend,
  REQ_TYPES,
} from "../../../utils/socket_types";
import { FaBan } from "react-icons/fa";
import { useAppSelector } from "../../../store/hooks";
import { isOpen, jsonToArray } from "../../../utils/funcs";
import ReconnectingWebSocket from "reconnecting-websocket";

export function UsersList({
  show,
  setShow,
  meetingId,
  socket,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  meetingId: string;
  socket: ReconnectingWebSocket;
}) {
  const [users, setUsers] = useState<ISocketMember[]>(null);
  const loginData = useAppSelector((s) => s.loginReducer.data);
  const [wantToDoSeriousAction, setWantToDoSeriousAction] = useState(false);
  const [currentMember, setCurrentMember] = useState<ISocketMember>(null);
  useEffect(() => {
    const getAllUsers = async () => {
      const res = await credentialFetch(
        GET_ALL_USERS_IN_MEETING + `?meetingId=${meetingId}`
      );
      const data: ISocketMember[] = res.data;
      setUsers(data);
    };
    getAllUsers();
  }, []);

  return (
    <div>
      {wantToDoSeriousAction && (
        <Modal
          size="lg"
          show={wantToDoSeriousAction}
          onHide={() => setWantToDoSeriousAction(false)}
          aria-labelledby="action-title"
        >
          <Modal.Header>
            <Modal.Title id="action-title">Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to ban this user?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setWantToDoSeriousAction(false)}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={async () => {
                const res = await credentialFetch(
                  BAN_USER,
                  HTTP_METHODS.PUT,
                  JSON.stringify({ meetingId, userId: currentMember?.userId })
                );
                if (res.status === 200) {
                  const socketMsg: ISocketMessageSend = {
                    meetingId,
                    reqType: "MAKE_USER_LEAVE",
                    userId: loginData?.userId,
                    userIdToSendCommand: currentMember?.userId,
                  };
                  const bytes = jsonToArray(socketMsg);
                  if (!isOpen(socket)) {
                    alert("connection lost");
                    return;
                  }
                  socket.send(bytes);
                  const newUsers: ISocketMember[] = users.filter(
                    (x) =>
                      x.userId !== currentMember?.userId &&
                      x.username !== currentMember?.username
                  );

                  setUsers(newUsers);

                  setWantToDoSeriousAction(false);
                }
              }}
            >
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <Modal
        size="lg"
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="title"
      >
        <Modal.Header>
          <Modal.Title id="title">Users List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {users &&
              users.map((member, i) => {
                // add delete button
                return (
                  <ListGroup.Item key={i}>
                    {member.username}
                    <FaBan
                      onClick={() => {
                        setWantToDoSeriousAction(true);
                        setCurrentMember(member);
                      }}
                    />
                  </ListGroup.Item>
                );
              })}
          </ListGroup>
        </Modal.Body>
      </Modal>
    </div>
  );
}
