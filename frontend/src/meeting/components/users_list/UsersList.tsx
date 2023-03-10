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
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { isOpen, jsonToArray, toastHook } from "../../../utils/funcs";
import ReconnectingWebSocket from "reconnecting-websocket";

import { GlobalModal } from "../../../modal/GlobalModal";
import { VARIANT } from "../../../utils/enums";

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
  const dispatch = useAppDispatch();
  const {setToast} = toastHook();
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

  const banUser = async () => {
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
        setToast("Connection error", "connection lost", VARIANT.DANGER, true);
        return;
      }
      socket.send(bytes);
      const newUsers: ISocketMember[] = users.filter(
        (x) =>
          x.userId !== currentMember?.userId &&
          x.username !== currentMember?.username
      );

      setUsers(newUsers);
    }
  };

  return (
    <div>
      {wantToDoSeriousAction && (
        <GlobalModal
          pShow={wantToDoSeriousAction}
          setPShow={setWantToDoSeriousAction}
          title={"Confirmation"}
          message={`Are you sure you want to ban ${currentMember.username}?`}
          onSubmit={banUser}
        />
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
                        setCurrentMember(member);
                        setWantToDoSeriousAction(true);
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
