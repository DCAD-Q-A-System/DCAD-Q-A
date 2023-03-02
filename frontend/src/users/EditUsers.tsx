import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { credentialFetch } from "../utils/credential_fetch";
import { GET_ALL_USERS } from "../utils/paths";
import { ISocketMember } from "../utils/socket_types";

import "./EditUsers.css";

export function EditUsers() {
  const [users, setUsers] = useState<ISocketMember[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await credentialFetch(GET_ALL_USERS);
      const data: ISocketMember[] = res.data;
      console.log(res.data);
      setUsers(data);
    };
    fetchUsers();

    return () => {};
  }, []);

  return (
    <div className="color-overlay d-flex justify-content-center align-items-center">
      <ListGroup>
        {users.length > 0 &&
          users.map((user, i) => (
            <ListGroup.Item key={i}>
              {user.username}
              <AiFillDelete onClick={() => {}} />
              <AiFillEdit onClick={() => {}} />
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
}
