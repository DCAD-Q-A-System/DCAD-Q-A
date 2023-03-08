import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { GlobalModal } from "../modal/GlobalModal";
import { credentialFetch } from "../utils/credential_fetch";
import { HTTP_METHODS } from "../utils/http_methods";
import { DELETE_USER, GET_ALL_USERS } from "../utils/paths";
import { ISocketMember } from "../utils/socket_types";

import "./EditUsers.css";
import { Menu } from "./Menu";

export function EditUsers() {
  const [users, setUsers] = useState<ISocketMember[]>([]);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [doubleCheckDialogue, setDoubleCheckDialogue] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");
  const [currentUsername, setCurrentUsername] = useState("");

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

  const onDeleteUser = async () => {
    const res = await credentialFetch(
      DELETE_USER,
      HTTP_METHODS.DELETE,
      JSON.stringify({ userId: currentUserId })
    );

    if (res.status === 200) {
      alert("successfully deleted user");
      const newUsers = users.filter((u) => u.userId != currentUserId);
      setUsers(newUsers);
      return;
    } else {
      alert("something's gone wrong try again");
      return;
    }
  };

  return (
    <div
      onClick={() => (isOpen == false ? setIsOpen(!isOpen) : "")}
      className="color-overlay d-flex justify-content-center align-items-center"
    >
      <Menu path="/users-home" isOpen={isOpen} setIsOpen={setIsOpen} />
      {doubleCheckDialogue && (
        <GlobalModal
          pShow={doubleCheckDialogue}
          setPShow={setDoubleCheckDialogue}
          title="Deletion of User"
          message={`Are you sure you want to delete ${currentUsername}?`}
          onSubmit={onDeleteUser}
        />
      )}
      <ListGroup>
        {users.length > 0 &&
          users.map((user, i) => (
            <ListGroup.Item key={i}>
              {user.username}
              <AiFillDelete
                onClick={() => {
                  setDoubleCheckDialogue(true);
                  setCurrentUserId(user.userId);
                  setCurrentUsername(user.username);
                }}
              />
              <AiFillEdit
                onClick={() => navigate(`/edit-user/${user.userId}`)}
              />
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
}
