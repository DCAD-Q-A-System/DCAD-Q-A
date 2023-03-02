import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { credentialFetch } from "../utils/credential_fetch";
import { GET_ALL_USERS } from "../utils/paths";
import { ISocketMember } from "../utils/socket_types";

import "./EditUsers.css";
import { Menu } from "./Menu";

export function EditUsers() {
  const [users, setUsers] = useState<ISocketMember[]>([]);
  const navigate = useNavigate();
  const [isOpen,setIsOpen] = useState(true)
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
    <div 
    onClick={()=>isOpen == false ? setIsOpen(!isOpen) : ""}
    className="color-overlay d-flex justify-content-center align-items-center">
      <Menu path="/users-home" isOpen={isOpen} setIsOpen={setIsOpen} />
      <ListGroup>
        {users.length > 0 &&
          users.map((user, i) => (
            <ListGroup.Item key={i}>
              {user.username}
              <AiFillDelete onClick={() => {}} />
              <AiFillEdit
                onClick={() => navigate(`/edit-user/${user.userId}`)}
              />
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
}
