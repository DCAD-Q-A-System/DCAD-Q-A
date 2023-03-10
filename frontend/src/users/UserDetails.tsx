import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { credentialFetch } from "../utils/credential_fetch";
import { USER_TYPE, VARIANT } from "../utils/enums";
import { toastHook } from "../utils/funcs";
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
  const {setToast} = toastHook();

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
        setToast("General error", "details not entered", VARIANT.DANGER, true);
        return;
      } else if (password !== checkPassword) {
        setToast("General error", "passwords don't match", VARIANT.DANGER, true);
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
        setToast("Creation success", "Successful creation of user", VARIANT.SUCCESS, true);
        navigate("/users-home");
        return;
      } else if (res.status === 409) {
        setToast("General error", "username already taken", VARIANT.DANGER, true);
      } else {
        setToast("General error", "something went wrong. check details", VARIANT.DANGER, true);
      }
    } else if (userDetailsType === DETAILS_TYPE.EDIT) {
      if (!username) {
        setToast("General error", "username not entered correctly", VARIANT.DANGER, true);
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
        setToast("Edit success", "successful edit!", VARIANT.SUCCESS, true);
        navigate("/users-home");
      } else if (res.status === 409) {
        setToast("General error", "username already taken", VARIANT.DANGER, true);
      } else {
        setToast("General error", "something went wrong", VARIANT.DANGER, true);
      }
    }
  };

  return (
    <Container className="cp-form d-flex justify-content-center align-items-center">
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

        <Button variant="primary" type="submit" className="fs-5 m-1">
          Submit
        </Button>
        {userDetailsType === DETAILS_TYPE.EDIT && (
          <Button
            type="button"
            variant="primary"
            className="fs-5 m-1 password"
            onClick={() => navigate(`/change-password/${userId}`)}
          >
            Change Password
          </Button>
        )}
        <Button
          variant="secondary"
          type="button"
          className="fs-5 m-1"
          onClick={() =>
            userDetailsType === DETAILS_TYPE.CREATE
              ? navigate("/users-home")
              : navigate("/edit-users")
          }
        >
          Return
        </Button>
      </Form>
    </Container>
  );
}
