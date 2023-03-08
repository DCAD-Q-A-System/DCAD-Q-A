import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { credentialFetch } from "../utils/credential_fetch";
import { USER_TYPE } from "../utils/enums";
import { HTTP_METHODS } from "../utils/http_methods";
import { DETAILS_TYPE } from "../utils/interfaces";
import { CREATE_USER, EDIT_USER, GET_USER } from "../utils/paths";

import "./UserDetails.css";

interface TUserDetails {
  userId: string;
  username: string;
  password: string;
  type: USER_TYPE;
}

export function UserDetails({
  userDetailsType,
}: {
  userDetailsType: DETAILS_TYPE;
}) {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState<TUserDetails>({
    username: "",
    userId: "",
    password: "",
    type: USER_TYPE.STUDENT,
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [userType, setUserType] = useState(USER_TYPE.STUDENT);

  const navigate = useNavigate();

  useEffect(() => {
    if (userDetailsType === DETAILS_TYPE.EDIT && userId) {
      const getUser = async () => {
        const res = await credentialFetch(GET_USER + userId);
        const data: TUserDetails = res.data;
        setUsername(data.username);
        setPassword(data.password);
        setUserType(data.type);
        setUserDetails(data);
      };
      getUser();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userDetailsType === DETAILS_TYPE.CREATE) {
      if (!username || !password || !checkPassword) {
        alert("details not entered");
        return;
      } else if (password !== checkPassword) {
        alert("passwords don't match");
        return;
      }
      const res = await credentialFetch(
        CREATE_USER,
        HTTP_METHODS.POST,
        JSON.stringify({
          username: username,
          password: password,
          type: userType,
        })
      );
      console.log(res.status);
      if (res.status === 200) {
        alert("Successful creation of user");
        navigate("/users-home");
        return;
      } else if (res.status === 409) {
        alert("username already taken");
      } else {
        alert("something went wrong. check details");
      }
    } else if (userDetailsType === DETAILS_TYPE.EDIT) {
      if (!username) {
        alert("username not entered correctly");
        return;
      }
      console.log(userDetails);
      const res = await credentialFetch(
        EDIT_USER,
        HTTP_METHODS.PUT,
        JSON.stringify({
          userId: userDetails.userId,
          username: username,
          password: password,
          type: userType,
        })
      );
      if (res.status === 200) {
        alert("successful edit!");
        navigate("/users-home");
      } else if (res.status === 409) {
        alert("username already taken");
      } else {
        alert("something went wrong");
      }
    }
  };

  return (
    <div className=" d-flex justify-content-center align-items-center">
      <Form onSubmit={handleSubmit} className="rounded p-4 p-sm-3">
        <Form.Group className="mb-4" controlId="formBasicEmail">
          <Form.Label className="fs-3">Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="p-3 fs-4"
          />
        </Form.Group>
        {userDetailsType === DETAILS_TYPE.CREATE && (
          <div>
            <Form.Group className="mb-4">
              <Form.Label className="fs-3">Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="p-3 fs-4"
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="fs-3">Check Password</Form.Label>
              <Form.Control
                type="password"
                value={checkPassword}
                onChange={(e) => setCheckPassword(e.target.value)}
                placeholder="Enter password again"
                className="p-3 fs-4"
              />
            </Form.Group>
          </div>
        )}

        <Form.Group className="mb-4" controlId="formSelect">
          <Form.Label className="fs-3">User Type</Form.Label>
          <Form.Select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option>{USER_TYPE.STUDENT} </option>
            <option>{USER_TYPE.PANELLIST} </option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit" className="fs-4 mt-4">
          Submit
        </Button>
        {userDetailsType === DETAILS_TYPE.EDIT && (
          <Button
            type="button"
            variant="primary"
            onClick={() => navigate(`/change-password/${userId}`)}
          >
            Change Password
          </Button>
        )}
        <Button
          variant="secondary"
          type="button"
          className="fs-4 mt-4"
          onClick={() =>
            userDetailsType === DETAILS_TYPE.CREATE
              ? navigate("/users-home")
              : navigate("/edit-users")
          }
        >
          Return
        </Button>
      </Form>
    </div>
  );
}
