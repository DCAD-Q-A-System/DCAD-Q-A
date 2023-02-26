import React, { useEffect, useState } from "react";
import { ListGroup, Modal } from "react-bootstrap";
import { credentialFetch } from "../../../utils/credential_fetch";
import { HTTP_METHODS } from "../../../utils/http_methods";
import { GET_ALL_USERS } from "../../../utils/paths";
import { ISocketMember, REQ_TYPES } from "../../../utils/socket_types";

export function UsersList({
  show,
  setShow,
  meetingId,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  meetingId: string;
}) {
  const [users, setUsers] = useState<ISocketMember[]>(null);

  useEffect(() => {
    const getAllUsers = async () => {
      const res = await credentialFetch(
        GET_ALL_USERS + `?meetingId=${meetingId}`
      );
      const data: ISocketMember[] = res.data;
      setUsers(data);
    };
    getAllUsers();
  }, []);

  return (
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
            users.map((member) => {
              // add delete button
              return <ListGroup.Item>{member.username}</ListGroup.Item>;
            })}
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
}
